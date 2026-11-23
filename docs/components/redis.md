# Redis

> 类型：缓存与会话
>
> 采用定位：兼容并列（企业既有 Redis 集群复用或按需采用；新建纯开源环境优先推荐协议兼容的 Valkey）
>
> 所属层：基础设施层
>
> 官方网站：https://redis.io/docs/latest/
>
> 开源仓库地址：https://github.com/redis/redis

## 当前定位

`Redis` 作为平台运行时加速层的兼容并列底座，负责缓存、会话与短期状态。对于已建有成熟 `Redis` 集群或已完成内部合规审批的企业环境，可直接复用既有 `Redis` 基础设施；对于新建全私有化纯开源环境，方案优先推荐与 `Redis` 100% 线上协议兼容、采用 `BSD-3-Clause` 许可证的 [Valkey](/components/valkey)。

## 主要职责

- **会话与热点缓存**：承载门户 `BFF` 与应用层的会话缓存与热点配置缓存。
- **限流计数与幂等控制**：为 [APISIX](/components/apisix) 等接入网关及业务接口提供高频限流计数与幂等控制。
- **短期状态存储**：为 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 与 [LangFuse](/components/langfuse) 等上层组件提供短期任务状态与临时上下文存储。

## 与其他组件关系

- **与 [Valkey](/components/valkey) 100% 线上协议兼容并列**：两者共享 RESP 协议与客户端生态，企业可按既有设施与合规要求二选一，无需修改上层业务代码。
- **与 [PostgreSQL](/components/postgresql) 互补**：分别承担高并发短期易失状态与长期事务持久化。
- **服务接入、门户、编排与观测链路**：为网关限流、会话管理、任务状态和热点配置提供高频访问支撑，但不直接承载业务长期数据。
- **不替代持久化组件**：不替代消息总线、关系数据库或对象存储。

## 适合场景

- 企业已建有成熟运维体系的既有 `Redis` 集群直接复用
- 会话缓存、热点数据缓存、限流计数与幂等控制
- 短期任务状态或临时上下文存储
- 对响应速度敏感的运行时辅助场景

## 边界

- **不作为长期主存储**：所有写入数据应视为可失效、可重建的短期状态，不作为业务唯一真实来源。
- **不替代消息总线**：不承担需要强持久化与复杂投递保障的企业级消息总线职责。

## 采用规则

- **与 `Valkey` 兼容并列**：企业既有 `Redis` 集群可直接复用，或按内部标准继续采用；新建纯开源环境优先推荐协议完全兼容的 [Valkey](/components/valkey)（`BSD-3-Clause`）。
- **短期数据可重建原则**：所有写入 `Redis` 的数据均应具备明确 TTL 与回源重建机制，不作为唯一真实来源。
- **严格锁定版本与许可证口径**：`Redis` 采用复合许可证（`RSALv2 / SSPLv1 / AGPL-3.0`，不同大版本口径存在差异），实施时必须锁定具体大版本，并与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 治理注意点

- **Key 与容量策略统一约束**：Key 命名规范、TTL、容量上限与淘汰策略需统一治理。
- **命名空间隔离**：不同业务域与平台组件需避免无边界共享同一命名空间。
- **保留周期与清理策略**：缓存、限流和会话数据应明确过期与清理机制。
- **许可证与版本合规复核**：生产部署前须锁定具体大版本、分发来源与许可证条款，完成内部法务与内控确认。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [数据与存储底座](/components/infrastructure-data-storage)
- [Valkey](/components/valkey)
- [PostgreSQL](/components/postgresql)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Redis Documentation](https://redis.io/docs/latest/)
- [Redis GitHub Repository](https://github.com/redis/redis)
