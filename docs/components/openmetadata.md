# OpenMetadata

> 类型：元数据治理与数据资产目录中枢
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：数据治理层
>
> 官方网站：https://docs.open-metadata.org/
>
> 开源仓库地址：https://github.com/open-metadata/OpenMetadata

## 当前定位

`OpenMetadata` 是当前方案数据治理层的统一中枢，承担数据源登记、元数据目录、标签、责任人、血缘和数据资产管理。

## 主要职责

- 数据源登记
- 元数据目录
- 标签、责任人与资产管理
- 血缘与数据资产可追溯

## 与其他组件关系

- 与 [SeaTunnel](/components/seatunnel) 配合，承接采集后的数据源和元数据登记。
- 与 [dbt Core](/components/dbt-core) 协同沉淀结构化建模结果、血缘和资产口径。
- 与 [Apache Tika](/components/apache-tika) 配合管理非结构化内容相关元数据。
- 为知识层、查询层和 Agent 场景提供统一资产目录和治理上下文。

## 适合场景

- 企业 AI 数据底座
- 统一数据资产目录
- 结构化与非结构化数据治理

## 边界

- 不替代数据采集同步引擎
- 不替代向量检索或在线 RAG 引擎

## 采用规则

- 当前方案默认以 `OpenMetadata` 作为数据治理层的元数据中枢，不再并行引入第二套正式元数据目录组件。
- 所有准备供 AI 使用的数据资产都应优先纳入元数据登记、标签和责任人管理。
- `OpenMetadata` 负责治理视图和资产目录，不承担在线检索或应用运行职责。

## 治理注意点

- 数据分类分级、责任人、发布时间和可见范围需要在资产层明确。
- 血缘和标签体系要与结构化、非结构化数据链路保持一致。
- 元数据目录不是静态清单，应和数据发布、变更和下线流程联动。
- AI 使用的数据资产应能从结果回溯到目录记录和治理责任。

## 关联文档

- [5. 数据治理层](/layers/data-governance-layer)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [SeaTunnel](/components/seatunnel)
- [dbt Core](/components/dbt-core)

## 参考资料

- [OpenMetadata Documentation](https://docs.open-metadata.org/)
- [OpenMetadata GitHub Repository](https://github.com/open-metadata/OpenMetadata)
