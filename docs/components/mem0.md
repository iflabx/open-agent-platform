# Mem0

> 类型：可插拔长期记忆层
>
> 采用定位：条件引入（可审计、无运行时锁定的长期记忆组件）
>
> 所属层：Agent 编排层
>
> 官方网站：https://mem0.ai/
>
> 开源仓库地址：https://github.com/mem0ai/mem0

## 当前定位

`Mem0` 是本方案 Agent 编排层条件引入的可插拔长期记忆层，采用 `Apache-2.0` 许可证。其核心价值在于将跨会话的用户偏好、实体事实与历史交互上下文抽象为独立、透明且易于审计的记忆读写接口，可平滑嵌入 [LangGraph](/components/langgraph)、[Dify](/components/dify) 或 [RAGFlow](/components/ragflow) 等既有编排链路中，**不要求替换现有 Agent Runtime，避免形成操作系统级运行时锁定**。

::: tip 状态记忆路径选择
若业务仅需在自研工作流内维护受控的会话状态与检查点历史，可直接使用 [LangGraph](/components/langgraph) + [PostgreSQL](/components/postgresql) Checkpointer 承接，无需额外引入独立长期记忆组件。
:::

## 主要职责

- **跨会话长期记忆抽取与检索**：从多轮对话与任务交互中抽取结构化记忆条目，并在后续会话中按相关性召回。
- **分层记忆作用域隔离**：支持按用户、会话、Agent 或租户维度划分记忆边界，避免个体化记忆越界共享。
- **记忆更新、去重与冲突消解**：对新增事实与既有记忆执行增量更新、合并与过期清理，降低陈旧上下文污染。
- **可审计记忆存取接口**：以透明的读写 API 暴露记忆内容与变更记录，便于企业安全审校、人工纠偏与合规删除。

## 与其他组件关系

- **可插拔嵌入主流编排栈**：作为独立记忆层嵌入 [LangGraph](/components/langgraph)、[Dify](/components/dify) 或 [RAGFlow](/components/ragflow)，不取代上述平台的编排主控权。
- **复用平台既有基础设施底座**：底层向量存储与结构化元数据优先复用平台既有 [Weaviate](/components/weaviate) / [PostgreSQL](/components/postgresql) 底座，避免无序扩张数据库类型。
- **通过 [LiteLLM](/components/litellm) 调用模型**：记忆抽取、摘要压缩与向量化所需模型调用统一经由 `LiteLLM` 路由，不直连底层推理节点或外部 API。
- **与 [6. 知识与检索层](/layers/knowledge-retrieval) 职责分离**：企业共享知识资产归属知识与检索层，`Mem0` 仅承载面向特定主体或协作上下文的动态长期记忆。
- **与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 联动**：记忆读取与写入须受统一权限策略约束，并纳入全链路追踪与审计体系。

## 适合场景

- 需要记住用户偏好、历史决策与长期协作上下文的专业助手
- 面向高价值业务角色的长周期、跨会话跟进型 Agent
- 需要在不替换现有 `LangGraph` / `Dify` / `RAGFlow` 运行时的前提下，快速补齐可审计长期记忆能力的场景

## 边界

- **不作为所有应用的默认能力**：标准问答、短会话与一次性工作流不默认启用。
- **不替代企业知识主平面**：组织级制度、文档与权威业务数据必须保留在 [6. 知识与检索层](/layers/knowledge-retrieval) 与业务系统中，不得沉淀为私有记忆副本。
- **不替代有状态工作流检查点**：任务执行状态、审批挂起与失败恢复归属 [LangGraph](/components/langgraph) + [PostgreSQL](/components/postgresql) Checkpointer。
- **不替代统一权限裁决**：记忆召回不能绕过 [Casbin](/components/casbin) 与企业数据分类分级规则。

## 采用规则

- **条件引入**：仅在业务明确存在跨会话长期记忆与个体化上下文需求时启用 `Mem0`。
- **优先评估受控状态方案**：若需求仅限于可控的多轮状态保存与会话恢复，优先使用 `LangGraph` + `PostgreSQL` Checkpointer，降低组件复杂度。
- **避免运行时锁定**：不以操作系统级有状态 Agent Runtime（如 [Letta](/components/letta)）作为默认记忆承载方式，保持编排栈与记忆层解耦。

## 治理注意点

- **记忆生命周期与删除权**：须明确记忆的保留周期（TTL）、人工查看、纠偏与彻底删除机制，满足数据合规要求。
- **防止记忆污染与幻觉固化**：对写入长期记忆的内容设置校验或置信度门槛，避免将单次错误推理或临时指令固化为长期事实。
- **严格隔离与防越权复用**：记忆检索必须强制绑定租户、组织与用户主体标识，严禁跨用户或跨密级串读记忆。
- **统一模型与观测治理**：记忆抽取所产生的隐式 LLM 调用须计入统一 Token 预算、速率限制与 `LangFuse` 链路观测。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [LangGraph](/components/langgraph)
- [Letta（非主线参考）](/components/letta)
- [6. 知识与检索层](/layers/knowledge-retrieval)
- [安全与治理](/governance)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Mem0 Official Website](https://mem0.ai/)
- [Mem0 GitHub Repository](https://github.com/mem0ai/mem0)
