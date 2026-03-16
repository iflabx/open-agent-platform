# RAGFlow

> 类型：主平台路线候选
>
> 复用规则：互斥候选的组件说明页
>
> 所属层：Agent 编排层
>
> 官方网站：https://ragflow.io/
>
> 开源仓库地址：https://github.com/infiniflow/ragflow

## 当前定位

`RAGFlow` 是当前方案的主平台路线候选之一，更偏向知识接入、检索质量和上下文构建主链路。

## 主要职责

- 文档接入与清洗
- 切片、索引、检索和重排
- 知识密集型智能体场景

## 与其他组件关系

- 上游通常由 [AgentifUI](/components/agentifui) 或企业门户承接用户交互。
- 与 [LlamaIndex](/components/llamaindex)、[Weaviate](/components/weaviate) 等知识层能力有强协同关系。
- 向下通过 [LiteLLM](/components/litellm) 和 [vLLM](/components/vllm) 使用模型能力。
- 需要与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 等治理与观测能力配套使用。

## 适合场景

- 企业知识库
- 文档问答
- 强 RAG 依赖的场景

## 边界

- 不应与其他主平台路线长期并行
- 不替代门户层和统一控制面
- 需要与权限治理和对象存储配套设计

## 采用规则

- `Dify / RAGFlow / Coze Studio` 三者属于互斥主平台路线，实施时只选一条主路线。
- 当场景主要围绕知识接入、检索质量和引用上下文构建时，`RAGFlow` 是优先候选之一。
- 即便采用 `RAGFlow`，数据治理、权限过滤和对象存储边界仍需保持外置，不应把所有数据职责都收进主平台。

## 治理注意点

- 文档接入、切片、检索和引用链路需要保留来源追踪与发布时间信息。
- 知识访问应继承上游身份与权限语义，避免“检索可见范围”失控。
- 与对象存储、元数据治理和统一观测链路的关系要在实施时明确。
- 发布前应验证知识更新、引用质量和权限过滤是否符合预期。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [6. 知识与检索层](/layers/knowledge-retrieval)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [典型场景](/scenarios)

## 参考资料

- [RAGFlow](https://ragflow.io/)
- [RAGFlow GitHub Repository](https://github.com/infiniflow/ragflow)
