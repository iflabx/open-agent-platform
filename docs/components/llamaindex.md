# LlamaIndex

> 类型：知识工程与复杂 RAG 框架
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：知识与检索层

## 当前定位

`LlamaIndex` 用于承载复杂知识源接入、索引构建、查询编排和高级 RAG 能力。

## 主要职责

- 复杂数据接入
- 索引构建与查询编排
- 结构化与半结构化数据检索
- 高级 RAG 链路设计

## 与其他组件关系

- 上游接收 [数据治理层](/layers/data-governance-layer) 发布的结构化和非结构化资产。
- 与 [Weaviate](/components/weaviate) 组成当前默认知识工程主组合。
- 可按条件与 [Milvus](/components/milvus)、[Elasticsearch](/components/elasticsearch) 配合，满足规模或全文检索需求。
- 向上服务于 [Dify](/components/dify)、[RAGFlow](/components/ragflow)、[LangGraph](/components/langgraph) 等编排能力。

## 适合场景

- 多知识源融合
- 复杂 RAG
- 结构化知识增强

## 边界

- 不替代主平台中枢
- 不承担门户与应用分发职责

## 采用规则

- 当前方案默认把 `LlamaIndex` 作为知识工程层的编排与索引组织能力。
- `LlamaIndex` 与向量库、全文检索底座是配合关系，不是替代关系。
- 当知识源复杂、引用要求高或需要检索链路编排时优先使用它，而不是把检索逻辑分散到各业务应用中。

## 治理注意点

- 切片策略、索引构建规则和检索流程要版本化管理。
- 所有引用结果都应可回溯到原始资产、发布时间和权限范围。
- 知识更新与索引刷新要和数据发布节奏联动。
- 评测应覆盖召回、引用质量、过滤正确性和时效性。

## 关联文档

- [6. 知识与检索层](/layers/knowledge-retrieval)
- [5. 数据治理层](/layers/data-governance-layer)
- [Weaviate](/components/weaviate)
- [典型场景](/scenarios)

## 参考资料

- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [LlamaIndex GitHub Repository](https://github.com/run-llama/llama_index)
