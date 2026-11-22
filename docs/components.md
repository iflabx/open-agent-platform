# 组件

::: info 核心摘要
本页按 9 层架构梳理方案中的正式组件、跨层协议与企业复用能力。层级代表对象的主归属层，并非每一层均需引入多个开源组件。进入正式清单的对象均对应明确的架构层职责，并满足许可证清晰、法律风险可控与企业私有化适配要求。
:::

## 分类与归属规则

1. **按九层架构归类**：一级分类严格对应 9 层架构，确保组件职责与架构分层一一对应。
2. **单一主归属层**：每个对象仅归入一个主归属层；若存在跨层影响，在对应说明中注明，不在多层重复罗列。
3. **跨层协议独立归类**：`MCP`、`A2A`、`OpenAPI`、`JSON Schema`、`OpenAI 兼容 API`、`OpenTelemetry` 等本质上属于跨层协议或标准，不强制归入单一业务层。

## 九层架构对应总表

| 层级 | 主要承载对象 | 说明 |
| --- | --- | --- |
| 1. 用户与渠道层 | [企业现有 Web / IM / 工单 / CRM / ERP 入口](/components/existing-enterprise-entrypoints) | 通过企业现有入口复用能力说明页承载，统一覆盖 Web、IM、工单、邮件、CRM / ERP 和 Webhook 等入口 |
| 2. 统一接入与流量治理层 | `APISIX`、`agentgateway`、企业现有 `SSO / IAM` | 统一入口、AI 原生协议接入、认证接入、流量治理 |
| 3. 门户与应用层 | `AgentifUI`、门户 / `BFF` / API 层 | 承接企业多用户统一 AI 工作台、应用目录、会话入口与 BFF / API 聚合边界 |
| 4. Agent 编排层 | `Dify`、`RAGFlow`、`LangGraph`、`LangChain`（条件生态连接器）、`Mem0`（条件长期记忆） | 主平台路线（二选一）、复杂运行时与条件扩展 |
| 5. 数据治理层 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Docling`、`Apache Tika` | 数据采集、标准化、非结构化解析、元数据与资产发布 |
| 6. 知识与检索层 | `LlamaIndex`、`Weaviate`、`Milvus`、`Elasticsearch` | 检索、重排、索引和知识引用 |
| 7. 模型网关与推理层 | `LiteLLM`、`vLLM`、`SGLang`、`Qwen` 模型族 | 模型统一接入与推理执行 |
| 8. 治理与观测层 | `Casbin`、`LangFuse`、`LangSet`、`k6`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki` | 授权、评测与数据集工程、观测、压测和发布门槛 |
| 9. 基础设施层 | `K3s`、`Kubernetes agent-sandbox`（`gVisor` / `Kata Containers`）、`PostgreSQL`、`Redis`、`SeaweedFS`（轻量替代 `RustFS`；优先复用企业现有 S3 对象存储）、企业现有 `KMS / 证书体系` | 运行底座、Agent 执行沙箱、持久化和对象存储 |

## 1. 用户与渠道层

本层主要复用企业现有入口系统，通过独立的复用能力说明页承载，不新增独立入口组件。

典型入口包括：

- [企业现有 Web / IM / 工单 / CRM / ERP 入口](/components/existing-enterprise-entrypoints)

该说明页统一覆盖企业 Web 门户、企业 IM、工单系统、邮件入口、CRM / ERP / 业务系统入口以及 Webhook / 外部系统入口。

## 2. 统一接入与流量治理层

### 主组件

- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)

### 复用能力

- `SSO / IAM`

### 说明

- `APISIX` 是本层的统一北向入口。
- `agentgateway` 是本层的内部 AI 原生协议网关，负责 `MCP` / `A2A` / 南向（Southbound）协议接入与治理。
- 企业现有 `SSO / IAM` 负责身份源和组织上下文。
- 本层不替代模型网关，也不替代细粒度授权。

## 3. 门户与应用层

### 主组件

- [AgentifUI](/components/agentifui)

### 配套能力

- 门户 / `BFF` / API 层

### 说明

- 本层以 `AgentifUI` 与门户 / `BFF` / API 层承接企业多用户共享工作台、应用入口、会话入口和用户交互。
- 门户层不应直接持有知识索引、模型路由或授权裁决逻辑。
- 个人自治型超级智能体（如 [OpenClaw](/components/openclaw)）不纳入本层共享门户基线，归入“可选扩展能力”按单人或高信任小组独立沙箱实例模式按需引入。

## 4. Agent 编排层

### 主平台路线

以下两项属于互斥候选，实施时只选择一条主平台路线：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)

### 核心生产级运行时

- [LangGraph](/components/langgraph)

### 条件组件

- [LangChain](/components/langchain)
- [Mem0](/components/mem0)

### 说明

- `Dify` / `RAGFlow` 负责标准场景中的平台中枢能力（通用多应用 / 低代码工作流交付选 `Dify`，对齐 `PostgreSQL + Weaviate + LangSet`；深度文档解析 / 复杂 RAG 或严格纯 `Apache-2.0` 选 `RAGFlow`）；[Coze Studio](/components/coze-studio) 因异构中间件依赖栈（`MySQL + Milvus + Elasticsearch + NSQ`）较重且开源迭代节奏相对偏慢，不纳入默认主平台候选池。
- `LangGraph` 是复杂流程的核心生产级 Agent Runtime，负责有状态工作流、人工介入、基于 `PostgreSQL` Checkpointer 的检查点持久化与长链路恢复；简单模型调用优先使用原生 SDK。
- `LangChain` 定位为 `LangGraph` 生态下的条件工具包与连接器适配层，按需引入，不作为核心业务编排支柱。
- `Mem0` 是 `Apache-2.0` 可插拔长期记忆层的条件组件，与 `LangGraph` + `PostgreSQL` Checkpointer 互补，仅在跨会话长期记忆场景按需启用。

## 5. 数据治理层

### 主组件

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Docling](/components/docling)

### 条件组件

- [Apache Tika](/components/apache-tika)

### 配套底座

- [SeaweedFS](/components/seaweedfs)
- [PostgreSQL](/components/postgresql)

### 说明

- 本层负责将原始数据治理为 AI 可消费资产。
- `Docling` 是默认非结构化文档解析组件，承担 PDF、Office、HTML 等复杂版面与表格文档的高保真结构化解析；`Apache Tika` 保留为条件兼容项，用于老旧 / 偏门文件格式兼容抽取与轻量元数据预路由。
- `SeaweedFS`（优先复用企业现有 S3 兼容对象存储，轻量替代 `RustFS`）和 `PostgreSQL` 在主归属上属于基础设施层，但在数据治理场景中承担关键配套作用。

## 6. 知识与检索层

### 主组件

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)

### 条件组件

- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)

### 说明

- `LlamaIndex` 负责知识工程、索引编排、检索和引用构建。
- `Weaviate` 是默认向量检索底座。
- `Milvus` 是大规模阶段的条件演进项。
- `Elasticsearch` 是全文 / 混合检索兼容项，不作为默认长期并行底座。

## 7. 模型网关与推理层

### 主组件

- [LiteLLM](/components/litellm)
- [vLLM](/components/vllm)
- [Qwen 模型族](/components/qwen-model-family)

### 条件组件

- [SGLang](/components/sglang)

### 说明

- `LiteLLM` 负责统一模型入口、路由和配额治理。
- `vLLM` 为通用高吞吐默认推理引擎。
- `SGLang` 为条件优选推理引擎，基于 `RadixAttention` 实现前缀 KV-Cache 复用，优先用于多步 Agent 推理与代码负载，与 `vLLM` 统一挂接在 `LiteLLM` 之后。
- `Qwen` 模型族承担主模型、代码模型、Embedding、Reranker 和安全模型能力。

## 8. 治理与观测层

### 主组件

- [Casbin](/components/casbin)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

### 条件组件

- [LangSet](/components/langset)

### 说明

- `Casbin` 负责细粒度授权裁决。
- `LangFuse` 负责 LLM 观测、评测样本和回放。
- `LangSet` 是条件引入的评测数据集工程与离线回归评测工作台，与 `LangFuse` 互补协作。
- `k6` 负责发布前容量和性能基线验证。
- `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki` 负责平台级观测和追踪语义。

## 9. 基础设施层

### 主组件

- [K3s](/components/k3s)
- [Agent 执行沙箱（Kubernetes agent-sandbox + gVisor / Kata Containers）](/components/agent-sandbox)
- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [SeaweedFS](/components/seaweedfs)

### 复用能力

- `KMS / 证书体系`
- 企业现有 S3 兼容对象存储（优先复用）

### 说明

- `K3s` 提供容器运行底座。
- [Agent 执行沙箱](/components/agent-sandbox) 基于 `Kubernetes agent-sandbox` + `gVisor`（默认）/ `Kata Containers`（裸金属 KVM 强隔离），为第 4 层不可信代码、脚本与工具执行提供强隔离环境，并强制落实独立沙箱节点池、默认拒绝出网白名单与凭据隔离（Secret Stripping）。
- `PostgreSQL`、`Redis`、`SeaweedFS`（默认自建 S3 兼容对象存储，`Apache-2.0`，轻量替代 `RustFS`）提供持久化、缓存、会话和对象存储能力；若企业已有 S3 兼容对象存储则优先直接复用。
- 企业现有 `KMS / 证书体系` 作为复用能力，不作为新增组件。

## 跨层协议与标准

以下协议与标准贯穿多层协作，不强制归入单一业务层：

- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [OpenAPI](/protocols/openapi)
- [JSON Schema](/standards/json-schema)
- [OpenAI 兼容 API](/standards/openai-compatible-api)
- [OpenTelemetry](/standards/opentelemetry)

## 可选扩展能力

以下对象不纳入主方案九层共享底座基线，在满足隔离与治理前提时按需独立引入，详见 [扩展升级](/extension-capabilities)：

- [OpenClaw](/components/openclaw)：个人自治型超级智能体，按单人或高信任小组独立沙箱实例模式按需引入，不替代企业多用户共享门户基线。

## 条件引入与互斥规则

| 组件组 | 采用规则 | 说明 |
| --- | --- | --- |
| `Dify` / `RAGFlow` | 二选一 | 主平台路线不应长期并行；通用多应用 / 低代码工作流交付选 `Dify`（对齐 `PostgreSQL + Weaviate + LangSet`），深度文档解析 / 复杂 RAG 或严格纯 `Apache-2.0` 选 `RAGFlow` |
| `Docling` / `Apache Tika` | 默认 `Docling`，条件兼容 `Apache Tika` | `Docling` 承担默认非结构化文档解析；`Apache Tika` 保留用于老旧 / 偏门格式兼容抽取与轻量元数据预路由 |
| `vLLM` / `SGLang` | 默认 `vLLM`，条件优选 `SGLang` | `vLLM` 承担通用高吞吐默认推理；`SGLang` 通过 `RadixAttention` 前缀 KV-Cache 复用优选用于多步 Agent 与代码负载 |
| `gVisor` / `Kata Containers` | 默认 `gVisor`，裸金属强隔离启用 `Kata Containers` | 配合 `Kubernetes agent-sandbox` 构成第 9 层 Agent 执行沙箱，服务第 4 层不可信代码、脚本与工具执行 |
| `Weaviate` / `Milvus` | 默认 `Weaviate`，大规模时再评估 `Milvus` | 不默认长期双底座并行 |
| `Elasticsearch` | 条件引入 | 主要承担全文 / 混合检索兼容需求 |
| `SeaweedFS` / `RustFS` | 优先复用企业 S3，自建默认 `SeaweedFS`，轻量替代 `RustFS` | 两者均为 `Apache-2.0` S3 兼容对象存储；企业已有 S3 设施时优先直接复用 |
| `LangChain` | 条件引入 | 作为 `LangGraph` 生态下的可选工具包与连接器适配层按需引入；简单调用优先原生 SDK |
| `Mem0` | 条件引入 | `Apache-2.0` 可插拔长期记忆层，与 `LangGraph` + `PostgreSQL` Checkpointer 互补，仅在跨会话长期记忆场景启用 |
| `LangSet` | 条件引入 | 负责团队协作评测数据集工程与离线回归评测，与 `LangFuse` 互补 |
| `LangGraph` | 复杂流程默认启用 | 复杂流程核心生产级 Agent Runtime；标准场景可先以主平台路线为主 |
| `OpenClaw` | 可选扩展能力 | 不纳入主方案共享门户基线，按单人 / 高信任小组独立沙箱实例模式按需引入 |

## 阅读导航

- **按层查阅组件归属**：直接通过本页总表与各层清单定位组件主归属。
- **深入单组件边界**：进入对应组件详情页查看职责划分与限制条件。
- **了解组合与落地方式**：参阅 [方案](/framework) 和 [技术选型](/stack)。
- **核对许可证与合规风险**：参阅 [开源状态与许可证说明](/open-source-status)。
