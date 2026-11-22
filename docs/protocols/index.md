# 协议页总览

> 适用定位：平台核心互操作与接入协议目录
>
> 范围说明：本目录聚焦系统间的互操作协议，明确各层与外部系统之间如何接入、认证以及交换请求与上下文。

## 协议清单

| 协议 | 类型定位 | 核心职责 |
| --- | --- | --- |
| [MCP 协议](/protocols/mcp) | Agent-to-Tool / 上下文互操作协议 | 统一工具、资源、提示词与上下文能力的南向（Southbound）接入 |
| [A2A 协议](/protocols/a2a) | Agent-to-Agent 互操作协议 | 支撑远程 Agent 发现、调用、异步任务协作与结果交换 |
| [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) | 身份与组织接入协议组 | 承接企业既有 IAM / SSO 登录认证、授权委托、联邦兼容与组织同步 |
| [OpenAPI](/protocols/openapi) | API 契约协议 | 规范 HTTP API 北向与南向（Southbound）接口契约与变更治理 |

## 职责边界

本目录各协议页聚焦协议本身的职责分工、核心机制、适用场景、采用规则与治理边界，不展开至具体开源组件的部署与实现细节。
