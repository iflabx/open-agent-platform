# LangChain

> 类型：定制化业务编排框架
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：Agent 编排层

## 当前定位

`LangChain` 用于承载复杂场景下的定制化业务编排、自研工具链集成和工程化开发。

## 主要职责

- 复杂工具编排
- 业务状态控制
- 自研 Agent 服务开发
- 与外部系统深度集成

## 与其他组件关系

- 常与 [LangGraph](/components/langgraph) 组合，由 `LangChain` 负责应用开发、工具集成和链路组织。
- 向下通过 [LiteLLM](/components/litellm) 接入模型，通过知识层接入检索能力。
- 与主平台路线的关系是工程化补位，不建议把 `LangChain` 单独当作企业统一平台中枢。
- 与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 配合纳入授权和观测链路。

## 适合场景

- 标准平台无法覆盖的复杂业务
- 需要深度调用内部系统的 Agent 服务

## 边界

- 不替代主平台中枢
- 不独立承担企业知识主平面

## 采用规则

- 当业务需要深度工程定制、自研工具链和复杂系统集成时，引入 `LangChain`。
- `LangChain` 不是主平台路线的替代品，而是复杂场景下的工程补位能力。
- 是否与 `LangGraph` 组合，取决于是否需要显式状态图、恢复能力和人工介入。

## 治理注意点

- 工具适配层、外部 API、提示词和业务链路代码要纳入版本管理。
- 对内部系统的深度接入需要明确调用边界、凭证管理和审计要求。
- 自研 Agent 服务不应绕过统一入口、统一模型网关和统一授权链路。
- 发布前需要补齐关键链路测试和容量评估。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [LangGraph](/components/langgraph)
- [技术选型](/stack)
- [部署与发布](/deployment)

## 参考资料

- [LangChain Documentation](https://docs.langchain.com/)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain)
