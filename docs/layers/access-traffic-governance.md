# 2. 统一接入与流量治理层

> 定位：作为平台统一北向入口与内部 AI 原生协议接入层，负责认证接入、路由、限流、灰度和前置审计。
>
> 当前承载组件：`APISIX`、`agentgateway`、企业现有 `SSO / IAM`。

相关文档：

- [组件](/components)
- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)
- [身份接入协议](/protocols/identity-access)
- [门户与应用层](/layers/portal-application)

## 一、本层定义

统一接入与流量治理层位于所有公开或半公开接口之前，是企业智能体平台的统一入口面。

它的核心任务是把分散的入口请求收敛为可认证、可路由、可审计、可灰度的标准流量，再分发到门户、应用、Agent 服务和平台接口；在协议丰富的内部 southbound 链路上，还要承接 `MCP`、`A2A` 和相关 AI 原生协议的统一接入与治理。

## 二、本层功能

- 统一暴露北向访问入口。
- 与企业现有 `SSO / IAM` 对接，完成认证接入和组织上下文继承。
- 执行路由、限流、配额、熔断、灰度和版本发布前置控制。
- 为后续审计、观测和问题定位保留统一的入口日志和调用标识。
- 在内部链路中承接 `MCP`、`A2A` 和相关 AI 原生协议的统一接入与治理。

## 三、当前承载组件

- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)
- 企业现有 `SSO / IAM`

当前规则收敛为：

- `APISIX` 作为主要北向入口
- `agentgateway` 作为内部 AI 原生协议网关
- 身份源继续复用企业既有体系

## 四、上下游关系

上游层级：

- [用户与渠道层](/layers/user-channel)

下游层级：

- [门户与应用层](/layers/portal-application)
- [Agent 编排层](/layers/agent-orchestration)
- [治理与观测层](/layers/governance-observability)

默认链路应保持为：

`渠道请求 -> APISIX -> 认证接入 / 流量治理 -> BFF / 应用 / 服务`

在复杂 southbound 协议链路中，可以扩展为：

`门户 / BFF / Runtime -> agentgateway -> MCP / A2A / 远程 Agent / 工具服务`

## 五、边界

本层负责“把请求安全、稳定地送进去”，但不负责：

- 不替代 [模型网关与推理层](/layers/model-gateway-inference) 的模型路由。
- 不替代 [治理与观测层](/layers/governance-observability) 中的细粒度授权裁决。
- 不承载业务工作流和多 Agent 协作逻辑。
- 不直接承担知识索引构建和数据治理任务。

## 六、关键链路

### 1. 入口鉴权链路

1. 渠道入口把请求送到 `APISIX`。
2. `APISIX` 调用企业 `SSO / IAM` 完成认证接入。
3. 网关完成路由、限流和前置安全检查。
4. 请求再进入门户、BFF 或平台服务。

### 2. 内部 AI 协议接入链路

1. 门户 `BFF`、编排层或 runtime 需要调用 `MCP` 工具、远程 Agent 或相关 southbound 协议能力。
2. 请求进入 `agentgateway`，统一执行协议接入、认证、授权、路由和观测。
3. `agentgateway` 再把流量分发到 `MCP` server、`A2A` 远程 Agent 或相关工具服务。

### 3. 发布与灰度链路

1. 新接口或新版本先在网关层登记路由。
2. 通过权重、流量标签或环境维度执行灰度。
3. 配合观测层指标决定是否放量或回滚。

## 七、治理要求

- 所有外部入口都应先经过统一网关，不允许业务服务私自暴露公网入口。
- 身份接入规则、客户端信息和来源租户信息必须可追踪。
- 入口限流、熔断和灰度策略需要版本化管理。
- 网关侧审计不替代应用审计，但必须提供统一入口证据链。
- `APISIX` 与 `agentgateway` 的边界要明确，避免同时承载公网入口和内部协议治理而导致职责混乱。

## 八、部署与发布要求

- `APISIX` 应按高可用方式部署，避免单入口单点。
- `agentgateway` 在进入生产主链时也应按高可用方式部署，并纳入统一观测。
- 网关配置与插件策略应通过代码化或配置化方式管理。
- 网关只做前置治理，不应堆积过重业务逻辑。
- 新增接口先纳入网关，再决定后端承载位置。

## 九、风险与取舍

- 如果把模型路由、业务编排也塞进网关，复杂度会快速失控。
- 如果统一入口形同虚设，后端直连会破坏审计和身份一致性。
- 如果认证逻辑在多个入口重复实现，会造成权限口径不一致。
- 如果不区分公网入口网关和内部 AI 协议网关，后续 `MCP / A2A / LLM` 链路治理会快速失控。

## 十、关联文档

- [用户与渠道层](/layers/user-channel)
- [门户与应用层](/layers/portal-application)
- [安全与治理](/governance)
- [部署与发布](/deployment)

## 参考资料

- [Apache APISIX Documentation](https://apisix.apache.org/docs/)
- [agentgateway Introduction](https://agentgateway.dev/docs/standalone/latest/about/introduction/)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0-final.html)
