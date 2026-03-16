# 总体架构

> 角色：当前公开方案的正式架构页
>
> 说明：本文采用与 [方案](/framework) 一致的九层架构作为公开主口径。此前“六层”只适合作为抽象归并，不再作为公开表达。

如需单独查看“企业 AI 数据底座”设计，可参考 [数据治理层（企业 AI 数据底座）](/data-governance)。

<div class="architecture-image">
  <img src="/architecture-overview.svg" alt="企业级智能体系统总体架构图" />
</div>

## 架构定位

企业级智能体平台不是单个聊天应用，而是一套同时覆盖接入、编排、知识、模型、治理和运维的长期运行系统。公开方案当前采用九层架构，目的有三点：

- 把“谁负责入口、谁负责编排、谁负责知识、谁负责治理”拆清楚。
- 保证主平台路线、Agent Runtime、模型网关和治理体系可以分别演进。
- 让试点、部门推广和生产部署沿同一条架构主线扩展，而不是每个场景重搭一遍。

## 九层结构

| 层级 | 核心职责 | 当前方案落位 | 边界说明 |
| --- | --- | --- | --- |
| 1. 用户与渠道层 | 承接员工、运营、业务系统和外部渠道请求 | Web 门户、管理后台、企业 IM、工单系统、邮件、Webhook | 不直接承载模型调用和权限裁决 |
| 2. 统一接入与流量治理层 | 统一入口、认证接入、路由、限流、灰度、审计前置，以及 AI 原生协议 southbound 接入治理 | `APISIX` + `agentgateway` + 企业现有 `SSO / IAM` | 不替代模型网关，不替代细粒度授权 |
| 3. 门户与应用层 | 负责工作台、BFF、会话上下文和应用入口 | `AgentifUI` + 门户 / BFF / API 层 | 不持有底层检索索引和策略引擎逻辑 |
| 4. Agent 编排层 | 管理任务状态、工作流、工具调用、人工介入和多 Agent 协作 | `Dify`、`RAGFlow` 或 `Coze Studio` 三选一；复杂流程由 `LangGraph` 承接；通用工程编排采用 `LangChain`；长期记忆场景按需使用 `Letta` | 不绕过治理直接访问原始数据源 |
| 5. 数据治理层 | 采集、清洗、标准化、标签治理、元数据和数据产品发布 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` | 不直接承担终端交互 |
| 6. 知识与检索层 | 建索引、检索、重排、引用和权限感知上下文构建 | `LlamaIndex` + `Weaviate`；大规模检索演进到 `Milvus`；全文 / 混合检索兼容 `Elasticsearch` | 不替代数据治理，也不直接承担业务流程控制 |
| 7. 模型网关与推理层 | 统一模型接入、路由、配额、回退和推理执行 | `LiteLLM` + `vLLM` + `Qwen` 模型族 | 不承载业务应用状态和页面逻辑 |
| 8. 治理与观测层 | 负责权限裁决、审计、追踪、评测、压测和发布门槛 | `Casbin`、`LangFuse`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki`、`k6` | 不直接变成业务入口，不直接承载原始数据存储 |
| 9. 基础设施层 | 提供运行底座、持久化、对象存储、网络与密钥体系 | `K3s`、`PostgreSQL`、`Redis`、`MinIO`、企业 `KMS / 证书体系` | 不混入上层业务决策逻辑 |

## 当前组件组合主链

为保证这套架构不是抽象图，而是可落地方案，当前公开组合可以收敛成两条主链：

### 1. 标准场景主链

`APISIX -> AgentifUI / 门户-BFF -> Dify / RAGFlow / Coze Studio -> LlamaIndex -> Weaviate -> LiteLLM -> vLLM -> Qwen`

适用：

- 内部知识助手
- 服务台分诊中的标准问答链路
- 标准知识型业务应用

### 2. 复杂流程主链

`APISIX -> AgentifUI / 门户-BFF -> LangGraph -> agentgateway -> MCP / A2A -> 工具服务或远程 Agent -> LiteLLM -> vLLM -> Qwen`

配套治理链：

`Casbin + LangFuse + OpenTelemetry + Prometheus + Grafana + Loki + k6`

适用：

- 长链路流程自动化
- 带人工确认的动作型任务
- 需要回放、补偿和多步骤状态控制的场景

## 协议在架构中的位置

`MCP` 和 `A2A` 是跨层接口约定，不单独视为一个业务层：

- `MCP` 负责 agent-to-tool / context 的标准化接入。
- `A2A` 负责 agent-to-agent 的协作关系。
- 在协议丰富的内部链路中，可由 `agentgateway` 承接 `MCP / A2A` 的统一 southbound 接入与治理。
- 协议的职责是降低互操作成本，不替代编排层、知识层或治理层本身。

## 三条关键视图

### 1. 业务执行面

业务执行面覆盖从请求进入到结果返回的运行主链路：

`渠道 -> APISIX -> 门户/BFF -> 主平台路线或 Agent Runtime -> 按需进入 agentgateway -> 检索/工具/模型 -> 结果返回`

它强调的是请求处理效率、上下文拼装、工具执行和结果交付。

### 2. 数据与知识面

数据与知识面覆盖从原始系统到 AI 可消费资产的治理链路：

`业务系统 / 文档源 -> SeaTunnel / Apache Tika -> OpenMetadata / dbt Core -> LlamaIndex -> 向量 / 搜索底座`

它强调的是数据质量、权限标签、索引发布和引用可追溯。

### 3. 治理与控制面

治理与控制面贯穿所有层，不是事后外挂：

- 认证接入与流量治理在 `APISIX`
- 细粒度授权在 `Casbin`
- LLM Trace、Prompt、评测在 `LangFuse`
- 平台级遥测在 `OpenTelemetry + Prometheus + Grafana + Loki`
- 发布前性能与容量基线在 `k6`

## 核心业务链路

### 1. 对话与知识问答链路

1. 用户从门户、企业 IM 或业务系统发起提问。
2. `APISIX` 完成入口认证接入、限流、路由和审计前置。
3. 门户 / BFF 初始化会话并把用户、角色、租户、场景信息传给编排层。
4. 主平台路线或 `LangGraph` 判断当前是纯问答、带检索问答还是工具型任务。
5. `LlamaIndex` 调用知识与检索层，按权限标签执行召回、过滤、重排和引用构建。
6. 编排层把受控上下文与任务指令发送到 `LiteLLM`。
7. `LiteLLM` 把请求路由到 `vLLM` 上的目标 `Qwen` 模型。
8. 结果返回前由治理层做留痕、评测记录和必要的输出审查。
9. 最终结果回到门户，同时沉淀链路追踪、审计和质量数据。

### 2. 工具动作与流程执行链路

1. 用户发起一个带动作意图的请求，例如工单分派、知识发布或流程校验。
2. 编排层把任务拆成状态化步骤，并识别是否涉及高风险动作。
3. `Casbin` 根据角色、租户、数据标签和工具权限做动作级裁决。
4. 高风险步骤进入人工确认或 `Maker-Checker` 节点。
5. 通过校验后，编排层再调用工具服务或外部业务系统。
6. 执行结果和异常信息写回观测与审计体系，以支持回放和复盘。

### 3. 数据入库与知识发布链路

1. 结构化和非结构化数据从源系统进入数据治理链路。
2. `SeaTunnel` 负责采集同步，`Apache Tika` 负责解析文档内容。
3. `dbt Core` 与 `OpenMetadata` 负责标准化、元数据、血缘和数据资产管理。
4. 治理后的数据资产再交给 `LlamaIndex` 构建切片、索引和检索配置。
5. 向量索引和检索配置发布到 `Weaviate` 或演进底座。
6. 发布后的知识资产才能被编排层和业务应用使用。

## 推荐模块边界

| 模块 | 必须负责 | 不应负责 |
| --- | --- | --- |
| `APISIX` | 北向入口、认证接入、路由、限流、灰度、审计前置 | 不承担模型路由，不承担细粒度授权裁决 |
| `agentgateway` | 内部 `MCP / A2A / LLM` 协议接入、southbound 路由与治理 | 不替代 `APISIX` 作为公网入口，不承接业务应用模型 |
| 门户 / BFF | 用户会话、前端体验、应用入口、接口聚合 | 不直接持有检索索引和策略规则 |
| 主平台路线 | 标准场景工作流、知识平面、应用配置 | 三条路线长期只保留一条主底座 |
| `LangGraph` | 复杂状态机、人工介入、长链路恢复 | 不替代门户层，不直接承接 IAM |
| 数据治理服务 | 数据采集、标准化、元数据、数据产品发布 | 不直接承担用户会话和页面逻辑 |
| 知识与检索服务 | 切片、索引、召回、重排、引用输出 | 不绕过权限过滤直接向模型供数 |
| `LiteLLM` | 模型统一接入、路由、回退、配额治理 | 不承接业务状态和应用编排 |
| `Casbin` | 细粒度授权裁决 | 不承担入口认证接入 |
| `LangFuse` 与平台观测体系 | AI 级和平台级双层观测、评测、回放 | 不直接替代运维控制面或业务入口 |

## 架构演进边界

### 单团队试点

- 允许把门户、主平台路线、检索服务部署得更紧凑。
- 但入口、知识、模型、治理四类职责仍要在文档和代码里分开。

### 部门级推广

- 入口层、应用层、检索层、观测层开始独立伸缩。
- 高风险动作、评测门槛和发布回滚必须进入标准流程。

### 企业级生产

- 模型层、检索层、治理层、有状态底座分别独立扩容。
- 部署环境和数据权限边界必须按租户、部门、系统等级收敛。

## 反模式

- 同一企业长期并行建设多套主平台底座。
- 让 `APISIX` 同时承担入口治理和模型网关职责。
- 把公网入口治理和内部 AI 协议治理混成同一套网关职责。
- 让 Agent 直接绕过数据治理层访问原始业务库。
- 把所有权限控制都放在前端或单个业务应用里。
- 把 LLM Trace 工具误当成整个平台可观测体系的全部。

## 相关文档

- [方案](/framework)
- [技术选型](/stack)
- [安全与治理](/governance)
- [部署与发布](/deployment)
- [企业智能体能力与规范体系](/capability-framework)
- [协议与标准体系](/protocol-standards)

## 参考资料

- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
- [K3s Architecture](https://docs.k3s.io/architecture)
- [agentgateway Introduction](https://agentgateway.dev/docs/standalone/latest/about/introduction/)
- [Model Context Protocol Specification 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18)
- [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
