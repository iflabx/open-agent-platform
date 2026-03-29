# 开源状态与许可证说明

> 范围：当前方案与当前组件清单
>
> 校验日期：2026-03-16
>
> 校验口径：以官方仓库、官方许可证文件、官方模型页和官方协议仓库公开信息为准
>
> 说明：本页用于记录当前方案正式清单对象的开源属性、许可证类型与实施注意事项。“当前可接受”只表示当前方案讨论中的接受口径，不构成法律意见。

相关入口：

- [方案](/framework)
- [组件](/components)
- [文档索引](/doc-index)

## 一、整体结论

- 当前方案仍可以定义为“企业级智能体开源系统方案”。
- 但当前清单中并不是所有对象都属于“单一、宽松、标准开源许可证”。
- 当前最需要单独注意的对象主要有：
  - `Open core`：`LiteLLM`、`LangFuse`
  - 自定义许可证：`Dify`
  - 强 copyleft：`MinIO`、`Grafana`、`Loki`、`k6`
  - 需锁版本：`Redis`
  - 多重 / 混合许可证边界：`Elasticsearch`
- 企业复用能力 `SSO / IAM`、`KMS / 证书体系` 不在本页审计范围内，因为当前方案默认直接复用企业既有体系。

## 二、当前正式清单的开源状态总表

| 对象 | 当前判断 | 许可证 / 模式 | 当前备注 |
| --- | --- | --- | --- |
| `vLLM` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `LiteLLM` | Open core | 核心为 `MIT`，仓库中企业目录另有单独许可证 | 当前可接受，但不能按“全仓库纯 MIT”理解 |
| `Qwen` 模型族 | 开放权重 / 模型卡开源口径 | 当前方案中采用的模型卡标注为 `Apache-2.0` | 落地前仍需固定实际模型 ID |
| `Dify` | 自定义许可证 | `Dify Open Source License` | 带额外限制，不应等同标准 `Apache-2.0` |
| `RAGFlow` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `Coze Studio` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `AgentifUI` | 标准开源 | `Apache-2.0` | 可直接纳入 |
| `OpenClaw` | 标准开源 | `MIT` | 可作为门户与应用层条件组件纳入 |
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

## 三、逐组说明

## 1. 模型与推理

| 对象 | 公开来源 | 当前判断 |
| --- | --- | --- |
| `vLLM` | [官方仓库](https://github.com/vllm-project/vllm) | 标准开源，`Apache-2.0` |
| `LiteLLM` | [LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE) | 核心代码为 `MIT`，企业目录另有许可证，按 `Open core` 理解 |
| `Qwen` 模型族 | [Qwen 官方模型页](https://huggingface.co/Qwen) | 当前方案采用的模型卡标注为 `Apache-2.0`，实施时应锁定具体模型 ID |

## 2. 主平台与门户

| 对象 | 公开来源 | 当前判断 |
| --- | --- | --- |
| `Dify` | [官方仓库](https://github.com/langgenius/dify) | 自定义许可证，不应简单视为标准 `Apache-2.0` |
| `RAGFlow` | [官方仓库](https://github.com/infiniflow/ragflow) | 标准开源，`Apache-2.0` |
| `Coze Studio` | [官方仓库](https://github.com/coze-dev/coze-studio) | 标准开源，`Apache-2.0` |
| `AgentifUI` | [官方仓库](https://github.com/iflabx/agentifui) | 标准开源，`Apache-2.0` |
| `OpenClaw` | [官方仓库](https://github.com/openclaw/openclaw) | 标准开源，`MIT`，更适合作为门户与应用层条件组件理解 |

## 3. Agent 框架与知识工程

| 对象 | 公开来源 | 当前判断 |
| --- | --- | --- |
| `LangChain` | [官方仓库](https://github.com/langchain-ai/langchain) | 标准开源，`MIT` |
| `LangGraph` | [官方仓库](https://github.com/langchain-ai/langgraph) | 标准开源，`MIT` |
| `LlamaIndex` | [官方仓库](https://github.com/run-llama/llama_index) | 标准开源，`MIT` |
| `Letta` | [官方仓库](https://github.com/letta-ai/letta) | 标准开源，`Apache-2.0` |

## 4. 协议与互操作

| 对象 | 公开来源 | 当前判断 |
| --- | --- | --- |
| `MCP` | [官方协议站](https://modelcontextprotocol.io/specification/) | 开放协议规范，应按协议口径理解 |
| `A2A` | [官方仓库](https://github.com/a2aproject/A2A) | 开放协议，`Apache-2.0` |

## 5. 数据治理与 AI 数据底座

| 对象 | 公开来源 | 当前判断 |
| --- | --- | --- |
| `OpenMetadata` | [官方仓库](https://github.com/open-metadata/OpenMetadata) | 标准开源，`Apache-2.0` |
| `SeaTunnel` | [官方仓库](https://github.com/apache/seatunnel) | 标准开源，`Apache-2.0` |
| `dbt Core` | [官方仓库](https://github.com/dbt-labs/dbt-core) | 标准开源，`Apache-2.0`，仅指 `dbt Core` |
| `Apache Tika` | [官方仓库](https://github.com/apache/tika) | 标准开源，`Apache-2.0` |

## 6. 接入治理、评测与授权

| 对象 | 公开来源 | 当前判断 |
| --- | --- | --- |
| `APISIX` | [官方仓库](https://github.com/apache/apisix) | 标准开源，`Apache-2.0` |
| `agentgateway` | [官方仓库](https://github.com/agentgateway/agentgateway) | 标准开源，`Apache-2.0` |
| `LangFuse` | [官方仓库](https://github.com/langfuse/langfuse) | 核心为 `MIT`，企业目录另有许可证，按 `Open core` 理解 |
| `k6` | [官方仓库](https://github.com/grafana/k6) | `AGPL-3.0` |
| `Casbin` | [官方仓库](https://github.com/apache/casbin) | 标准开源，`Apache-2.0` |

## 7. 基础设施与可观测

| 对象 | 公开来源 | 当前判断 |
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

## 四、当前最需要单独关注的点

### 1. `Dify` 不是标准宽松许可证项目

- 它不是纯 `Apache-2.0`
- 官方许可证包含额外限制
- 如果企业只接受标准宽松开源口径，应单独做法务确认

### 2. `LiteLLM` 与 `LangFuse` 都应按 `Open core` 理解

- 社区核心是开源的
- 仓库中同时存在企业目录和企业许可证
- 文档里不能把整个仓库表述成“纯单一 MIT 项目”

### 3. `Redis` 必须锁版本

- 不能只写“Redis”而不说明版本口径
- 实施时应在方案和部署文档中明确生产使用的具体大版本

### 4. `MinIO`、`Grafana`、`Loki`、`k6` 都不是宽松许可证

- 当前方案仍可接受
- 但采购、法务、内控阶段应明确这些对象的许可证影响

### 5. `Elasticsearch` 需要单独确认兼容项口径

- 它不应被简单理解成传统单一宽松开源组件
- 当前方案把它定位为全文 / 混合检索兼容项，而不是默认底座

## 五、使用本页的方式

- 想知道当前方案能否继续保持“开源系统方案”口径，先看整体结论。
- 想知道某个正式对象是否有许可证风险，查看总表和分组说明。
- 想做采购、法务或内控审查，应基于实施时锁定的具体版本再次核对官方来源。

## 参考资料

- [Dify 官方仓库](https://github.com/langgenius/dify)
- [OpenClaw 官方仓库](https://github.com/openclaw/openclaw)
- [agentgateway 官方仓库](https://github.com/agentgateway/agentgateway)
- [LiteLLM LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE)
- [Langfuse 官方仓库](https://github.com/langfuse/langfuse)
- [Redis 官方仓库](https://github.com/redis/redis)
- [MinIO 官方仓库](https://github.com/minio/minio)
- [Elasticsearch 官方仓库](https://github.com/elastic/elasticsearch)
- [Grafana 官方仓库](https://github.com/grafana/grafana)
- [Grafana Loki 官方仓库](https://github.com/grafana/loki)
- [Grafana k6 官方仓库](https://github.com/grafana/k6)
