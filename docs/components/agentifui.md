# AgentifUI

> 类型：企业级多应用 Agent 门户与 BFF 前台
>
> 采用定位：默认采用（面向 `Dify` / `LangChain·LangGraph` 应用目录与工作流交付的统一门户前台；通用多模型 / `MCP` 共享对话场景并列参考 `LibreChat`）
>
> 所属层：门户与应用层
>
> 官方网站：https://agentifui.com/
>
> 开源仓库地址：https://github.com/iflabx/agentifui

## 当前定位

`AgentifUI` 是本方案默认采用的企业级 Agent 应用门户前台，采用社区版 `Apache-2.0` 许可证。其核心定位是**面向已有 `Dify` 应用与兼容 `LangChain / LangGraph` Agent 服务的统一企业工作台与 BFF 层**，负责将应用目录（应用市场）、多应用对话/工作流执行、受控人工确认与结果交付物预览收敛至同一用户界面层。

在技术架构上，`AgentifUI` 采用 `Next.js`（App Router）+ `Fastify` 独立 API Sidecar 的前后端分离形态，底层基于 `PostgreSQL`（含 RLS 行级安全）、`Valkey / Redis`、`S3` 兼容对象存储与 `Better Auth`（支持 `OIDC / OAuth2 / CAS` 等身份接入），并以 **AG-UI** 协议作为多后端共享交互底座，与本方案的 `PostgreSQL + Valkey / Redis + S3 + Dify + LangGraph` 技术栈天然对齐。

::: tip 与 LibreChat 及 OpenClaw 的边界
- **与 [LibreChat](/components/librechat) 的场景互补**：`AgentifUI` 专精于面向 `Dify` 与 `LangGraph / LangChain` 编排后端的应用目录、工作流表单、受控人工确认（Approve/Reject）与结构化结果交付；若企业核心诉求是全员通用多模型对话（直连 `LiteLLM`）、原生 `MCP` 工具助手与开箱即用 `SAML / LDAP` 认证，可并列评估选用 [LibreChat](/components/librechat)（纯 `MIT`）。
- **与 [OpenClaw](/components/openclaw) 的交付边界**：`AgentifUI` 负责企业多用户共享统一门户与应用分发；`OpenClaw` 定位为个人自治型超级智能体，不纳入第 3 层共享门户基线，仅作为可选扩展能力按单人或高信任小组独立沙箱实例模式按需引入，详见 [扩展升级](/extension-capabilities)。
:::

## 主要职责

- **企业统一 AI 应用目录与工作台**：集中承接面向全员的多应用发现、分类检索与按角色/分组可见性控制。
- **双后端 Agent 交互承接**：统一对接 `Dify`（Chatbot、Agent、Chatflow、Workflow、文本生成、附件预览）与兼容 `LangChain / LangGraph` 的 Agent 服务，并基于 `AG-UI` 协议提供共享对话流能力。
- **受控人工确认与交付物展示**：面向兼容 `LangGraph / LangChain` 服务提供受控单次人工确认（Approve / Reject）及冻结结果交付物（如 `report.md`、`data.csv` 与来源摘录）的校验与预览能力。
- **内置 BFF / API Sidecar 与治理门控**：通过 `Fastify` Sidecar 服务端保管并加密上游 Service Token，承担受信任用户上下文注入、输入审核、配额与并发门控。

## 与其他组件关系

- 上游由 [APISIX](/components/apisix) 承接统一北向入口、流量治理与入口级认证前置。
- 通过内置 `Fastify` Sidecar 或企业自研 BFF 层对接 [Dify](/components/dify)、[RAGFlow](/components/ragflow) 及 [LangGraph](/components/langgraph) / [LangChain](/components/langchain) 自研 Agent 服务。
- 数据层复用标准 [PostgreSQL](/components/postgresql)（支持 RLS）、[Valkey](/components/valkey) / [Redis](/components/redis) 与 `S3` 兼容对象存储（如 [SeaweedFS](/components/seaweedfs) / [RustFS](/components/rustfs)）。
- 与企业现有 `SSO / IAM` 体系联动，决定用户可见应用目录和访问权限；向下游编排层传递受信任用户上下文、会话上下文与反馈信息。

## 适合场景

- 已采用 `Dify` 或 `Dify + LangGraph` 双编排路线、需要统一企业应用市场与多应用分发入口的组织
- 需要同时承接对话、工作流表单执行、受控人工审批确认与报告/数据结果预览的业务工作台
- 希望门户层原生复用 `PostgreSQL + Valkey / Redis + S3` 基础设施栈、避免引入异构数据库的私有化部署环境

## 边界

- **不构建也不托管 Agent 本身**：不持有核心工作流编排与知识库检索逻辑，仅作为已有 Agent/应用后端的统一交互与治理前台。
- **不做通用多模型直连客户端**：不直接替代面向全员的多模型 ChatGPT 平替前台（此类场景优先参考 [LibreChat](/components/librechat)），也不直接耦合底层推理模型层。
- **不替代完整企业控制面**：平台级细粒度授权、全链路审计与模型路由仍分别由 `Casbin` / `OpenFGA`、`LangFuse` 与 `LiteLLM` 承接。
- **演进期能力与认证边界**：当前仍处于 `0.3.x` 演进阶段且社区规模相对偏小；`AG-UI` 仅覆盖受限交互子集（暂不含通用多中断表单、可执行前端工具、`A2UI / MCP Apps` 与通用崩溃恢复），`SAML` 尚未提供开箱即用的端到端数据库托管登录链路，强依赖 `SAML / LDAP` 的场景建议通过前置 `APISIX` / 统一 `OIDC` 代理收敛，或按场景评估 [LibreChat](/components/librechat)。

## 采用规则

- 本方案默认以 `AgentifUI` 作为面向 `Dify` / `LangGraph` 应用分发场景的统一门户前台；若企业门户以通用多模型对话 + `MCP` 工具 + 原生 `SAML / LDAP` 为核心诉求，可并列选用 [LibreChat](/components/librechat)，同一环境原则上只落一套全员共享门户。
- 不将个人自治型超级智能体（如 [OpenClaw](/components/openclaw)）作为共享门户基线的替代方案；如需引入，按 [扩展升级](/extension-capabilities) 中的独立沙箱实例模式与治理边界单独部署。
- 门户层只承接前台交互、应用分发与轻量 BFF 适配，业务流程、模型调用和知识检索统一交由下游层处理。
- 新应用优先通过统一目录和统一入口接入，避免各业务线独立自建门户前台导致身份、审计与应用目录口径分裂。

## 治理注意点

- **社区规模与版本锁定**：鉴于其处于 `0.3.x` 演进期且开源社区体量较小，生产采用时须锁定具体 Release Tag 并基于自有 CI/冒烟测试验证升级路径，同时保持核心 BFF 契约与身份层解耦，确保前台可平滑演进或替换。
- **凭证与上下文隔离**：上游 Service Token 必须由服务端加密托管，严禁泄露至浏览器端；下游编排调用必须携带服务端校验后的受信任用户标识。
- **目录权限一致**：应用目录的可见范围必须与身份、组织和权限范围一致，并与 `PostgreSQL` RLS 及平台授权策略保持对齐。
- **许可与商标边界**：社区版采用 `Apache-2.0`，同时官方存在商业支持与商标政策声明，企业二次开发与品牌定制前应核对对应版本仓库中的许可证与商标条款。

## 关联文档

- [3. 门户与应用层](/layers/portal-application)
- [LibreChat](/components/librechat)
- [扩展升级](/extension-capabilities)
- [OpenClaw](/components/openclaw)
- [2. 统一接入与流量治理层](/layers/access-traffic-governance)
- [4. Agent 编排层](/layers/agent-orchestration)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [AgentifUI](https://agentifui.com/)
- [AgentifUI GitHub Repository](https://github.com/iflabx/agentifui)
- [AgentifUI Documentation](https://docs.agentifui.com/)
