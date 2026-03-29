# APISIX

> 类型：统一入口网关与流量治理
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：统一接入与流量治理层
>
> 官方网站：https://apisix.apache.org/docs/
>
> 开源仓库地址：https://github.com/apache/apisix

## 当前定位

`APISIX` 是当前方案统一的北向入口，负责把统一门户、超级智能体前台、`BFF`、Agent 服务、知识服务和运维接口的访问请求收敛到同一入口面，再向下分发到各层能力。

## 主要职责

- 北向统一接入
- 路由转发与上游治理
- 限流、熔断、灰度发布
- 入口审计与插件化治理

## 与其他组件关系

- 上游承接 [用户与渠道层](/layers/user-channel) 的 Web、IM、工单和业务系统请求。
- 与企业现有 `SSO / IAM` 协同完成认证接入和组织上下文继承。
- 在协议丰富的内部链路中，与 [agentgateway](/components/agentgateway) 分层协作：`APISIX` 负责北向入口，`agentgateway` 负责内部 AI 原生协议接入。
- 对 [AgentifUI](/components/agentifui) 和 [OpenClaw](/components/openclaw) 保持同一入口认证、限流、灰度和审计口径。
- 下游把请求分发到 [AgentifUI](/components/agentifui)、[OpenClaw](/components/openclaw)、门户 `BFF`、编排层服务和平台接口。
- 与 [Casbin](/components/casbin) 协同，但不直接替代细粒度授权裁决。

## 适合场景

- 企业统一 AI 门户入口
- 成品化超级智能体产品统一入口
- 多服务统一流量治理
- 多环境灰度与发布控制

## 边界

- 不替代 `LiteLLM` 的模型路由
- 不替代 `agentgateway` 的内部 `MCP / A2A` 协议治理
- 不替代 `Casbin` 的细粒度授权裁决
- 不承载业务工作流编排

## 采用规则

- 当前方案默认使用 `APISIX` 作为统一北向入口，不并行引入第二套公网入口网关。
- 如启用 [agentgateway](/components/agentgateway)，其角色限定为内部 AI 原生协议网关，不替代 `APISIX` 的北向职责。
- 所有公开或半公开接口都应优先经由网关层暴露，不建议业务服务直接对外开放入口。
- 网关配置、限流策略和灰度规则应通过统一配置方式管理，而不是散落在各应用中。

## 治理注意点

- 网关应保留统一调用标识、来源系统信息和认证接入结果，支撑审计与追踪。
- 路由、插件、限流和灰度策略需要版本化管理，避免线上人工漂移。
- 入口层只做前置治理，不应承载过重业务逻辑。
- 身份接入规则要与企业既有 `SSO / IAM` 保持一致口径。
- 统一门户前台和超级智能体前台都应复用同一入口治理链，避免再出现第二套私有接入规则。
- 对内部 `MCP / A2A` 链路的治理不应强行塞回 `APISIX`，避免公网入口网关职责膨胀。

## 关联文档

- [2. 统一接入与流量治理层](/layers/access-traffic-governance)
- [agentgateway](/components/agentgateway)
- [身份接入协议](/protocols/identity-access)
- [安全与治理](/governance)
- [部署与发布](/deployment)

## 参考资料

- [Apache APISIX Documentation](https://apisix.apache.org/docs/)
- [Apache APISIX GitHub Repository](https://github.com/apache/apisix)
