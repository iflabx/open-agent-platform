# 第二批文档完善计划

> 状态：执行中
>
> 更新日期：2026-03-16
>
> 范围：第二批主题文档收敛与优化
>
> 约束：只做文档内容修改优化，不引入新的组件、不新增公开版本化页面

## 一、执行边界

第二批只处理以下公开主题页：

- [企业智能体能力与规范体系](/capability-framework)
- [协议与标准体系](/protocol-standards)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [开源状态与许可证说明](/open-source-status)

本轮继续遵守以下规则：

- 公开站点始终只展示一个当前状态。
- 不新增新的组件、协议、标准或规范页面。
- 不把研究项、观察项或外部备选路线写成当前公开主清单。
- 主方案入口仍固定为 [方案](/framework)，组件入口固定为 [组件](/components)。

## 二、第二批要解决的主要问题

结合当前仓库内容和 2026 年 3 月的官方资料调研，第二批优先解决以下问题：

1. [企业智能体能力与规范体系](/capability-framework) 仍存在“能力基线”和“实现清单”混写，和 [组件](/components) 职责重叠。
2. [协议与标准体系](/protocol-standards) 中“六层”容易被误读成架构层数，与主方案九层架构并列时可读性不足。
3. [数据治理层（企业 AI 数据底座）](/data-governance) 中仍保留了非当前清单对象，违反当前公开收敛口径。
4. [开源状态与许可证说明](/open-source-status) 中仍保留了未纳入当前清单的外部对象，容易让读者误解为公开候选路线。
5. `Weaviate`、`Milvus`、`Elasticsearch` 在不同页面中的表述仍不够一致，需要与 [技术选型](/stack) 的“默认 / 条件引入 / 兼容项”口径统一。
6. 当前页面对许可证、协议版本、观测语义和数据治理职责的引用需要按官方最新资料更新。

## 三、第二批参考资料基线

本轮只采用官方一手资料或规范正文作为参考。

### 1. 企业能力、治理与风险基线

- [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
- [NIST AI Resource Center](https://airc.nist.gov/)

### 2. 协议、标准与语义基线

- [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
- [Model Context Protocol Specification 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18)
- [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest)
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
- [RFC 7644: SCIM Protocol](https://www.rfc-editor.org/rfc/rfc7644)
- [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/)
- [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)

### 3. 数据治理与数据底座基线

- [OpenMetadata Features](https://docs.open-metadata.org/features)
- [OpenMetadata Lineage](https://docs.open-metadata.org/v1.12.x/api-reference/lineage/index)
- [Apache SeaTunnel Connectors Capability Overview](https://seatunnel.apache.org/docs/connectors/overview)
- [Apache SeaTunnel Exactly-Once Semantics](https://seatunnel.apache.org/docs/architecture/fault-tolerance/exactly-once)
- [dbt Core 官方仓库](https://github.com/dbt-labs/dbt-core)
- [Apache Tika 官方站点](https://tika.apache.org/index.html)

### 4. 开源状态与许可证基线

- [Dify 官方仓库](https://github.com/langgenius/dify)
- [LiteLLM LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE)
- [Langfuse 官方仓库](https://github.com/langfuse/langfuse)
- [Redis 官方仓库](https://github.com/redis/redis)
- [MinIO 官方仓库](https://github.com/minio/minio)
- [Elasticsearch 官方仓库](https://github.com/elastic/elasticsearch)
- [Grafana 官方仓库](https://github.com/grafana/grafana)
- [Grafana Loki 官方仓库](https://github.com/grafana/loki)
- [Grafana k6 官方仓库](https://github.com/grafana/k6)

## 四、第二批修改计划

## 1. 收敛公开口径与边界

- 目标：先清除四个主题页中所有会被误读为“新增公开对象”的内容。
- 参考资料：
  - [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
  - [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
- 计划修改：
  - 删除非当前清单对象的公开列举。
  - 把“未来观察项”改成不展开，或完全移出公开正文。
  - 统一 `Weaviate`、`Milvus`、`Elasticsearch` 的默认 / 条件引入 / 兼容项口径。

## 2. 完善 [企业智能体能力与规范体系](/capability-framework)

- 目标：把页面改造成“企业能力基线页”，避免退化成组件列表页。
- 参考资料：
  - [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
  - [NIST AI Resource Center](https://airc.nist.gov/)
  - [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/)
  - [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- 计划修改：
  - 以治理、接入、运行时、知识、模型、评测、运维等能力域重构全文。
  - 用“能力要求、规范要求、当前方案落点”三段式表达。
  - 弱化组件清单密度，强化最低要求和强约束边界。

## 3. 完善 [协议与标准体系](/protocol-standards)

- 目标：把页面改造成“协议与标准视图页”，明确这是六类视角，不是六层架构。
- 参考资料：
  - [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
  - [Model Context Protocol Specification 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18)
  - [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
  - [OpenAPI Specification](https://spec.openapis.org/oas/latest)
  - [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
  - [RFC 7644: SCIM Protocol](https://www.rfc-editor.org/rfc/rfc7644)
  - [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- 计划修改：
  - 把“六层”改写成“六类协议 / 标准视图”。
  - 补齐 `MCP`、`A2A`、身份标准、API 标准、模型接口标准、观测语义标准的边界。
  - 删除当前未纳入标准的公开列举。

## 4. 完善 [数据治理层（企业 AI 数据底座）](/data-governance)

- 目标：把页面收敛成当前正式数据治理链路，不再混入额外候选组件。
- 参考资料：
  - [OpenMetadata Features](https://docs.open-metadata.org/features)
  - [OpenMetadata Lineage](https://docs.open-metadata.org/v1.12.x/api-reference/lineage/index)
  - [Apache SeaTunnel Connectors Capability Overview](https://seatunnel.apache.org/docs/connectors/overview)
  - [Apache SeaTunnel Exactly-Once Semantics](https://seatunnel.apache.org/docs/architecture/fault-tolerance/exactly-once)
  - [dbt Core 官方仓库](https://github.com/dbt-labs/dbt-core)
  - [Apache Tika 官方站点](https://tika.apache.org/index.html)
- 计划修改：
  - 用“数据源登记、采集、治理、标签、索引、发布、生命周期”重构链路。
  - 保留当前正式组件组合，删除非当前对象。
  - 与 [技术选型](/stack) 和 [组件](/components) 的检索底座口径对齐。

## 5. 完善 [开源状态与许可证说明](/open-source-status)

- 目标：只保留当前正式清单对象的许可证与开源属性判断。
- 参考资料：
  - [Dify 官方仓库](https://github.com/langgenius/dify)
  - [LiteLLM LICENSE](https://github.com/BerriAI/litellm/blob/main/LICENSE)
  - [Langfuse 官方仓库](https://github.com/langfuse/langfuse)
  - [Redis 官方仓库](https://github.com/redis/redis)
  - [MinIO 官方仓库](https://github.com/minio/minio)
  - [Elasticsearch 官方仓库](https://github.com/elastic/elasticsearch)
  - [Grafana 官方仓库](https://github.com/grafana/grafana)
  - [Grafana Loki 官方仓库](https://github.com/grafana/loki)
  - [Grafana k6 官方仓库](https://github.com/grafana/k6)
- 计划修改：
  - 只保留当前正式组件、协议和标准对象。
  - 更新 `Redis`、`MinIO`、`Grafana`、`Loki`、`k6`、`Elasticsearch` 的最新公开口径。
  - 去掉未纳入当前清单的外部对象。

## 五、执行顺序

1. 先写第二批计划文档并补到索引。
2. 再重写 [企业智能体能力与规范体系](/capability-framework) 和 [协议与标准体系](/protocol-standards)。
3. 然后重写 [数据治理层（企业 AI 数据底座）](/data-governance) 和 [开源状态与许可证说明](/open-source-status)。
4. 最后执行全站一致性检查与本地构建。

## 六、完成判定

本轮完成的判定标准如下：

- 四个目标文档全部完成重写或显著收敛。
- 不新增新的组件、协议、标准或规范页面。
- 公开正文不再列出非当前主清单对象。
- 能力、协议、数据、开源状态四页与 [技术选型](/stack)、[组件](/components)、[方案](/framework) 的口径保持一致。
- 文档站能够通过本地构建校验。
