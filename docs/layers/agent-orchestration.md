# 4. Agent 编排层

> 定位：负责应用工作流、工具调用、状态管理、人工介入和多 Agent 协作。
>
> 当前承载组件：`Dify`、`RAGFlow`、`Coze Studio`、`LangGraph`、`LangChain`、`Letta`。

相关文档：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)
- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [Letta](/components/letta)

## 一、本层定义

Agent 编排层是平台真正承载“智能体运行时”的地方，负责把应用、工作流、工具、知识调用、模型调用和人工介入组织成可运行、可回放、可治理的执行链路。

## 二、本层功能

- 管理应用工作流、Chatflow 和多步骤任务。
- 统一承接工具调用、外部 API 调用和人工介入节点。
- 维护执行状态、会话上下文和长链路任务恢复。
- 把知识检索、模型推理和治理能力编排成完整业务流程。

## 三、当前承载组件

主平台路线三选一：

- [Dify](/components/dify)
- [RAGFlow](/components/ragflow)
- [Coze Studio](/components/coze-studio)

配套运行时组件：

- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)
- [Letta](/components/letta)

当前规则保持不变：`Dify / RAGFlow / Coze Studio` 作为主平台路线不长期并行，`LangGraph`、`LangChain`、`Letta` 按复杂度和场景条件配合使用。

## 四、上下游关系

上游层级：

- [门户与应用层](/layers/portal-application)
- [统一接入与流量治理层](/layers/access-traffic-governance)

下游层级：

- [数据治理层](/layers/data-governance-layer)
- [知识与检索层](/layers/knowledge-retrieval)
- [模型网关与推理层](/layers/model-gateway-inference)
- [治理与观测层](/layers/governance-observability)

推荐链路为：

`门户请求 -> 编排层 -> 检索 / 模型 / 策略 -> 结果回写门户`

## 五、边界

本层不应越界成以下角色：

- 不替代门户工作台和统一入口。
- 不绕过 [数据治理层](/layers/data-governance-layer) 直接读取原始业务数据。
- 不把细粒度授权和平台级审计内置成各编排工具私有规则。
- 不把主平台路线长期并行部署为多套重复控制面。

## 六、关键链路

### 1. 标准应用链路

1. 门户把用户请求送入编排层。
2. 编排层选择工作流、工具和知识调用路径。
3. 按需调用检索层、模型层和治理层。
4. 汇总结果并回传门户或外部系统。

### 2. 长链路任务链路

1. 编排层创建状态化任务。
2. 任务在工具调用、人工介入和等待事件之间切换。
3. 任务恢复时继续沿既定状态图推进。

## 七、治理要求

- 工作流、提示词、工具清单和外部连接配置必须版本化。
- 工具调用要有白名单和审批边界，不能让任意应用直接扩权。
- 人工介入、回滚、超时和失败补偿需要有清晰机制。
- 编排结果应接入统一观测链路，避免形成黑盒执行。

## 八、部署与发布要求

- 主平台路线与复杂运行时应逻辑分层部署，避免一个系统承担全部职责。
- 长任务、异步任务和交互式会话建议拆分运行资源池。
- 编排发布要能和模型、知识、策略配置解耦，不把所有变更绑成一次发布。
- 试点阶段先收敛一条主平台路线，再逐步引入复杂运行时补强。

## 九、风险与取舍

- 多条主平台路线长期并行会导致培训、运维和治理成本翻倍。
- 编排层如果绕过治理链路，会把安全风险放大到所有应用。
- 状态和工具越多，回放、审计和恢复难度越高，必须提前设计治理能力。

## 十、关联文档

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
