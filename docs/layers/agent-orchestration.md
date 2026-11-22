# 4. Agent 编排层

> 定位：负责应用工作流、工具调用、状态管理、人工介入与多 Agent 协作。
>
> 当前承载组件：`Dify`、`RAGFlow`、`Coze Studio`、`LangGraph`、`LangChain`、`Letta`。

相关文档：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)
- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [Letta](/components/letta)

## 本层定义

Agent 编排层是平台承载 Agent Runtime 的核心执行层，负责将应用、工作流、工具调用、知识检索、模型推理与人工介入组织为可运行、可回放、可治理的执行链路。

## 本层功能

- **多形态流程管理**：管理应用工作流、Chatflow 与多步骤复杂任务。
- **工具与人工介入承接**：统一承接工具调用、外部 API 调用与人工介入（Human-in-the-Loop）节点。
- **状态与任务恢复**：维护执行状态、会话上下文与长链路任务断点恢复。
- **跨层能力编排**：将知识检索、模型推理与安全治理能力编排为完整的业务流程。

## 当前承载组件

主平台路线（三选一互斥候选）：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)

配套运行时组件：

- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [Letta](/components/letta)

::: tip 收敛约束
`Dify`、`RAGFlow`、`Coze Studio` 作为主平台路线采取单轨收敛，不长期并行部署；`LangGraph`、`LangChain`、`Letta` 按业务复杂度与场景需求条件配合引入。
:::

## 上下游关系

上游层级：

- [门户与应用层](/layers/portal-application)
- [统一接入与流量治理层](/layers/access-traffic-governance)

下游层级：

- [数据治理层](/layers/data-governance-layer)
- [知识与检索层](/layers/knowledge-retrieval)
- [模型网关与推理层](/layers/model-gateway-inference)
- [治理与观测层](/layers/governance-observability)

推荐链路为：

`门户请求 → 编排层 → 检索 / 模型 / 策略 → 结果回写门户`

## 边界

本层不承担以下职责：

- **门户与入口替代**：不替代门户工作台与统一北向接入层。
- **源数据直连**：不得绕过 [数据治理层](/layers/data-governance-layer) 直接读取原始业务数据。
- **治理规则私有化**：不将细粒度授权与平台级审计收敛为各编排工具的私有规则。
- **多控制面并行**：不将多条主平台路线长期并行部署为重复的控制面。

## 关键链路

### 1. 标准应用链路

1. 门户将用户请求送入编排层。
2. 编排层按应用定义选择工作流、工具与知识调用路径。
3. 按需调用检索层、模型层与治理层能力。
4. 汇总执行结果并回传至门户或外部系统。

### 2. 长链路任务链路

1. 编排层创建状态化长任务实例。
2. 任务在工具调用、人工介入与事件等待之间按状态机切换。
3. 任务恢复时沿既定状态图继续推进。

## 治理要求

- **资产版本化**：工作流、提示词、工具清单与外部连接配置必须纳入版本管理。
- **工具调用受控**：工具调用须具备白名单与审批边界，防止任意应用越权调用。
- **容错与回滚机制**：人工介入、回滚、超时控制与失败补偿需具备清晰机制。
- **执行全链路可观测**：编排过程与结果须接入统一观测链路，避免形成黑盒执行。

## 部署与发布要求

- **逻辑分层部署**：主平台路线与复杂运行时应逻辑分层部署，避免单一系统承担全部职责。
- **运行资源池隔离**：长任务、异步任务与交互式会话建议拆分独立的运行资源池。
- **配置与发布解耦**：编排发布须与模型、知识、策略配置解耦，避免将所有变更绑定为单次全量发布。
- **单轨试点演进**：试点阶段优先收敛一条主平台路线，再视场景复杂度逐步引入配套运行时补强。

## 风险与取舍

- **多轨并行推高成本**：多条主平台路线长期并行将导致培训、运维与治理成本成倍增长。
- **绕过治理放大风险**：若编排层绕过统一治理链路，安全与合规风险将被放大至全部应用。
- **状态复杂度递增**：随任务状态与外部工具数量增加，回放、审计与故障恢复难度显著上升，须前置设计治理能力。

## 关联文档

- [门户与应用层](/layers/portal-application)
- [知识与检索层](/layers/knowledge-retrieval)
- [模型网关与推理层](/layers/model-gateway-inference)
- [典型场景](/scenarios)

## 参考资料

- [Dify Documentation](https://docs.dify.ai/)
- [RAGFlow](https://ragflow.io/)
- [Coze Studio](https://github.com/coze-dev/coze-studio)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangChain Documentation](https://docs.langchain.com/)
- [Letta Documentation](https://docs.letta.com/)
