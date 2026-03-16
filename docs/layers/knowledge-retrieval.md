# 6. 知识与检索层

> 定位：围绕治理后的数据资产构建索引、检索、重排和引用上下文。
>
> 当前承载组件：`LlamaIndex`、`Weaviate`、`Milvus`、`Elasticsearch`。

相关文档：

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)
- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)
- [数据治理层](/layers/data-governance-layer)

## 一、本层定义

知识与检索层负责把已经治理过的数据资产转成可检索、可引用、可追溯的 AI 上下文。

它承担的是知识工程和检索工程职责，而不是数据治理本身，也不是最终业务流程控制。

## 二、本层功能

- 对治理后的结构化和非结构化资产做切片、索引和知识组织。
- 执行向量检索、全文检索、混合检索和结果过滤。
- 为上层应用构建带引用、带来源、带权限语义的上下文。
- 支持知识刷新、索引重建和效果评估。

## 三、当前承载组件

默认主组合：

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)

条件组件：

- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)

当前规则保持不变：默认以 `Weaviate` 作为向量检索底座；大规模阶段再评估 `Milvus`；`Elasticsearch` 主要用于全文或混合检索兼容需求。

## 四、上下游关系

上游层级：

- [数据治理层](/layers/data-governance-layer)

下游层级：

- [Agent 编排层](/layers/agent-orchestration)
- [模型网关与推理层](/layers/model-gateway-inference)

标准链路为：

`治理后资产 -> 索引构建 -> 检索 / 过滤 / 重排 -> 引用上下文 -> 编排层`

## 五、边界

本层不负责：

- 不替代数据治理层的采集、建模和元数据治理。
- 不承担业务工作流状态管理。
- 不直接承担模型统一路由和配额控制。
- 不允许绕过权限标签和数据范围，把知识直接暴露给所有应用。

## 六、关键链路

### 1. 建索引链路

1. 治理后的数据资产进入知识工程流程。
2. `LlamaIndex` 负责切片、索引编排和知识组织。
3. 向量或全文索引写入 `Weaviate`、`Milvus` 或 `Elasticsearch`。

### 2. 在线检索链路

1. 编排层发起检索请求。
2. 检索层根据权限、标签和场景执行召回与过滤。
3. 结果按引用要求组织后返回编排层。

## 七、治理要求

- 知识条目要能追溯到原始资产和发布时间。
- 检索时应继承数据分类分级和访问控制语义。
- 知识更新要有刷新和失效机制，避免长期使用过期内容。
- 评测应覆盖召回率、准确性、引用质量和权限正确性。

## 八、部署与发布要求

- 默认保持单一主向量底座，避免无必要的双底座长期并行。
- 索引构建和在线检索资源建议分离，避免相互抢占。
- 全文检索能力仅在明确需要时引入，防止体系膨胀。
- 知识发布要和数据发布节奏联动，而不是各自独立演化。

## 九、风险与取舍

- 如果知识层直接接原始数据，检索效果和权限控制都会失真。
- 向量库和检索方案过多会增加运维和评测复杂度。
- 没有引用和来源管理的检索，很难支撑企业级可审计场景。

## 十、关联文档

- [数据治理层](/layers/data-governance-layer)
- [Agent 编排层](/layers/agent-orchestration)
- [模型网关与推理层](/layers/model-gateway-inference)
- [典型场景](/scenarios)

## 参考资料

- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [Weaviate Documentation](https://docs.weaviate.io/)
- [Milvus Documentation](https://milvus.io/docs)
- [Elasticsearch Reference](https://www.elastic.co/docs)
