# RBAC + ABAC

> 类型：授权模型规范
>
> 复用规则：稳定复用的规范说明页
>
> 当前口径：截至 2026-03-17，`RBAC` 的稳定公共基线仍可追溯到 NIST RBAC 模型与 ANSI/INCITS 359；`ABAC` 的权威公开基线采用 NIST SP 800-162（2019 更新版）。在企业智能体平台中，两者应组合使用，而不是二选一
>
> 权威来源：NIST RBAC 项目资料、NIST SP 800-162、NIST 术语表中的 `least privilege` 与 `separation of duty`
>
> 当前方案执行点：企业现有 `SSO / IAM` 负责身份来源，`Casbin` 负责授权裁决，门户 / BFF / 知识服务 / 工具服务负责执行点落地

## 当前定位

`RBAC + ABAC` 是当前方案的统一授权模型基线。

它的作用不是只解决“登录后能不能进系统”，而是把“谁能访问哪个应用、看到哪些知识、调用哪些工具、在什么上下文里能执行哪些动作”统一收敛为一套可裁决、可审计、可回滚的授权规则。

## 规范约束什么

- 用户、服务账号和系统主体可以访问哪些应用、菜单、接口和能力。
- 在租户、部门、项目、数据等级、地域、时间窗等上下文下，访问是否仍然成立。
- 高风险工具调用、写操作和审批动作是否满足额外约束。
- 权限变更、临时授权和角色组合是否违反最小权限或职责分离要求。

## 核心原则

- `RBAC` 负责稳定权限面：岗位、角色、应用入口、常规功能和基础操作。
- `ABAC` 负责动态约束面：部门、租户、项目、数据标签、环境、流程阶段和风险等级。
- 高风险动作不能只靠角色判定，必须叠加属性、上下文或审批状态。
- 认证与授权分离：身份来自企业现有 `IAM / SSO`，授权裁决由平台统一执行。
- 默认最小权限，并对关键岗位组合执行职责分离约束。

## 在当前方案中的落点

- 门户与应用层使用 `RBAC` 管理应用入口、工作台菜单、管理台功能和基础操作权限。
- 知识检索与数据访问使用 `ABAC` 叠加部门、租户、数据域、密级和标签过滤。
- 工具调用与外部动作执行使用“角色 + 属性 + 动作分级”的组合裁决，不允许只靠前端隐藏按钮。
- 高风险流程在授权判定之外，还应与 [Maker-Checker](/norms/maker-checker) 结合，形成权限与审批的双重约束。

## 与组件 / 协议关系

- 与 [Casbin](/components/casbin) 的关系是“授权模型规范”与“授权裁决引擎实现”的关系。
- 与 [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access) 的关系是“身份来源”与“权限裁决”的关系，认证不能替代授权。
- 与 [OpenMetadata](/components/openmetadata)、[LlamaIndex](/components/llamaindex) 等知识层组件配合，用标签、数据域和访问范围承接属性约束。
- 与 [APISIX](/components/apisix) 配合时，网关可做前置检查和上下文传递，但业务授权结果仍应由统一裁决口径决定。

## 适用场景

- 应用目录与工作台访问控制
- 知识库、数据集与检索结果过滤
- 工具调用与敏感操作授权
- 多租户、跨部门和跨项目协作
- 临时授权、时段授权和环境隔离

## 边界

- 不替代身份认证、组织同步和会话管理。
- 不替代审批流、人工复核和高风险动作确认。
- 不等于“把所有条件都写成角色”；动态约束不应硬塞进角色爆炸模型。
- 不等于“只做 ABAC 就够了”；缺少稳定角色模型会让运营和审计失控。

## 落地规则

- 平台应先定义统一主体模型：用户、组、角色、租户、部门、应用、数据域、工具和动作。
- 常规入口权限优先落在 `RBAC`，上下文限制优先落在 `ABAC`，避免重复建模。
- 高风险动作必须至少同时判断主体、动作、目标对象和环境上下文。
- 临时授权和例外授权必须有时效、责任人和审计记录，不能变成长期隐性权限。
- 权限策略要进入版本管理和发布流程，不允许散落在前端判断或服务私有代码里。

## 治理注意点

- 要防止角色数量无限膨胀，定期清理近义角色和无主角色。
- 要统一属性字典与取值口径，避免“部门”“项目”“数据等级”在不同系统里含义不一致。
- 要检查是否存在职责冲突角色组合，避免同一人既能发起又能批准高风险动作。
- 要将授权结果、命中规则、临时授权状态和审批状态写入审计链路，方便复盘。

## 关联文档

- [规范页总览](/norms/)
- [身份接入协议（OIDC / OAuth2 / SAML / SCIM）](/protocols/identity-access)
- [Maker-Checker](/norms/maker-checker)
- [安全与治理](/governance)
- [Casbin](/components/casbin)

## 参考资料

- [NIST SP 800-162 Guide to Attribute Based Access Control (ABAC) Definition and Considerations](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- [NIST Role Based Access Control Project](https://csrc.nist.gov/projects/role-based-access-control)
- [NIST Glossary: least privilege](https://csrc.nist.gov/glossary/term/least_privilege)
- [NIST Glossary: separation of duties](https://csrc.nist.gov/glossary/term/separation_of_duties)
