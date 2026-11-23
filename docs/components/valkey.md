# Valkey

> 类型：开源内存缓存与会话存储
>
> 采用定位：默认推荐（纯 `BSD-3-Clause` 开源缓存与会话底座，与 `Redis` 协议完全兼容并列）
>
> 所属层：基础设施层
>
> 官方网站：https://valkey.io/
>
> 开源仓库地址：https://github.com/valkey-io/valkey

## 当前定位

`Valkey` 是由 Linux Foundation 托管的纯开源高性能内存键值存储引擎，采用标准宽松的 `BSD-3-Clause` 许可证，并与 `Redis` 保持 100% 线上协议（RESP）与客户端生态兼容。在本方案中，`Valkey` 作为新建私有化纯开源环境的默认推荐缓存与会话底座，与企业既有 [Redis](/components/redis) 集群无缝兼容并列，承担平台运行时会话缓存、短期状态、限流计数与幂等控制。

::: tip 与 Redis 的兼容并列口径
- **新建纯开源环境优先采用 `Valkey`**：具备清晰的 `BSD-3-Clause` 许可证与 Linux Foundation 社区治理保障，规避复合许可证审查成本。
- **企业既有 `Redis` 集群直接复用**：因线上协议与客户端完全兼容，企业已建有成熟 [Redis](/components/redis) 集群时可直接对接复用，无需强制迁移。
:::

## 主要职责

- **会话与上下文缓存**：为门户 `BFF` 与应用层承载用户会话状态、热点配置与短期上下文缓存。
- **限流计数与流量保护**：为 [APISIX](/components/apisix) 等接入网关提供高性能分布式限流计数与并发配额状态存储。
- **幂等控制与分布式锁**：为编排任务、工具调用与异步回调提供短期幂等键与轻量协调能力。
- **平台运行时加速**：为 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 主平台及 [LangFuse](/components/langfuse) 等治理观测组件提供队列缓冲、热点缓存与短期任务状态存储。

## 与其他组件关系

- **与 [Redis](/components/redis) 协议完全兼容并列**：共享 RESP 协议与既有客户端驱动，平台组件无需修改业务代码即可在 `Valkey` 与 `Redis` 之间平滑切换或复用。
- **与 [PostgreSQL](/components/postgresql) 互补**：`Valkey` 承担高并发、低延迟的短期易失状态，`PostgreSQL` 承担业务元数据、编排检查点与长期持久化数据。
- **支撑 [APISIX](/components/apisix) 与门户 `BFF`**：承接北向网关限流计数、令牌黑名单及门户层会话缓存。
- **支撑 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 与 [LangFuse](/components/langfuse)**：作为上层编排平台与 LLM 观测平台的标准缓存与短期任务状态底座。
- **不替代持久化与消息总线**：不替代关系数据库、对象存储或企业级持久化消息队列。

## 适合场景

- 全私有化新建环境中需要标准宽松开源许可证（`BSD-3-Clause`）的缓存与会话底座
- `APISIX` 分布式限流计数、网关防重放与门户 `BFF` 会话缓存
- `Dify` / `RAGFlow`、`LangFuse` 等平台组件的高频缓存、幂等控制与短期任务状态存储
- 对低延迟读写敏感的运行时热点数据加速场景

## 边界

- **不作为长期主存储**：所有写入 `Valkey` 的数据均应视为可失效、可重建的短期数据，不得作为业务唯一真实来源。
- **不替代持久化消息总线**：不承担需要强顺序、长周期留存与复杂投递语义的企业级消息总线职责。
- **不承担复杂关系查询**：不替代 [PostgreSQL](/components/postgresql) 处理事务与复杂关联查询。

## 采用规则

- **新建环境默认推荐**：新建全私有化开源部署默认采用 `Valkey`（`BSD-3-Clause`）作为内存缓存与会话底座。
- **存量环境兼容复用**：若企业已有稳定运行的 [Redis](/components/redis) 集群且符合内部合规要求，可直接复用既有集群，不在同一环境重复建设两套缓存底座。
- **数据可重建原则**：上层组件写入缓存与会话的数据必须具备明确的过期时间与回源重建机制。

## 治理注意点

- **命名空间与 Key 规范**：按组件与业务域划分 Key 前缀或独立逻辑实例，避免 `APISIX`、`Dify` / `RAGFlow`、`LangFuse` 与门户 `BFF` 之间出现 Key 冲突或无边界共享。
- **TTL、容量与淘汰策略**：明确区分会话缓存、限流计数与临时任务状态的过期时间与内存淘汰策略（`maxmemory-policy`），防止内存溢出导致关键链路抖动。
- **高可用与访问安全**：生产环境应启用哨兵（Sentinel）或集群模式保障高可用，结合 ACL 账号、强密码、TLS 加密与内网访问白名单收敛暴露面。
- **监控与容量告警**：将内存使用率、命中率、慢查询、连接数与驱逐计数纳入 [Prometheus](/components/prometheus) 与 [Grafana](/components/grafana) 监控体系。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [数据与存储底座](/components/infrastructure-data-storage)
- [Redis](/components/redis)
- [PostgreSQL](/components/postgresql)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Valkey Official Website](https://valkey.io/)
- [Valkey GitHub Repository](https://github.com/valkey-io/valkey)
- [Valkey License (BSD-3-Clause)](https://github.com/valkey-io/valkey/blob/unstable/COPYING)
