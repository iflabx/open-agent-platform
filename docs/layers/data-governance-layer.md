# 5. 数据治理层

> 定位：把原始企业数据治理成可被智能体、检索和查询消费的标准数据资产。
>
> 当前承载组件：`OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika`。

相关文档：

- [数据治理层（企业 AI 数据底座）](/data-governance)
- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

## 一、本层定义

数据治理层是企业智能体系统与原始业务数据之间的缓冲层和生产层。

它的任务不是简单“把数据接进来”，而是把结构化和非结构化数据经过采集、解析、清洗、建模、标注、登记和发布，变成 AI 可消费的数据资产和数据服务。

## 二、本层功能

- 采集结构化和非结构化数据。
- 解析文档内容、元数据和附件信息。
- 执行数据清洗、标准化、建模和质量控制。
- 维护元数据、标签、责任人、血缘和资产目录。
- 对外发布适合检索、查询和 Agent 使用的数据资产。

## 三、当前承载组件

- [OpenMetadata](/components/openmetadata)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)
- [Apache Tika](/components/apache-tika)

关键配套底座：

- [PostgreSQL](/components/postgresql)
- [MinIO](/components/minio)

## 四、上下游关系

上游对象：

- 企业业务数据库
- 数据仓库 / 数据湖
- 文档库、知识库、文件系统
- CRM / ERP / 工单等业务系统

下游层级：

- [知识与检索层](/layers/knowledge-retrieval)
- [Agent 编排层](/layers/agent-orchestration)

标准链路为：

`源系统 -> 采集 / 解析 / 建模 / 元数据治理 -> AI 可消费资产 -> 检索 / 查询 / Agent`

## 五、边界

本层不负责：

- 不直接面向终端用户提供交互入口。
- 不替代知识检索层的索引、召回和重排职责。
- 不替代编排层的业务流程控制。
- 不允许应用直接绕过本层访问原始源系统。

## 六、关键链路

### 1. 结构化数据链路

1. `SeaTunnel` 负责接入批量、增量或 CDC 数据。
2. `dbt Core` 完成标准化建模和可消费数据层构建。
3. `OpenMetadata` 维护资产目录、标签和血缘。
4. 数据资产再供给检索、查询和 Agent 使用。

### 2. 非结构化数据链路

1. 文档先进入对象存储或受控文件域。
2. `Apache Tika` 负责文本与元数据抽取。
3. 治理后的文档内容和元数据登记到 `OpenMetadata`。
4. 下游再执行切片、索引和知识构建。

## 七、治理要求

- 数据分类分级、责任人和使用范围必须明确。
- 进入 AI 链路前的数据应经过质量和口径治理。
- 血缘、标签和发布时间要可追踪，避免“黑盒数据”进入生产。
- 应建立“原始数据不能直接进入 Agent”的强约束。

## 八、部署与发布要求

- 采集、解析和建模链路应与在线应用链路隔离。
- 治理后的数据资产需要有发布机制，而不是只停留在中间库。
- 对象存储、元数据库和调度资源要单独规划容量。
- 新数据源接入优先走统一治理链路，再评估是否向下游开放。

## 九、风险与取舍

- 只做接入不做发布，会让下游继续各自处理脏数据。
- 元数据治理缺位时，知识层和 Agent 层难以判断能否使用某份数据。
- 过度建设数据平台会拖慢首批落地，因此应围绕 AI 消费场景收敛范围。

## 十、关联文档

- [数据治理层（企业 AI 数据底座）](/data-governance)
- [知识与检索层](/layers/knowledge-retrieval)
- [总体架构](/architecture)
- [技术选型](/stack)

## 参考资料

- [OpenMetadata Documentation](https://docs.open-metadata.org/)
- [Apache SeaTunnel](https://seatunnel.apache.org/)
- [dbt Documentation](https://docs.getdbt.com/)
- [Apache Tika](https://tika.apache.org/)
