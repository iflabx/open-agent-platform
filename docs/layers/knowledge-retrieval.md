# 6. 知识与检索层

> 定位：围绕治理后的数据资产构建索引、检索、重排与可引用上下文。
>
> 当前承载组件：`LlamaIndex`、`Weaviate`、`Milvus`、`Elasticsearch`。

相关文档：

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)
- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)
- [数据治理层](/layers/data-governance-layer)

## 本层定义

知识与检索层负责将已经过治理的数据资产转化为可检索、可引用、可追溯的 AI 上下文。

本层承担的是知识工程与检索工程职责，不替代数据治理本身，也不承担上层的业务流程控制。

## 本层功能

- **切片与知识组织**：对治理后的结构化与非结构化资产执行切片、索引构建与知识组织。
- **多路检索与过滤**：执行向量检索、全文检索、混合检索与元数据条件过滤。
- **可信上下文构建**：为上层应用构建附带引用、来源标识与权限语义的上下文。
- **索引生命周期运维**：支持知识增量刷新、索引重建与检索效果评估。

## 当前承载组件

默认主组合：

- [LlamaIndex](/components/llamaindex)
- [Weaviate](/components/weaviate)

条件组件：

- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)

::: tip 选型约束
默认以 `Weaviate` 作为向量检索底座；进入超大规模向量检索阶段后再评估引入 `Milvus`；`Elasticsearch` 主要用于满足全文检索或混合检索兼容需求。
:::

## 上下游关系

上游层级：

- [数据治理层](/layers/data-governance-layer)

下游层级：

- [Agent 编排层](/layers/agent-orchestration)
- [模型网关与推理层](/layers/model-gateway-inference)

标准链路为：

`治理后资产 → 索引构建 → 检索 / 过滤 / 重排 → 引用上下文 → 编排层`

## 边界

本层不承担以下职责：

- **上游数据治理**：不替代 [数据治理层](/layers/data-governance-layer) 的数据采集、建模与元数据治理。
- **工作流状态管理**：不承担业务工作流状态管理与多 Agent 编排。
- **模型路由与配额**：不直接承担模型统一路由与配额控制。
- **越权知识暴露**：不得绕过权限标签与数据范围约束，将知识无差别暴露给所有应用。

## 关键链路

### 1. 索引构建链路

1. 治理后的数据资产进入知识工程流水线。
2. `LlamaIndex` 负责文档切片、索引编排与知识组织。
3. 向量或全文索引写入 `Weaviate`、`Milvus` 或 `Elasticsearch`。

### 2. 在线检索链路

1. 编排层向检索层发起查询请求。
2. 检索层依据权限语义、标签与场景条件执行召回与过滤。
3. 检索结果按引用规范组织后返回编排层。

## 治理要求

- **来源与版本可追溯**：知识条目须可追溯至原始数据资产与发布时间。
- **权限语义继承**：检索执行过程须继承数据分类分级与访问控制语义。
- **刷新与失效机制**：知识更新须具备定时刷新与过期失效机制，避免长期返回陈旧内容。
- **多维度检索评测**：效果评测应覆盖召回率、准确性、引用质量与权限过滤正确性。

## 部署与发布要求

- **保持单一主向量底座**：默认收敛为单一主向量底座，避免无必要的双底座长期并行。
- **读写资源分离**：索引构建与在线检索的计算资源建议分离，避免离线任务抢占在线时延。
- **按需引入全文检索**：仅在业务明确需要时引入全文检索能力，防止检索栈无序膨胀。
- **与数据发布联动**：知识发布须与数据治理层的资产发布节奏保持联动，而非各自独立演化。

## 风险与取舍

- **直连原始数据导致失真**：若知识层绕过数据治理直接接入原始数据，检索效果与权限控制均会失真。
- **多检索栈推高复杂度**：同时维护过多向量库与检索方案将显著增加运维与评测复杂度。
- **缺乏引用难以审计**：缺少来源与引用管理的检索结果难以支撑企业级可审计业务场景。

## 关联文档

- [数据治理层](/layers/data-governance-layer)
- [Agent 编排层](/layers/agent-orchestration)
- [模型网关与推理层](/layers/model-gateway-inference)
- [典型场景](/scenarios)

## 参考资料

- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [Weaviate Documentation](https://docs.weaviate.io/)
- [Milvus Documentation](https://milvus.io/docs)
- [Elasticsearch Reference](https://www.elastic.co/docs)
