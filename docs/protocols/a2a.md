# A2A 协议

> 类型：Agent-to-Agent 互操作协议
>
> 采用定位：远程 Agent 发现与任务协作协议
>
> 当前口径：截至 2026-03-17，A2A 官方网站给出的 latest released specification version 为 `1.0.0`；协议采用 binding-independent core protocol，并提供多种传输绑定
>
> 官方网站：https://a2a-protocol.org/
>
> 开源仓库地址：https://github.com/a2aproject/A2A

## 定位与价值

`A2A` 在本方案中承担“远程 Agent 发现、调用、任务协作与结果交换”的统一互操作协议角色。

它适用于平台对接的并非普通工具，而是另一个具备自主推理能力、独立状态与任务生命周期的 Agent 这一类场景。

## 协议约束什么

- **能力与入口暴露**：规范 Agent 如何对外声明自身能力、技能、认证要求与接入入口。
- **任务发起与状态跟踪**：规范调用方如何发起任务、跟踪状态推进、接收流式更新与最终产物。
- **多模态结果交换**：规范不同实现之间如何交换多模态消息、结构化结果与任务工件。
- **长时协作语义**：规范长任务、异步任务与跨系统协作场景下的统一交互语义。

## 核心机制

- **能力声明（`Agent Card`）**：通过 `Agent Card` 暴露名称、能力、技能、认证与服务入口等元数据。
- **任务对象（`Task`）**：以 `Task` 作为核心对象，描述任务创建、推进、完成与失败状态。
- **消息与工件**：消息体可包含 `parts` 与 `artifacts`，用于承载文本、结构化数据与多模态结果。
- **异步与流式协作**：支持流式更新、异步任务与推送通知，适合跨系统长时协作。
- **传输绑定无关设计**：规范采用 binding-independent 设计，并支持 `JSON-RPC 2.0`、`gRPC`、`HTTP+JSON/REST` 等绑定形态。

## 在方案中的落点

- **远程 Agent 标准化接入**：当主平台需要接入外部团队、自研框架或合作方提供的远程 Agent 时，优先采用 `A2A`。
- **多 Agent 协作替换私有协议**：在多 Agent 分工协作、任务转派、异步执行与跨域结果回传场景中，使用 `A2A` 替代私有远程调用协议。
- **南向统一网关承接**：当内部南向（Southbound）协议较多时，由 [agentgateway](/components/agentgateway) 统一承接 `A2A` 的接入、路由与治理。
- **控制面与运行时分工**：外部 Agent 的目录管理、信任边界与接入审计由门户与治理层统一承接，运行时互操作仍由 `A2A` 负责。

## 与组件 / 其他协议关系

- **与 [MCP 协议](/protocols/mcp) 互补**：`A2A` 负责接入远程 Agent，`MCP` 负责接入工具与上下文。
- **与 [OpenAPI](/protocols/openapi) 区分**：普通 HTTP 服务仍应优先使用 `OpenAPI`，仅当对端是具备自主协作能力的 Agent 时才采用 `A2A`。
- **与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 配合**：跨组织访问控制、令牌、信任关系与主体映射不由 `A2A` 单独解决。
- **与 [OpenTelemetry](/standards/opentelemetry) 配合**：跨 Agent 调用的可观测性（Observability）仍需平台级追踪与审计体系补齐。

## 适用场景

- 跨域 Agent 编排
- 远程 Agent 发现与调用
- 多智能体协作链路
- 长任务与异步结果回传
- 跨团队 / 跨组织能力代理

## 边界

- 不替代工具接入协议。
- 不替代门户层、应用目录与主平台控制面。
- 不替代企业统一身份接入与授权模型。
- 不适用于包装普通 CRUD 服务或简单同步 API。

## 采用规则

- **严格限定适用对象**：仅在对端为可独立协作的 Agent 时采用 `A2A`，不将其泛化为所有南向（Southbound）调用的默认协议。
- **明确契约与容错策略**：每个远程 Agent 接入项均应明确支持的传输绑定、认证模式、任务生命周期语义以及超时与重试策略。
- **纳入目录与风险治理**：`Agent Card` 不仅是技术发现入口，还应纳入平台目录、风险分级与运维治理体系。
- **高风险结果人工兜底**：对返回可执行指令、外部写操作或高敏结果的 Agent，应叠加审批、审计与人工兜底机制。

## 治理注意点

- **划分信任域边界**：明确区分可信内部 Agent、合作方 Agent 与公开第三方 Agent 的信任域。
- **流量与幂等保护**：控制配额、并发、超时、重试与幂等策略，避免长任务放大下游风险。
- **关键过程审计留痕**：记录任务状态变更、输入摘要、输出摘要与关键工件引用，支撑审计与排障。
- **维护兼容性矩阵**：建立能力目录与兼容矩阵，避免不同实现对同一 `Task` 语义产生理解偏差。

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
