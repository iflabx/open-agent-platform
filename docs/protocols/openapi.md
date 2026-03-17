# OpenAPI

> 类型：API 契约协议
>
> 复用规则：稳定复用的协议说明页
>
> 当前口径：截至 2026-03-17，OpenAPI Initiative 公布的最新正式规范版本为 `OpenAPI Specification 3.2.0`；落地时应按工具链成熟度明确采用 `3.1.x` 或 `3.2.0`，避免版本口径混写
>
> 官方网站：https://www.openapis.org/
>
> 开源仓库地址：https://github.com/OAI/OpenAPI-Specification

## 当前定位

`OpenAPI` 在当前方案中承担的是“HTTP API 北向与南向接口契约的统一描述协议”角色。

它的重点不是生成一份接口文档，而是把门户、`BFF`、平台服务、工具包装服务与外部业务系统之间的 API 约定收敛成可审查、可生成、可测试、可变更治理的正式契约。

## 协议约束什么

- 路径、方法、参数、请求体、响应体和错误模型如何描述。
- 认证方式、服务器地址、回调、Webhook 和复用组件如何声明。
- API 文档、SDK 生成、Mock、测试和兼容性检查的共同输入格式。
- 服务接口对外公开前的契约审查与版本治理边界。

## 核心机制

- 以 `paths`、`operations`、`parameters`、`requestBody`、`responses` 描述 HTTP 接口。
- 通过 `components` 复用 schema、security schemes、parameters 和 responses。
- 基于 `Schema Object` 描述 JSON 结构，与 [JSON Schema](/standards/json-schema) 能力高度相关。
- 支持 `callbacks`、`webhooks`、`links` 等机制，用于表达异步交互与关联流程。
- 支持文档、代码生成、Mock、合约测试等围绕契约的工程化能力。

## 在当前方案中的落点

- 门户工作台、应用目录、`BFF` 与后台服务接口应优先采用 `OpenAPI` 描述。
- 对企业内部系统和外部业务系统的集成接口，优先保留明确的 `OpenAPI` 契约，而不是只保存在代码实现里。
- 当已有 HTTP API 需要被 Agent 复用时，可通过 [agentgateway](/components/agentgateway) 或适配层把 `OpenAPI` 服务包装为 `MCP` 工具。
- 在服务治理、测试和发布流程中，`OpenAPI` 是接口变更评审、兼容性检查和 SDK 产出的共同基线。

## 与组件 / 其他协议关系

- 与 [JSON Schema](/standards/json-schema) 互补：`OpenAPI` 管接口契约，`JSON Schema` 管数据结构约束。
- 与 [MCP 协议](/protocols/mcp) 不同：`OpenAPI` 适合服务接口，`MCP` 适合 Agent 工具与上下文接入。
- 与 [A2A 协议](/protocols/a2a) 不同：`A2A` 解决远程 Agent 协作，不解决普通 HTTP 服务契约。
- 与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 配合：`OpenAPI` 可描述安全方案，但不替代认证与授权标准本身。

## 适合场景

- 门户与 `BFF` 接口设计
- 平台内部服务契约治理
- 外部业务系统集成
- SDK / 文档 / Mock / 合约测试生成
- `OpenAPI -> MCP` 的工具化改造

## 边界

- 不替代业务领域建模和系统边界设计。
- 不替代身份标准、权限模型或审批规则。
- 不自动保证接口设计合理，仍需要统一错误模型、分页、幂等和版本治理规则。
- 不适合表达远程 Agent 协作语义和长任务任务态流转。

## 采用规则

- 当前方案要求对外稳定 HTTP API 优先提供 `OpenAPI` 契约，而不是只提供口头说明或散落代码片段。
- 每个接口都应明确采用的 `OpenAPI` 版本、认证方式、错误模型和兼容策略。
- 新接口优先采用 contract-first 流程，把契约评审前置到开发前。
- 用于 Agent 工具包装时，应保留原始 `OpenAPI` 契约，避免只留下转换后的 `MCP` 视图。

## 治理注意点

- 需要区分向后兼容变更与破坏性变更，并建立发布门槛。
- 需要统一错误码、分页、幂等键、审计字段和安全 scheme 的写法。
- 需要在 CI 中增加契约校验、破坏性变更检查和示例可执行性验证。
- 需要控制公共契约与底层私有字段的边界，避免实现细节外泄成长期负担。

## 关联文档

- [协议页总览](/protocols/)
- [JSON Schema](/standards/json-schema)
- [协议与标准体系](/protocol-standards)
- [门户与应用层](/layers/portal-application)
- [agentgateway](/components/agentgateway)

## 参考资料

- [OpenAPI Initiative](https://www.openapis.org/)
- [OpenAPI Specification Latest](https://spec.openapis.org/oas/latest.html)
- [OpenAPI Specification Versions](https://spec.openapis.org/oas/)
- [OpenAPI Specification 官方仓库](https://github.com/OAI/OpenAPI-Specification)
