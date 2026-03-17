# A2A 协议

> 类型：agent-to-agent 互操作协议
>
> 复用规则：稳定复用的协议说明页
>
> 当前口径：截至 2026-03-17，A2A 官方网站给出的 latest released specification version 为 `1.0.0`；协议采用 binding-independent core protocol，并提供多种传输绑定
>
> 官方网站：https://a2a-protocol.org/
>
> 开源仓库地址：https://github.com/a2aproject/A2A

## 当前定位

`A2A` 在当前方案中承担的是“远程 Agent 发现、调用、任务协作与结果交换”的统一互操作协议角色。

它适合解决“平台不是在接工具，而是在接另一个具备自主能力、状态和任务生命周期的 Agent”这类场景。

## 协议约束什么

- Agent 如何向外暴露自身能力、技能、认证要求和接入入口。
- 调用方如何发起任务、跟踪任务状态、接收流式更新和最终产物。
- 不同实现之间如何交换多模态消息、结构化结果和任务工件。
- 长任务、异步任务和跨系统协作场景下的统一交互语义。

## 核心机制

- 通过 `Agent Card` 暴露名称、能力、技能、认证和服务入口等元数据。
- 以 `Task` 作为核心对象，描述任务创建、推进、完成与失败状态。
- 消息体可包含 `parts` 与 `artifacts`，用于承载文本、结构化数据和多模态结果。
- 支持流式更新、异步任务与推送通知，适合跨系统长时协作。
- 当前规范采用 binding-independent 设计，并支持 `JSON-RPC 2.0`、`gRPC`、`HTTP+JSON/REST` 等绑定形态。

## 在当前方案中的落点

- 在主平台需要接入外部团队、自研框架或合作方提供的远程 Agent 时，优先考虑 `A2A`。
- 在多 Agent 分工协作、任务转派、异步执行和跨域结果回传场景中，用 `A2A` 替代私有远程调用协议。
- 在内部 southbound 协议较多时，可由 [agentgateway](/components/agentgateway) 统一承接 `A2A` 的接入、路由与治理。
- 对外部 Agent 的目录管理、信任边界和接入审计，可在门户与治理层上方统一承接，但运行时互操作仍由 `A2A` 负责。

## 与组件 / 其他协议关系

- 与 [MCP 协议](/protocols/mcp) 互补：`A2A` 接远程 Agent，`MCP` 接工具和上下文。
- 与 [OpenAPI](/protocols/openapi) 不同：简单 HTTP 服务仍应优先用 `OpenAPI`，只有当对端是“Agent”而不是“普通服务”时才进入 `A2A`。
- 与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 配合：跨组织访问控制、令牌、信任关系和主体映射不由 `A2A` 单独解决。
- 与 [OpenTelemetry](/standards/opentelemetry) 配合：跨 Agent 调用的可观测性仍需平台级追踪与审计体系补齐。

## 适用场景

- 跨域 Agent 编排
- 远程 Agent 发现与调用
- 多智能体协作链路
- 长任务和异步结果回传
- 跨团队 / 跨组织能力代理

## 边界

- 不替代工具接入协议。
- 不替代门户层、应用目录和主平台控制面。
- 不替代企业统一身份接入和授权模型。
- 不适合拿来包装普通 CRUD 服务或简单同步 API。

## 采用规则

- 当前方案只在“对端是可独立协作的 Agent”时使用 `A2A`，不把它泛化成所有 southbound 调用的默认协议。
- 每个远程 Agent 接入项都应明确支持的绑定、认证模式、任务生命周期语义和超时 / 重试策略。
- `Agent Card` 不应只是技术发现入口，还应纳入平台目录、风险分级和运维治理。
- 对于返回可执行指令、外部写操作或高敏结果的 Agent，应叠加审批、审计和人工兜底。

## 治理注意点

- 要区分可信内部 Agent、合作方 Agent 和公开第三方 Agent 的信任域。
- 要控制配额、并发、超时、重试与幂等策略，避免长任务放大下游风险。
- 要记录任务状态变更、输入摘要、输出摘要和关键工件引用，支撑审计与排障。
- 要建立能力目录与兼容矩阵，避免不同实现对同一 `Task` 语义理解不一致。

## 关联文档

- [协议页总览](/protocols/)
- [MCP 协议](/protocols/mcp)
- [OpenAPI](/protocols/openapi)
- [统一接入与流量治理层](/layers/access-traffic-governance)
- [agentgateway](/components/agentgateway)

## 参考资料

- [A2A Protocol Overview](https://a2a-protocol.org/latest/)
- [A2A Specification](https://a2a-protocol.org/latest/specification/)
- [A2A 官方仓库](https://github.com/a2aproject/A2A)
- [A2A Project 1.0 Announcement](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
