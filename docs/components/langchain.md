# LangChain

> 类型：`LangGraph` 体系生态工具包与连接器
>
> 采用定位：条件引入（`LangGraph` 体系生态工具包与连接器，不作为核心业务编排支柱）
>
> 所属层：Agent 编排层
>
> 官方网站：https://docs.langchain.com/
>
> 开源仓库地址：https://github.com/langchain-ai/langchain

## 当前定位

`LangChain` 在本方案中收敛为**条件引入的 `LangGraph` 体系生态工具包与连接器**，不再作为核心业务编排支柱。生产级复杂自研 Agent 编排以 [LangGraph](/components/langgraph) 为核心运行骨架；简单模型推理与工具调用可直接使用原生 SDK（如 `OpenAI` 兼容 SDK）对接 [LiteLLM](/components/litellm) 与 [agentgateway](/components/agentgateway)；仅当需要复用成熟的模型、工具或文档生态适配器时，才按需引入 `LangChain` 对应模块。

::: tip 工程栈收敛原则
- **复杂生产编排归属 `LangGraph`**：有状态图执行、检查点持久化、失败恢复与人工介入均以 `LangGraph` 为主。
- **简单调用优先原生 SDK**：避免仅为单次模型调用或轻量工具调用引入过重的链式抽象层。
- **按需复用 `LangChain` 生态连接器**：仅在需要快速接入其标准模型包装、工具适配或文档加载生态时局部引用。
:::

## 主要职责

- **生态连接器与适配器**：为 [LangGraph](/components/langgraph) 节点按需提供标准化的模型包装、工具封装（Tool Wrapper）与第三方生态连接器。
- **文档与检索适配辅助**：在特定自研脚本或工程链路中，按需复用社区现成的文档加载器与输出解析工具。

## 与其他组件关系

- **从属于 [LangGraph](/components/langgraph) 工程生态**：复杂业务流程的控制流、状态持久化与恢复由 `LangGraph` 主导，`LangChain` 仅作为可选的模型、工具与文档生态适配层配合使用。
- **向下经由统一网关调用**：所有模型请求仍须通过 [LiteLLM](/components/litellm)（`OpenAI 兼容 API`）路由，南向外部工具调用须经由 [agentgateway](/components/agentgateway) 治理。
- **与主平台路线解耦**：标准低代码与知识应用由 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 承接，`LangChain` 不承担企业统一平台中枢职责。
- **与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 配合**：所有自研节点与生态调用均须纳入统一授权与观测链路。

## 适合场景

- 基于 [LangGraph](/components/langgraph) 开发复杂自研 Agent 时，需要快速复用社区现成的模型、工具或文档加载适配器
- 团队已有既定 `LangChain` 生态连接器资产，需要在统一网关与治理边界内平滑复用

## 边界

- **不作为核心业务编排支柱**：复杂多步状态控制与生产编排归属 [LangGraph](/components/langgraph)，不再以传统 `LangChain` 隐式链（Chain）承载核心生产流程。
- **不替代原生 SDK**：简单模型对话、结构化输出与轻量工具调用优先采用标准 `OpenAI` 兼容原生 SDK，减少抽象黑盒与版本升级负担。
- **不替代主平台中枢与知识平面**：不替代 [Dify](/components/dify) / [RAGFlow](/components/ragflow)，也不独立承担企业知识主平面与数据治理职责。

## 采用规则

- **条件引入、按需裁剪**：仅作为 `LangGraph` 体系的可选生态工具包与连接器按需引入，不作为所有自研服务的强制依赖。
- **严控抽象层级**：优先使用轻量模块化子包与显式代码逻辑，避免引入高度封装的隐式 Agent 执行器导致调试、排障与版本升级困难。
- **简单场景直用原生 SDK**：对于无复杂生态适配需求的模型与工具调用，直接使用原生 SDK 对接 [LiteLLM](/components/litellm) 与 MCP 工具网关。

## 治理注意点

- **依赖版本锁定**：`LangChain` 生态子包迭代频繁，生产工程须严格锁定依赖版本并做好离线制品库镜像。
- **调用边界与凭据管控**：禁止在生态连接器中硬编码外部 API Key 或绕过 [LiteLLM](/components/litellm) 与 [agentgateway](/components/agentgateway) 直连外部服务。
- **可观测性透传**：接入生态适配器时须确保 Trace Context 与业务上下文完整透传至 [LangFuse](/components/langfuse) 与 `OpenTelemetry`。
- **关键链路测试**：对复用社区连接器的关键业务节点须补齐单元测试、超时控制与降级策略。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [LangGraph](/components/langgraph)
- [技术选型](/stack)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [LangChain Documentation](https://docs.langchain.com/)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain)
