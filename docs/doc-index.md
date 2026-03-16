# 文档索引

> 角色：当前站点总索引页
>
> 维护规则：主方案页始终对应当前公开方案；组件页、协议页、标准页、规范页保持稳定路径复用。

## 一、主入口

- [方案](/framework)
- [组件](/components)
- [开源状态与许可证说明](/open-source-status)

## 二、方案文档

- [方案综述](/guide/)
- [企业智能体能力与规范体系](/capability-framework)
- [协议与标准体系](/protocol-standards)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [总体架构](/architecture)
- [扩展能力与补齐方向](/extension-capabilities)
- [技术选型](/stack)
- [典型场景](/scenarios)
- [安全与治理](/governance)
- [部署与发布](/deployment)
- [实施路线图](/roadmap)

## 三、组件说明页

### [1. 用户与渠道层](/layers/user-channel)

- 企业现有 Web / IM / 工单 / 邮件 / CRM / ERP 入口

### [2. 统一接入与流量治理层](/layers/access-traffic-governance)

- [APISIX](/components/apisix)

### [3. 门户与应用层](/layers/portal-application)

- [AgentifUI](/components/agentifui)

### [4. Agent 编排层](/layers/agent-orchestration)

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)
- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [Letta](/components/letta)

### [5. 数据治理层](/layers/data-governance-layer)

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

### [6. 知识与检索层](/layers/knowledge-retrieval)

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)
- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)

### [7. 模型网关与推理层](/layers/model-gateway-inference)

- [vLLM](/components/vllm)
- [LiteLLM](/components/litellm)
- [Qwen 模型族](/components/qwen-model-family)

### [8. 治理与观测层](/layers/governance-observability)

- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [Casbin](/components/casbin)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

### [9. 基础设施层](/layers/infrastructure-layer)

- [PostgreSQL](/components/postgresql)
- [Redis](/components/redis)
- [MinIO](/components/minio)
- [K3s](/components/k3s)

### 10. 跨层协议与标准

- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [OpenAPI](/protocols/openapi)
- [JSON Schema](/standards/json-schema)
- [OpenAI 兼容 API](/standards/openai-compatible-api)

## 四、协议说明页

- [协议页总览](/protocols/)
- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)
- [OpenAPI](/protocols/openapi)

## 五、标准说明页

- [标准页总览](/standards/)
- [JSON Schema](/standards/json-schema)
- [OpenAI 兼容 API](/standards/openai-compatible-api)
- [OpenTelemetry](/standards/opentelemetry)

## 六、规范说明页

- [规范页总览](/norms/)
- [RBAC + ABAC](/norms/rbac-abac)
- [Policy as Code](/norms/policy-as-code)
- [Maker-Checker](/norms/maker-checker)

## 七、维护与协作

- [文档编写与维护指南](/documentation-maintenance)
- [第一批文档完善计划](/first-batch-documentation-plan)
- [第二批文档完善计划](/second-batch-documentation-plan)

## 八、维护规则

- 公开站点始终只展示当前方案与当前组件状态。
- 主方案入口固定为 [方案](/framework)，组件入口固定为 [组件](/components)。
- 组件页、协议页、标准页、规范页采用稳定路径复用。
- 页面标题、导航名称和正文说明保持无编号名称。
- 参考的权威资料链接统一放在对应文档底部的 `参考资料` 一节。
