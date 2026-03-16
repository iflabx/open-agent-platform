# 组件

> 状态：公开展示的组件清单
>
> 说明：组件页、协议页、标准页、规范页采用稳定路径复用；本页只展示当前方案纳入的组件与协议。
>
> 准入原则：组件与协议页记录的是可落到方案某一层的实施项，不等于能力规范页。进入正式清单前，应满足免费可用、许可证清晰、法律风险可控，并适合企业私有化使用；边界项应结合 [开源状态与许可证说明](/open-source-status) 单独判断。

## 主方案文档

- 方案文档：[方案](/framework)
- 开源状态文档：[开源状态与许可证说明](/open-source-status)
- 总索引文档：[文档索引](/doc-index)

## 模型与推理

- [vLLM](/components/vllm)
- [LiteLLM](/components/litellm)
- [Qwen 模型族](/components/qwen-model-family)

## 主平台路线

以下三项属于互斥候选，当前实施时只选择一条主平台路线：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)

## 门户与 Agent 能力

- [AgentifUI](/components/agentifui)
- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [LlamaIndex](/components/llamaindex)
- [Letta](/components/letta)

## 协议与互操作

- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)

## 数据治理与 AI 数据底座

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

## 接入治理、评测与授权

- [APISIX](/components/apisix)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [Casbin](/components/casbin)

## 基础设施

以下三项不建议默认长期三套并行：`Weaviate` 为默认底座，`Milvus` 为大规模演进底座，`Elasticsearch` 为全文 / 混合检索兼容项。

- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [MinIO](/components/minio)
- [Weaviate](/components/weaviate)
- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)
- [K3s](/components/k3s)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

## 企业现有能力复用

以下能力在当前方案中按“复用企业现有体系”处理，不作为新增自建组件：

- `SSO / IAM`
- `KMS / 证书体系`
