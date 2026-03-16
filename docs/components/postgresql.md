# PostgreSQL

> 类型：关系数据库
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：基础设施层

## 当前定位

`PostgreSQL` 是当前方案的平台主数据库。

## 主要职责

- 配置与元数据存储
- 状态和运营数据存储
- 权限映射和后台数据存储

## 与其他组件关系

- 为门户层、编排层、数据治理层和治理层提供结构化状态与元数据存储。
- 与 [MinIO](/components/minio) 互补，分别承担结构化数据与对象文件承载。
- 与 [Redis](/components/redis) 互补，分别承担持久化主存储与短期缓存。
- 可与 [OpenMetadata](/components/openmetadata)、[dbt Core](/components/dbt-core) 等组件共同构成数据治理基础。

## 适合场景

- 平台配置和元数据持久化
- 会话之外的业务状态存储
- 后台运营与管理数据承载
- 需要可靠事务和关系模型的场景

## 边界

- 不承担对象文件存储
- 不承担高频缓存
- 不作为向量检索主引擎

## 采用规则

- 当前方案默认以 `PostgreSQL` 作为主关系型数据库。
- 平台中的结构化状态、元数据和配置优先统一收敛到主数据库，而不是由各组件自带多套分散数据库长期并行。
- `PostgreSQL` 负责关系型持久化，不替代检索底座、缓存或对象存储。

## 治理注意点

- 需要明确备份、恢复、高可用和扩容策略。
- 模式变更、索引调整和数据发布要纳入变更管理。
- 数据库账号、权限和连接方式应按最小权限管理。
- 业务状态、配置和审计辅助数据要区分表域和生命周期。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [部署与发布](/deployment)
- [Redis](/components/redis)
- [MinIO](/components/minio)

## 参考资料

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL License](https://www.postgresql.org/about/licence/)
