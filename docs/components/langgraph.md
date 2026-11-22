# LangGraph

> 类型：生产级 Agent Runtime
>
> 采用定位：条件引入（复杂自研编排的核心生产级 Agent Runtime）
>
> 所属层：Agent 编排层
>
> 官方网站：https://www.langchain.com/langgraph
>
> 开源仓库地址：https://github.com/langchain-ai/langgraph

## 当前定位

`LangGraph` 是本方案自研复杂 Agent 服务的核心生产级 Agent Runtime，承担复杂多步状态编排、长时运行、检查点持久化恢复与人工介入（Human-in-the-Loop）能力。在自研工程路线中，生产级复杂编排以 `LangGraph` 为核心；简单模型与工具调用可直接使用原生 SDK，[LangChain](/components/langchain) 仅作为可选的模型、工具与文档生态连接器按需配合。

## 主要职责

- **显式有状态工作流执行**：以确定性状态图组织复杂多步推理、循环校验与条件分支。
- **长时运行与检查点恢复**：基于 [PostgreSQL](/components/postgresql) Checkpointer 实现状态持久化、断点续跑与受控会话状态记忆。
- **人工介入与审批恢复**：支持在关键业务节点挂起流程、等待人工审批或参数修正后恢复执行。
- **复杂 Agent 状态与并行控制**：支撑多 Agent 协同、子图复用与细粒度失败补偿。

## 与其他组件关系

- **与 [LangChain](/components/langchain) 的主次关系**：`LangGraph` 承担核心生产编排与状态图运行；`LangChain` 仅作为可选生态工具包与连接器按需提供模型、工具或文档适配，节点内亦可直接采用原生 SDK 调用模型与工具。
- **与 [PostgreSQL](/components/postgresql) 及 [Mem0](/components/mem0) 协同**：通过 `LangGraph` + `PostgreSQL` Checkpointer 即可覆盖大多数受控有状态会话与工作流记忆需求；当确需跨会话长期记忆抽象时，可平滑嵌入条件引入的 [Mem0](/components/mem0)。
- **与 [Dify](/components/dify)、[RAGFlow](/components/ragflow) 分工互补**：主平台路线承担标准可视化与知识应用，仅当编排复杂度、恢复能力或深度工程定制超出主平台边界时由 `LangGraph` 补位，不演变为第二套通用主平台。
- **经由统一网关与治理底座运行**：向下通过 [LiteLLM](/components/litellm) 调用模型、经由 [agentgateway](/components/agentgateway) 调用南向工具，并与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 配合完成授权、追踪与回放。

## 适合场景

- 长链路、多分支且需要确定性状态控制的复杂业务 Agent
- 需要状态持久化、断点恢复与失败重试的自研 Agent 服务
- 需要人工审批、人工接管（Maker-Checker）或异步回调恢复的关键业务流程
- 需要通过 `PostgreSQL` Checkpointer 实现受控有状态记忆的工程化场景

## 边界

- **不替代主平台中枢**：标准化问答与低代码工作流优先由 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 承接。
- **不强依赖重型链式抽象**：不要求所有节点都绑定 `LangChain` 抽象，简单模型或工具调用可直接采用原生 SDK。
- **不替代企业知识主平面与统一网关**：不绕过知识与检索层、[LiteLLM](/components/litellm) 与 [agentgateway](/components/agentgateway)。

## 采用规则

- **复杂工程场景核心运行时**：标准化、低复杂度场景优先使用主平台路线；当状态管理、恢复能力和人工介入要求显著上升时，以 `LangGraph` 作为唯一核心自研生产编排运行时。
- **按需搭配生态与记忆能力**：简单调用直接使用原生 SDK，确需生态适配时局部引入 [LangChain](/components/langchain)；受控状态记忆优先使用 `LangGraph` + `PostgreSQL` Checkpointer，跨会话长期记忆按需嵌入 [Mem0](/components/mem0)。
- **明确应用分界**：引入后应明确哪些流程由主平台承载、哪些流程由状态图运行时承载，避免职责重叠。

## 治理注意点

- **状态图与检查点版本化**：状态图定义、Checkpointer Schema、人工介入节点与恢复策略须纳入版本管理，确保跨版本升级不破坏在途任务恢复。
- **超时与补偿机制**：长任务与异步任务须配置显式超时、死信处理、幂等补偿与回放验证机制。
- **统一授权与审计**：节点内的外部工具调用、沙箱执行与数据访问须严格纳入 [Casbin](/components/casbin)、[agentgateway](/components/agentgateway) 与 [LangFuse](/components/langfuse) 治理链路。
- **发布前回归验证**：复杂运行时上线前须重点验证断点恢复、人工审批挂起/恢复与异常回退路径。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [LangChain](/components/langchain)
- [Mem0](/components/mem0)
- [PostgreSQL](/components/postgresql)
- [典型场景](/scenarios)
- [安全与治理](/governance)

## 参考资料

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangGraph GitHub Repository](https://github.com/langchain-ai/langgraph)
