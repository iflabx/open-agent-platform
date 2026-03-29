# 企业现有 Web / IM / 工单 / CRM / ERP 入口

> 类型：企业现有入口复用能力
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：用户与渠道层
>
> 官方网站：不适用；这是企业现有入口系统能力集合，不对应单一官方站点
>
> 开源仓库地址：不适用；这是企业现有入口系统能力集合，不对应统一开源仓库

## 当前定位

这一项不是新增开源组件，而是当前方案在用户与渠道层复用的企业现有入口能力集合。

它负责把员工、运营、客服、业务系统和外部事件稳定送入智能体平台，让平台能力能够通过企业已经存在的 `Web / IM / 工单 / CRM / ERP / Webhook` 等前门进入真实业务流程。

渠道层复用的是企业已有前门；进入平台后，再由第 3 层的 [AgentifUI](/components/agentifui) 或条件引入的 [OpenClaw](/components/openclaw) 承接统一门户或成品化超级智能体前台体验。

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
- 下游统一进入 [APISIX](/components/apisix) 这一北向入口，再分发到 [AgentifUI](/components/agentifui)、[OpenClaw](/components/openclaw)、`BFF` 和编排层。
- 与企业现有 `SSO / IAM` 协同，把身份与组织上下文传递到后续各层。
- 与 [Casbin](/components/casbin) 配合时，只负责传递主体上下文，不负责细粒度授权裁决。
- 与 [用户与渠道层](/layers/user-channel) 的关系是“复用能力说明页”与“层定义文档”的关系。

## 适合场景

- 需要复用企业现有前门，而不是新造统一渠道平台的场景。
- 需要把智能体能力嵌入企业门户、IM、工单或业务系统流程的场景。
- 需要同时承接人机交互入口和系统触发入口的场景。

## 边界

- 不直接承载模型路由、知识检索或工作流编排。
- 不替代统一入口网关、门户层或编排层。
- 不直接做细粒度授权裁决。
- 不要求把所有渠道统一重写成一套新前端。
- 不决定第 3 层最终采用统一门户前台还是超级智能体前台，只负责把请求稳定送入平台。

## 采用规则

- 当前方案优先复用企业现有 `Web / IM / 工单 / CRM / ERP / Webhook` 入口，不新增第二套正式前门组件。
- 所有入口流量优先统一收敛到网关层，不建议每个入口直接暴露后端能力。
- 渠道侧只保留最薄适配层，业务流程、模型调用和知识访问放到下游层处理。
- 新接入入口需要明确身份承接方式、上下文传递方式和审计字段。
- 如需成品化超级智能体产品，可在下游第 3 层由 [OpenClaw](/components/openclaw) 承接，但渠道复用和统一入口治理规则不变。

## 治理注意点

- 要统一用户主键、渠道来源、会话标识和来源系统标识，保证跨入口可追踪。
- 要避免入口侧各写一套私有逻辑，导致身份、审计和限流规则漂移。
- 面向用户的入口应满足基本可访问性要求，避免关键能力只在单一交互方式中可用。
- Webhook 或系统触发入口要明确来源校验、重放保护和失败补偿规则。

## 关联文档

- [1. 用户与渠道层](/layers/user-channel)
- [APISIX](/components/apisix)
- [AgentifUI](/components/agentifui)
- [OpenClaw](/components/openclaw)
- [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)
- [安全与治理](/governance)

## 参考资料

- [W3C Web Content Accessibility Guidelines (WCAG) Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [CloudEvents Specification](https://cloudevents.io/)
- [OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0.html)
