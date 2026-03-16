# 协议与标准体系

> 角色：当前方案的协议、接口标准与运行语义视图
>
> 说明：本文讲的是六类协议 / 标准视图，不是六层架构。架构主口径仍以 [总体架构](/architecture) 的九层方案为准。

相关文档：

- [方案](/framework)
- [企业智能体能力与规范体系](/capability-framework)
- [组件](/components)
- [协议页总览](/protocols/)
- [标准页总览](/standards/)
- [规范页总览](/norms/)

## 一、本文要解决什么问题

企业智能体平台里最常见的混淆，是把以下对象写成同一类东西：

- 智能体互操作协议
- 身份与组织接入标准
- API 与工具契约标准
- 模型调用接口标准
- 观测与运行语义标准
- 授权与治理规范

如果不分清这几类，后续就会同时出现两种问题：

- 把协议当架构层
- 把治理规范误写成某个单独组件

## 二、六类协议 / 标准视图

| 视图 | 对象 | 当前定位 | 在方案中的作用 |
| --- | --- | --- | --- |
| 智能体互操作 | `MCP`、`A2A` | 智能体与工具、智能体与智能体的互操作协议 | 统一工具接入、上下文接入和远程 Agent 协作 |
| 身份与组织接入 | `OIDC / OAuth2 / SAML / SCIM` | 企业身份与组织同步标准 | 对接企业现有 `SSO / IAM` |
| API 与工具契约 | `OpenAPI`、`JSON Schema` | HTTP 接口契约与参数结构标准 | 约束服务接口、工具参数和结构化结果 |
| 模型调用接口 | `OpenAI 兼容 API` | 模型访问兼容接口 | 对上统一模型调用方式 |
| 观测与运行语义 | `OpenTelemetry` | 全链路埋点与上下文传播语义 | 把入口、编排、检索、模型、工具串成一条链 |
| 授权与治理 | `RBAC + ABAC`、`Policy as Code`、`Maker-Checker` | 授权模型与治理规范 | 约束谁能做什么、策略如何发布、高风险动作如何兜底 |

## 三、智能体互操作协议

### 1. `MCP`

当前定位：

- 负责 agent-to-tool / context
- 统一工具、资源、提示词和上下文接入方式
- 用来降低主平台、自研 Agent 和外部系统之间的集成耦合

不负责：

- 不替代 agent-to-agent 协作
- 不替代模型服务接口
- 不替代门户层或编排层本身

详见 [MCP 协议](/protocols/mcp)。

### 2. `A2A`

当前定位：

- 负责 agent-to-agent
- 用于远程 Agent 发现、调用、任务分发和协作
- 适合跨团队、跨系统、多 Agent 分工场景

不负责：

- 不替代工具接入协议
- 不直接定义业务审批和权限模型

详见 [A2A 协议](/protocols/a2a)。

### 3. 当前边界

- `MCP` 负责接工具、资源和上下文
- `A2A` 负责接远程 Agent
- 不用 `MCP` 去表达远程 Agent 协作
- 不用 `A2A` 去替代工具 Schema 和参数契约

## 四、身份与组织接入标准

身份标准不是智能体协议本身，但它决定平台能否进入企业生产环境。

当前方案采用的身份标准视图包括：

- `OIDC / OAuth2`：统一登录、令牌、应用接入
- `SAML`：兼容传统企业 IAM 体系
- `SCIM`：用户、组、组织和属性同步

当前定位：

- 默认对接企业现有 `SSO / IAM`
- 门户、BFF、检索、工具和审计都继承同一套身份上下文
- 认证与授权保持分离

详见 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)。

## 五、API 与工具契约标准

这组标准解决的是“接口怎么描述、参数怎么约束、系统如何稳定对接”。

### 1. `OpenAPI`

适用范围：

- 门户 / BFF
- 平台服务接口
- 工具服务和外部业务系统集成

当前作用：

- 统一 API 契约
- 支撑接口文档、生成 SDK 和治理变更

### 2. `JSON Schema`

适用范围：

- 工具调用参数
- 结构化输入输出
- 表单类任务和校验规则

当前作用：

- 把参数和结果结构标准化
- 为 `MCP`、工具层和服务契约层提供统一结构描述

详见 [OpenAPI](/protocols/openapi) 和 [JSON Schema](/standards/json-schema)。

## 六、模型调用接口标准

### `OpenAI 兼容 API`

当前方案不把模型访问暴露成私有接口，而统一收敛到 `OpenAI 兼容 API`。

当前定位：

- `LiteLLM` 对上提供统一兼容接口
- 上层平台、自研服务和 Agent Runtime 按同一接口调用模型
- 底层推理实现变化不直接传导到业务层

详见 [OpenAI 兼容 API](/standards/openai-compatible-api)。

## 七、观测与运行语义标准

### `OpenTelemetry`

`OpenTelemetry` 在当前方案里不是“监控工具”，而是统一语义标准。

当前定位：

- 统一 `trace_id`、会话、应用、用户、租户等上下文传播
- 串联入口、门户、编排、检索、模型、工具和返回链路
- 与 `LangFuse` 形成平台级和 AI 级双层观测

当前要求：

- Trace 语义统一
- 关键节点埋点一致
- 重要链路可回放、可排障、可审计

详见 [OpenTelemetry](/standards/opentelemetry)。

## 八、授权与治理规范

这部分不是“协议”狭义本体，但在企业架构里必须与协议并列看待。

### 1. `RBAC + ABAC`

- `RBAC` 负责角色授权
- `ABAC` 负责部门、租户、项目、数据域、标签等属性约束

当前定位：

- 构成完整授权模型的基础
- 覆盖应用访问、知识检索、工具调用和数据标签控制

### 2. `Policy as Code`

当前定位：

- 把权限、内容和风险策略写成受控配置
- 支撑版本化、审批、审计、发布和回滚

### 3. `Maker-Checker`

当前定位：

- 作为高风险动作的人机协同规范
- 适用于写数据、外部通知、改权限、生产系统操作等动作

当前要求：

- 不是可选能力，而是架构强约束

详见：

- [RBAC + ABAC](/norms/rbac-abac)
- [Policy as Code](/norms/policy-as-code)
- [Maker-Checker](/norms/maker-checker)

## 九、协议与标准在当前方案中的落点

| 位置 | 主要协议 / 标准 | 当前承载方式 |
| --- | --- | --- |
| 入口接入 | `OIDC / OAuth2 / SAML / SCIM` | 企业 `SSO / IAM` + `APISIX` + 门户 / BFF |
| 门户与服务接口 | `OpenAPI`、`JSON Schema` | 门户、BFF、工具服务和自研服务契约 |
| 智能体互操作 | `MCP`、`A2A` | 工具接入、上下文接入、远程 Agent 协作 |
| 模型服务 | `OpenAI 兼容 API` | `LiteLLM` 对上统一接口 |
| 观测语义 | `OpenTelemetry` | 全链路埋点、上下文传播与 Trace 语义 |
| 授权治理 | `RBAC + ABAC`、`Policy as Code`、`Maker-Checker` | `Casbin` + 门户 / BFF / 知识层 / 工具层执行点 |

## 十、本文不展开什么

为保持公开口径收敛，本文不展开：

- 当前未纳入主清单的额外协议或事件标准
- 供应商私有接口
- 与当前公开方案无关的历史兼容路线

## 十一、一句话收敛

当前方案里，真正的智能体互操作协议层是 `MCP + A2A`；支撑企业落地的外围标准则是身份接入、接口契约、模型接口、观测语义和授权治理规范。

## 参考资料

- [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
- [Model Context Protocol Specification 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18)
- [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest)
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
- [RFC 7644: SCIM Protocol](https://www.rfc-editor.org/rfc/rfc7644)
- [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
