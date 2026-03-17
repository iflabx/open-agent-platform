# MCP 协议

> 类型：agent-to-tool / context 互操作协议
>
> 复用规则：稳定复用的协议说明页
>
> 当前口径：截至 2026-03-17，MCP 官方规范站当前版本为 `2025-11-25`；协议采用日期版本号，并在初始化阶段协商版本与能力
>
> 官方网站：https://modelcontextprotocol.io/
>
> 开源仓库地址：https://github.com/modelcontextprotocol/modelcontextprotocol

## 当前定位

`MCP` 在当前方案中承担的是“工具、资源、提示词与上下文能力的统一 southbound 接入协议”角色。

它的价值不在于再造一套业务 API，而在于把不同来源的工具和上下文能力收敛为统一的 Agent 可消费接口，让门户工作台、编排层、runtime 与外部系统之间不再逐个私有耦合。

## 协议约束什么

- Client 与 Server 之间如何初始化连接、协商版本和能力。
- Tool、Resource、Prompt 等能力如何被标准化暴露与调用。
- 请求、响应、通知以及错误如何以统一消息模型交换。
- 主机应用如何在不理解目标系统私有接口细节的前提下复用外部能力。

## 核心机制

- 基于 client-server 模式建立会话，并在初始化阶段协商协议版本与支持能力。
- 数据层采用 `JSON-RPC 2.0` 消息语义。
- 当前官方架构把 `stdio` 与 `Streamable HTTP` 作为标准传输方式。
- Server 侧核心原语包括 `tools`、`resources`、`prompts`。
- Client 侧可声明 `sampling`、`elicitation`、`roots` 等能力，用于补齐主机应用与 Server 之间的交互边界。

## 在当前方案中的落点

- 在编排层、runtime 或门户 `BFF` 需要访问外部工具能力时，优先通过 `MCP` 标准化接入。
- 在知识检索、文件处理、企业系统查询等场景中，用 `MCP` 暴露受控资源与提示词能力。
- 当内部存在大量 `MCP Server`、权限策略或协议转换需求时，可由 [agentgateway](/components/agentgateway) 承接统一注册、路由和治理。
- 对已有 HTTP 服务，可在需要复用为 Agent 工具时，通过 `OpenAPI -> MCP` 适配方式进入协议层。

## 与组件 / 其他协议关系

- 与 [A2A 协议](/protocols/a2a) 互补：`MCP` 负责接工具和上下文，`A2A` 负责接远程 Agent。
- 与 [OpenAPI](/protocols/openapi) 不同：`OpenAPI` 描述 HTTP 服务契约，`MCP` 描述 Agent 如何消费工具与上下文能力。
- 与 [JSON Schema](/standards/json-schema) 配合：工具输入输出结构应采用可校验的 Schema 口径。
- 与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 配合：`MCP` 不自带完整企业身份体系，认证与授权仍需由网关、平台和企业 IAM 补齐。

## 适用场景

- 外部系统工具接入
- 检索资源暴露
- Prompt / context 能力标准化
- 统一多个 Agent Runtime 的工具访问方式
- 将已有业务服务包装为可复用 Agent 能力

## 边界

- 不负责 agent-to-agent 协作。
- 不替代企业统一认证、授权和审批体系。
- 不等于所有系统集成都必须改造成 `MCP`；简单的内部 HTTP 调用不必强行协议化。
- 不替代业务 API 契约管理、SDK 发布和服务生命周期治理。

## 采用规则

- 当前方案把 `MCP` 作为标准工具 / 上下文接入协议，而不是远程 Agent 协作协议。
- 只有在能力需要被多个 Agent、多个编排层或多个运行时复用时，才优先抽象为 `MCP Server`。
- 每个接入项都应明确协议版本、能力矩阵、输入输出 Schema、鉴权方式和超时策略。
- 高风险工具默认不直通生产动作，应叠加权限控制、审批或 `Maker-Checker` 机制。

## 治理注意点

- 要建立 `MCP Server` 清单，明确服务归属、版本、风险级别和责任人。
- 要控制凭据、访问范围和最小权限，避免把系统级密钥直接暴露给 Agent Runtime。
- 要把工具调用日志、错误码、请求上下文纳入审计与可观测体系。
- 要做协议版本与能力兼容性测试，避免客户端升级后出现隐性失配。

## 关联文档

- [协议页总览](/protocols/)
- [A2A 协议](/protocols/a2a)
- [OpenAPI](/protocols/openapi)
- [JSON Schema](/standards/json-schema)
- [统一接入与流量治理层](/layers/access-traffic-governance)
- [agentgateway](/components/agentgateway)

## 参考资料

- [Model Context Protocol Overview](https://modelcontextprotocol.io/overview)
- [Model Context Protocol Architecture](https://modelcontextprotocol.io/docs/learn/architecture)
- [Model Context Protocol Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
- [Model Context Protocol 官方仓库](https://github.com/modelcontextprotocol/modelcontextprotocol)
