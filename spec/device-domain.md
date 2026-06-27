# IoT 设备域规格 (v0.1)

> **状态**：M1 scaffold  
> **API 合同**：`contracts/device.v1.yaml`

## 实体

### Device

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| tenantId | UUID | 租户 |
| externalUserId | string | Logto `sub`（注册人） |
| name | string | 显示名 |
| protocol | enum | `mqtt` \| `modbus` \| `http` |
| status | enum | `online` \| `offline` \| `disabled` |
| metadata | JSON | 标签、型号等 |
| createdAt | datetime | |
| updatedAt | datetime | |

## API（v0.1）

| 方法 | 路径 | 权限 | 说明 |
|------|------|------|------|
| GET | `/api/v1/health` | public | 健康检查 |
| GET | `/api/v1/devices` | `iot.device:view` | 列表 |
| POST | `/api/v1/devices` | `iot.device:manage` | 注册 |
| GET | `/api/v1/devices/:id` | `iot.device:view` | 详情 |

MQTT 接入（M2 dev：Mosquitto；**M3 生产目标：EMQX → ThingsBoard CE**）。

| Topic | Payload | 说明 |
|-------|---------|------|
| `iot/v1/{deviceId}/presence` | `{"status":"online"\|"offline"}` | 上下线（M2 ✅） |
| `iot/v1/{deviceId}/telemetry` | JSON | 遥测（M2 仅日志，M5 写入 ClickHouse） |

本地模拟：`npm run mqtt:presence -- <device-uuid> online`（在 `iot-gateway`）
