# 8. 治理与观测层

> 定位：提供细粒度授权、审计、追踪、评测、压测和发布门槛。
>
> 当前承载组件：`Casbin`、`LangFuse`、`k6`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki`。

相关文档：

- [安全与治理](/governance)
- [Casbin](/components/casbin)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)

## 一、本层定义

治理与观测层是整个智能体平台的横向控制层，覆盖权限裁决、审计取证、观测追踪、评测回放和发布门槛。

如果没有这一层，平台即使功能完整，也很难达到企业生产环境对可审计、可回滚、可度量和可管控的要求。

## 二、本层功能

- 执行细粒度授权和策略裁决。
- 采集链路追踪、指标、日志和调用成本信息。
- 承接 LLM 观测、样本回放和评测数据。
- 承接压测、性能基线和发布门槛验证。

## 三、当前承载组件

- [Casbin](/components/casbin)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

## 四、上下游关系

上游对象：

- [统一接入与流量治理层](/layers/access-traffic-governance)
- [门户与应用层](/layers/portal-application)
- [Agent 编排层](/layers/agent-orchestration)
- [模型网关与推理层](/layers/model-gateway-inference)

下游支撑：

- [基础设施层](/layers/infrastructure-layer)

标准链路为：

`业务请求 / 模型调用 / 检索动作 -> 授权 / 追踪 / 指标 / 日志 / 评测 -> 发布与回滚判断`

## 五、边界

本层不负责：

- 不直接充当业务门户或应用前台。
- 不替代网关层做统一入口路由。
- 不替代数据治理层维护业务数据资产。
- 不把所有业务判断都收敛成监控规则或策略表达式。

## 六、关键链路

### 1. 授权链路

1. 上游服务在关键动作处调用授权引擎。
2. `Casbin` 根据策略和上下文返回裁决结果。
3. 结果进入审计与追踪链路。

### 2. 观测链路

1. 平台按照 `OpenTelemetry` 语义埋点。
2. 指标、日志和追踪分别进入对应观测体系。
3. `Grafana` 汇总展示，`LangFuse` 提供 LLM 观测和回放能力。

### 3. 发布门槛链路

1. 新版本先经过 `k6` 压测和关键指标验证。
2. 评测结果、SLO 和错误率共同决定是否放量。

## 七、治理要求

- 权限策略要版本化、可审计、可回滚。
- 观测数据采集必须控制敏感信息暴露范围。
- LLM 评测、质量样本和发布门槛要和真实版本绑定。
- 所有关键链路都需要统一 Trace ID 或等价调用标识。

## 八、部署与发布要求

- 授权、日志、指标和回放能力应和业务运行面解耦。
- 观测系统自身也要有容量和保留策略，避免“观测拖垮生产”。
- 发布前压测和评测应进入流水线或标准化检查流程。
- 监控告警不应只看基础资源，还要覆盖 LLM 调用质量和业务成功率。

## 九、风险与取舍

- 如果权限策略散落在各系统里，后续审计和整改成本会很高。
- 如果只看 CPU、内存，不看 Agent 质量和调用成本，生产风险会被低估。
- 如果日志和观测数据不脱敏，治理层本身会变成新的敏感数据风险源。

## 十、关联文档

- [安全与治理](/governance)
- [部署与发布](/deployment)
- [实施路线图](/roadmap)
- [标准页总览](/standards/)

## 参考资料

- [Casbin Documentation](https://casbin.org/docs/overview)
- [Langfuse Documentation](https://langfuse.com/docs)
- [Grafana k6 Documentation](https://grafana.com/docs/k6/latest/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Loki Documentation](https://grafana.com/docs/loki/latest/)
