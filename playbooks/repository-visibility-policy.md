# SyncroBrain 仓库可见性策略

> 对齐 [BlockyEdu 可见性策略](https://github.com/BlockyEdu/VibeEdu/blob/master/playbooks/repository-visibility-policy.md)

## 原则

| 类型 | 可见性 | 原因 |
|------|--------|------|
| **docs**（RsPress 文档站） | **Public** | 降低硬件厂商接入门槛；SEO 与社区 |
| MetaRepo（platform：spec/plan/contracts） | **Private** | 工程治理、未发布路线图 |
| iot-gateway / iot-console-web | **Private** | 商业交付前核心代码 |
| website | **Private** | 品牌站点与部署密钥（Cloudflare） |
| deploy | **Private** | 含默认密钥模板与内网拓扑 |
| app-mobile（规划） | **Private** | 与涂鸦类竞品差异化 |

## 开源节奏

1. **先公开 docs + contracts（OpenAPI）**，代码保持私有直至 IoT-M3 稳定。
2. 核心编排层（iot-gateway）评估 Apache-2.0 发布时机见 `spec/licensing.md`（待补充）。
3. ThingsBoard CE / EMQX 遵循上游协议，不混授。

## 新人权限

- 公开 docs：任何人可阅读快速开始
- 私有仓：组织成员 + CI bot；外包仅授予对应子仓

## 拆解关联

见 [plan/repository-split.md](../plan/repository-split.md)。
