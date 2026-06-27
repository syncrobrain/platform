<p align="center">
  <img src="assets/logo.png" alt="SyncroBrain" width="128" />
</p>

<h1 align="center">SyncroBrain · 万物智脑</h1>

开源、轻量化、**AI 驱动**的 IoT PaaS — 深耕 **B 端垂直行业**与**白牌出海**，以数万级私有化成本为硬件厂商与产业集群提供行业解调、专属 BI 与贴牌 App。

> **品牌**：[syncrobrain.com](https://syncrobrain.com) · **组织**：[github.com/syncrobrain](https://github.com/syncrobrain)（原 LuminaryIoTChain）  
> **核心链路**：设备（端）→ MQTT（管道）→ 物联网平台（大脑）→ 终端 App（展示）

## 解决什么问题

| 痛点 | 方案 |
|------|------|
| 硬件厂商缺乏 IoT 能力 | 开源 PaaS + App 模板，无需自建底层 |
| 大厂不愿做的长尾行业 | 行业 Decoder（Modbus/BACnet/OPC-UA）+ DataTalk 专属 BI |
| 数据合规与主权 | 私有化部署，满足 GDPR / NIS2 / 信创；White-label App |
| 白牌出海又不想被平台绑定 | 开源适配层 + 联合 ESP32/T5 芯片，搭建自有品牌云 |
| 涂鸦仅设备管理 | **AI 推理 + DoerFlow 链上交易 + DataTalk 大屏** |
| 接入门槛高 | **BlockyEdu** AI 辅助工程师快速对接 |

详见 [`spec/platform-vision.md`](./spec/platform-vision.md) · [`spec/architecture.md`](./spec/architecture.md) · [`spec/ecosystem.md`](./spec/ecosystem.md)

> **LuminaryWorks**：[域名与品牌决策](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/domain-and-branding.md)

## 四层架构

| 层 | 选型 | 职责 |
|----|------|------|
| **Edge** | ESPHome / Tasmota | 硬件标准化、OTA |
| **Pipe** | EMQX (OSS) | B 端 MQTT 管道（低频次采集；dev 用 Mosquitto POC） |
| **Brain** | ThingsBoard CE + iot-gateway | 设备影子、规则引擎；LuminaryWorks 生态编排 |
| **Client** | Flutter/RN + iot-console-web | 控制监控；**DataTalk** 专业图表 |

## 仓库结构（MetaRepo + 多仓）

```text
syncrobrain/platform/              # MetaRepo（私有）
├── .meta/                       # manifest.json — 子仓 SSOT
├── syncrobrain.code-workspace   # VS Code / Cursor 多根工作区
├── spec/ plan/ contracts/ playbooks/
├── init.ps1 / init.sh / dev.ps1 # clone + 一键 bootstrap
├── iot-gateway/                 # → 独立仓
├── iot-console-web/             # → 独立仓
├── website/                     # → 独立仓
├── docs/                        # → 公开文档仓
└── deploy/                      # → Docker compose
```

```powershell
git clone git@github.com:syncrobrain/platform.git syncrobrain
cd syncrobrain
.\dev.ps1
```

| 可见性 | 仓库 |
|--------|------|
| **Public** | `syncrobrain/docs` |
| **Private** | platform、iot-gateway、iot-console-web、website、deploy |

**不用** git submodule / subtree。新人上手：[ONBOARDING.md](./ONBOARDING.md)。拆解：[plan/repository-split.md](./plan/repository-split.md)。

## 快速开始（一键）

```powershell
git clone git@github.com:syncrobrain/platform.git syncrobrain
cd syncrobrain
.\dev.ps1          # clone 子仓 · docker · pnpm install · 迁移
.\dev-mvp.ps1      # 启动 gateway + console
```

Linux / macOS：`./dev.sh && ./dev-mvp.sh`

Logto 统一登录需另启 [LuminaryWorks/identity](https://github.com/LuminaryWorks/identity)。详见 [ONBOARDING.md](./ONBOARDING.md)。

## LuminaryWorks 生态

| 项目 | 在 IoT 场景的角色 |
|------|------------------|
| [DataLuminary](https://github.com/dataluminary/platform) | DataTalk 图表 / AI 数据洞察 |
| [BlockyEdu](https://github.com/blockyedu/platform) | 工程师接入实验与 AI 辅导 |
| [DoerFlow](https://github.com/doerflow/platform) | AI 服务与链上任务网络 |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | 设备远程桌面运维 |
| [VistaCast](https://github.com/VistaCast/vistacast) | 摄像头 AI 告警（规划） |

## 文档

| 文档 | 说明 |
|------|------|
| [spec/platform-vision.md](./spec/platform-vision.md) | 平台愿景与初期红线 |
| [spec/architecture.md](./spec/architecture.md) | 四层架构 |
| [spec/ecosystem.md](./spec/ecosystem.md) | 工程规格 — LuminaryWorks 角色 |
| [docs/ecosystem.md](./docs/ecosystem.md) | **对外** — 生态说明 |
| [plan/README.md](./plan/README.md) | 里程碑 |
