# 文档索引

::: info 索引说明
本页汇总企业级智能体开源系统方案的全部文档入口，按核心入口、方案专题、九层架构组件、协议、标准与治理规范分类组织；各专题文档底部均附有对应的权威参考资料链接。
:::

## 核心入口

- [方案](/framework)
- [组件](/components)
- [开源状态与许可证说明](/open-source-status)

## 方案专题

- [方案综述](/guide/)
- [企业智能体能力与规范体系](/capability-framework)
- [协议与标准体系](/protocol-standards)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [总体架构](/architecture)
- [技术选型](/stack)
- [典型场景](/scenarios)
- [安全与治理](/governance)
- [部署与发布](/deployment)
- [实施路线图](/roadmap)
- [扩展升级](/extension-capabilities)

## 组件说明

### [1. 用户与渠道层](/layers/user-channel)

- [企业现有 Web / IM / 工单 / CRM / ERP 入口](/components/existing-enterprise-entrypoints)

### [2. 统一接入与流量治理层](/layers/access-traffic-governance)

- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)

### [3. 门户与应用层](/layers/portal-application)

- [AgentifUI](/components/agentifui)

### [4. Agent 编排层](/layers/agent-orchestration)

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)（条件生态连接器工具包）
- [Mem0](/components/mem0)（条件可插拔长期记忆层）

### [5. 数据治理层](/layers/data-governance-layer)

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Docling](/components/docling)
- [Apache Tika](/components/apache-tika)

### [6. 知识与检索层](/layers/knowledge-retrieval)

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)
- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)

### [7. 模型网关与推理层](/layers/model-gateway-inference)

- [vLLM](/components/vllm)
- [SGLang](/components/sglang)
- [LiteLLM](/components/litellm)
- [Qwen 模型族](/components/qwen-model-family)

### [8. 治理与观测层](/layers/governance-observability)

- [LangFuse](/components/langfuse)
- [LangSet](/components/langset)
- [k6](/components/k6)
- [Casbin](/components/casbin)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

### [9. 基础设施层](/layers/infrastructure-layer)

- [PostgreSQL](/components/postgresql)
- [Valkey](/components/valkey)
- [Redis](/components/redis)
- [SeaweedFS](/components/seaweedfs)
- [RustFS](/components/rustfs)
- [K3s](/components/k3s)
- [Kubernetes / RKE2](/components/rke2)
- [Agent 执行沙箱（Kubernetes agent-sandbox + gVisor / Kata Containers）](/components/agent-sandbox)

### 10. 跨层协议与标准

- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [OpenAPI](/protocols/openapi)
- [JSON Schema](/standards/json-schema)
- [OpenAI 兼容 API](/standards/openai-compatible-api)

### [可选扩展能力](/extension-capabilities)

- [OpenClaw](/components/openclaw)（个人自治型超级智能体，单人 / 高信任小组独立沙箱实例模式，不纳入主方案共享门户基线）

## 协议说明

- [协议页总览](/protocols/)
- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)
- [OpenAPI](/protocols/openapi)

## 标准说明

- [标准页总览](/standards/)
- [JSON Schema](/standards/json-schema)
- [OpenAI 兼容 API](/standards/openai-compatible-api)
- [OpenTelemetry](/standards/opentelemetry)

## 规范说明

- [规范页总览](/norms/)
- [RBAC + ABAC](/norms/rbac-abac)
- [Policy as Code](/norms/policy-as-code)
- [Maker-Checker](/norms/maker-checker)
