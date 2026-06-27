# SyncroBrain 仓库拆解计划

> **目标**：对齐 VibeCode / VistaRemote MetaRepo — **公开 docs**，**私有** MetaRepo + 各业务子仓。  
> **状态**：5 个子仓已独立推送 GitHub；MetaRepo 仅保留 spec / plan / tooling

## 5 个独立仓库

| 仓库 | 本地路径 | 可见性 |
|------|----------|--------|
| `platform`（MetaRepo，现 `LuminaryIoTChain`） | `.` | Private |
| `iot-gateway` | `iot-gateway/` | Private |
| `iot-console-web` | `iot-console-web/` | Private |
| `website` | `website/` | Private |
| `docs` | `docs/` | **Public** |
| `deploy` | `deploy/` | Private |

清单 SSOT：[`.meta/manifest.json`](../.meta/manifest.json)

## 原则

- **不使用** git submodule、git subtree
- 子仓各自独立 Git；`./init.sh` 平级 clone
- IDE 用 **`syncrobrain.code-workspace`** 多根查看

## 新人流程

```bash
git clone git@github.com:syncrobrain/LuminaryIoTChain.git syncrobrain
cd syncrobrain
./dev.sh
./dev-mvp.sh
```

## MetaRepo 目录

```text
syncrobrain/platform/
├── .meta/
├── syncrobrain.code-workspace
├── spec/ plan/ contracts/ playbooks/
├── init.sh  dev.sh
├── iot-gateway/          # init clone
├── iot-console-web/
├── website/
├── docs/
└── deploy/
```

## 单独开发某一子仓

```bash
git clone git@github.com:syncrobrain/iot-gateway.git
cd iot-gateway
pnpm install && pnpm dev
```

## 验收

- [x] 5 个子仓已在 GitHub 独立存在
- [x] 路径扁平化（无 `services/` 前缀）
- [x] MetaRepo 不含业务源码提交
- [x] `./dev.sh` 一键 clone + install + docker
