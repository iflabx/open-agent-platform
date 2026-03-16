# Apache Tika

> 类型：非结构化文档解析组件
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：数据治理层

## 当前定位

`Apache Tika` 是当前方案数据治理层的非结构化解析入口，负责 PDF、Office、HTML 等文档的文本与元数据抽取。

## 主要职责

- 文本抽取
- 元数据抽取
- 文档标准解析入口
- 非结构化知识入库前预处理

## 与其他组件关系

- 上游接收文档库、对象存储和业务系统导出的文件对象。
- 与 [MinIO](/components/minio) 配合承接文件本体，与 [OpenMetadata](/components/openmetadata) 协同登记元数据。
- 向下为知识层或索引层提供治理后的文本与文档元数据。
- 与 [SeaTunnel](/components/seatunnel) 互补，分别承担采集同步和内容解析职责。

## 适合场景

- PDF / Word / Excel / PPT 解析
- 知识库文档治理
- 非结构化数据进入 AI 数据底座前的标准处理

## 边界

- 不替代索引和检索引擎
- 不替代复杂知识编排和 RAG 运行时

## 采用规则

- 当前方案将 `Apache Tika` 作为标准文档解析入口，用于统一处理常见非结构化文件格式。
- 文档解析后仍需进入标签、目录、切片和索引链路，不能直接视为可用知识资产。
- 对于解析质量要求较高的特殊文件，应在实施中单独验证效果，而不是默认假设所有文档都能无损抽取。

## 治理注意点

- 文档来源、解析时间、原始文件位置和抽取结果需要可追溯。
- 解析失败、空文本或内容异常需要进入补偿或人工处理流程。
- 非结构化文档中的敏感信息和权限语义不能在解析过程中丢失。
- 文档正文与元数据应一并进入后续资产登记和发布流程。

## 关联文档

- [5. 数据治理层](/layers/data-governance-layer)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [OpenMetadata](/components/openmetadata)
- [6. 知识与检索层](/layers/knowledge-retrieval)

## 参考资料

- [Apache Tika](https://tika.apache.org/)
- [Apache Tika GitHub Repository](https://github.com/apache/tika)
