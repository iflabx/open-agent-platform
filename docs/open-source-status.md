# 开源状态与许可证说明

> 范围：方案与组件清单
>
> 校验日期：2026-03-16
>
> 校验口径：以官方 GitHub 仓库、官方模型页、官方协议仓库或官方产品页面公开信息为准
>
> 说明：本页用于记录当前方案各组件的开源属性、许可证类型与注意事项。“当前可接受”仅表示当前方案讨论中接受纳入，不构成法律意见。

相关入口：

- 方案文档：[方案](/framework)
- 组件清单：[组件](/components)
- 全站总索引：[文档索引](/doc-index)

## 一、整体结论

- 当前方案整体仍然可以定义为“企业级智能体开源系统方案”。
- 但当前清单中，并不是所有项目都属于“单一、宽松、标准开源许可证”。
- 需要重点单独标注的有五类：
  - `Open core`：`LiteLLM`、`LangFuse`
  - 自定义许可证：`Dify`
  - 强 copyleft / 服务端传播约束：`MinIO`、`Grafana`、`Loki`、`k6`
  - 新版本许可证变化较大：`Redis`
  - 多重 / 混合许可证边界：`Elasticsearch`
- 企业复用能力 `SSO / IAM`、`KMS / 证书体系` 不在本页审计范围内，因为当前方案默认直接复用企业既有体系。

## 二、整体情况列表

| 组件 | 当前判断 | 许可证 / 模式 | 当前备注 |
| --- | --- | --- | --- |
| `vLLM` | 标准开源 | `Apache-2.0` | 纯开源项目 |
| `LiteLLM` | Open core | Core 为 `MIT`，`enterprise/` 目录另有许可证 | 当前可接受，但不是纯单一 MIT 仓库 |
| `Qwen` 模型族 | 开放权重 / 开源模型卡 | 当前方案中已明确模型卡均标注 `apache-2.0` | 落地前仍需锁定最终实际拉取的具体模型页 |
| `Dify` | 自定义许可证 | `Dify Open Source License`（基于 `Apache-2.0` 修改） | 带额外限制，不宜简单等同 Apache / MIT |
| `RAGFlow` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Coze Studio` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `AgentifUI` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `APISIX` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `LangGraph` | 标准开源 | `MIT` | 可直接纳入 |
| `LangChain` | 标准开源 | `MIT` | 可直接纳入 |
| `LlamaIndex` | 标准开源 | `MIT` | 可直接纳入 |
| `Letta` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `MCP` | 开放协议 | 仓库正在从 `MIT` 过渡到 `Apache-2.0`，文档贡献为 `CC-BY-4.0` | 更适合视为开放协议规范，而不是单一软件产品 |
| `A2A` | 开放协议 | `Apache-2.0` | 开放协议，可直接纳入 |
| `OpenMetadata` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `SeaTunnel` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `dbt Core` | 标准开源 | `Apache-2.0` | 仅指 `dbt Core`，不含 `dbt Fusion / Cloud` 等其他产品 |
| `Apache Tika` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `LangFuse` | Open core | Core 为 `MIT`，`ee/` 目录为企业许可证 | 当前可接受，但需区分社区核心与企业扩展 |
| `k6` | 强 copyleft | `AGPL-3.0` | 可作为压测工具纳入，但需明确 AGPL 影响 |
| `Casbin` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `PostgreSQL` | 标准开源 | `PostgreSQL License` | 可直接纳入 |
| `Redis` | 需特别注意 | `Redis 8` 起为 `RSALv2 / SSPLv1 / AGPLv3` 三选一；`7.2` 及以前为 `BSD-3-Clause` | 当前可接受，但实施时要锁定大版本 |
| `MinIO` | 强 copyleft | `AGPL-3.0` | 当前可接受，但需明确 AGPL 影响 |
| `Weaviate` | 标准开源 | `BSD-3-Clause` | 可直接纳入 |
| `Milvus` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Elasticsearch` | 多重 / 混合许可证边界 | 默认代码路径为 `AGPL-3.0 / SSPLv1 / Elastic License 2.0` 三重许可，部分目录仅 `Elastic License 2.0` | 可作为兼容项研究或特定路线选项；若要求更低法律风险，应优先评估 `OpenSearch` |
| `K3s` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `OpenTelemetry` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Prometheus` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Grafana` | 强 copyleft | `AGPL-3.0` | 当前可接受，但需明确 AGPL 影响 |
| `Loki` | 强 copyleft | `AGPL-3.0` | 当前可接受，但需明确 AGPL 影响 |

## 三、逐项来源与具体情况

### 1. 模型与推理

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `vLLM` | [官方仓库](https://github.com/vllm-project/vllm) | GitHub 仓库元数据和许可证文件均显示为 `Apache-2.0`。 |
| `LiteLLM` | [官方 LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE) | 核心代码为 `MIT`，但仓库中明确写明 `enterprise/` 目录使用单独许可证，因此应按 `Open core` 理解。 |
| `Qwen` 模型族 | [Qwen3.5-27B-FP8](https://huggingface.co/Qwen/Qwen3.5-27B-FP8)、[Qwen3-Embedding-8B](https://huggingface.co/Qwen/Qwen3-Embedding-8B)、[Qwen3-Reranker-8B](https://huggingface.co/Qwen/Qwen3-Reranker-8B)、[Qwen3-Coder-Next](https://huggingface.co/Qwen/Qwen3-Coder-Next)、[Qwen3Guard-Stream-8B](https://huggingface.co/Qwen/Qwen3Guard-Stream-8B) | 当前方案中已明确到模型卡的条目，在官方模型页中均标注 `apache-2.0`。正式落地时，仍应把生产实际拉取的模型 ID 固定下来再归档。 |

### 2. 主平台与门户

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `Dify` | [官方 LICENSE](https://github.com/langgenius/dify/blob/main/LICENSE) | 官方许可证文本明确写明它是“基于 `Apache-2.0` 修改”的自定义许可证，并额外限制多租户服务、前端 LOGO / 版权信息处理等，因此不应简单视为标准 Apache 开源项目。 |
| `RAGFlow` | [官方仓库](https://github.com/infiniflow/ragflow) | GitHub 仓库元数据显示为 `Apache-2.0`。 |
| `Coze Studio` | [官方仓库](https://github.com/coze-dev/coze-studio)、[LICENSE-APACHE](https://github.com/coze-dev/coze-studio/blob/main/LICENSE-APACHE) | 官方仓库元数据显示为 `Apache-2.0`，仓库中许可证文件为 `LICENSE-APACHE`。 |
| `AgentifUI` | [官方仓库](https://github.com/iflabx/agentifui) | GitHub 仓库元数据和许可证文件均显示为 `Apache-2.0`。 |

### 3. Agent 框架与知识工程

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `LangChain` | [官方仓库](https://github.com/langchain-ai/langchain) | GitHub 仓库元数据显示为 `MIT`。 |
| `LangGraph` | [官方仓库](https://github.com/langchain-ai/langgraph) | GitHub 仓库元数据显示为 `MIT`。其官方 README 明确把它定义为面向 long-running、stateful agents 的 low-level orchestration framework。 |
| `LlamaIndex` | [官方仓库](https://github.com/run-llama/llama_index) | GitHub 仓库元数据显示为 `MIT`。 |
| `Letta` | [官方仓库](https://github.com/letta-ai/letta) | GitHub 仓库元数据显示为 `Apache-2.0`。 |

### 4. 协议与互操作

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `MCP` | [官方仓库](https://github.com/modelcontextprotocol/modelcontextprotocol)、[官方 LICENSE](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/LICENSE) | 官方许可证文件明确写明：项目正在从 `MIT` 迁移到 `Apache-2.0`；新的代码和规范贡献按 `Apache-2.0`，非规范文档贡献按 `CC-BY-4.0`。因此它更适合被视为开放协议规范。 |
| `A2A` | [官方仓库](https://github.com/a2aproject/A2A)、[官方 LICENSE](https://github.com/a2aproject/A2A/blob/main/LICENSE) | 官方仓库和许可证文件显示为 `Apache-2.0`。 |

### 5. 数据治理与 AI 数据底座

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `OpenMetadata` | [官方仓库](https://github.com/open-metadata/OpenMetadata) | 官方仓库元数据显示为 `Apache-2.0`。README 明确把它定义为统一元数据平台，覆盖 data discovery、data observability、data governance、column-level lineage 等能力。 |
| `SeaTunnel` | [官方仓库](https://github.com/apache/seatunnel) | 官方仓库元数据显示为 `Apache-2.0`。README 明确说明它支持 structured、unstructured、multimodal 数据集成，以及 batch、incremental、CDC 等同步能力。 |
| `dbt Core` | [官方仓库](https://github.com/dbt-labs/dbt-core)、[core/LICENSE](https://github.com/dbt-labs/dbt-core/blob/main/core/LICENSE)、[Licensing FAQ](https://www.getdbt.com/licenses-faq) | 当前方案中纳入的是 `dbt Core` 本身，其 `core/LICENSE` 为 `Apache-2.0`。但 dbt Labs 其他产品与组件存在不同许可证，因此文档中必须明确仅指 `dbt Core`。 |
| `Apache Tika` | [官方仓库](https://github.com/apache/tika) | 官方仓库元数据显示为 `Apache-2.0`。README 明确把它定义为用于文档元数据和结构化文本抽取的 toolkit。 |

### 6. 接入治理、评测与授权

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `APISIX` | [官方仓库](https://github.com/apache/apisix) | 官方仓库和许可证文件显示为 `Apache-2.0`。 |
| `LangFuse` | [官方 LICENSE](https://github.com/langfuse/langfuse/blob/main/LICENSE)、[EE LICENSE](https://github.com/langfuse/langfuse/blob/main/ee/LICENSE) | 核心部分为 `MIT`，但仓库明确区分 `ee/` 等目录的企业许可证，因此应按 `Open core` 理解。 |
| `k6` | [官方仓库](https://github.com/grafana/k6) | 官方仓库和许可证文件显示为 `AGPL-3.0`。当前方案把它定位为压测与容量验证工具，而不是生产运行时组件。 |
| `Casbin` | [官方仓库](https://github.com/apache/casbin) | 官方仓库和许可证文件显示为 `Apache-2.0`。 |

### 7. 基础设施与可观测

| 组件 | 开源信息来源 | 具体情况 |
| --- | --- | --- |
| `PostgreSQL` | [官方许可证页面](https://www.postgresql.org/about/licence/) | `PostgreSQL License`，属于宽松许可证，可直接纳入。 |
| `Redis` | [官方 LICENSE](https://github.com/redis/redis/blob/unstable/LICENSE.txt) | 官方许可证文本明确写明：自 `Redis 8` 起采用 `RSALv2 / SSPLv1 / AGPLv3` 三许可模式；`Redis 7.2` 及以前仍按 `BSD-3-Clause`。实施时必须锁定版本。 |
| `MinIO` | [官方 LICENSE](https://github.com/minio/minio/blob/master/LICENSE) | 官方许可证文件显示为 `AGPL-3.0`。 |
| `Weaviate` | [官方仓库](https://github.com/weaviate/weaviate) | GitHub 仓库元数据和许可证文件显示为 `BSD-3-Clause`。 |
| `Milvus` | [官方仓库](https://github.com/milvus-io/milvus) | GitHub 仓库元数据和许可证文件显示为 `Apache-2.0`。 |
| `Elasticsearch` | [官方仓库](https://github.com/elastic/elasticsearch)、[官方 LICENSE](https://github.com/elastic/elasticsearch/blob/main/LICENSE.txt) | 官方许可证文件明确写明：默认代码路径采用 `AGPL-3.0 / SSPLv1 / Elastic License 2.0` 三重许可，`x-pack` 目录仅为 `Elastic License 2.0`。因此它不应被简单视为“传统单一宽松开源组件”。 |
| `K3s` | [官方仓库](https://github.com/k3s-io/k3s) | 官方仓库和许可证文件显示为 `Apache-2.0`。 |
| `OpenTelemetry` | [官方仓库](https://github.com/open-telemetry/opentelemetry-collector) | 官方仓库和许可证文件显示为 `Apache-2.0`。 |
| `Prometheus` | [官方仓库](https://github.com/prometheus/prometheus) | 官方仓库和许可证文件显示为 `Apache-2.0`。 |
| `Grafana` | [官方仓库](https://github.com/grafana/grafana) | 官方仓库和许可证文件显示为 `AGPL-3.0`。 |
| `Loki` | [官方仓库](https://github.com/grafana/loki) | 官方仓库和许可证文件显示为 `AGPL-3.0`。 |

## 四、当前方案中最需要单独关注的点

### 1. `Dify` 不是标准意义上的宽松开源许可证

- 它不是纯 `Apache-2.0`。
- 官方许可证增加了额外条件。
- 如果企业对“严格 OSI 标准开源”有明确口径，`Dify` 需要单独法务确认。

### 2. `LiteLLM` 和 `LangFuse` 都应按 `Open core` 理解

- 社区核心是开源的。
- 仓库中同时存在企业版目录和企业许可证。
- 方案文档里可以继续纳入，但不要表述成“整个仓库全部 MIT”。

### 3. `Redis` 需要锁版本，不要只写“Redis”

- 如果实施采用 `Redis 8` 及以后版本，应按新的三许可模式理解。
- 如果企业只接受传统宽松开源口径，就必须单独评估是否回退到 `7.2` 系列或更换实现。

### 4. `MinIO`、`Grafana`、`Loki`、`k6` 都不是宽松许可证

- 这四项当前都可接受。
- 但文档里应明确它们属于 `AGPL-3.0`，避免后续采购、法务或内控阶段重新打回。

### 5. `Elasticsearch` 存在多重 / 混合许可证边界

- 它不能简单写成“`Apache-2.0` 开源组件”。
- 默认代码路径是 `AGPL-3.0 / SSPLv1 / Elastic License 2.0` 三重许可。
- `x-pack` 目录仅为 `Elastic License 2.0`。
- 如果企业要求更低法律风险或更统一的宽松开源口径，应优先评估 `OpenSearch`。

## 五、补充说明：已讨论但未纳入当前主清单

| 项目 | 信息来源 | 具体情况 |
| --- | --- | --- |
| `Camunda` | [Camunda Licensing: What You Need to Know](https://camunda.com/blog/2024/10/camunda-licensing-what-you-need-to-know/)、[Camunda Pricing](https://camunda.com/pricing/)、[Camunda 7](https://camunda.com/platform-7/) | `Camunda 8` 当前主流口径下，源码可见，但官方明确说明自 `Camunda 8.6`（2024-10-08）起生产使用需要企业许可证；`Camunda 7 Community Edition` 历史上可按 `Apache-2.0` 理解，但在 `2025-10-14` 之后不再提供社区版后续安全补丁，因此不建议作为当前新方案主路线。 |
