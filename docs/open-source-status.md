# 开源状态与许可证说明

::: info 校验口径与免责说明
- **适用范围**：正式组件清单与跨层协议对象
- **校验日期**：2026-03-16
- **校验依据**：以官方仓库、官方许可证文件、官方模型页和官方协议仓库公开信息为准
- **口径说明**：本页记录正式清单对象的开源属性、许可证类型与实施注意事项。文中“当前可接受”仅代表方案工程评估口径，**不构成法律意见**；进入采购、法务与内控审查前，请基于实施时锁定的具体版本再次核对官方来源。

相关入口：[方案](/framework) · [组件](/components) · [文档索引](/doc-index)
:::

## 整体结论

- **开源方案定位成立**：整体架构仍可定义为“企业级智能体开源系统方案”。
- **许可证并非完全同质**：正式清单中并非所有对象均采用“单一、宽松、标准开源许可证”。
- **需单独审查的重点对象**：
  - **`Open core`**：`LiteLLM`、`LangFuse`
  - **自定义许可证**：`Dify`
  - **强 copyleft**：`MinIO`、`Grafana`、`Loki`、`k6`
  - **需锁版本**：`Redis`
  - **多重 / 混合许可证边界**：`Elasticsearch`
- **企业复用能力边界**：企业既有 `SSO / IAM`、`KMS / 证书体系` 默认直接复用，不在本页开源许可证审计范围内。

## 正式清单开源状态总表

| 对象 | 开源判定 | 许可证 / 模式 | 实施备注 |
| --- | --- | --- | --- |
| `vLLM` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `LiteLLM` | Open core | 核心为 `MIT`，仓库中企业目录另有单独许可证 | 当前可接受，但不能按“全仓库纯 MIT”理解 |
| `Qwen` 模型族 | 开放权重 / 模型卡开源口径 | 当前方案中采用的模型卡标注为 `Apache-2.0` | 落地前仍需固定实际模型 ID |
| `Dify` | 自定义许可证 | `Dify Open Source License` | 带额外限制，不应等同标准 `Apache-2.0` |
| `RAGFlow` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Coze Studio` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `AgentifUI` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `OpenClaw` | 标准开源 | `MIT` | 可选扩展能力，按独立沙箱实例模式按需引入，不纳入主方案共享门户基线 |
| `APISIX` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `agentgateway` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `LangGraph` | 标准开源 | `MIT` | 可直接纳入 |
| `LangChain` | 标准开源 | `MIT` | 可直接纳入 |
| `LlamaIndex` | 标准开源 | `MIT` | 可直接纳入 |
| `Letta` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `MCP` | 开放协议 | 协议仓库当前公开维护 | 更适合按开放协议规范理解 |
| `A2A` | 开放协议 | `Apache-2.0` | 可直接纳入 |
| `OpenMetadata` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `SeaTunnel` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `dbt Core` | 标准开源 | `Apache-2.0` | 仅指 `dbt Core` 本身 |
| `Apache Tika` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `LangFuse` | Open core | 核心为 `MIT`，企业目录另有许可证 | 当前可接受，但需区分社区核心与企业扩展 |
| `LangSet` | 标准开源 | `Apache-2.0` | 治理与观测层条件引入组件，负责评测数据集工程与离线回归评测 |
| `k6` | 强 copyleft | `AGPL-3.0` | 可作为压测工具纳入，但需明确 AGPL 影响 |
| `Casbin` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `PostgreSQL` | 标准开源 | `PostgreSQL License` | 可直接纳入 |
| `Redis` | 需锁版本 | 新版本许可证口径变化较大 | 实施时必须固定大版本 |
| `MinIO` | 强 copyleft / 源码可得口径 | `AGPL-3.0`，官方仓库当前强调社区版为 source-only distribution | 当前可接受，但需明确许可证和交付边界 |
| `Weaviate` | 标准开源 | `BSD-3-Clause` | 可直接纳入 |
| `Milvus` | 标准开源 | `Apache-2.0` | 可作为条件演进项纳入 |
| `Elasticsearch` | 多重 / 混合许可证边界 | `AGPL-3.0 / SSPLv1 / Elastic License 2.0` | 作为兼容项时需单独做许可证确认 |
| `K3s` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `OpenTelemetry` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Prometheus` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Grafana` | 强 copyleft | 仓库主许可证为 `AGPL-3.0` | 当前可接受，但需明确 AGPL 影响 |
| `Loki` | 强 copyleft | 仓库主许可证为 `AGPL-3.0` | 当前可接受，但需明确 AGPL 影响 |

## 按领域分组说明

### 1. 模型与推理

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `vLLM` | [官方仓库](https://github.com/vllm-project/vllm) | 标准开源，`Apache-2.0` |
| `LiteLLM` | [LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE) | 核心代码为 `MIT`，企业目录另有许可证，按 `Open core` 理解 |
| `Qwen` 模型族 | [Qwen 官方模型页](https://huggingface.co/Qwen) | 当前方案采用的模型卡标注为 `Apache-2.0`，实施时应锁定具体模型 ID |

### 2. 主平台与门户

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `Dify` | [官方仓库](https://github.com/langgenius/dify) | 自定义许可证，不应简单视为标准 `Apache-2.0` |
| `RAGFlow` | [官方仓库](https://github.com/infiniflow/ragflow) | 标准开源，`Apache-2.0` |
| `Coze Studio` | [官方仓库](https://github.com/coze-dev/coze-studio) | 标准开源，`Apache-2.0` |
| `AgentifUI` | [官方仓库](https://github.com/iflabx/agentifui) | 标准开源，`Apache-2.0` |
| `OpenClaw` | [官方仓库](https://github.com/openclaw/openclaw) | 标准开源，`MIT`，可选扩展能力，按独立沙箱实例模式按需引入，不纳入主方案共享门户基线 |

### 3. Agent 框架与知识工程

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `LangChain` | [官方仓库](https://github.com/langchain-ai/langchain) | 标准开源，`MIT` |
| `LangGraph` | [官方仓库](https://github.com/langchain-ai/langgraph) | 标准开源，`MIT` |
| `LlamaIndex` | [官方仓库](https://github.com/run-llama/llama_index) | 标准开源，`MIT` |
| `Letta` | [官方仓库](https://github.com/letta-ai/letta) | 标准开源，`Apache-2.0` |

### 4. 协议与互操作

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `MCP` | [官方协议站](https://modelcontextprotocol.io/specification/) | 开放协议规范，应按协议口径理解 |
| `A2A` | [官方仓库](https://github.com/a2aproject/A2A) | 开放协议，`Apache-2.0` |

### 5. 数据治理与 AI 数据底座

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `OpenMetadata` | [官方仓库](https://github.com/open-metadata/OpenMetadata) | 标准开源，`Apache-2.0` |
| `SeaTunnel` | [官方仓库](https://github.com/apache/seatunnel) | 标准开源，`Apache-2.0` |
| `dbt Core` | [官方仓库](https://github.com/dbt-labs/dbt-core) | 标准开源，`Apache-2.0`，仅指 `dbt Core` |
| `Apache Tika` | [官方仓库](https://github.com/apache/tika) | 标准开源，`Apache-2.0` |

### 6. 接入治理、评测与授权

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `APISIX` | [官方仓库](https://github.com/apache/apisix) | 标准开源，`Apache-2.0` |
| `agentgateway` | [官方仓库](https://github.com/agentgateway/agentgateway) | 标准开源，`Apache-2.0` |
| `LangFuse` | [官方仓库](https://github.com/langfuse/langfuse) | 核心为 `MIT`，企业目录另有许可证，按 `Open core` 理解 |
| `LangSet` | [官方仓库](https://github.com/iflabx/langset) | 标准开源，`Apache-2.0`，治理与观测层条件引入组件，负责评测数据集工程与离线回归评测 |
| `k6` | [官方仓库](https://github.com/grafana/k6) | `AGPL-3.0` |
| `Casbin` | [官方仓库](https://github.com/apache/casbin) | 标准开源，`Apache-2.0` |

### 7. 基础设施与可观测性

| 对象 | 公开来源 | 开源判定 |
| --- | --- | --- |
| `PostgreSQL` | [官方许可证页](https://www.postgresql.org/about/licence/) | `PostgreSQL License`，可直接纳入 |
| `Redis` | [官方仓库](https://github.com/redis/redis) | 近年许可证口径调整明显，实施时必须锁定大版本 |
| `MinIO` | [官方仓库](https://github.com/minio/minio) | `AGPL-3.0`，并需注意社区版当前交付口径 |
| `Weaviate` | [官方仓库](https://github.com/weaviate/weaviate) | `BSD-3-Clause` |
| `Milvus` | [官方仓库](https://github.com/milvus-io/milvus) | `Apache-2.0` |
| `Elasticsearch` | [官方仓库](https://github.com/elastic/elasticsearch) | 多重 / 混合许可证边界，需单独确认 |
| `K3s` | [官方仓库](https://github.com/k3s-io/k3s) | `Apache-2.0` |
| `OpenTelemetry` | [官方仓库](https://github.com/open-telemetry/opentelemetry-collector) | `Apache-2.0` |
| `Prometheus` | [官方仓库](https://github.com/prometheus/prometheus) | `Apache-2.0` |
| `Grafana` | [官方仓库](https://github.com/grafana/grafana) | 主仓库 `AGPL-3.0` |
| `Loki` | [官方仓库](https://github.com/grafana/loki) | 主仓库 `AGPL-3.0` |

## 重点关注项与合规边界

### 1. `Dify` 不是标准宽松许可证项目

- 非纯 `Apache-2.0`，官方 `Dify Open Source License` 包含额外限制条款。
- 若企业内控仅接受标准宽松开源口径，应在立项前单独完成法务确认。

### 2. `LiteLLM` 与 `LangFuse` 均按 `Open core` 理解

- 社区核心代码采用 `MIT` 开源，但仓库中同时存在企业目录及独立企业许可证。
- 方案与合规文档中不得将整个仓库表述为“纯单一 MIT 项目”。

### 3. `Redis` 必须锁定大版本

- 不得仅标注“Redis”而不明确版本口径。
- 实施时应在方案和部署文档中固定生产使用的具体大版本，并核对对应版本的许可证条款。

### 4. `MinIO`、`Grafana`、`Loki`、`k6` 均采用强 copyleft 许可证

- 四者主许可证均为 `AGPL-3.0`（且 `MinIO` 官方仓库当前强调社区版为 source-only distribution）。
- 方案工程层面当前可接受，但在采购、法务与内控评审阶段须明确 `AGPL-3.0` 及交付方式的影响边界。

### 5. `Elasticsearch` 需单独确认兼容项口径

- 涉及 `AGPL-3.0 / SSPLv1 / Elastic License 2.0` 多重 / 混合许可证边界，不应视为传统单一宽松开源组件。
- 方案将其定位为全文 / 混合检索兼容项，而非默认检索底座；条件启用前需单独完成许可证确认。

## 审校与使用建议

- **确认整体开源口径**：先阅读“整体结论”一节。
- **排查单组件合规风险**：对照“正式清单开源状态总表”与“按领域分组说明”。
- **执行采购、法务与内控审查**：务必基于实施时锁定的具体版本号，对照“参考资料”中的官方来源再次复核。

## 参考资料

- [Dify 官方仓库](https://github.com/langgenius/dify)
- [OpenClaw 官方仓库](https://github.com/openclaw/openclaw)
- [agentgateway 官方仓库](https://github.com/agentgateway/agentgateway)
- [LiteLLM LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE)
- [Langfuse 官方仓库](https://github.com/langfuse/langfuse)
- [LangSet 官方仓库](https://github.com/iflabx/langset)
- [Redis 官方仓库](https://github.com/redis/redis)
- [MinIO 官方仓库](https://github.com/minio/minio)
- [Elasticsearch 官方仓库](https://github.com/elastic/elasticsearch)
- [Grafana 官方仓库](https://github.com/grafana/grafana)
- [Grafana Loki 官方仓库](https://github.com/grafana/loki)
- [Grafana k6 官方仓库](https://github.com/grafana/k6)
