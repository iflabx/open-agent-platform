# dbt Core

> 类型：结构化数据治理与建模组件
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：数据治理层
>
> 官方网站：https://docs.getdbt.com/
>
> 开源仓库地址：https://github.com/dbt-labs/dbt-core

## 当前定位

`dbt Core` 是当前方案数据治理层中的结构化数据治理与建模组件，用于把原始业务数据整理成适合 AI 查询和分析使用的治理后数据层。

## 主要职责

- 结构化数据标准化
- 主题建模与口径统一
- 治理后数据层产出
- 结构化数据版本化管理

## 与其他组件关系

- 上游通常接收 [SeaTunnel](/components/seatunnel) 接入后的结构化数据。
- 与 [OpenMetadata](/components/openmetadata) 协同沉淀血缘、口径和数据资产目录。
- 下游为查询型 Agent、知识层或业务分析场景提供治理后结构化数据。
- 与非结构化解析组件 [Apache Tika](/components/apache-tika) 互补，不承担文档解析职责。

## 适合场景

- ERP、CRM、工单、报表等结构化数据治理
- 查询型 Agent 的数据准备
- AI 使用的主题数据层建设

## 边界

- 当前方案仅纳入 `dbt Core`
- 不替代元数据目录和非结构化知识工程

## 采用规则

- 当前方案仅纳入 `dbt Core`，不把托管产品或其他建模体系并入正式组件清单。
- 结构化数据进入 AI 场景前，优先通过 `dbt Core` 完成主题建模、口径统一和基础质量校验。
- `dbt Core` 负责数据变换与建模，不负责采集、目录管理或在线检索。

## 治理注意点

- 模型、口径、测试和发布节奏要和数据资产发布保持一致。
- 指标口径、主题域划分和表级说明需要可追溯、可版本化。
- 数据质量测试应成为发布前必经步骤，而不是上线后的补救动作。
- 面向 AI 的结构化数据层要明确哪些字段可供检索、查询和引用。

## 关联文档

- [5. 数据治理层](/layers/data-governance-layer)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [OpenMetadata](/components/openmetadata)
- [技术选型](/stack)

## 参考资料

- [dbt Documentation](https://docs.getdbt.com/)
- [dbt Core GitHub Repository](https://github.com/dbt-labs/dbt-core)
