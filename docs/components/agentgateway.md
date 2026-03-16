# agentgateway

> 类型：AI 原生协议网关与 southbound 接入治理
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：统一接入与流量治理层
>
> 官方网站：https://agentgateway.dev/
>
> 开源仓库地址：https://github.com/agentgateway/agentgateway

## 当前定位

`agentgateway` 是当前方案第 2 层中的内部 AI 原生协议网关，用于在门户 `BFF`、编排层和 runtime 后端与 `MCP`、`A2A`、模型提供方及相关工具服务之间建立统一的 southbound 接入与治理边界。

它不是公网北向入口，而是协议丰富场景下的内部网关组件。

## 主要职责

- 承接 `MCP`、`A2A` 和相关 AI 原生协议的内部接入
- 统一 southbound 路由、认证、授权和可观测
- 提供 `OpenAPI -> MCP` 等协议转换能力
- 为远程 Agent、工具服务和模型服务提供统一连接治理边界

## 与其他组件关系

- 与 [APISIX](/components/apisix) 分层协作：`APISIX` 负责公网或半公网北向入口，`agentgateway` 负责内部 AI 协议接入。
- 与 [LiteLLM](/components/litellm) 协同，但不替代统一模型治理中心。
- 可承接来自 [AgentifUI](/components/agentifui) 后面的 `BFF / Unified Agent Access Layer`、[LangGraph](/components/langgraph) 及主平台路线的 southbound 协议请求。
- 在复杂链路中，可作为 [MCP 协议](/protocols/mcp) 与 [A2A 协议](/protocols/a2a) 的统一网关承载点。

## 适合场景

- 需要统一治理大量 `MCP` server 和工具能力
- 需要远程 Agent 协作与 `A2A` 接入
- 需要统一 southbound 协议认证、授权、限流和观测
- 需要把现有 `OpenAPI` 服务包装为 `MCP` 工具能力

## 边界

- 不替代 `APISIX` 作为统一公网入口
- 不替代 `LiteLLM` 作为默认模型网关与配额治理中心
- 不承载业务工作流编排和应用目录逻辑
- 不直接提供门户北向统一应用模型

## 采用规则

- 当前方案把 `agentgateway` 作为第 2 层正式组件纳入，但定位限定为内部 AI 原生协议网关，而不是第二套公网入口网关。
- 简单试点阶段如果只有标准 HTTP API 调用，可先不启用；当 `MCP / A2A / tool federation / southbound 协议治理` 需求出现时再进入核心链路。
- 如已启用 `agentgateway`，应由门户 `BFF`、编排层或 runtime gateway 统一接入，不建议各服务各自直连分散使用。

## 治理注意点

- 应明确 northbound 与 southbound 的边界，避免把 `agentgateway` 误当作门户统一入口。
- `MCP`、`A2A` 和 LLM 流量的认证、授权、审计与观测口径应统一收敛。
- 如同时使用 `LiteLLM`，需要明确哪些流量由 `agentgateway` 处理协议接入，哪些流量由 `LiteLLM` 承担模型治理。
- 高权限工具或远程 Agent 接入时，应与 [安全与治理](/governance) 中的审批、审计和风险控制要求联动。

## 关联文档

- [2. 统一接入与流量治理层](/layers/access-traffic-governance)
- [MCP 协议](/protocols/mcp)
- [A2A 协议](/protocols/a2a)
- [总体架构](/architecture)
- [技术选型](/stack)

## 参考资料

- [agentgateway 官网](https://agentgateway.dev/)
- [agentgateway GitHub Repository](https://github.com/agentgateway/agentgateway)
- [agentgateway Introduction](https://agentgateway.dev/docs/standalone/latest/about/introduction/)
- [agentgateway LLM Gateway](https://agentgateway.dev/docs/standalone/latest/tutorials/llm-gateway/)
- [agentgateway MCP Authentication](https://agentgateway.dev/docs/standalone/latest/mcp/mcp-authn/)
- [agentgateway MCP Authorization](https://agentgateway.dev/docs/standalone/latest/mcp/mcp-authz/)
- [agentgateway OpenAPI to MCP](https://agentgateway.dev/docs/tutorials/openapi/)
