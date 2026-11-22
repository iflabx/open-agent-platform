# 企业现有 Web / IM / 工单 / CRM / ERP 入口

> 类型：企业现有入口复用能力
>
> 采用定位：默认复用（企业现有入口能力集合）
>
> 所属层：用户与渠道层
>
> 官方网站：不适用；这是企业现有入口系统能力集合，不对应单一官方站点
>
> 开源仓库地址：不适用；这是企业现有入口系统能力集合，不对应统一开源仓库

## 当前定位

本项并非新增开源组件，而是本方案在用户与渠道层复用的企业现有入口能力集合。

它负责将员工、运营、客服、业务系统和外部事件稳定引入智能体平台，使平台能力通过企业既有的 Web、IM、工单、CRM、ERP、Webhook 等业务入口融入真实业务流程。

渠道层复用企业既有入口；请求进入平台后，由第 3 层的 [AgentifUI](/components/agentifui) 与门户 / BFF / API 层承接企业统一工作台与应用入口。

## 主要职责

- 承接员工门户、企业 IM、工单系统、CRM / ERP 和业务系统入口。
- 提供聊天、表单、工单、通知、消息回调和业务触发等进入方式。
- 向下游传递用户身份、组织、渠道来源、会话标识和来源系统上下文。
- 承接用户反馈、人工转办、会话继续和业务回填等回流动作。

## 典型入口类型

### Web 门户与管理后台

- 员工工作台
- 运营后台
- 业务前台
- 管理入口

### 企业 IM 与消息入口

- 企业 IM 聊天入口
- 机器人消息入口
- 通知与回执入口

### 工单与服务入口

- 工单发起
- 工单续办
- 人工接管
- 审核与转办

### 业务系统入口

- CRM 场景入口
- ERP 场景入口
- 业务表单与审批入口
- 外部系统 API / Webhook 触发入口

## 与其他组件关系

- 上游承接员工、运营、客服和业务系统事件。
- 下游统一进入 [APISIX](/components/apisix) 这一北向入口，再分发至 [AgentifUI](/components/agentifui)、门户 `BFF` 和编排层。
- 与企业现有 `SSO / IAM` 协同，将身份与组织上下文传递至后续各层。
- 与 [Casbin](/components/casbin) 配合时，仅负责传递主体上下文，不承担细粒度授权裁决。
- 作为 [用户与渠道层](/layers/user-channel) 的核心承载能力，具体分层边界与接入规范详见层定义文档。

## 适合场景

- 需要复用企业既有入口而非新建独立渠道平台的场景。
- 需要将智能体能力嵌入企业门户、IM、工单或业务系统流程的场景。
- 需要同时承接人机交互入口和系统触发入口的场景。

## 边界

- 不直接承载模型路由、知识检索或工作流编排。
- 不替代统一入口网关、门户层或编排层。
- 不直接承担细粒度授权裁决。
- 不要求将所有渠道统一重写为一套新前端。
- 不承载第 3 层门户前台或应用目录逻辑，仅负责将请求与上下文稳定送入平台。

## 采用规则

- 本方案优先复用企业现有 Web、IM、工单、CRM、ERP、Webhook 入口，不新增第二套正式渠道入口组件。
- 所有入口流量优先统一收敛至网关层，避免各入口直接暴露后端能力。
- 渠道侧仅保留最薄适配层，业务流程、模型调用和知识访问交由下游层处理。
- 新接入入口需明确身份承接方式、上下文传递方式和审计字段。
- 若按 [扩展升级](/extension-capabilities) 以单人或高信任小组独立沙箱实例模式按需引入 [OpenClaw](/components/openclaw) 等个人自治型超级智能体，仍须遵循渠道隔离与统一入口治理边界，不纳入第 3 层共享门户基线。

## 治理注意点

- 统一用户主键、渠道来源、会话标识和来源系统标识，保证跨入口可追踪。
- 避免入口侧各自维护私有逻辑，防止身份、审计和限流规则漂移。
- 面向用户的入口应满足基本可访问性要求，避免关键能力仅在单一交互方式中可用。
- Webhook 或系统触发入口需明确来源校验、重放保护和失败补偿规则。

## 关联文档

- [1. 用户与渠道层](/layers/user-channel)
- [APISIX](/components/apisix)
- [AgentifUI](/components/agentifui)
- [扩展升级](/extension-capabilities)
- [OpenClaw](/components/openclaw)
- [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)
- [安全与治理](/governance)

## 参考资料

- [W3C Web Content Accessibility Guidelines (WCAG) Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [CloudEvents Specification](https://cloudevents.io/)
- [OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0.html)
