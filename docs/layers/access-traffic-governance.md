# 2. 统一接入与流量治理层

> 定位：作为平台统一北向入口与内部 AI 原生协议接入层，负责认证接入、路由、限流、灰度与前置审计。
>
> 当前承载组件：`APISIX`、`agentgateway`、企业现有 `SSO` / `IAM`。

相关文档：

- [组件](/components)
- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)
- [身份接入协议](/protocols/identity-access)
- [门户与应用层](/layers/portal-application)

## 本层定义

统一接入与流量治理层位于所有公开或半公开接口之前，是企业智能体平台的统一入口面。

本层的核心职责是将分散的入口请求收敛为可认证、可路由、可审计、可灰度的标准流量，再分发至门户、应用、Agent 服务与平台接口；同时，在协议丰富的内部南向（Southbound）链路上，承接 `MCP`、`A2A` 及相关 AI 原生协议的统一接入与治理。

## 本层功能

- **北向入口统一暴露**：集中对外暴露平台北向访问入口，收口外部调用面。
- **身份认证对接**：与企业现有 `SSO` / `IAM` 对接，完成认证接入与组织上下文继承。
- **流量与发布控制**：执行路由、限流、配额、熔断、灰度与版本发布前置控制。
- **入口审计留痕**：为后续审计、可观测性与问题定位保留统一的入口日志与调用标识。
- **内部 AI 协议治理**：在内部链路中承接 `MCP`、`A2A` 及相关 AI 原生协议的统一接入与治理。

## 当前承载组件

- [APISIX](/components/apisix)
- [agentgateway](/components/agentgateway)
- 企业现有 `SSO` / `IAM`

::: tip 核心分工
- **`APISIX`**：负责平台主要北向统一入口。
- **`agentgateway`**：负责内部 AI 原生协议网关。
- **企业现有 `SSO` / `IAM`**：继续复用既有身份源体系，不重复建设独立账号系统。
:::

## 上下游关系

上游层级：

- [用户与渠道层](/layers/user-channel)

下游层级：

- [门户与应用层](/layers/portal-application)
- [Agent 编排层](/layers/agent-orchestration)
- [治理与观测层](/layers/governance-observability)

默认北向链路应保持为：

`渠道请求 → APISIX → 认证接入 / 流量治理 → BFF / 应用 / 服务`

在复杂南向（Southbound）协议链路中，可扩展为：

`门户 / BFF / Agent Runtime → agentgateway → MCP / A2A / 远程 Agent / 工具服务`

## 边界

本层负责保障请求安全、稳定地接入平台，不承担以下职责：

- **模型路由**：不替代 [模型网关与推理层](/layers/model-gateway-inference) 的模型路由与推理调度。
- **细粒度授权**：不替代 [治理与观测层](/layers/governance-observability) 的细粒度授权裁决。
- **业务编排**：不承载业务工作流与多 Agent 协作逻辑。
- **知识与数据治理**：不直接承担知识索引构建与数据治理任务。

## 关键链路

### 1. 入口鉴权链路

1. 渠道入口将请求发送至 `APISIX`。
2. `APISIX` 对接企业 `SSO` / `IAM` 完成认证接入。
3. 网关执行路由、限流与前置安全检查。
4. 请求随后进入门户、BFF 或平台服务。

### 2. 内部 AI 协议接入链路

1. 门户 BFF、编排层或 Agent Runtime 需要调用 `MCP` 工具、远程 Agent 或相关南向（Southbound）协议能力。
2. 请求进入 `agentgateway`，统一执行协议接入、认证、授权、路由与观测采集。
3. `agentgateway` 将流量分发至 `MCP` Server、`A2A` 远程 Agent 或对应工具服务。

### 3. 发布与灰度链路

1. 新接口或新版本先在网关层登记路由规则。
2. 基于权重、流量标签或环境维度执行灰度放量。
3. 结合观测层指标决定继续放量或执行回滚。

## 治理要求

- **入口收敛约束**：所有外部入口均须经过统一网关，严禁业务服务私自暴露公网入口。
- **来源可追踪**：身份接入规则、客户端信息与来源租户信息必须全链路可追踪。
- **策略版本化**：入口限流、熔断与灰度策略须纳入版本化管理。
- **入口证据链**：网关侧审计不替代应用审计，但必须提供统一的入口审计证据链。
- **双网关边界清晰**：明确划分 `APISIX` 与 `agentgateway` 的职责边界，避免同时承载公网入口与内部协议治理而引发职责混乱。

## 部署与发布要求

- **北向高可用**：`APISIX` 应采用高可用架构部署，消除统一入口单点故障。
- **内部网关高可用**：`agentgateway` 进入生产主链路后同样应按高可用方式部署，并接入统一观测体系。
- **声明式配置管理**：网关配置与插件策略应通过代码化或配置化方式管理。
- **轻量前置治理**：网关仅承担前置治理能力，不应堆积过重的业务逻辑。
- **先纳管后暴露**：新增接口须先纳入网关治理，再确定后端承载位置。

## 风险与取舍

- **网关职责过载**：若将模型路由或业务编排过度耦合在网关层，系统复杂度将迅速失控。
- **绕过入口破坏闭环**：若统一入口形同虚设，后端直连将直接破坏审计完整性与身份一致性。
- **认证口径分裂**：若认证逻辑在多个入口重复实现，将导致权限口径不一致。
- **协议治理边界模糊**：若未区分公网入口网关与内部 AI 协议网关，后续 `MCP` / `A2A` / LLM 链路治理将难以收敛。

## 关联文档

- [用户与渠道层](/layers/user-channel)
- [门户与应用层](/layers/portal-application)
- [安全与治理](/governance)
- [部署与发布](/deployment)

## 参考资料

- [Apache APISIX Documentation](https://apisix.apache.org/docs/)
- [agentgateway Introduction](https://agentgateway.dev/docs/standalone/latest/about/introduction/)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0-final.html)
