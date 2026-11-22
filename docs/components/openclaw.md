# OpenClaw

> 类型：开源个人自治型智能体（扩展能力候选）
>
> 采用定位：可选扩展能力（独立沙箱实例，不纳入主方案共享门户基线）
>
> 归属定位：扩展能力（不作为第 3 层共享多用户门户）
>
> 官方网站：https://openclaw.ai/
>
> 开源仓库地址：https://github.com/openclaw/openclaw

## 当前定位

`OpenClaw` 的公开定位为可自托管的个人 AI 助手（Personal AI Assistant），内置多渠道接入、Gateway 控制面、Control UI、技能体系、长期会话和多端交互能力。

在本方案中，`OpenClaw` **不纳入第 3 层（门户与应用层）的共享多用户门户基线**，而是归类为 [扩展升级](/extension-capabilities) 中的**个人自治型超级智能体（独立沙箱实例）**扩展能力候选。它仅适用于少量高阶用户、研发团队或高信任小组，通过 **Multi-Instance（多实例）独立沙箱**方式按单人或单个高信任小组独立部署，**严禁作为数万人规模企业的共享多租户门户网关**使用。

::: warning 架构红线
严禁将 `OpenClaw` 以单实例或多租户共享方式直接承接全员门户流量。全员统一入口、应用目录与多业务线分发由第 3 层 `AgentifUI` + 门户 / BFF 承担；`OpenClaw` 仅在具备独立沙箱隔离、技能审核与统一模型审计链路的前提下，面向特定高信任人群作为独立扩展能力按需交付。
:::

## 主要职责

- 面向少量高阶用户、研发或高信任小组的个人自治型超级智能体实例
- 多渠道会话入口与个人持续上下文交互
- Control UI、WebChat、Canvas 与多端协同体验
- 受控沙箱内的个人技能调用、记忆管理与长期会话承载

## 与其他组件关系

- 与 [AgentifUI](/components/agentifui) 严格分层定位：`AgentifUI` + 门户 / BFF 承担第 3 层企业全员共享统一门户与应用目录；`OpenClaw` 不进入共享门户基线，仅作为 [扩展升级](/extension-capabilities) 中的独立沙箱个人助手实例按需部署。
- 对外或内网暴露的 Web 控制面、WebChat 和远程访问入口仍须统一收敛至 [APISIX](/components/apisix) 入口治理与企业 `SSO / IAM` 认证边界，不得私自开放直连入口。
- 所有模型调用必须统一经由 [LiteLLM](/components/litellm) 路由至模型层，禁止实例直连底层推理服务或绕过配额与成本治理。
- 多渠道消息入口、技能执行、浏览器 / 设备控制等高自治动作，须接入 [Casbin](/components/casbin) 权限策略、[LangFuse](/components/langfuse) 及平台统一审计链路，实现全链路留痕与可追溯。
- 企业级跨系统流程、正式状态机与多部门共享编排仍应交由 [LangGraph](/components/langgraph) 或主平台路线承接，不得将企业共享业务编排逻辑耦合在个人自治实例内部。

## 适合场景

- 研发工程师、技术专家等少量高阶用户的个人深度协同与自治任务辅助
- 具备明确信任边界与独立资源配额的小型高信任业务小组
- 需要多渠道连续会话、Canvas、Control UI 及个人工作区技能执行的独立沙箱场景

## 边界

- **不作为第 3 层共享门户**：不替代 [AgentifUI](/components/agentifui)、企业统一应用目录与共享 BFF 控制面，不承接全员多租户流量。
- **不按主平台路线定位**：不替代 `Dify`、`RAGFlow` 或 `LangGraph` 等企业级编排与运行时底座。
- **不替代网关组件**：不替代 [APISIX](/components/apisix) 的北向统一入口职责，也不替代 [agentgateway](/components/agentgateway) 的内部 AI 原生协议网关职责。
- **不形成治理孤岛**：严禁绕过企业统一身份、模型网关（`LiteLLM`）、权限体系与审计观测链路独立运行。

## 采用规则与隔离要求

企业引入 `OpenClaw` 时，必须同时满足以下五项强制隔离与治理条件：

- **Multi-Instance 独立实例隔离**：按单用户或单个高信任小组分配独立实例（Per-User / Per-High-Trust-Group），禁止跨部门或跨非信任群体共享同一实例、同一会话存储或同一工作区。
- **独立沙箱节点池与 MicroVM 级隔离**：在共享门户与主平台集群之外划设专属沙箱节点池，结合容器或 MicroVM 级强隔离边界与独立 CPU / 内存 / 存储配额运行，避免自治执行影响主干平台稳定性。
- **经审核的企业内部技能仓库**：禁止实例直接拉取或执行未经安全评审的外部社区技能；所有可用技能须经安全与平台团队审核后发布至内部白名单技能仓库。
- **凭据剥离（Secret Stripping）**：严禁将企业系统级静态密钥、数据库密码或高权限 Token 直接注入或落盘至实例运行环境；外部能力访问优先通过受控网关与短期受限凭据代理完成。
- **统一模型路由与全链路审计**：所有模型推理请求强制路由至 [LiteLLM](/components/litellm)，所有对话、工具与技能执行事件统一接入 [LangFuse](/components/langfuse) 及平台审计体系。

## 治理注意点

- **非可信输入防护**：多渠道 DM、群聊和外部消息面本质上属于非可信输入，应重点审查 pairing、allowlist、来源验证与重放保护。
- **高敏动作分级管控**：浏览器控制、设备节点、Canvas、远程控制与本地自动化动作须按风险分级管控，默认关闭高危能力，仅对通过审批的沙箱实例按最小权限开放。
- **身份映射可追踪**：实例内的会话、记忆、渠道账号与企业 `SSO / IAM` 主身份之间必须建立可追踪的确定性映射，避免跨渠道产生匿名状态漂移。
- **远程访问收敛**：若通过 `Tailscale`、Remote UI 或其他方式提供访问，必须符合企业既有网络分区、零信任与访问控制规范，并统一纳管审计日志。

## 关联文档

- [扩展升级](/extension-capabilities)
- [3. 门户与应用层](/layers/portal-application)
- [AgentifUI](/components/agentifui)
- [APISIX](/components/apisix)
- [LiteLLM](/components/litellm)
- [安全与治理](/governance)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [OpenClaw 官网](https://openclaw.ai/)
- [OpenClaw 文档首页](https://docs.openclaw.ai/index)
- [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)
- [OpenClaw Getting Started](https://docs.openclaw.ai/start/getting-started)
- [OpenClaw Concepts: Architecture](https://docs.openclaw.ai/concepts/architecture)
- [OpenClaw Channels](https://docs.openclaw.ai/channels)
- [OpenClaw Gateway Security](https://docs.openclaw.ai/gateway/security)
