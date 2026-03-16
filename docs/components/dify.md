# Dify

> 类型：主平台路线候选
>
> 复用规则：互斥候选的组件说明页
>
> 所属层：Agent 编排层
>
> 官方网站：https://docs.dify.ai/
>
> 开源仓库地址：https://github.com/langgenius/dify

## 当前定位

`Dify` 是当前方案的主平台路线候选之一，适合承载标准化场景应用、低代码工作流和业务快速交付。

## 主要职责

- 应用发布
- Chatflow / Workflow
- 标准知识问答
- 工具集成和业务试点

## 与其他组件关系

- 上游通常由 [AgentifUI](/components/agentifui) 或企业门户承接用户入口。
- 向下通过 [LiteLLM](/components/litellm) 接入模型能力，通过知识层接入检索能力。
- 与 [LangFuse](/components/langfuse) 配合做链路观测和评测样本回放。
- 与 [LangGraph](/components/langgraph) 的关系是补位而非长期双主平台并行。

## 适合场景

- 企业知识助手
- 服务台助手
- 快速试点和多应用交付

## 边界

- 不应与其他主平台路线长期并行
- 不替代门户层和统一控制面
- 不承载全部复杂企业流程

## 采用规则

- `Dify / RAGFlow / Coze Studio` 三者属于主平台路线互斥候选，实施时只选一条主路线。
- 当目标是快速交付标准化应用、知识助手和低代码工作流时，`Dify` 是优先候选之一。
- 如果场景重心转向超长状态机、复杂恢复和深度工程编排，应由 [LangGraph](/components/langgraph) 或定制服务补强，而不是在主平台中无限堆复杂度。

## 治理注意点

- 工作流、提示词、工具配置和外部连接需要版本化管理。
- 工具调用和数据访问仍应纳入统一权限与审计规则，不能因为低代码而绕过治理。
- `Dify` 的许可证口径需与 [开源状态与许可证说明](/open-source-status) 保持一致，不能按标准宽松许可证简单表述。
- 发布前应结合 LLM 观测、压测和关键链路回归评估。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [技术选型](/stack)
- [典型场景](/scenarios)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Dify Documentation](https://docs.dify.ai/)
- [Dify GitHub Repository](https://github.com/langgenius/dify)
