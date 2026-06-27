# SyncroBrain v0.app 设计提示词

> **用途**：复制下方英文提示词到 [v0.app](https://v0.app) 生成 UI 原型。  
> **依据**：LuminaryWorks 生态规划 + SyncroBrain `spec/` 产品文档。  
> **技术栈**：与 `services/iot-console-web` 一致 — **Ant Design 6**，不用 Tailwind / shadcn/ui。  
> **更新**：2026-06

## 设计约束（所有页面通用）

| 维度 | 要求 |
|------|------|
| 品牌 | **SyncroBrain** · 中文 **万物智脑** · [syncrobrain.com](https://syncrobrain.com) |
| Slogan | *An AI-native operating system for connected devices.* |
| 定位 | B 端开源 IoT PaaS，**非**消费级智能家居 |
| 受众 | 硬件厂商、集成商、白牌出海、垂直行业（充电桩/储能/冷链/工业传感） |
| 技术栈 | React 19 · **Ant Design 6 (`antd`)** · **@ant-design/icons** · react-router-dom · Rsbuild SPA |
| 主题 | `ConfigProvider` + `locale={zhCN}`，`token: { colorPrimary: "#1677ff", colorError: "#ea3636", borderRadius: 8 }` |
| 样式 | 仅用 antd `token` / `style` / `className` 微调；**禁止** Tailwind CSS、shadcn/ui、Lucide |
| 气质 | 企业级、可信、数据主权/私有化；避免涂鸦式 C 端卡通感 |
| 语言 | 默认中英双语 UI（`zh-CN` 主，`en` 副标题） |
| 生态 | 页脚或侧栏可露出 LuminaryWorks 兄弟产品入口，但不抢主品牌 |

### 每条提示词前缀（建议一并粘贴）

```
IMPORTANT: Use Ant Design 6 (antd) and @ant-design/icons ONLY.
Do NOT use Tailwind CSS, shadcn/ui, Lucide, or Radix.
Wrap app in ConfigProvider with zhCN locale.
Theme token: colorPrimary #1677ff, colorError #ea3636, borderRadius 8.
Use antd Layout, Card, Table, Tag, Button, Space, Row, Col, Menu, Typography, etc.
```

### 生态角色速查

```text
SyncroBrain（连）  ↔  DoerFlow（赚）
DataLuminary（看见） · BlockyEdu（学） · VistaRemote（控） · VistaCast（看，规划）
```

### 四层架构（视觉叙事可用）

```text
Edge（ESPHome）→ Pipe（EMQX）→ Brain（ThingsBoard + Gateway）→ Client（Console + App）
```

---

## 提示词 1：官网 Landing Page（syncrobrain.com）

```
IMPORTANT: Use Ant Design 6 (antd) and @ant-design/icons ONLY. No Tailwind, no shadcn/ui.

Design a modern B2B SaaS marketing landing page for "SyncroBrain" (万物智脑) — an open-source, AI-native IoT PaaS for connected devices.

Tech: React SPA, antd 6, @ant-design/icons, ConfigProvider locale zhCN.
Theme token: colorPrimary #1677ff, borderRadius 8.

Structure: antd Layout with Header, Content, Footer. Use Row/Col grid, Card, Button, Typography, Table, Tag, Divider, Space.

Header:
- Typography.Title level 4: SyncroBrain
- Typography.Text type="secondary": 万物智脑
- Nav Space: Features, Architecture, Compare, Ecosystem, Pricing
- Button type="primary": Get Started
- Button: GitHub

Hero (Row, gutter 48):
- Col span 12:
  - Typography.Title: Connect every device. Give it a brain.
  - Typography.Paragraph: 连接设备的 AI 原生操作系统 — 开源可私有化，数万级成本替代闭源 IoT 平台
  - Space: Button type="primary" size="large" + Button size="large"
- Col span 12: Card with abstract SVG/placeholder — device nodes syncing to central brain via MQTT lines

Social proof (Space wrap, Tag bordered=false):
Open Source · Private Deploy · GDPR / NIS2 Ready · White-label

Features (Row, 3 Col span 8, Card hoverable):
1. CloudSyncOutlined — Syncro Pipe — EMQX MQTT, B2B low-frequency telemetry
2. BulbOutlined — AI Brain — ThingsBoard + DataLuminary BI + DoerFlow agents
3. SafetyCertificateOutlined — Sovereign Cloud — on-prem, data stays in region

Architecture section (Card):
- Steps or horizontal Row of 4 Cards: Edge (ESPHome) → Pipe (EMQX) → Brain (ThingsBoard) → Client (Console)
- Typography.Text code style for labels

vs Tuya (Table, columns: Dimension | Tuya | SyncroBrain):
- Closed SaaS vs Open Source Private
- Device management vs AI + BI + Agent marketplace
- Platform lock-in vs standard MQTT/REST

Vertical industries (Row, 4 Cards): EV charging, Cold chain, Industrial Modbus/BACnet, White-label OEM

Ecosystem (Row, 5 Cards, one bordered primary):
DataLuminary · BlockyEdu · DoerFlow · VistaRemote · VistaCast — SyncroBrain highlighted as "Connect"

Pricing (2 Cards side by side): Self-host · Enterprise SLA

Footer: syncrobrain.com links, LuminaryWorks parent

Style: dark Header (#001529 antd default), light Content (#f5f5f5), professional B2B — NOT consumer smart-home
```

---

## 提示词 2：IoT 控制台 Dashboard（iot-console-web 主界面）

```
IMPORTANT: Use Ant Design 6 (antd) and @ant-design/icons ONLY. No Tailwind, no shadcn/ui.

Design a B2B IoT admin console for "SyncroBrain" (万物智脑), matching iot-console-web patterns.

Tech: React, antd 6, @ant-design/icons, react-router-dom, ConfigProvider zhCN.
Theme: colorPrimary #1677ff, colorError #ea3636, borderRadius 8.

Layout:
- antd Layout style minHeight 100vh
- Layout.Sider collapsible, theme dark, width 220:
  - Logo area: SyncroBrain / 万物智脑
  - Menu mode inline, items: Dashboard, Devices, Telemetry, Rules, Alerts, Decoders, Ecosystem, Settings
  - Icons from @ant-design/icons (DashboardOutlined, HddOutlined, etc.)
- Layout.Header: tenant name, Tag for Gateway status (green Online / red Offline), Dropdown user menu with Logout
- Layout.Content padding 24, maxWidth 1200, margin auto

Dashboard home:

Row 1 — 4 Col span 6, Card with Statistic:
- Total Devices: 1247 (HddOutlined)
- Online Now: 1103, valueStyle green, Badge status processing
- Alerts (24h): 3, valueStyle #faad14
- MQTT Messages (24h): 48.2K

Row 2 — Col span 16 + Col span 8:
- Card title "Device Status": placeholder Area chart (antd @ant-design/charts or simple div chart)
- Card title "Recent Alerts": List with Tag colors error/warning/default per severity

Row 3 — Typography.Title level 5: 生态能力
- Row 4x Col span 6, Card hoverable onClick:
  - DataLuminary — CloudOutlined — 数据洞察 / DataTalk BI
  - BlockyEdu — CodeOutlined — IoT 课程 / ESPHome 实验
  - DoerFlow — AppstoreOutlined — Agent 市场 / 链上收益
  - VistaRemote — DesktopOutlined — 远程运维

Row 4 — Typography.Title level 5: 设备
- Space marginBottom 16: Button type="primary" 注册设备, Button 刷新, Input.Search, Select protocol filter
- Table rowKey="id", columns: 名称, 协议 (Tag), 状态 (Tag green/red/default), 最后上报, 创建时间, 操作 (Dropdown: 查看/禁用/远程)
- 5 sample rows: cold-chain-sensor-07, ev-pile-controller-12, etc.

Empty state: antd Empty description="暂无设备" + Button type="primary" 注册演示设备

Chinese UI labels, Tooltip with English on icon buttons. Dense enterprise console like AWS IoT + antd Pro layout.
```

---

## 提示词 3：设备详情页（Device Detail）

```
IMPORTANT: Use Ant Design 6 (antd) and @ant-design/icons ONLY. No Tailwind, no shadcn/ui.

Device detail page for SyncroBrain IoT console.

Tech: React, antd 6, @ant-design/icons, ConfigProvider zhCN, theme colorPrimary #1677ff.

Breadcrumb: 设备 / cold-chain-sensor-07

Page header (Space wrap):
- Typography.Title level 4, editable: cold-chain-sensor-07
- Tag color="success": 在线
- Tag: MQTT
- Space: Button type="primary" 下发指令, Button 远程运维 (VistaRemote), Button 在 DataTalk 中查看, Button danger 禁用设备

Row gutter 24:
Col span 16:
- Tabs items: 概览 | 遥测 | 属性 | RPC | 日志
- 概览 tab:
  - Descriptions bordered title="设备信息": 设备 ID (Typography.Text copyable), 租户, 注册人, 创建时间, 最后遥测
  - Row 3x Statistic in Cards: 温度 4.2°C, 湿度 62%, 电量 87%
  - Card title="MQTT Topic": Typography.Paragraph copyable code blocks for v1/devices/{token}/telemetry and iot/v1/{deviceId}/presence

Col span 8:
- Card title="连接状态": Descriptions — EMQX 正常, 最后心跳 12s 前
- Card title="规则": List 2 items
- Card title="告警": Alert type="warning" message="温度超过阈值"
- Card title="生态入口": Space direction vertical with Link buttons

Bottom: Card title="活动记录" — Timeline with presence/telemetry/rule events

Same Layout.Sider dark sidebar as dashboard. B2B data-dense, readable.
```

---

## 提示词 4：登录页（Logto SSO）

```
IMPORTANT: Use Ant Design 6 (antd) and @ant-design/icons ONLY. No Tailwind, no shadcn/ui.

Minimal SSO login page for SyncroBrain IoT console.

Tech: React, antd 6, @ant-design/icons, ConfigProvider zhCN, theme colorPrimary #1677ff.

Layout: full viewport, background linear-gradient dark (#001529 to #002140).

Row justify center align middle style minHeight 100vh:
- Col xs={24} md={12} (hidden on mobile): Typography.Title level 2 white + Typography.Paragraph "Sync devices. Sync intelligence." + abstract MQTT network illustration (div/SVG)
- Col xs={24} md={10}:
  - Card style maxWidth 400, margin auto:
    - Typography.Title level 3 center: SyncroBrain
    - Typography.Text type="secondary" block center: 万物智脑
    - Typography.Paragraph type="secondary" center: IoT Platform Console
    - Button type="primary" block size="large" icon={<LoginOutlined />}: 使用 LuminaryWorks 登录
    - Typography.Text type="secondary" style fontSize 12, block center marginTop 16: Powered by Logto · syncrobrain.com
    - Divider
    - Space center: Link 隐私政策, Link 文档

No email/password Form — SSO button only. Clean enterprise trust.
```

---

## 提示词 5：行业 Decoder 配置页（差异化能力）

```
IMPORTANT: Use Ant Design 6 (antd) and @ant-design/icons ONLY. No Tailwind, no shadcn/ui.

Industry protocol decoder page for SyncroBrain — differentiator vs Tuya.

Tech: React, antd 6, @ant-design/icons, ConfigProvider zhCN, theme colorPrimary #1677ff.

Standard console Layout with dark Sider (same as dashboard).

Content:
- Typography.Title level 4: 行业协议解调 / Industry Decoders
- Alert type="info" showIcon: Transform Modbus / BACnet / OPC-UA registers into business KPIs

Row gutter 16:
Col span 6:
- Input.Search placeholder 搜索 Decoder
- Menu mode inline, groups: 能源, 冷链, 农业, 工业
- Selected: Cold Chain Temperature Monitor

Col span 18:
- Card title="Cold Chain Temperature Monitor":
  - Descriptions: 源协议 Modbus RTU
  - Table editable or Form.List mapping rows:
    寄存器 40001 → temperature (°C, float32, scale 0.1)
    寄存器 40002 → humidity (%)
    寄存器 40003 → door_open (boolean)
  - Card size small title="输出 Topic": Typography.Text code copyable iot/v1/{deviceId}/telemetry
  - Card size small title="Payload 预览": pre/code JSON syntax block
  - Space: Button 测试 Decoder, Button type="primary" 保存, Button 部署到租户

Alert type="info" message="Powered by Node-RED / ThingsBoard rule chain"

Target: integration engineers at hardware OEMs. Technical, approachable.
```

---

## 使用建议

1. **生成顺序**：先 Landing → Console Dashboard → Device Detail → 其余页面；后续提示加 *"Match the SyncroBrain antd design from previous generation"*。
2. **v0 偏好**：v0 默认倾向 shadcn/Tailwind，**每条提示务必带上 IMPORTANT 前缀**，或在 v0 项目设置中指定 React + antd。
3. **落地对齐**：生成代码可直接迁入 `services/iot-console-web`（已有 antd 6 + Rsbuild + react-router-dom）。
4. **品牌更名**：现有控制台仍显示 `LuminaryIoTChain`，v0 稿统一用 **SyncroBrain / 万物智脑**。
5. **生态链接**：代码中旧名 VibeEdu / VibeAgent 已升级为 **BlockyEdu / DoerFlow**，提示词已用新名。

## 相关文档

| 文档 | 说明 |
|------|------|
| [spec/platform-vision.md](../../spec/platform-vision.md) | 平台愿景与初期红线 |
| [spec/architecture.md](../../spec/architecture.md) | 四层架构 |
| [spec/ecosystem.md](../../spec/ecosystem.md) | LuminaryWorks 生态集成 |
| [services/iot-console-web](../../services/iot-console-web) | 现有 antd 控制台实现 |
| [LuminaryWorks syncrobrain.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/syncrobrain.md) | 产品规划摘要 |
