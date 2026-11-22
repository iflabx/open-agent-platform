# Letta

> 类型：操作系统级有状态 Agent 运行时（非主线参考）
>
> 采用定位：非主线参考（不作为默认长期记忆组件；条件引入长期记忆默认采用 [Mem0](/components/mem0)）
>
> 所属层：Agent 编排层（仅作特定有状态运行时参考）
>
> 官方网站：https://docs.letta.com/
>
> 开源仓库地址：https://github.com/letta-ai/letta

## 当前定位

`Letta` 是一款面向长期记忆与自我编辑上下文的操作系统级有状态 Agent Runtime，采用 `Apache-2.0` 许可证。在本方案中，`Letta` 定位为**非主线参考**，不作为默认的长期记忆承载组件；当业务确有跨会话长期记忆需求时，方案默认条件引入可插拔、易审计的 [Mem0](/components/mem0)，或在自研工作流场景下使用 [LangGraph](/components/langgraph) + [PostgreSQL](/components/postgresql) Checkpointer 承接受控状态记忆。

::: info 不作为默认长期记忆方案的客观原因
1. **操作系统级有状态运行时锁定**：`Letta` 将长期记忆深度耦合在其专有的 Agent Runtime、服务化状态机与记忆管理循环中，企业若直接采用往往需要把整套 Agent 执行栈迁入 `Letta`，与既有的 [LangGraph](/components/langgraph)、[Dify](/components/dify) 或 [RAGFlow](/components/ragflow) 编排栈产生重叠与绑定。
2. **记忆行为审计与治理成本高**：自我编辑内存（Self-editing Memory）机制在企业级安全与合规审校中不易实现确定性追踪与细粒度人工干预，相较独立可插拔的记忆层（[Mem0](/components/mem0)）或显式状态图检查点（`LangGraph` + `PostgreSQL` Checkpointer）可控性更低。
3. **架构收敛优先**：本方案强调编排运行时与记忆存储解耦，避免为了补齐长期记忆能力而额外引入第二套重型 Agent Runtime。
:::

## 主要职责（仅限独立评估参考）

- 操作系统级分层内存与自我编辑上下文管理
- 长期持续状态维护与多轮个体化助手运行
- 独立有状态 Agent 服务托管

## 与其他组件关系

- **与 [Mem0](/components/mem0) 的取舍关系**：`Mem0` 作为独立、可插拔的长期记忆层，可无侵入嵌入 `LangGraph` / `Dify` / `RAGFlow`；`Letta` 则是一套完整有状态运行时，二者在架构定位上不建议并行堆叠。
- **与 [LangGraph](/components/langgraph) 的关系**：复杂长时运行与受控状态恢复由 `LangGraph` + [PostgreSQL](/components/postgresql) Checkpointer 承担，`Letta` 不替代生产级状态图运行时。
- **与治理层边界**：若在特定实验或专项场景评估 `Letta`，其模型调用仍须经由 [LiteLLM](/components/litellm)，记忆数据、权限语义与删除策略须纳入统一治理体系。

## 适合场景（仅限特定约束下的独立评估）

- 专项研究或探索性长周期自治伴随式 Agent
- 团队明确愿意以 `Letta` 作为独立实验性运行时，且不要求与主平台编排栈共享执行状态机的封闭场景

## 边界

- 不纳入本方案默认长期记忆基线
- 不替代主平台中枢（[Dify](/components/dify) / [RAGFlow](/components/ragflow)）、[LangGraph](/components/langgraph) 与企业知识主平面
- 不用于标准问答、短会话与常规业务流程

## 采用规则

- **优先采用可插拔或受控状态路径**：跨会话长期记忆默认条件引入 [Mem0](/components/mem0)；受控工作流状态记忆优先使用 [LangGraph](/components/langgraph) + [PostgreSQL](/components/postgresql) Checkpointer。
- **非主线独立评估**：仅在业务团队有明确专项需求且充分评估运行时锁定与审计成本后，才可将 `Letta` 作为局部独立试点，不得将其扩张为企业通用编排底座。

## 治理注意点

- **运行时与记忆治理隔离**：须明确记忆的保留周期、更新审计、人工纠偏与合规删除路径，防止自我编辑记忆引入不可控幻觉或陈旧上下文污染。
- **权限与密级边界**：个体化状态不得绕过统一身份认证、[Casbin](/components/casbin) 权限策略与企业数据分类分级要求。
- **统一网关约束**：严禁绕过 [LiteLLM](/components/litellm) 与 [LangFuse](/components/langfuse) 直连外部模型或隐藏隐式记忆维护调用。

## 关联文档

- [Mem0（条件引入长期记忆层）](/components/mem0)
- [4. Agent 编排层](/layers/agent-orchestration)
- [LangGraph](/components/langgraph)
- [6. 知识与检索层](/layers/knowledge-retrieval)
- [安全与治理](/governance)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Letta Documentation](https://docs.letta.com/)
- [Letta GitHub Repository](https://github.com/letta-ai/letta)
