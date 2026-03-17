# Maker-Checker

> 类型：人工审批与双人复核规范
>
> 复用规则：稳定复用的规范说明页
>
> 当前口径：截至 2026-03-17，`Maker-Checker` 更准确地说是一类基于 `Separation of Duty` 与 `Dual Authorization` 的治理控制要求，而不是单一正式技术标准；在企业智能体平台中，它应被写成高风险动作的强制控制基线
>
> 权威来源：NIST 术语表中的 `separation of duties`、`dual authorization`，以及 NIST 800-53 / 800-172 所代表的控制基线思路
>
> 当前方案执行点：门户 / BFF 的审批入口、编排层的人机协同节点、`Casbin` 的前置授权、审计与追踪链路

## 当前定位

`Maker-Checker` 是当前方案对高风险动作的人工复核治理基线。

它要求把“提出动作的人”和“批准动作的人”明确分离，让模型、工具和自动化流程即使具备执行能力，也不能在高风险场景中绕过人工确认和职责分离直接落地。

## 规范约束什么

- 哪些动作必须经过人工确认、双人复核或人工接管。
- 发起人、审批人、执行系统之间的责任边界如何划分。
- 审批前需要查看哪些上下文，审批后需要保留哪些证据。
- 紧急放行、失败补偿、超时处理和事后复盘如何执行。

## 核心原则

- 发起与批准分离，避免同一主体既提出又放行高风险动作。
- 审批不是只看一个按钮确认，而是基于动作对象、上下文、影响范围和风险级别做判断。
- 高风险动作必须先授权、再审批、再执行、再留痕。
- 审批结果必须可追溯、可撤销、可复盘，不能只保留“已通过”状态。
- 紧急旁路必须是例外路径，且要有更严格的留痕和事后审查。

## 在当前方案中的落点

- 对外发送通知、写业务数据、执行数据库变更、调用高风险工具、触发生产系统动作等场景，应强制进入 `Maker-Checker` 流程。
- 门户 / `BFF` 提供审批入口和状态视图，编排层或 runtime 在审批节点等待继续、拒绝或人工接管。
- [Casbin](/components/casbin) 负责前置权限判断，但权限通过不等于可直接执行高风险动作。
- 审批动作、审批意见、执行结果和补偿结果都要进入统一审计与追踪链路。

## 与组件 / 协议关系

- 与 [RBAC + ABAC](/norms/rbac-abac) 的关系是“谁有资格发起 / 审批”与“哪些动作必须复核”的关系。
- 与 [Casbin](/components/casbin) 配合时，授权裁决用于确定资格，`Maker-Checker` 用于控制真正落地执行。
- 与 [OpenTelemetry](/standards/opentelemetry) 和平台审计链路配合时，应打通审批请求、执行请求和最终结果的追踪标识。
- 与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 配合时，审批主体、代理主体和执行主体必须可区分、可追踪。

## 适用场景

- 生产数据写入、删除和批量修改
- 外部通知、邮件、短信、工单或客户触达
- 数据库执行、脚本触发和运维动作
- 权限变更、租户变更和配置发布
- 合同、审批、资金或其他高敏业务流程

## 边界

- 不要求所有动作都走双人复核，重点是高风险动作分级治理。
- 不替代授权模型、审批系统或业务流程系统本身。
- 不等于前端弹一个确认框；如果没有独立审批主体和留痕，就不算真正的 `Maker-Checker`。
- 不应被实现成只在人工页面生效，而 API、脚本和工具调用路径可以绕过。

## 落地规则

- 先建立高风险动作目录，明确哪些动作必须进入复核流程。
- 明确 `maker`、`checker`、执行者和审计责任人，避免角色混同。
- 审批时至少展示动作摘要、目标对象、影响范围、触发来源和当前上下文。
- 执行前再次校验审批状态、时效性和上下文是否发生变化。
- 对拒绝、超时、撤回、失败和紧急旁路都要定义处理规则与补偿路径。

## 治理注意点

- 要防止同一人通过多个账号、代理身份或脚本路径同时扮演 `maker` 与 `checker`。
- 要防止工具层或 API 层存在绕过审批的直接调用通道。
- 要给审批设置合理时效，避免旧审批长期悬挂后被误用。
- 要把审批链路和执行链路打通到统一审计记录中，确保事后能追到“谁申请、谁批准、系统做了什么”。

## 关联文档

- [规范页总览](/norms/)
- [RBAC + ABAC](/norms/rbac-abac)
- [Policy as Code](/norms/policy-as-code)
- [安全与治理](/governance)
- [Casbin](/components/casbin)

## 参考资料

- [NIST Glossary: separation of duties](https://csrc.nist.gov/glossary/term/separation_of_duties)
- [NIST Glossary: dual authorization](https://csrc.nist.gov/glossary/term/dual_authorization)
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [NIST SP 800-172 Enhanced Security Requirements for Protecting Controlled Unclassified Information](https://csrc.nist.gov/pubs/sp/800/172/final)
