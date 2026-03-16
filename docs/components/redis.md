# Redis

> 类型：缓存与会话
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：基础设施层
>
> 官方网站：https://redis.io/docs/latest/
>
> 开源仓库地址：https://github.com/redis/redis

## 当前定位

`Redis` 作为平台运行时加速层，负责缓存、会话与短期状态。

## 主要职责

- 会话缓存
- 热点配置缓存
- 限流计数
- 幂等控制
- 短期状态存储

## 与其他组件关系

- 与 [PostgreSQL](/components/postgresql) 互补，分别承担短期状态与长期持久化。
- 可为网关限流、会话管理、任务状态和热点配置提供高频访问支撑。
- 与门户层、编排层和治理层的运行时链路紧密相关，但不直接承载业务长期数据。
- 不替代消息总线、数据库或对象存储。

## 适合场景

- 会话缓存和热点数据缓存
- 限流计数和幂等控制
- 短期任务状态或临时上下文存储
- 对响应速度敏感的运行时辅助场景

## 边界

- 不作为长期主存储
- 不替代消息总线

## 采用规则

- 当前方案默认保留 `Redis` 作为缓存与短期状态组件。
- 所有写入 `Redis` 的数据都应被视为可失效、可重建的短期数据，不应用作唯一真实来源。
- 实施时必须锁定具体大版本，并与 [开源状态与许可证说明](/open-source-status) 的版本口径保持一致。

## 治理注意点

- Key 设计、TTL、容量和淘汰策略需要统一约束。
- 不同业务域要避免无边界共享同一命名空间。
- 缓存、限流和会话数据应明确保留周期和清理策略。
- 版本、分发方式和许可证口径需要在实施时再次确认。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [部署与发布](/deployment)
- [PostgreSQL](/components/postgresql)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Redis Documentation](https://redis.io/docs/latest/)
- [Redis GitHub Repository](https://github.com/redis/redis)
