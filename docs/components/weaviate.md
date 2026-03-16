# Weaviate

> 类型：向量检索与混合检索底座
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：知识与检索层

## 当前定位

`Weaviate` 是当前方案默认的向量检索与混合检索底座。

## 主要职责

- 向量索引
- 混合检索
- 知识检索支撑

## 与其他组件关系

- 与 [LlamaIndex](/components/llamaindex) 组成当前默认知识检索主组合。
- 依赖模型层提供 Embedding 与重排能力，服务于编排层和知识应用场景。
- 与 [Milvus](/components/milvus) 的关系是默认底座与演进候选的关系。
- 在需要全文能力时，可与 [Elasticsearch](/components/elasticsearch) 形成条件配合，而非默认双底座长期并行。

## 适用场景

- 企业知识库检索
- 智能体 RAG 检索
- 中大型知识场景

## 边界

- 不替代对象存储
- 不替代关系数据库

## 采用规则

- 当前方案默认以 `Weaviate` 作为向量检索底座。
- 在规模、吞吐或隔离要求未明显超出当前阶段前，不默认切换到 `Milvus`。
- `Weaviate` 负责检索底座，不负责数据治理、知识编排和业务应用控制。

## 治理注意点

- 向量索引、Schema 和租户隔离策略需要统一管理。
- 知识删除、更新和重建要与源资产生命周期联动。
- 在线检索范围必须继承数据分类分级和访问权限语义。
- 索引构建与在线查询资源建议隔离，避免相互抢占。

## 关联文档

- [6. 知识与检索层](/layers/knowledge-retrieval)
- [LlamaIndex](/components/llamaindex)
- [Milvus](/components/milvus)
- [技术选型](/stack)

## 参考资料

- [Weaviate Documentation](https://docs.weaviate.io/)
- [Weaviate GitHub Repository](https://github.com/weaviate/weaviate)
