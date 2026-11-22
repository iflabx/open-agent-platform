# SeaTunnel

> 类型：数据采集与同步引擎
>
> 采用定位：默认采用
>
> 所属层：数据治理层
>
> 官方网站：https://seatunnel.apache.org/
>
> 开源仓库地址：https://github.com/apache/seatunnel

## 当前定位

`SeaTunnel` 是数据治理层的统一采集与同步引擎，负责结构化与非结构化数据的批量、增量和 CDC 接入。

## 主要职责

- 批量同步
- 增量同步
- CDC 接入
- 多源系统统一接入

## 与其他组件关系

- 上游连接数据库、数据仓库、业务系统和文件类数据源。
- 向下将采集结果交付给 [dbt Core](/components/dbt-core)、[Docling](/components/docling) 等治理组件进一步处理。
- 与 [OpenMetadata](/components/openmetadata) 协同登记数据源、任务来源和数据资产上下文。
- 与 [MinIO](/components/minio)、[PostgreSQL](/components/postgresql) 等基础设施能力配套使用。

## 适合场景

- 业务系统数据接入
- 文档和对象数据同步
- AI 数据底座的数据采集链路

## 边界

- 不替代元数据治理中枢
- 不替代结构化数据建模和非结构化解析能力

## 采用规则

- 默认以 `SeaTunnel` 作为统一采集与同步引擎，不为不同业务域分别引入多套正式采集组件。
- 采集任务应优先围绕 AI 消费场景建设，避免将全部企业数据无差别纳入。
- `SeaTunnel` 负责统一数据接入与同步，不承担数据向最终知识或应用结果的直接转化。

## 治理注意点

- 批量、增量和 CDC 任务需要清晰记录数据来源、同步频率和失败重试策略。
- 采集链路需保留来源系统、时间戳和任务信息，支撑问题定位和审计。
- 不同数据等级应在进入治理层前就明确访问范围和脱敏要求。
- 采集失败、延迟和重复数据需具备补偿与质量校验机制。

## 关联文档

- [5. 数据治理层](/layers/data-governance-layer)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [OpenMetadata](/components/openmetadata)
- [dbt Core](/components/dbt-core)

## 参考资料

- [Apache SeaTunnel](https://seatunnel.apache.org/)
- [Apache SeaTunnel GitHub Repository](https://github.com/apache/seatunnel)
