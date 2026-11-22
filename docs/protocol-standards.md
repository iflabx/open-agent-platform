# 协议与标准体系

::: info 核心摘要
本页梳理企业级智能体平台涉及的**六类跨层协议、接口标准与运行语义视图**，作为 [总体架构](/architecture) 中 9 层架构的跨层互通规范（六类标准视图并非架构分层）。

- **智能体互操作核心**：以 `MCP` 承载 Agent-to-Tool / Context，以 `A2A` 承载 Agent-to-Agent，边界清晰不混用。
- **企业级外围标准**：通过 `OIDC / OAuth2 / SAML / SCIM`、`OpenAPI`、`JSON Schema`、`OpenAI 兼容 API`、`OpenTelemetry` 与授权治理规范保障生产落地。
- **相关入口**：[方案](/framework) · [企业智能体能力与规范体系](/capability-framework) · [组件](/components) · [协议页总览](/protocols/) · [标准页总览](/standards/) · [规范页总览](/norms/)
:::

## 协议与标准分类边界

在企业智能体平台设计中，常见误区是将以下六类不同层面的规范混为一谈：

- 智能体互操作协议
- 身份与组织接入标准
- API 与工具契约标准
- 模型调用接口标准
- 观测与运行语义标准
- 授权与治理规范

若未清晰区分上述边界，极易导致两类架构偏差：将跨层协议误作独立业务架构层，或将治理规范误归为单一软件组件。

## 六类协议与标准视图

| 视图 | 对象 | 定位 | 在方案中的作用 |
| --- | --- | --- | --- |
| 智能体互操作 | `MCP`、`A2A` | 智能体与工具、智能体与智能体的互操作协议 | 统一工具接入、上下文接入和远程 Agent 协作 |
| 身份与组织接入 | `OIDC / OAuth2 / SAML / SCIM` | 企业身份与组织同步标准 | 对接企业现有 `SSO / IAM` |
| API 与工具契约 | `OpenAPI`、`JSON Schema` | HTTP 接口契约与参数结构标准 | 约束服务接口、工具参数和结构化结果 |
| 模型调用接口 | `OpenAI 兼容 API` | 模型访问兼容接口 | 对上统一模型调用方式 |
| 观测与运行语义 | `OpenTelemetry` | 全链路埋点与上下文传播语义 | 将入口、编排、检索、模型与工具串联为完整追踪链 |
| 授权与治理 | `RBAC + ABAC`、`Policy as Code`、`Maker-Checker` | 授权模型与治理规范 | 约束访问与动作权限、策略版本化发布与高风险动作兜底 |

## 智能体互操作协议

### 1. `MCP`

职责定位：

- 负责 Agent-to-Tool / Context 标准化接入。
- 统一工具、资源、提示词与上下文的接入方式。
- 降低主平台、自研 Agent 与外部业务系统之间的集成耦合度。

职责边界：

- 不替代 Agent-to-Agent 远程协作。
- 不替代模型服务调用接口。
- 不替代门户层或编排层本身。

详见 [MCP 协议](/protocols/mcp)。

### 2. `A2A`

职责定位：

- 负责 Agent-to-Agent 跨系统协作。
- 支持远程 Agent 发现、调用、任务分发与协同执行。
- 适用于跨团队、跨系统的多 Agent 分工场景。

职责边界：

- 不替代工具接入协议。
- 不直接定义企业业务审批与权限模型。

详见 [A2A 协议](/protocols/a2a)。

### 3. 协作边界约定

- **`MCP` 专职工具与上下文**：负责接入工具、资源与上下文能力。
- **`A2A` 专职远程协作**：负责接入与协同远程 Agent。
- **严禁跨界混用**：不使用 `MCP` 表达远程 Agent 协作，也不使用 `A2A` 替代工具 Schema 与参数契约。

## 身份与组织接入标准

身份标准虽不属于智能体专属协议，却是平台进入企业生产环境的前提条件。

方案采用以下企业身份接入标准：

- **`OIDC / OAuth2`**：负责统一登录、令牌签发与应用接入。
- **`SAML`**：兼容传统企业 IAM 体系。
- **`SCIM`**：负责用户、用户组、组织架构与属性同步。

架构定位：

- 默认对接企业现有 `SSO / IAM`。
- 门户、BFF、检索、工具与审计全链路继承同一套身份上下文。
- 认证与授权保持职责分离。

详见 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)。

## API 与工具契约标准

该组标准用于规范接口描述、参数校验与系统间稳定集成。

### 1. `OpenAPI`

适用范围：

- 门户 / BFF 接口
- 平台核心服务接口
- 工具服务与外部业务系统集成接口

核心作用：

- 统一 HTTP API 契约描述
- 支撑自动化接口文档生成、SDK 生成与接口变更治理

### 2. `JSON Schema`

适用范围：

- 工具调用参数定义
- 结构化输入与输出约束
- 表单类任务与数据校验规则

核心作用：

- 标准化工具参数与返回结果结构
- 为 `MCP`、工具层与服务契约层提供统一数据结构描述

详见 [OpenAPI](/protocols/openapi) 和 [JSON Schema](/standards/json-schema)。

## 模型调用接口标准

### `OpenAI 兼容 API`

平台不向上层暴露底层推理引擎的私有接口，而是统一收敛至 `OpenAI 兼容 API`：

- `LiteLLM` 对上提供统一的 `OpenAI 兼容 API` 入口。
- 上层主平台、自研服务与 Agent Runtime 按同一标准接口调用模型。
- 底层推理引擎升级或模型切换不直接传导至业务应用层。

详见 [OpenAI 兼容 API](/standards/openai-compatible-api)。

## 观测与运行语义标准

### `OpenTelemetry`

`OpenTelemetry` 在平台架构中不是单一监控工具，而是统一的遥测与上下文传播语义标准。

架构定位：

- 统一 `trace_id` 及会话、应用、用户、租户等上下文的跨服务传播。
- 串联入口、门户、编排、检索、模型、工具与结果返回全链路。
- 与 `LangFuse` 协同构成平台级与 AI 级双层可观测性（Observability）体系。

落地要求：

- Trace 语义全链路统一
- 关键节点埋点字段一致
- 重要业务链路可回放、可排障、可审计

详见 [OpenTelemetry](/standards/opentelemetry)。

## 授权与治理规范

此类规范虽不属于狭义通信协议，但在企业级架构中必须与技术标准并列作为强约束执行。

### 1. `RBAC + ABAC`

- **`RBAC`**：负责岗位与角色级授权。
- **`ABAC`**：负责部门、租户、项目、数据域与安全标签等属性约束。

架构定位：构成企业级细粒度授权模型基础，全面覆盖应用访问、知识检索、工具调用与数据标签控制。

### 2. `Policy as Code`

架构定位：将权限、内容审查与风险控制策略沉淀为受控配置代码，支撑策略版本化、审批流、审计追踪、灰度发布与快速回滚。

### 3. `Maker-Checker`

架构定位：作为高风险动作的人机协同强约束规范，适用于写入业务数据、对外通知、权限变更与生产系统操作等高风险场景。

详见 [RBAC + ABAC](/norms/rbac-abac)、[Policy as Code](/norms/policy-as-code)、[Maker-Checker](/norms/maker-checker)。

## 协议与标准落位总览

| 架构位置 | 主要协议 / 标准 | 承载方式 |
| --- | --- | --- |
| 入口接入 | `OIDC / OAuth2 / SAML / SCIM` | 企业 `SSO / IAM` + `APISIX` + 门户 / BFF |
| 门户与服务接口 | `OpenAPI`、`JSON Schema` | 门户、BFF、工具服务和自研服务契约 |
| 智能体互操作 | `MCP`、`A2A` | 工具接入、上下文接入、远程 Agent 协作 |
| 模型服务 | `OpenAI 兼容 API` | `LiteLLM` 对上统一接口 |
| 观测语义 | `OpenTelemetry` | 全链路埋点、上下文传播与 Trace 语义 |
| 授权治理 | `RBAC + ABAC`、`Policy as Code`、`Maker-Checker` | `Casbin` + 门户 / BFF / 知识层 / 工具层执行点 |

## 范围边界

为保持协议与标准体系收敛可执行，本体系不纳入以下内容：

- 未进入核心组件与标准清单的额外协议或事件总线标准
- 特定厂商的私有专有接口
- 缺乏统一契约约束的非标准集成方式

::: tip 核心结论
在整体架构中，智能体互操作协议核心由 `MCP + A2A` 构成；支撑企业级生产落地的外围基线则由身份接入、接口契约、模型接口、观测语义与授权治理规范共同组成。
:::

## 相关文档

- [方案](/framework)
- [企业智能体能力与规范体系](/capability-framework)
- [组件](/components)
- [协议页总览](/protocols/)
- [标准页总览](/standards/)
- [规范页总览](/norms/)

## 参考资料

- [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
- [Model Context Protocol Specification 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18)
- [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest)
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
- [RFC 7644: SCIM Protocol](https://www.rfc-editor.org/rfc/rfc7644)
- [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
