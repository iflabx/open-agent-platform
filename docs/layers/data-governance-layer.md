# 5. 数据治理层

> 定位：将原始企业数据治理为可被智能体、检索与查询消费的标准数据资产。
>
> 当前承载组件：`OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika`。

相关文档：

- [数据治理层（企业 AI 数据底座）](/data-governance)
- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

## 本层定义

数据治理层是企业智能体系统与原始业务数据之间的缓冲层和资产生产层。

本层的任务并非简单完成数据接入，而是将结构化与非结构化数据经过采集、解析、清洗、建模、标注、登记与发布，加工为 AI 可消费的标准数据资产和数据服务。

## 本层功能

- **多源数据采集**：采集企业结构化与非结构化数据。
- **文档内容解析**：解析文档正文、元数据与附件信息。
- **清洗与标准化建模**：执行数据清洗、口径标准化、分层建模与质量控制。
- **元数据与血缘治理**：维护元数据、分类分级标签、责任人、数据血缘与资产目录。
- **标准资产发布**：对外发布可供检索、查询与 Agent 直接消费的数据资产。

## 当前承载组件

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

关键配套底座：

- [PostgreSQL](/components/postgresql)
- [MinIO](/components/minio)

## 上下游关系

上游对象：

- 企业业务数据库
- 数据仓库 / 数据湖
- 文档库、知识库与文件系统
- CRM / ERP / 工单等业务系统

下游层级：

- [知识与检索层](/layers/knowledge-retrieval)
- [Agent 编排层](/layers/agent-orchestration)

标准链路为：

`源系统 → 采集 / 解析 / 建模 / 元数据治理 → AI 可消费资产 → 检索 / 查询 / Agent`

## 边界

本层不承担以下职责：

- **终端交互入口**：不直接面向终端用户提供交互界面。
- **知识检索工程**：不替代 [知识与检索层](/layers/knowledge-retrieval) 的索引构建、召回与重排职责。
- **业务流程控制**：不替代 [Agent 编排层](/layers/agent-orchestration) 的业务流程编排。
- **源系统直连禁止**：严禁上层应用绕过本层直接访问原始业务源系统。

::: warning 架构红线
必须建立“原始数据不得直接进入 Agent”的强约束，确保所有进入 AI 链路的数据均经过质量、口径与权限标签治理。
:::

## 关键链路

### 1. 结构化数据链路

1. `SeaTunnel` 负责接入批量、增量或 `CDC` 数据。
2. `dbt Core` 完成标准化建模与可消费数据层构建。
3. `OpenMetadata` 维护资产目录、标签与数据血缘。
4. 治理后的数据资产供给检索、查询与 Agent 消费。

### 2. 非结构化数据链路

1. 文档先进入对象存储或受控文件域。
2. `Apache Tika` 负责文本与元数据抽取。
3. 治理后的文档内容与元数据登记至 `OpenMetadata`。
4. 下游再执行切片、索引与知识构建。

## 治理要求

- **分类分级与权属明确**：数据分类分级、责任人与允许使用范围必须清晰界定。
- **入链前质量校验**：进入 AI 链路前的数据须经过质量检验与业务口径治理。
- **血缘与发布可追踪**：数据血缘、标签与发布时间必须可追踪，杜绝“黑盒数据”进入生产。
- **原始数据隔离约束**：严格落实“原始数据不得直接进入 Agent”的访问边界。

## 部署与发布要求

- **离线与在线隔离**：采集、解析与建模链路应与在线应用链路隔离部署。
- **资产化发布机制**：治理后的数据资产须具备明确的发布机制，而非长期滞留在中间库中。
- **存储与调度独立规划**：对象存储、元数据库与调度计算资源需单独规划容量。
- **统一入口准入**：新数据源接入优先走统一治理链路，验收通过后再评估向下游开放。

## 风险与取舍

- **只接入不发布**：若仅完成数据接入而缺乏标准发布机制，下游系统仍将被迫各自处理未经清洗的原始数据。
- **元数据治理缺位**：若缺乏元数据与标签体系，知识层与 Agent 层将难以判断某份数据的合规使用边界。
- **过度建设拖慢落地**：过度追求大而全的数据中台建设会拖慢首批场景落地，应围绕 AI 消费需求收敛建设范围。

## 关联文档

- [数据治理层（企业 AI 数据底座）](/data-governance)
- [知识与检索层](/layers/knowledge-retrieval)
- [总体架构](/architecture)
- [技术选型](/stack)

## 参考资料

- [OpenMetadata Documentation](https://docs.open-metadata.org/)
- [Apache SeaTunnel](https://seatunnel.apache.org/)
- [dbt Documentation](https://docs.getdbt.com/)
- [Apache Tika](https://tika.apache.org/)
