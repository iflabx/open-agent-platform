# 9. 基础设施层

> 定位：为整个平台提供运行底座、持久化、缓存、对象存储和密钥证书支撑。
>
> 当前承载组件：`K3s`、`PostgreSQL`、`Redis`、`MinIO`、企业现有 `KMS / 证书体系`。

相关文档：

- [K3s](/components/k3s)
- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [MinIO](/components/minio)
- [部署与发布](/deployment)

## 一、本层定义

基础设施层是智能体平台的共享底座，负责计算资源、运行编排、状态持久化、缓存、对象存储和密钥证书体系。

它不是“可有可无的环境细节”，而是决定平台是否能稳定运行、是否能支撑扩容和是否能满足安全基线的基础层。

## 二、本层功能

- 提供容器运行和集群调度能力。
- 提供关系型数据存储、缓存和对象存储。
- 提供配置、密钥、证书和基础网络支撑。
- 为上层各层提供高可用、备份、恢复和容量扩展能力。

## 三、当前承载组件

- [K3s](/components/k3s)
- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [MinIO](/components/minio)
- 企业现有 `KMS / 证书体系`

## 四、上下游关系

基础设施层向以下层级提供支撑：

- [统一接入与流量治理层](/layers/access-traffic-governance)
- [门户与应用层](/layers/portal-application)
- [Agent 编排层](/layers/agent-orchestration)
- [数据治理层](/layers/data-governance-layer)
- [知识与检索层](/layers/knowledge-retrieval)
- [模型网关与推理层](/layers/model-gateway-inference)
- [治理与观测层](/layers/governance-observability)

本层本质上是全平台共享底座，而不是某个单独业务域的私有层。

## 五、边界

本层不负责：

- 不承载业务流程、应用目录和用户界面逻辑。
- 不替代上层做数据治理、知识检索和模型路由。
- 不直接充当权限策略引擎。
- 不把所有上层业务状态无约束地混放在同一存储中。

## 六、关键链路

### 1. 运行链路

1. 平台服务运行在 `K3s` 集群之上。
2. 各层服务按职责分配计算、网络和存储资源。
3. 发布、扩容和回滚依赖基础设施层完成。

### 2. 状态链路

1. 结构化状态和元数据进入 `PostgreSQL`。
2. 会话缓存、短期状态和队列辅助能力由 `Redis` 承接。
3. 文档、模型产物和附件等对象进入 `MinIO`。

### 3. 安全链路

1. 密钥、证书和加密材料由企业现有 `KMS / 证书体系` 管理。
2. 上层服务通过统一机制获取凭证和完成轮转。

## 七、治理要求

- 必须明确备份、恢复、容灾和容量规划要求。
- 密钥、证书和访问凭证不能散落在应用配置中长期明文保存。
- 存储、缓存和对象存储的用途边界要清晰，避免职责混用。
- 基础资源监控要和上层业务监控联动，而不是各自为政。

## 八、部署与发布要求

- 环境应至少区分开发、测试和生产，避免共享关键状态。
- 状态型服务应优先保证高可用、备份和恢复演练。
- GPU、通用计算和数据处理资源建议分池管理。
- 对象存储、数据库和缓存的容量要按数据治理、知识索引和观测保留策略统一规划。

## 九、风险与取舍

- 如果所有状态都挤在同一数据库或同一集群策略里，故障会跨层放大。
- 如果对象存储、缓存和数据库职责不清，运维和排障成本会持续升高。
- 如果密钥和证书体系没有统一口径，后续安全治理会非常被动。

## 十、关联文档

- [部署与发布](/deployment)
- [安全与治理](/governance)
- [技术选型](/stack)
- [组件](/components)

## 参考资料

- [K3s Documentation](https://docs.k3s.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/latest/)
- [MinIO Documentation](https://min.io/docs/minio/linux/index.html)
