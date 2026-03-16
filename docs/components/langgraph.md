# LangGraph

> 类型：生产级 Agent Runtime
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：Agent 编排层

## 当前定位

`LangGraph` 是当前方案自研复杂 Agent 服务的生产级运行时，负责长时运行、有状态工作流、失败恢复和人工介入能力。

## 主要职责

- 有状态工作流执行
- 长时运行与检查点恢复
- 人工介入与流程恢复
- 复杂 Agent 状态控制

## 与其他组件关系

- 常与 [LangChain](/components/langchain) 组合使用，由 `LangChain` 负责工具与应用开发骨架，由 `LangGraph` 负责状态图运行。
- 与 [Dify](/components/dify)、[RAGFlow](/components/ragflow)、[Coze Studio](/components/coze-studio) 的关系是复杂场景补位，而不是第二套主平台路线。
- 通过 [LiteLLM](/components/litellm) 调用模型，通过知识层接入检索和引用能力。
- 与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 配合完成授权、追踪和回放。

## 适合场景

- 长链路业务 Agent
- 需要持久化和失败恢复的 Agent 服务
- 需要人工审批或人工接管的复杂流程

## 边界

- 不替代主平台中枢
- 通常与 `LangChain` 组合使用，而不是替代 `LangChain`

## 采用规则

- 标准化、低复杂度场景优先使用主平台路线，只有在状态管理、恢复能力和人工介入要求显著上升时再引入 `LangGraph`。
- `LangGraph` 主要用于复杂自研运行时，不建议让所有应用默认进入这条工程化路线。
- 引入后应明确哪些流程由主平台承载，哪些流程由状态图运行时承载，避免职责重叠。

## 治理注意点

- 状态图、检查点、人工介入节点和恢复策略需要版本化管理。
- 长任务和异步任务要有超时、补偿和回放机制。
- 外部工具调用和数据访问必须纳入统一授权与审计。
- 复杂运行时发布前应重点验证恢复链路和人工介入路径。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [LangChain](/components/langchain)
- [典型场景](/scenarios)
- [安全与治理](/governance)

## 参考资料

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangGraph GitHub Repository](https://github.com/langchain-ai/langgraph)
