# 技术选型

::: info 核心摘要
本页聚焦正式组件清单内的技术组合、互斥边界与取舍逻辑，不引入额外候选池。核心原则是围绕清晰职责边界实现单轨收敛，按试点到生产化中台的演进节奏逐步补齐能力。
:::

## 选型原则

技术选型遵循四项约束原则：

1. **边界优先于功能堆砌**：优先保证长期架构边界清晰，再追求局部功能齐全。
2. **复用企业既有能力**：企业已有的身份、密钥与基础设施能力直接复用，不重复建设。
3. **同类职责单轨收敛**：同一类职责优先保留一套主方案，避免长期并行多套同类主底座。
4. **按需演进**：仅在现有组件边界明显不足时评估演进路径，避免预先叠加冗余组件。

## 推荐技术栈总览

| 能力域 | 主选组件 | 条件引入 / 演进 | 取舍判断 |
| --- | --- | --- | --- |
| 模型推理 | `vLLM` + `Qwen` 模型族 | 多步 Agent 与代码负载条件优选 [SGLang](/components/sglang)（`RadixAttention` 前缀 KV-Cache 复用） | `vLLM` 为通用高吞吐默认引擎；`SGLang` 按模型池分工条件启用，均统一经由 `LiteLLM` 纳管 |
| 模型网关 | `LiteLLM` | 无额外正式替代项 | 所有模型请求统一经由同一网关 |
| 主平台路线 | `Dify`、`RAGFlow` 二选一 | 不长期并行 | 通用多应用 / 低代码工作流交付选 `Dify`（对齐 `PostgreSQL + Weaviate + LangSet`）；深度文档解析 / 复杂 RAG 或严格纯 `Apache-2.0` 选 `RAGFlow` |
| 门户与应用前台 | `AgentifUI` + 门户 / BFF / API 层 | 无额外共享门户替代项 | 统一承接企业多应用入口与会话上下文；个人自治型超级智能体（如 `OpenClaw`）归属 [扩展升级](/extension-capabilities) 独立沙箱评估，不作为第 3 层共享门户 |
| 复杂 Agent 运行时 | `LangGraph` | 复杂流程或长链路场景启用 | 仅在需要状态机、人工介入、回放时进入默认路径 |
| 通用工程编排 | `LangChain` | 与 `LangGraph` 组合使用 | 负责工程适配，不单独充当平台底座 |
| 长期记忆 Agent | `Letta` | 仅在长期记忆场景启用 | 非所有场景的默认组件 |
| 知识工程 | `LlamaIndex` | 无 | 统一负责检索编排、切片和引用构建 |
| 数据治理 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Docling` | 老旧 / 偏门格式兼容与元数据预路由条件引入 `Apache Tika` | 将原始数据治理为 AI 可消费资产；`Docling` 承担默认非结构化文档解析 |
| 向量检索 | `Weaviate` | 数据规模和隔离要求显著上升时演进到 `Milvus` | 默认优先使用单一向量底座 |
| 全文 / 混合检索 | `Elasticsearch` | 仅在确有全文检索需求时启用 | 不作为默认长期三套并行的一部分 |
| 入口与权限 | `APISIX` + 企业现有 `SSO / IAM` + `Casbin` | 无 | 入口认证、流量治理和细粒度授权分层负责 |
| AI 原生协议接入 | `agentgateway` | 需要统一 `MCP` / `A2A` / 南向（Southbound）协议治理时启用 | 不替代 `APISIX`，不替代 `LiteLLM` |
| 观测与评测 | `LangFuse` + `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki` | 需要协同维护版本化评测数据集与离线回归评测时，条件引入 `LangSet` | 平台级与 AI 级观测均需具备；`LangSet` 专注评测数据集工程与离线回归，与 `LangFuse` 在线观测互补 |
| 发布验证 | `k6` | 无 | 所有关键链路发布前均需建立容量基线 |
| 基础设施 | `K3s` + `PostgreSQL` + `Redis` + `MinIO` | 第 4 层涉及不可信代码、脚本与工具执行时启用 [Agent 执行沙箱](/components/agent-sandbox)（`Kubernetes agent-sandbox` + 默认 `gVisor` / 裸金属 KVM 强隔离 `Kata Containers`）；规模扩大后独立扩容 | 先收敛基础底座，再按瓶颈扩展；执行沙箱强制落实独立节点池、默认拒绝出网白名单与凭据隔离（Secret Stripping） |

## 推荐组合

### 组合 A：首个试点

适合 4 到 8 周内完成知识问答或服务台试点：

- `APISIX`
- 一条主平台路线：`Dify` 或 `RAGFlow`
- `LlamaIndex`
- `LiteLLM` + `vLLM` + `Qwen`
- `PostgreSQL` + `Redis` + `MinIO` + `Weaviate`
- `LangFuse`

### 组合 B：生产化中台

适合多业务线复用、需要更强治理与复杂流程编排的团队：

- `APISIX` + 企业现有 `SSO / IAM` + `Casbin`
- `agentgateway`
- 一条主平台路线
- `LangGraph` + `LangChain`
- `LlamaIndex`
- `LiteLLM` + `vLLM`（多步 Agent 与代码负载条件优选 `SGLang`）+ `Qwen`
- `OpenMetadata` + `SeaTunnel` + `dbt Core` + `Docling`（`Apache Tika` 条件兼容）
- [Agent 执行沙箱](/components/agent-sandbox)（`Kubernetes agent-sandbox` + `gVisor` / `Kata Containers`，承接第 4 层不可信代码、脚本与工具执行）
- `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki` + `LangFuse`
- `k6`

## 关键取舍

### 1. `Dify` 与 `RAGFlow` 选型取舍

- 若场景以通用多应用交付、低代码工作流编排及业务运营人员协作配置为主，且希望与平台默认 `PostgreSQL + Weaviate + LangSet` 栈天然对齐，优先选择 `Dify`。
- 若场景以深度文档解析、复杂 RAG 检索编排为主，或企业法务对纯 `Apache-2.0` 开源许可证有严格合规要求，优先选择 `RAGFlow`。
- 无论选择哪一条路线，均只保留一条主底座，不长期并行。
- 补充说明：[Coze Studio](/components/coze-studio) 因异构中间件依赖栈（`MySQL + Milvus + Elasticsearch + NSQ`）较重且开源迭代节奏相对偏慢，不纳入默认主平台候选池。

### 2. 主平台路线与 `LangGraph` 的关系

- 主平台路线负责标准场景、应用配置和知识平面。
- `LangGraph` 负责复杂状态机、人工介入、长链路恢复和多步骤动作链路。
- 两者为分层协作关系，而非二选一替代关系。

### 3. `Weaviate`、`Milvus`、`Elasticsearch` 的关系

- 默认向量底座为 `Weaviate`。
- 当向量规模、隔离要求或性能要求显著提升时，再评估演进到 `Milvus`。
- `Elasticsearch` 用于全文或混合检索兼容，不作为默认长期并行底座。

### 4. `LangFuse`、`LangSet` 与平台观测体系的关系

- `LangFuse` 负责在线 LLM Trace、Prompt 观测、评分沉淀与样本回放。
- `LangSet`（条件引入）专注评测数据集工程、不可变版本血缘管理与离线回归评测触发，负责将业务语料与线上样本沉淀为可追溯的黄金测试集；其模型与评测调用统一经由 `LiteLLM` 接入，也可面向 `Dify` 等主平台工作流执行版本化离线回归验证，不替代 `LangFuse` 的在线可观测性，也不替代 `Dify` 的应用编排或 `LiteLLM` 的模型网关职责。
- `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki` 负责平台级指标、日志和追踪。
- 三者承担不同观测与验证维度，互补而不互相替代。

### 5. `APISIX`、企业 `SSO / IAM`、`Casbin` 的关系

- 企业现有 `SSO / IAM` 负责身份源和账号生命周期。
- `APISIX` 负责入口级认证接入、流量治理和审计前置。
- `Casbin` 负责应用内细粒度授权裁决。

### 6. `APISIX`、`agentgateway`、`LiteLLM` 的关系

- `APISIX` 负责公网或半公网北向入口。
- `agentgateway` 负责内部 `MCP` / `A2A` / 南向（Southbound）协议接入与治理。
- `LiteLLM` 负责默认模型入口、模型路由和配额治理。
- 三者分层协同，不应彼此替代。

### 7. `vLLM` 与 `SGLang` 的关系

- `vLLM` 保留为通用高吞吐默认推理引擎，承载标准问答、通用推理与批量服务。
- [SGLang](/components/sglang) 作为条件优选推理引擎，通过 `RadixAttention` 实现前缀 KV-Cache 复用，优先用于多步 Agent 推理、工具调用循环与代码生成负载。
- 两者按 GPU 模型池分工部署并统一挂接在 `LiteLLM` 之后，对上层应用保持透明。

### 8. `Docling` 与 `Apache Tika` 的关系

- `Docling` 作为第 5 层默认非结构化文档解析组件，负责 PDF、Office、HTML 等复杂版面与表格文档的高保真结构化解析。
- `Apache Tika` 保留为条件兼容项，用于老旧 / 偏门文件格式兼容抽取与轻量元数据预路由。

### 9. Agent 执行沙箱选型（`gVisor` 与 `Kata Containers`）

- 第 9 层通过 [Agent 执行沙箱](/components/agent-sandbox)（`Kubernetes agent-sandbox`）为第 4 层 Agent 编排层的不可信代码、脚本与工具执行提供强隔离环境。
- 默认采用 `gVisor` 承接常规隔离需求，兼顾冷启动速度与系统调用隔离；具备裸金属虚拟化条件且需要 KVM 级强隔离的场景启用 `Kata Containers`。
- 无论采用哪种运行时，均须强制落实三项安全红线：独立沙箱节点池、默认拒绝出网白名单与凭据隔离（Secret Stripping）。

## 应避免的选型做法

::: warning 选型红线
- **并行多套主底座**：同时长期维护多条主平台路线。
- **过度叠加检索组件**：默认同时维护三套检索底座。
- **入口网关越权兼任**：让 `APISIX` 兼任模型网关职责。
- **观测体系单轨化**：将 `LangFuse` 视为整个平台观测体系的全部。
- **试点期过度设计**：为单个试点场景提前引入生产期才需要的复杂扩展。
:::

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
