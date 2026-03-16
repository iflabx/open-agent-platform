# 组件

> 状态：公开展示的当前组件清单
>
> 说明：本页按九层架构重新组织当前方案中的组件、协议和复用能力。这里的“层”是架构主归属层，不代表每一层都必须有多个开源组件。
>
> 准入原则：进入正式清单的对象必须能够落到方案某一层的明确职责上，并满足许可证清晰、法律风险可控、适合企业私有化使用。

## 一、使用这页前先明确三条规则

1. 本页的一级分类对应九层架构，不再只是松散分组。
2. 每个对象只放一个主归属层；如果它有跨层影响，会在说明里注明，而不重复铺到多层。
3. `MCP`、`A2A`、`OpenAPI`、`JSON Schema`、`OpenAI 兼容 API`、`OpenTelemetry` 这类对象本质上是跨层协议或标准，不强行塞进单一业务层。

## 二、九层对应总表

| 层级 | 主要承载对象 | 说明 |
| --- | --- | --- |
| 1. 用户与渠道层 | 企业现有 Web / IM / 工单 / 邮件 / CRM / ERP 入口 | 当前不单独纳入新的正式组件 |
| 2. 统一接入与流量治理层 | `APISIX`、`agentgateway`、企业现有 `SSO / IAM` | 统一入口、AI 原生协议接入、认证接入、流量治理 |
| 3. 门户与应用层 | `AgentifUI`、门户 / `BFF` / API 层 | 门户和应用入口，不承载底层智能逻辑 |
| 4. Agent 编排层 | `Dify`、`RAGFlow`、`Coze Studio`、`LangGraph`、`LangChain`、`Letta` | 主平台路线与复杂运行时 |
| 5. 数据治理层 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` | 数据采集、标准化、元数据与资产发布 |
| 6. 知识与检索层 | `LlamaIndex`、`Weaviate`、`Milvus`、`Elasticsearch` | 检索、重排、索引和知识引用 |
| 7. 模型网关与推理层 | `LiteLLM`、`vLLM`、`Qwen` 模型族 | 模型统一接入与推理执行 |
| 8. 治理与观测层 | `Casbin`、`LangFuse`、`k6`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki` | 授权、评测、观测、压测和发布门槛 |
| 9. 基础设施层 | `K3s`、`PostgreSQL`、`Redis`、`MinIO`、企业现有 `KMS / 证书体系` | 运行底座、持久化和对象存储 |

## 三、按九层组织的当前组件清单

## 1. 用户与渠道层

这一层当前主要复用企业现有入口系统，不单独新增正式组件。

典型入口包括：

- 企业 Web 门户
- 企业 IM
- 工单系统
- 邮件入口
- CRM / ERP / 业务系统入口
- Webhook / 外部系统入口

## 2. 统一接入与流量治理层

### 主组件

- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)

### 复用能力

- `SSO / IAM`

### 说明

- `APISIX` 是这一层的统一北向入口。
- `agentgateway` 是这一层的内部 AI 原生协议网关，负责 `MCP / A2A / southbound` 协议接入与治理。
- 企业现有 `SSO / IAM` 负责身份源和组织上下文。
- 这一层不替代模型网关，也不替代细粒度授权。

## 3. 门户与应用层

### 主组件

- [AgentifUI](/components/agentifui)

### 配套能力

- 门户 / `BFF` / API 层

### 说明

- 这一层负责工作台、应用入口、会话入口和用户交互。
- 门户层不应直接持有知识索引、模型路由或授权裁决逻辑。

## 4. Agent 编排层

### 主平台路线

以下三项属于互斥候选，当前实施时只选择一条主平台路线：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)

### 配套运行时

- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [Letta](/components/letta)

### 说明

- `Dify / RAGFlow / Coze Studio` 负责标准场景中的平台中枢能力。
- `LangGraph` 负责复杂流程、状态机、人工介入和长链路恢复。
- `LangChain` 负责工程适配和通用编排辅助。
- `Letta` 是长期记忆场景的条件组件，不是所有场景默认启用。

## 5. 数据治理层

### 主组件

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

### 配套底座

- [MinIO](/components/minio)
- [PostgreSQL](/components/postgresql)

### 说明

- 这一层负责把原始数据治理成 AI 可消费资产。
- `MinIO` 和 `PostgreSQL` 在主归属上属于基础设施层，但在数据治理场景里承担关键配套作用。

## 6. 知识与检索层

### 主组件

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)

### 条件组件

- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)

### 说明

- `LlamaIndex` 负责知识工程、索引编排、检索和引用构建。
- `Weaviate` 是当前默认向量检索底座。
- `Milvus` 是大规模阶段的条件演进项。
- `Elasticsearch` 是全文 / 混合检索兼容项，不作为默认长期并行底座。

## 7. 模型网关与推理层

### 主组件

- [LiteLLM](/components/litellm)
- [vLLM](/components/vllm)
- [Qwen 模型族](/components/qwen-model-family)

### 说明

- `LiteLLM` 负责统一模型入口、路由和配额治理。
- `vLLM` 负责推理执行。
- `Qwen` 模型族承担当前主模型、代码模型、Embedding、Reranker 和安全模型能力。

## 8. 治理与观测层

### 主组件

- [Casbin](/components/casbin)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

### 说明

- `Casbin` 负责细粒度授权裁决。
- `LangFuse` 负责 LLM 观测、评测样本和回放。
- `k6` 负责发布前容量和性能基线。
- `OpenTelemetry + Prometheus + Grafana + Loki` 负责平台级观测和追踪语义。

## 9. 基础设施层

### 主组件

- [K3s](/components/k3s)
- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [MinIO](/components/minio)

### 复用能力

- `KMS / 证书体系`

### 说明

- `K3s` 提供容器运行底座。
- `PostgreSQL`、`Redis`、`MinIO` 提供持久化、缓存、会话和对象存储能力。
- 企业现有 `KMS / 证书体系` 作为复用能力，不作为新增组件。

## 四、跨层协议与标准

以下对象对整个方案重要，但不建议硬塞进单一业务层：

- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [OpenAPI](/protocols/openapi)
- [JSON Schema](/standards/json-schema)
- [OpenAI 兼容 API](/standards/openai-compatible-api)
- [OpenTelemetry](/standards/opentelemetry)

## 五、条件引入与互斥规则

| 组件组 | 当前规则 | 说明 |
| --- | --- | --- |
| `Dify` / `RAGFlow` / `Coze Studio` | 三选一 | 主平台路线不应长期并行 |
| `Weaviate` / `Milvus` | 默认 `Weaviate`，大规模时再评估 `Milvus` | 不默认长期双底座并行 |
| `Elasticsearch` | 条件引入 | 主要承担全文 / 混合检索兼容需求 |
| `Letta` | 条件引入 | 仅在长期记忆 Agent 场景需要时使用 |
| `LangGraph` | 复杂流程默认启用 | 标准场景可先以主平台路线为主 |

## 六、使用本页的方式

- 想看当前架构每一层由什么承载，先读本页。
- 想看某个组件在方案中的职责和边界，进入对应详情页。
- 想看组件组合怎么落到方案里，读 [方案](/framework) 和 [技术选型](/stack)。
- 想看许可边界和法律风险，读 [开源状态与许可证说明](/open-source-status)。
