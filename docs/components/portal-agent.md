# 门户与 Agent 能力

> 类型：组件分类页
>
> 范围：门户、运行时、编排与知识工程能力

该类组件负责企业统一门户交互、自研 Agent Runtime、复杂编排与知识工程能力。

包含组件：

- [AgentifUI](/components/agentifui)（默认：面向 `Dify` / `LangGraph` 应用目录与工作流门户）
- [LibreChat](/components/librechat)（并列参考：面向通用多模型 / `MCP` 共享对话门户）
- [LangGraph](/components/langgraph)
- [LangChain](/components/langchain)（条件引入：`LangGraph` 体系生态工具包与连接器）
- [LlamaIndex](/components/llamaindex)
- [Mem0](/components/mem0)（条件引入长期记忆层；非主线参考：[Letta](/components/letta)）

::: info 扩展能力边界
个人自治型超级智能体 [OpenClaw](/components/openclaw) 不纳入第 3 层共享门户基线，归入可选扩展能力，按单人或高信任小组独立沙箱实例模式按需引入，详见 [扩展升级](/extension-capabilities)。
:::
