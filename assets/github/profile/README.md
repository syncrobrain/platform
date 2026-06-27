<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/syncrobrain/.github/main/profile/banner.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/syncrobrain/.github/main/profile/banner.png">
  <img alt="SyncroBrain — 万物智脑 · AI-native IoT PaaS" src="https://raw.githubusercontent.com/syncrobrain/.github/main/profile/banner.png" width="100%">
</picture>

<h1 align="center">SyncroBrain · 万物智脑</h1>

<p align="center">
  <strong>Open-source, AI-native IoT PaaS</strong> for B2B verticals, white-label OEMs, and private cloud deploy.<br/>
  开源可私有化 · 深耕垂直行业 · 白牌出海 · 数万级部署成本
</p>

<p align="center">
  <a href="https://syncrobrain.com"><img alt="Website" src="https://img.shields.io/badge/website-syncrobrain.com-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white"></a>
  <a href="https://github.com/syncrobrain/docs"><img alt="Docs" src="https://img.shields.io/badge/docs-public-06b6d4?style=for-the-badge&logo=readthedocs&logoColor=white"></a>
  <a href="https://github.com/syncrobrain/platform"><img alt="Platform" src="https://img.shields.io/badge/meta--repo-platform-10b981?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

---

## What we build

**SyncroBrain** connects devices over MQTT, orchestrates them on an open IoT stack, and layers AI + BI on top — without locking you into a consumer-smart-home SaaS.

| Layer | Stack | Role |
|------:|-------|------|
| **Edge** | ESPHome / Tasmota | Hardware standardization, OTA |
| **Pipe** | EMQX | B2B MQTT messaging |
| **Brain** | ThingsBoard CE + Gateway | Device shadow, rules, protocol decoders |
| **Client** | Console + App templates | Control, monitoring, DataTalk BI |

**We focus on:** Modbus / BACnet / OPC-UA → business KPIs, industry dashboards, white-label apps, GDPR / NIS2 / 信创-friendly private deploy.

**We do not:** million-device consumer IoT, generic smart-home hubs, or rebuilding MQTT from scratch.

## Repositories

| Repo | Visibility | Description |
|------|------------|-------------|
| [platform](https://github.com/syncrobrain/platform) | Public | Meta-repo — spec, plan, contracts, multi-repo orchestration |
| [docs](https://github.com/syncrobrain/docs) | Public | RsPress documentation site |
| [iot-gateway](https://github.com/syncrobrain/iot-gateway) | Private | NestJS orchestration (JWT, shadow, MQTT) |
| [iot-console-web](https://github.com/syncrobrain/iot-console-web) | Private | Web console (React + Rsbuild) |
| [website](https://github.com/syncrobrain/website) | Private | Marketing site → [syncrobrain.com](https://syncrobrain.com) |
| [deploy](https://github.com/syncrobrain/deploy) | Private | Docker Compose dev stack |

## LuminaryWorks ecosystem

SyncroBrain is the **connect** layer in the [LuminaryWorks](https://github.com/LuminaryWorks/LuminaryWorks) family:

```text
设备 ──MQTT──► SyncroBrain ──► DataLuminary · BlockyEdu · DoerFlow · VistaRemote
```

## Quick links

- 🌐 [syncrobrain.com](https://syncrobrain.com)
- 📖 [Documentation](https://github.com/syncrobrain/docs)
- 🚀 [Getting started](https://github.com/syncrobrain/platform/blob/main/ONBOARDING.md)
- 📧 [1@zhoulujun.cn](mailto:1@zhoulujun.cn)

<p align="center">
  <sub>Connect every device. Give it a brain.</sub>
</p>
