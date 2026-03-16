# Coze Studio

> 类型：主平台路线候选
>
> 复用规则：互斥候选的组件说明页
>
> 所属层：Agent 编排层

## 当前定位

`Coze Studio` 是当前方案的主平台路线候选之一，适合构建 Agent、工作流以及面向业务的标准化智能应用。

## 主要职责

- Agent 搭建
- 工作流编排
- 标准应用交付
- 面向业务团队的快速生产

## 与其他组件关系

- 上游可由 [AgentifUI](/components/agentifui) 或企业门户承接统一应用入口。
- 向下通过模型层、知识层和治理层获得模型、检索和审计能力。
- 与 [LangGraph](/components/langgraph)、[LangChain](/components/langchain) 的关系是补位，不建议长期并行形成双控制面。
- 需要与统一身份、权限和发布治理配套使用。

## 适合场景

- 部门级助手
- 多应用试点
- 需要快速运营的业务助手

## 边界

- 不应与其他主平台路线长期并行
- 不替代门户层和统一控制面
- 不替代复杂定制编排框架

## 采用规则

- `Dify / RAGFlow / Coze Studio` 为互斥主平台路线，正式实施时只保留一条主路线。
- 当目标是快速构建 Agent、工作流和业务可运营应用时，`Coze Studio` 可以作为候选。
- 如果需要深度工程编排、复杂状态恢复和自研服务沉淀，应由专门运行时补强，而不是把所有复杂度压进主平台。

## 治理注意点

- 应用、工作流、工具配置和发布流程需要纳入统一版本与审计管理。
- 与企业身份体系和权限策略的衔接要在实施前明确。
- 任何外部工具调用都不应绕过统一的安全和审计边界。
- 落地时应同时核对开源口径、部署方式和实际功能边界。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [技术选型](/stack)
- [典型场景](/scenarios)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Coze Studio GitHub Repository](https://github.com/coze-dev/coze-studio)
