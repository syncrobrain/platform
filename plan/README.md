# SyncroBrain 工程规划

## 仓库拆解

多仓架构对齐 VibeCode / VistaRemote：**公开 docs**、**私有**各业务子仓 — 见 [repository-split.md](./repository-split.md)。子仓清单：[`.meta/manifest.json`](../.meta/manifest.json)，初始化：`./init.sh`，IDE：`syncrobrain.code-workspace`。

## 里程碑

| 阶段 | 内容 | 状态 |
|------|------|------|
| **IoT-M0** | MetaRepo init + 规格 | ✅ |
| **IoT-M1** | iot-gateway + iot-console-web + SSO | ✅ |
| **IoT-M2** | MQTT presence POC（Mosquitto dev） | ✅ |
| **IoT-M3** | EMQX + ThingsBoard CE 接入；DataTalk 嵌入 | 待开始 |
| **IoT-M4** | BlockyEdu 接入课程；DoerFlow / VistaCast 集成 | 待开始 |
| **IoT-M5** | ESPHome 模板、ClickHouse 遥测、Flutter App shell | 待开始 |

## 技术栈演进

| 层 | M2（当前） | M3+（目标） |
|----|-----------|------------|
| Pipe | Mosquitto | **EMQX OSS** |
| Brain | iot-gateway only | **ThingsBoard CE** + iot-gateway 编排 |
| Charts | 控制台表格 | **DataTalk** 嵌入 |
| Client | iot-console-web | + Flutter/RN App |

## 前置依赖

- LuminaryWorks 统一登录 UL-1～UL-5 ✅
- Identity：`LuminaryWorks/identity` → `./bootstrap.sh`（见 `docs/development/unified-login.md`）
- GitHub 组织：[syncrobrain](https://github.com/syncrobrain)（原 LuminaryIoTChain）

## LuminaryWorks 生态

| 文档 | 说明 |
|------|------|
| [syncrobrain/docs](https://github.com/syncrobrain/docs) | 对外文档站（RsPress，公开仓） |
| [spec/ecosystem.md](../spec/ecosystem.md) | 工程集成规格 |
| [LuminaryWorks 叙事](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/docs/ecosystem-narrative.md) | 五产品 AI 生态故事 |
