# OpenAPI

> 类型：API 契约协议
>
> 采用定位：HTTP API 北向与南向（Southbound）接口契约标准
>
> 当前口径：截至 2026-03-17，OpenAPI Initiative 公布的最新正式规范版本为 `OpenAPI Specification 3.2.0`；落地时应按工具链成熟度明确采用 `3.1.x` 或 `3.2.0`，避免版本口径混写
>
> 官方网站：https://www.openapis.org/
>
> 开源仓库地址：https://github.com/OAI/OpenAPI-Specification

## 定位与价值

`OpenAPI` 在本方案中承担“HTTP API 北向与南向（Southbound）接口契约的统一描述协议”角色。

其核心价值不在于生成静态接口文档，而在于将门户、`BFF`、平台服务、工具包装服务与外部业务系统之间的 API 约定收敛为可审查、可生成、可测试、可变更治理的正式契约。

## 协议约束什么

- **接口结构描述**：规范路径、方法、参数、请求体、响应体与错误模型的描述方式。
- **安全与扩展声明**：规范认证方式、服务器地址、回调、Webhook 与复用组件的声明方式。
- **工程化输入基准**：作为 API 文档、SDK 生成、Mock、测试与兼容性检查的共同输入格式。
- **发布与变更边界**：确立服务接口对外公开前的契约审查与版本治理边界。

## 核心机制

- **核心接口元素**：以 `paths`、`operations`、`parameters`、`requestBody`、`responses` 描述 HTTP 接口。
- **组件化复用**：通过 `components` 复用 schema、security schemes、parameters 与 responses。
- **数据结构对齐**：基于 `Schema Object` 描述 JSON 结构，与 [JSON Schema](/standards/json-schema) 能力高度关联。
- **异步与关联流程**：支持 `callbacks`、`webhooks`、`links` 等机制，用于表达异步交互与关联流程。
- **全周期工程能力**：支撑文档生成、代码生成、Mock 与合约测试等围绕契约的工程化能力。

## 在方案中的落点

- **北向与内部接口**：门户工作台、应用目录、`BFF` 与后台服务接口优先采用 `OpenAPI` 描述。
- **企业系统集成**：对企业内部系统与外部业务系统的集成接口，优先沉淀明确的 `OpenAPI` 契约，而非仅保存在代码实现中。
- **工具化桥接**：当已有 HTTP API 需要被 Agent 复用时，可通过 [agentgateway](/components/agentgateway) 或适配层将 `OpenAPI` 服务包装为 `MCP` 工具。
- **变更治理基线**：在服务治理、测试与发布流程中，`OpenAPI` 作为接口变更评审、兼容性检查与 SDK 产出的共同基线。

## 与组件 / 其他协议关系

- **与 [JSON Schema](/standards/json-schema) 互补**：`OpenAPI` 管理接口契约，`JSON Schema` 管理数据结构约束。
- **与 [MCP 协议](/protocols/mcp) 区分**：`OpenAPI` 适用于服务接口契约，`MCP` 适用于 Agent 工具与上下文接入。
- **与 [A2A 协议](/protocols/a2a) 区分**：`A2A` 解决远程 Agent 协作，不负责普通 HTTP 服务契约。
- **与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 配合**：`OpenAPI` 可描述安全方案，但不替代认证与授权标准本身。

## 适用场景

- 门户与 `BFF` 接口设计
- 平台内部服务契约治理
- 外部业务系统集成
- SDK / 文档 / Mock / 合约测试生成
- `OpenAPI → MCP` 的工具化改造

## 边界

- 不替代业务领域建模与系统边界设计。
- 不替代身份标准、权限模型或审批规则。
- 不自动保证接口设计合理，仍需配套统一的错误模型、分页、幂等与版本治理规则。
- 不适用于表达远程 Agent 协作语义与长任务状态流转。

## 采用规则

- **稳定接口契约化**：对外稳定 HTTP API 须提供 `OpenAPI` 契约，禁止仅依赖口头说明或散落代码片段。
- **明确版本与兼容策略**：每个接口均应明确采用的 `OpenAPI` 版本、认证方式、错误模型与兼容策略。
- **推行契约优先流程**：新接口优先采用 Contract-First 流程，将契约评审前置至开发阶段之前。
- **保留原始服务契约**：用于 Agent 工具包装时，应保留原始 `OpenAPI` 契约，避免仅留存转换后的 `MCP` 视图。

## 治理注意点

- **分级管控变更风险**：明确区分向后兼容变更与破坏性变更，并建立发布门槛。
- **统一规范化约定**：统一错误码、分页、幂等键、审计字段与安全 scheme 的定义规范。
- **CI 自动化门禁**：在 CI 流水线中集成契约校验、破坏性变更检查与示例可执行性验证。
- **隔离内部实现细节**：严控公共契约与底层私有字段的边界，避免实现细节外泄形成长期兼容负担。

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
