# SyncroBrain 四层架构 (v1.1)

> **核心逻辑**：设备（端）→ MQTT 协议（管道）→ 物联网平台（大脑）→ 终端 App（展示）  
> **场景约束**：B 端低频次采集，非消费级百万并发 — 详见 [platform-vision.md §7](./platform-vision.md#7-初期红线规避小平台倒闭的死穴)

## 1. 架构总览

```text
┌─────────────────────────────────────────────────────────────────────┐
│  用户层 (Client)                                                     │
│  Flutter / React Native App · iot-console-web · DataTalk 嵌入大屏    │
├─────────────────────────────────────────────────────────────────────┤
│  管理层 (Brain)                                                      │
│  ThingsBoard CE — 设备影子 · 规则引擎 · 多租户 · 告警                  │
│  DataLuminary DataTalk — 图表 / 仪表盘（替代 TB 原生 Widget 主场景）   │
│  iot-gateway (NestJS) — 生态编排 · Identity · PAL · 跨产品 API      │
├─────────────────────────────────────────────────────────────────────┤
│  通信层 (Pipe)                                                       │
│  EMQX (Open Source) — MQTT 管道 · TLS · 桥接 · WebSocket（B 端规模）   │
├─────────────────────────────────────────────────────────────────────┤
│  设备端 (Edge)                                                       │
│  ESPHome / Tasmota / 自定义 Firmware · OTA · 标准 Topic 契约         │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                      │
         ▼                    ▼                      ▼
    VibeEdu 接入实验      VibeAgent AI/链上       VistaRemote 远程
```

## 2. 分层选型

| 层 | 角色 | 选型 | 职责 |
|----|------|------|------|
| **Edge** | 设备端 | ESPHome、Tasmota、厂商 Firmware | 硬件标准化、传感器采集、OTA 远程升级 |
| **Pipe** | 通信层 | **EMQX** (OSS) | MQTT 连接与桥接（面向 B 端千～万级、低频次上报）；规则桥接到 ThingsBoard |
| **Brain** | 管理层 | **ThingsBoard CE** + **iot-gateway** | 设备影子、规则引擎、租户；编排层对接 LuminaryWorks |
| **Client** | 用户层 | Flutter / RN App + **iot-console-web** | 控制与监控；DataTalk 嵌入专业图表 |

> **Dev 环境说明**：M2 使用 Mosquitto 做本地 POC；**M3 起切换 EMQX**，与生产一致。

## 2.1 架构原则：缝合而非重造

不自研 MQTT Broker、时序引擎或设备影子核心。各层职责：

| 层 | 开源底座 | SyncroBrain 自研（NestJS / React） |
|----|----------|-----------------------------------|
| Pipe | EMQX | 租户认证、桥接配置、Topic 契约 |
| Brain | ThingsBoard CE、Node-RED / TB 规则链 | iot-gateway 编排、行业 Decoder、生态 API |
| 时序 | ClickHouse / InfluxDB / TimescaleDB | 行业指标聚合、查询与告警联动 |
| Client | DataTalk | iot-console-web、White-label App 壳 |

行业非标协议（Modbus、BACnet、OPC-UA）在 Edge 或 Node-RED 解调后，以标准 MQTT Topic 进入平台；业务 BI 由 DataTalk 定制，不由 ThingsBoard Widget 承担主路径。

## 3. 数据流

### 3.1 上行（Telemetry）

```text
ESPHome ──publish──► EMQX ──rule/bridge──► ThingsBoard
                              │
                              └──► iot-gateway (iot/v1/{id}/telemetry) ──► ClickHouse (M5)
```

### 3.2 下行（Command / RPC）

```text
App / Console ──REST──► ThingsBoard ──MQTT──► EMQX ──► Device
```

### 3.3 生态扩展

| 事件 | 路径 |
|------|------|
| AI 推理请求 | ThingsBoard Rule → VibeAgent API |
| 远程桌面 | Device 注册 VistaRemote pairing |
| BI 大屏 | iot-console 携带 JWT 嵌入 DataTalk dashboard |
| 开发者 onboarding | VibeEdu 课程 → 设备模板 Git → OTA |

## 4. Topic 契约（与 ThingsBoard / EMQX 对齐）

| Topic | 方向 | 说明 |
|-------|------|------|
| `v1/devices/{token}/telemetry` | ↑ | ThingsBoard 标准遥测（生产） |
| `v1/devices/{token}/attributes` | ↑↓ | 设备属性 / 影子 |
| `v1/devices/{token}/rpc/request/+` | ↓ | 服务端 RPC |
| `iot/v1/{deviceId}/presence` | ↑ | Luminary 编排层上下线（M2 dev） |
| `iot/v1/{deviceId}/telemetry` | ↑ | 编排层补充通道（Kafka/ClickHouse 前置） |

Phase 3 将 `iot-gateway` 订阅 EMQX 桥接 topic，与 ThingsBoard 设备实体双向同步。

## 5. 组件边界

| 组件 | 拥有 | 不拥有 |
|------|------|--------|
| **ThingsBoard CE** | 设备注册、RPC、规则链、告警 | BI 大屏、AI 推理、链上交易 |
| **EMQX** | 连接、认证、桥接、限流 | 业务逻辑、持久化遥测（交给 TB/CH） |
| **iot-gateway** | Identity、PAL、生态 API、TB 代理 | 替代 TB 核心设备引擎 |
| **DataTalk** | 图表、数据集、AI 分析展示 | 设备连接管理 |
| **iot-console-web** | 租户控制台、生态入口、设备列表 | 完整原生 App（由 Flutter/RN 承担） |

## 6. 部署拓扑（私有化最小栈）

```text
docker compose (deploy/)
├── emqx              # :1883 MQTT, :8083 WS
├── thingsboard-ce    # :8080 REST/MQTT 接入
├── iot-postgres      # TB + 编排元数据
├── iot-redis         # 会话 / 限流
├── iot-gateway       # :13100 NestJS
└── iot-console-web   # :5180 静态 / dev server

外部（LuminaryWorks 生态，独立 compose）：
├── Logto + PG        # 统一登录
├── DataTalk          # BI 大屏
├── VibeEdu           # 开发者课程
├── VibeAgent         # AI / 链上
└── VistaRemote       # 远程运维
```

## 7. 迭代对照

| 阶段 | Edge | Pipe | Brain | Client |
|------|------|------|-------|--------|
| M2 ✅ | — | Mosquitto POC | iot-gateway CRUD | iot-console-web |
| M3 | ESPHome 模板 | EMQX compose | ThingsBoard CE 接入 | DataTalk 嵌入 |
| M4 | OTA 规范 | EMQX 认证 | TB 规则 → VibeAgent | Flutter shell POC |
| M5 | 行业模板市场 | 多区域桥接 | ClickHouse 遥测 | 多语言 App |

## 8. 参考

- [platform-vision.md](./platform-vision.md) — 平台愿景与初期红线
- [EMQX Open Source](https://www.emqx.io/)
- [ThingsBoard CE](https://thingsboard.io/docs/)
- [ESPHome](https://esphome.io/)
- 生态总览：`DataLuminary-Platform/spec/luminary-iot-chain-overview.md`
