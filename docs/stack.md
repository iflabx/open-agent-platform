# 技术选型

## 选型方法

智能体系统的技术栈不应追求“全都上”，而应围绕四个问题做裁剪：

- 业务复杂度是否需要多 Agent 协作和长链路状态管理。
- 数据规模是否已经超出单库向量检索的舒适区。
- 企业合规要求是否需要完整的权限、审计和私有化部署。
- 团队工程能力是否足以支撑自建平台的持续运维。

## 推荐技术栈

| 层级 | 备选开源软件 | 推荐组合 | 适用判断 |
| --- | --- | --- | --- |
| 模型服务 | vLLM、Ollama、TGI | 生产优先 `vLLM`，开发和边缘节点可补充 `Ollama` | 有 GPU 资源且追求吞吐时优先 vLLM |
| Agent 编排 | LangGraph、Dify、CrewAI | 核心流程优先 `LangGraph`，业务试点可结合 `Dify` | 需要状态机、回放和人工介入时优先 LangGraph |
| API 服务 | FastAPI、NestJS、Go Fiber | `FastAPI` | Python 生态接入模型与 RAG 成本最低 |
| 工作流集成 | n8n、Temporal、Airflow | `n8n` 处理事件集成，复杂异步流程可引入 `Temporal` | 跨 SaaS 连接器多时 n8n 很高效 |
| 检索增强 | LlamaIndex、LangChain | `LlamaIndex` 负责索引与检索编排 | 文档型知识库落地速度快 |
| 向量检索 | pgvector、Milvus、OpenSearch | 中小规模优先 `pgvector`，大规模检索选 `Milvus` | 先简单，量上来再拆库 |
| 身份认证 | Keycloak、Authentik、Ory | `Keycloak` | 企业 SSO、角色权限和协议兼容性更成熟 |
| 网关 | APISIX、Kong、Traefik | `APISIX` | 动态路由、插件能力和云原生配合较好 |
| 压测与验证 | k6、Locust、JMeter | `k6` | 更适合 API 与关键链路脚本化压测 |
| 可观测性 | OpenTelemetry、Prometheus、Grafana、Loki、Tempo | 全链路采用 `OpenTelemetry + Grafana` 体系 | 兼顾指标、日志和追踪 |
| 策略治理 | OPA、Casbin、Presidio | `OPA + Casbin`，敏感信息处理可补充 `Presidio` | 权限和合规规则需要集中管理 |

## 推荐的参考组合

### 方案 A：快速 PoC

- `Ollama + Dify + pgvector + PostgreSQL`
- 适合 2 至 6 周内完成可演示版本
- 优点是集成速度快、门槛低
- 缺点是长期治理能力有限，复杂流程会很快碰到上限

### 方案 B：生产化中台

- `vLLM + FastAPI + LangGraph + LlamaIndex + PostgreSQL/Redis + Keycloak + APISIX + OpenTelemetry + k6`
- 适合多业务线复用、需要审计和可观测的企业场景
- 平衡了灵活性、治理能力和二次开发空间

### 方案 C：大规模检索与异步任务

- 在方案 B 基础上增加 `Milvus + Kafka/Redpanda + Temporal`
- 适合文档量大、任务链长、异步依赖多的场景

## 关键取舍

### Dify 还是 LangGraph

如果目标是快速验证价值、给业务部门先看结果，Dify 能明显降低起步成本；如果目标是建设长期可维护平台，尤其需要复杂状态机、人工审批、错误恢复和精细化链路观测，LangGraph 更适合作为核心编排引擎。

### pgvector 还是 Milvus

如果数据量仍处于中小规模，且团队希望减少系统复杂度，先上 `pgvector` 更实际；当检索规模、召回性能和隔离要求明显增加时，再引入 `Milvus` 拆分检索层。

### 单体平台还是模块化微服务

平台早期不建议为了“架构高级感”过早拆成过多微服务。更合理的方式是先按模块边界设计，再根据瓶颈把模型服务、知识服务和治理服务独立扩容。
