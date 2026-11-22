# 9. 基础设施层

> 定位：为整个平台提供运行底座、持久化、缓存、对象存储、Agent 强隔离执行沙箱与密钥证书支撑。
>
> 当前承载组件：`K3s`、`PostgreSQL`、`Redis`、`SeaweedFS`（默认自建 `S3` 兼容对象存储，`Apache-2.0`；轻量即插替代可选 `RustFS`，`Apache-2.0`；优先复用企业既有 `S3` 兼容对象存储）、Agent 执行沙箱（`Kubernetes agent-sandbox` + `gVisor` 默认 / `Kata Containers` 裸金属 KVM 强隔离）、企业现有 `KMS` / 证书体系。

相关文档：

- [K3s](/components/k3s)
- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [SeaweedFS](/components/seaweedfs)
- [Agent 执行沙箱](/components/agent-sandbox)
- [部署与发布](/deployment)

## 本层定义

基础设施层是智能体平台的共享底座，负责计算资源、容器编排、状态持久化、缓存、对象存储、Agent 强隔离执行沙箱与密钥证书体系。

本层并非外围环境细节，而是决定平台能否长期稳定运行、弹性扩容以及满足企业安全基线的核心根基。

## 本层功能

- **容器与集群调度**：提供轻量级容器运行与集群编排调度能力。
- **多模态数据底座**：提供关系型数据持久化、内存缓存与对象存储能力。
- **Agent 强隔离执行沙箱**：为 AI 生成代码、不可信脚本与高敏工具提供瞬时隔离运行、出向网络管控与凭据剥离能力。
- **基础安全与网络支撑**：提供配置管理、密钥与证书管理及基础网络隔离能力。
- **高可用与容灾保障**：为上层各层级提供高可用部署、数据备份、恢复与容量扩展支撑。

## 当前承载组件

- [K3s](/components/k3s)
- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [SeaweedFS](/components/seaweedfs)（默认自建 `S3` 兼容对象存储，`Apache-2.0`；轻量即插替代可选 `RustFS`，`Apache-2.0`；有企业既有 `S3` 兼容对象存储时优先复用）
- [Agent 执行沙箱](/components/agent-sandbox)（`Kubernetes agent-sandbox` + `gVisor` 默认 / `Kata Containers` 裸金属 KVM 强隔离）
- 企业现有 `KMS` / 证书体系

## 上下游关系

基础设施层向以下所有上层架构提供统一支撑：

- [统一接入与流量治理层](/layers/access-traffic-governance)
- [门户与应用层](/layers/portal-application)
- [Agent 编排层](/layers/agent-orchestration)
- [数据治理层](/layers/data-governance-layer)
- [知识与检索层](/layers/knowledge-retrieval)
- [模型网关与推理层](/layers/model-gateway-inference)
- [治理与观测层](/layers/governance-observability)

本层定位为全平台共享底座，而非单一业务域的私有基础设施。

## 边界

本层不承担以下职责：

- **业务应用逻辑**：不承载业务流程、应用目录与用户界面逻辑。
- **上层 AI 能力替代**：不替代上层执行数据治理、知识检索与模型路由。
- **策略引擎替代**：不直接充当细粒度权限策略引擎。
- **无约束状态混放**：不允许将所有上层业务状态无隔离地混布在同一存储实例中。

## 关键链路

### 1. 运行链路

1. 平台各层服务统一运行在 `K3s` 集群之上。
2. 按层级职责分配独立的计算、网络与存储资源配额。
3. 版本发布、弹性扩容与故障回滚依托基础设施层执行。

### 2. 状态链路

1. 结构化业务状态与元数据持久化至 `PostgreSQL`。
2. 会话缓存、短期状态与队列辅助能力由 `Redis` 承接。
3. 原始文档、模型产物与附件等非结构化对象存储至 `SeaweedFS`（或轻量即插替代 `RustFS`；已有企业级 `S3` 兼容对象存储时优先复用）。

### 3. 安全链路

1. 密钥、证书与加密材料由企业现有 `KMS` / 证书体系统一托管。
2. 上层服务通过标准机制动态获取凭证并定期完成轮转。

### 4. Agent 隔离执行链路

1. 编排层或工具链路触发 AI 生成代码、不可信脚本或高敏文件处理任务时，经由 `Kubernetes agent-sandbox` 在专属沙箱节点池拉起瞬时隔离实例（默认 `gVisor`，裸金属 KVM 高安全场景采用 `Kata Containers`）。
2. 沙箱实例在只读根文件系统、受限工作区、默认拒绝出向白名单与凭据剥离（Secret Stripping）约束下执行任务。
3. 任务完成后即刻销毁回收沙箱实例，仅将受控结果与执行审计记录回传上层。

## 治理要求

- **容灾与容量基线**：明确备份周期、RPO / RTO 恢复目标、容灾方案与容量规划基线。
- **凭据防明文泄露**：密钥、证书与访问凭证严禁散落在应用配置中长期明文保存。
- **存储职责清晰**：明确关系型数据库、缓存与对象存储的适用边界，避免职责混用。
- **监控上下游联动**：基础资源监控须与上层业务及 LLM 监控联动，避免彼此割裂。

::: warning Agent 沙箱安全红线
启用 [Agent 执行沙箱](/components/agent-sandbox) 时必须同时落实以下三项硬性约束：
1. **专属沙箱节点池**：沙箱工作负载通过污点（Taint）与标签强制调度至独立节点池，严禁与控制面、数据库或核心业务服务混布。
2. **默认拒绝出向白名单**：沙箱网络策略默认拒绝全部出向访问（Default-Deny Egress），仅按显式白名单放行受控目标地址，阻断内网横向渗透与元数据探测。
3. **凭据剥离（Secret Stripping）**：严禁将系统级密钥、云凭证、数据库密码或长期 Token 注入沙箱环境变量或挂载卷，受控外部调用须经外置代理网关代签。
:::

## 部署与发布要求

- **多环境强隔离**：至少区分 `dev`、`staging` 与 `prod` 环境，严禁跨环境共享关键状态。
- **有状态服务优先保障**：优先确保数据库、缓存与对象存储的高可用架构、定期备份与恢复演练。
- **异构资源分池调度**：GPU 算力、通用计算、离线数据处理与 Agent 执行沙箱节点池应按池隔离调度。
- **容量统筹规划**：对象存储、数据库与缓存容量须结合数据治理规模、知识索引体量与观测保留周期统一测算。

## 风险与取舍

- **单点混布放大故障**：若所有业务状态集中混布在同一数据库实例或单一集群策略中，局部故障将跨层扩散。
- **存储职责不清推高运维成本**：若对象存储、缓存与数据库用途边界模糊，日常运维与故障排查成本将持续攀升。
- **密钥口径分散埋下安全隐患**：若密钥与证书体系缺乏统一托管口径，后续合规审计与安全整改将极为被动。

## 关联文档

- [部署与发布](/deployment)
- [安全与治理](/governance)
- [技术选型](/stack)
- [组件](/components)

## 参考资料

- [K3s Documentation](https://docs.k3s.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/latest/)
- [SeaweedFS Documentation](https://github.com/seaweedfs/seaweedfs/wiki)
- [RustFS](https://rustfs.com/)
- [Kubernetes Agent Sandbox](https://github.com/kubernetes-sigs/agent-sandbox)
- [gVisor Documentation](https://gvisor.dev/docs/)
- [Kata Containers](https://katacontainers.io/)
