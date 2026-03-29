# 技术选型

> 角色：当前公开方案的技术栈收敛页
>
> 说明：本文只讨论当前正式组件清单内的技术组合与取舍，不新增候选池，不把“未来也许会用到”的组件提前写进当前方案。

## 选型原则

当前方案的技术选型遵循四条原则：

1. 先保证长期边界清晰，再追求局部功能齐全。
2. 能复用企业现有能力的，不重复建设。
3. 一类职责优先只保留一套主方案，避免长期并行。
4. 只有在现有组件边界明显不足时，才讨论演进，而不是预先堆更多组件。

## 当前推荐技术栈

| 能力域 | 当前主选 | 条件引入 / 演进 | 取舍判断 |
| --- | --- | --- | --- |
| 模型推理 | `vLLM` + `Qwen` 模型族 | 按业务负载扩充模型池 | 生产环境优先统一推理与模型版本治理 |
| 模型网关 | `LiteLLM` | 无额外正式替代项 | 所有模型请求统一经过同一网关 |
| 主平台路线 | `Dify`、`RAGFlow`、`Coze Studio` 三选一 | 不长期并行 | 标准场景需要一个统一主底座 |
| 门户与超级智能体前台 | `AgentifUI` | 需要成品化超级智能体产品时条件引入 `OpenClaw` | 默认统一门户仍以 `AgentifUI` 为主，`OpenClaw` 更适合作为旗舰智能体产品 |
| 复杂 Agent 运行时 | `LangGraph` | 复杂流程或长链路场景启用 | 只有需要状态机、人工介入、回放时才进入默认路径 |
| 通用工程编排 | `LangChain` | 与 `LangGraph` 组合使用 | 负责工程适配，不单独充当平台底座 |
| 长期记忆 Agent | `Letta` | 仅在长期记忆场景启用 | 不是所有场景的默认组件 |
| 知识工程 | `LlamaIndex` | 无 | 统一负责检索编排、切片和引用构建 |
| 数据治理 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` | 无 | 把原始数据治理成 AI 可消费资产 |
| 向量检索 | `Weaviate` | 数据规模和隔离要求显著上升时演进到 `Milvus` | 默认先用单一向量底座 |
| 全文 / 混合检索 | `Elasticsearch` | 只在确有全文检索需求时启用 | 不作为默认长期三套并行的一部分 |
| 入口与权限 | `APISIX` + 企业现有 `SSO / IAM` + `Casbin` | 无 | 入口认证、流量治理和细粒度授权分层负责 |
| AI 原生协议接入 | `agentgateway` | 在需要统一 `MCP / A2A / southbound` 协议治理时启用 | 不替代 `APISIX`，不替代 `LiteLLM` |
| 观测与评测 | `LangFuse` + `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki` | 无 | 平台级和 AI 级观测都要有 |
| 发布验证 | `k6` | 无 | 所有关键链路发布前都要有容量基线 |
| 基础设施 | `K3s` + `PostgreSQL` + `Redis` + `MinIO` | 规模扩大后独立扩容 | 先收敛基础底座，再按瓶颈扩展 |

## 当前推荐组合

### 组合 A：首个试点

适合 4 到 8 周内完成知识问答或服务台试点：

- `APISIX`
- 一条主平台路线：`Dify`、`RAGFlow` 或 `Coze Studio`
- `LlamaIndex`
- `LiteLLM + vLLM + Qwen`
- `PostgreSQL + Redis + MinIO + Weaviate`
- `LangFuse`

### 组合 B：生产化中台

适合多业务线复用、需要更强治理和复杂流程的团队：

- `APISIX + 企业现有 SSO / IAM + Casbin`
- `agentgateway`
- 一条主平台路线
- `LangGraph + LangChain`
- `LlamaIndex`
- `LiteLLM + vLLM + Qwen`
- `OpenMetadata + SeaTunnel + dbt Core + Apache Tika`
- `OpenTelemetry + Prometheus + Grafana + Loki + LangFuse`
- `k6`

## 关键取舍

### 1. `Dify`、`RAGFlow`、`Coze Studio` 怎么选

- 如果首要目标是快速验证通用场景，优先选更容易落地和被团队掌握的一条路线。
- 如果场景以知识密集型问答为主，`RAGFlow` 的知识主链路会更贴近需求。
- 如果更偏向通用工作流、应用配置和运营同学可参与配置，`Dify` 或 `Coze Studio` 更适合作为主平台路线。
- 无论选哪一条，都只保留一条主底座，不长期并行。

### 2. 主平台路线和 `LangGraph` 的关系

- 主平台路线负责标准场景、应用配置和知识平面。
- `LangGraph` 负责复杂状态机、人工介入、长链路恢复和多步骤动作链路。
- 两者是分层协作关系，不是二选一替代关系。

### 3. `Weaviate`、`Milvus`、`Elasticsearch` 的关系

- 默认向量底座是 `Weaviate`。
- 当向量规模、隔离要求或性能要求明显提升时，再评估演进到 `Milvus`。
- `Elasticsearch` 用于全文或混合检索兼容，不作为默认长期并行底座。

### 4. `LangFuse` 和平台观测体系的关系

- `LangFuse` 负责 LLM Trace、Prompt、评测样本和回放。
- `OpenTelemetry + Prometheus + Grafana + Loki` 负责平台级指标、日志和追踪。
- 两者都需要，不能互相替代。

### 5. `APISIX`、企业 `SSO / IAM`、`Casbin` 的关系

- 企业现有 `SSO / IAM` 负责身份源和账号生命周期。
- `APISIX` 负责入口级认证接入、流量治理和审计前置。
- `Casbin` 负责应用内细粒度授权裁决。

### 6. `APISIX`、`agentgateway`、`LiteLLM` 的关系

- `APISIX` 负责公网或半公网北向入口。
- `agentgateway` 负责内部 `MCP / A2A / southbound` 协议接入与治理。
- `LiteLLM` 负责默认模型入口、模型路由和配额治理。
- 三者协同，但不应彼此替代。

## 不建议的做法

- 同时长期维护多条主平台路线。
- 默认同时维护三套检索底座。
- 让 `APISIX` 兼任模型网关。
- 把 `LangFuse` 当成整个平台观测体系的全部。
- 为单个试点场景提前引入生产期才需要的复杂扩展。

## 相关文档

- [方案](/framework)
- [总体架构](/architecture)
- [组件](/components)
- [安全与治理](/governance)
- [部署与发布](/deployment)

## 参考资料

- [LiteLLM Docs](https://docs.litellm.ai/)
- [agentgateway Introduction](https://agentgateway.dev/docs/standalone/latest/about/introduction/)
- [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph)
- [LlamaIndex Docs](https://docs.llamaindex.ai/)
- [Apache APISIX Architecture](https://apisix.apache.org/docs/apisix/3.14/architecture-design/apisix/)
- [Casbin Docs](https://www.casbin.org/docs)
- [Grafana k6 Overview](https://grafana.com/oss/k6/)
