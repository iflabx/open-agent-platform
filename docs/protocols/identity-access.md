# 身份接入协议（OIDC / OAuth2 / SAML / SCIM）

> 类型：身份与组织接入协议组
>
> 复用规则：稳定复用的协议说明页
>
> 当前口径：截至 2026-03-17，现代企业 Web / App / API 接入默认以 `OIDC + OAuth 2.0` 为基线，并结合 `RFC 9700` 的安全最佳实践；`OAuth 2.1` 仍处于 Internet-Draft；`SAML 2.0` 主要承担存量企业 SSO 兼容；`SCIM 2.0` 用于用户、组与组织同步
>
> 官方网站：OIDC / OpenID Connect 参考 https://openid.net/ ；OAuth 参考 https://datatracker.ietf.org/wg/oauth/documents/ ；SAML 参考 https://www.oasis-open.org/standard/saml/ ；SCIM 参考 https://datatracker.ietf.org/wg/scim/about/
>
> 开源仓库地址：无统一官方仓库；OpenID 规范与草案入口可参考 https://github.com/openid ，OAuth 工作组草案入口可参考 https://github.com/oauth-wg

## 当前定位

这不是单一协议页，而是企业身份接入所需的四类基础协议组合页。

在当前方案中，它们共同承担“把企业现有 `IAM / SSO / 目录 / 组织系统` 安全接入智能体平台”的职责，覆盖登录认证、授权委托、联邦兼容以及用户与组织同步。

## 协议组约束什么

- 用户如何登录平台并获得可验证身份。
- 应用如何代表用户或自身访问 API 与平台能力。
- 平台如何兼容传统企业 `SSO` 体系。
- 用户、组、部门和组织属性如何被同步到平台侧。

## 核心分工

### 1. `OIDC`

- 面向现代 Web、移动端和前后端分离应用的身份认证与单点登录。
- 在 `OAuth 2.0` 授权框架之上增加 `ID Token`、`UserInfo`、Discovery 等身份能力。
- 适合作为门户工作台、管理后台和应用前台的默认登录协议。

### 2. `OAuth 2.0`

- 解决授权委托、访问令牌、客户端接入和 API 调用授权。
- 在企业平台中主要用于前端到 `BFF`、第三方应用到平台 API、服务到服务访问等场景。
- 当前落地应以 `RFC 9700` 的安全最佳实践为准，避免继续新建 `Implicit` 或 `Resource Owner Password` 这类过时模式。

### 3. `SAML 2.0`

- 面向传统企业身份联邦和存量 `SSO` 兼容。
- 常见于大型企业既有 IAM、办公入口和老系统集成场景。
- 在当前方案中应作为兼容路径，而不是新系统首选协议。

### 4. `SCIM 2.0`

- 用于用户、组、组织及属性同步。
- 解决“能登录”之外的“平台内部主体与组织结构如何持续对齐”问题。
- 对应用授权、知识权限、审计主体标识和离职停用尤其关键。

## 在当前方案中的落点

- 门户工作台、管理后台和应用前台默认复用企业现有 `OIDC / OAuth 2.0` 能力完成登录与 API 授权。
- 入口网关、`BFF` 和平台服务继承同一主体上下文，避免各层重复做用户体系。
- 当企业仅提供传统 `SAML` 联邦能力时，可通过兼容接入保留统一登录入口。
- 通过 `SCIM` 把用户、组、部门和属性同步到平台侧，支撑应用目录、知识权限、工具权限、审计追踪和租户治理。

## 与组件 / 其他协议关系

- 与 [Casbin](/components/casbin) 的关系是“认证 / 主体接入”与“授权决策”的关系，认证与授权不能混写为一个概念。
- 与 [APISIX](/components/apisix) 的关系是“身份标准”与“入口执行点”的关系，网关负责执行校验与传递，不定义身份标准。
- 与 [OpenAPI](/protocols/openapi) 配合：接口契约里可以描述 security scheme，但真正的身份含义来自 `OIDC / OAuth2 / SAML / SCIM`。
- 与 [MCP 协议](/protocols/mcp) 和 [A2A 协议](/protocols/a2a) 配合：智能体协议链路仍应继承企业身份、授权与审计上下文，而不是旁路自建用户体系。

## 适合场景

- 企业单点登录
- 平台 API 授权与第三方应用接入
- 兼容传统企业 IAM / SSO
- 用户、组、组织与属性同步
- 审计主体、权限主体和目录主体统一

## 边界

- 不替代业务授权模型，认证成功不等于具备业务权限。
- 不替代审批流、审计系统和风险治理策略。
- `SCIM` 负责主体同步，不负责运行时授权决策。
- `SAML` 不是新建现代 Web / SPA / 移动应用的首选协议。

## 采用规则

- 当前方案默认现代接入基线为 `OIDC + OAuth 2.0 + PKCE + 安全 BCP`。
- 除兼容存量系统外，不新增基于 `Implicit` 或 `ROPC` 的新接入方案。
- 对外部企业接入优先明确 IdP、令牌签发、JWKS、重定向 URI、登出与会话续期规则。
- 平台内部主体、组和属性应尽量通过 `SCIM` 或等效受控同步机制统一收敛，不在多个系统各自维护。

## 治理注意点

- 要统一用户主键、组标识、租户标识和属性映射，避免同一主体在多个系统中出现别名漂移。
- 要控制令牌有效期、刷新策略、密钥轮换、签名算法与时钟偏差处理。
- 要对管理员授权、组变更、目录同步失败和停用传播建立审计与告警机制。
- 要明确认证、授权、目录同步和应用侧会话四类责任边界，避免问题归属模糊。

## 关联文档

- [协议页总览](/protocols/)
- [OpenAPI](/protocols/openapi)
- [RBAC + ABAC](/norms/rbac-abac)
- [统一接入与流量治理层](/layers/access-traffic-governance)
- [Casbin](/components/casbin)
- [APISIX](/components/apisix)

## 参考资料

- [OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0.html)
- [OpenID Connect Discovery 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-discovery-1_0.html)
- [RFC 6749: The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700)
- [OAuth 2.1 draft-15](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-15)
- [OASIS Security Assertion Markup Language (SAML) V2.0](https://www.oasis-open.org/standard/saml/)
- [RFC 7643: SCIM Core Schema](https://www.rfc-editor.org/rfc/rfc7643)
- [RFC 7644: SCIM Protocol](https://www.rfc-editor.org/rfc/rfc7644)
