# 3. 门户与应用层

> 定位：承接统一工作台、应用目录、会话入口与 BFF / API 编排边界。
>
> 当前承载组件：`AgentifUI`（默认，面向 `Dify` / `LangGraph` 应用目录与工作流交付）、`LibreChat`（并列参考，面向通用多模型 / `MCP` 共享对话与原生 `OIDC / SAML / LDAP`）、门户 / BFF / API 层。

相关文档：

- [AgentifUI](/components/agentifui)
- [LibreChat](/components/librechat)
- [方案综述](/guide/)
- [组件](/components)
- [Agent 编排层](/layers/agent-orchestration)
- [扩展升级](/extension-capabilities)

## 本层定义

门户与应用层是直接面向终端用户呈现与交互的工作台层。

本层负责应用目录、应用入口、会话承接、前端交互与 BFF 适配，不应将底层知识检索、模型路由与授权引擎逻辑直接耦合在界面层。

## 本层功能

- **统一工作台与目录**：提供企业统一 AI 工作台与应用目录。
- **人机交互承接**：提供聊天、任务发起、结果查看与反馈回收等交互界面。
- **接口聚合与适配**：通过 BFF 或 API 层聚合下游能力，向前端暴露稳定契约。
- **轻量上下文管理**：承载应用级导航、用户上下文、会话入口与最小必要状态。

## 当前承载组件

- [AgentifUI](/components/agentifui)（默认：面向 `Dify` / `LangChain·LangGraph` 应用目录、工作流与受控人工确认）
- [LibreChat](/components/librechat)（并列参考：纯 `MIT`，面向通用多模型 / `MCP` 共享对话与开箱即用 `OIDC / SAML / LDAP`）
- 门户 / BFF / API 层

::: tip 采用边界
门户与应用层以 [AgentifUI](/components/agentifui) / [LibreChat](/components/librechat)（按主导场景二选一收敛，同一环境不并行两套全员共享对话前台）与门户 / BFF / API 层作为企业多用户共享工作台基线。[OpenClaw](/components/openclaw) 定位为个人自治型超级智能体，按单人或高信任小组独立沙箱实例模式按需引入，不纳入本层共享门户基线，详见 [扩展升级](/extension-capabilities)。
:::

## 上下游关系

上游层级：

- [用户与渠道层](/layers/user-channel)
- [统一接入与流量治理层](/layers/access-traffic-governance)

下游层级：

- [Agent 编排层](/layers/agent-orchestration)
- [知识与检索层](/layers/knowledge-retrieval)
- [治理与观测层](/layers/governance-observability)

推荐链路为：

`门户 / BFF → Agent 编排 → 知识 / 模型 / 治理能力`

## 边界

本层不承担以下职责：

- **编排状态持有**：不持有主工作流编排与多 Agent 协作状态。
- **知识与检索维护**：不直接维护向量索引、检索策略与知识治理规则。
- **模型路由与配额**：不承担模型统一接入、推理调度与配额控制。
- **授权裁决**：不替代细粒度授权引擎。

## 关键链路

### 1. 应用分发链路

1. 用户经网关进入统一门户。
2. 门户根据当前身份权限展示可见的应用目录与入口。
3. 前端通过 BFF 调用对应的应用或编排服务。

### 2. 会话交互链路

1. 用户发起对话或任务请求。
2. 门户将会话上下文与用户上下文传递至编排层。
3. 编排层返回结果后，由门户统一完成展示、引用呈现与反馈回收。

## 治理要求

- **目录权限一致**：门户呈现的应用目录必须与用户身份及权限范围保持一致。
- **禁止前端绕过治理**：前端不得硬编码绕过网关层与编排层的后端入口。
- **交互动作可追溯**：会话、反馈与人工升级动作须可追溯至具体用户与应用。
- **接口契约稳定**：对外 API 契约需保持向后稳定，避免前端与编排实现强耦合。

## 部署与发布要求

- **前后端分离部署**：门户前端与 BFF 应分离部署，保持前端轻量与后端职责清晰。
- **目录化统一接入**：新应用接入优先通过目录注册与统一入口纳管，避免产生散落入口。
- **发布节奏解耦**：门户发布可快于编排层发布，但须以接口契约稳定为前提。
- **无状态化设计**：高并发场景下，门户层应保持无状态或弱状态，核心状态下沉至专门服务。

## 风险与取舍

- **BFF 层过度膨胀**：若将过多编排逻辑耦合在 BFF 层，应用层将演变为难以维护的隐性控制面。
- **入口碎片化**：若各业务应用各自建设独立入口，平台统一工作台将失去聚合价值。
- **产品形态越界**：若将个人自治型超级智能体产品（如 `OpenClaw`）误作为企业多用户共享门户层的替代方案，将导致应用目录、统一身份与控制面边界混乱。
- **底层强耦合**：若门户层直接依赖底层检索或模型接口，后续切换编排路线将面临极高改造成本。

## 关联文档

- [用户与渠道层](/layers/user-channel)
- [统一接入与流量治理层](/layers/access-traffic-governance)
- [Agent 编排层](/layers/agent-orchestration)
- [技术选型](/stack)
- [扩展升级](/extension-capabilities)

## 参考资料

- [AgentifUI](https://agentifui.com/)
- [LibreChat](https://www.librechat.ai/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
