# 8. 治理与观测层

> 定位：提供细粒度授权、审计、追踪、评测、压测与发布门槛能力。
>
> 当前承载组件：`Casbin`、`LangFuse`、`k6`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki`。

相关文档：

- [安全与治理](/governance)
- [Casbin](/components/casbin)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)

## 本层定义

治理与观测层是贯穿整个智能体平台的横向控制面，覆盖细粒度权限裁决、审计取证、全链路可观测性（Observability）、评测回放与发布门槛控制。

缺失本层支撑时，即使平台功能完备，也难以满足企业生产环境对可审计、可回滚、可度量与可管控的基本要求。

## 本层功能

- **细粒度授权裁决**：统一执行应用、工具与数据维度的细粒度授权与策略裁决。
- **全链路观测采集**：采集分布式链路追踪、系统与业务指标、结构化日志及调用成本数据。
- **LLM 评测与回放**：承接 LLM 调用观测、样本回放与质量评测数据集管理。
- **性能与发布门禁**：承接压力测试、性能基线对比与上线前发布门槛验证。

## 当前承载组件

- [Casbin](/components/casbin)
- [LangFuse](/components/langfuse)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)
- [Prometheus](/components/prometheus)
- [Grafana](/components/grafana)
- [Loki](/components/loki)

## 上下游关系

上游对象：

- [统一接入与流量治理层](/layers/access-traffic-governance)
- [门户与应用层](/layers/portal-application)
- [Agent 编排层](/layers/agent-orchestration)
- [模型网关与推理层](/layers/model-gateway-inference)

下游支撑：

- [基础设施层](/layers/infrastructure-layer)

标准链路为：

`业务请求 / 模型调用 / 检索动作 → 授权 / 追踪 / 指标 / 日志 / 评测 → 发布与回滚判断`

## 边界

本层不承担以下职责：

- **业务交互承载**：不直接充当业务门户或应用前台。
- **入口路由替代**：不替代 [统一接入与流量治理层](/layers/access-traffic-governance) 的入口路由与流量调度。
- **数据资产维护**：不替代 [数据治理层](/layers/data-governance-layer) 维护企业业务数据资产。
- **业务逻辑越界**：不将所有业务判断强行收敛为监控告警规则或策略表达式。

## 关键链路

### 1. 授权链路

1. 上游服务在关键操作节点调用统一授权引擎。
2. `Casbin` 依据策略规则与请求上下文返回允许或拒绝裁决。
3. 裁决结果同步写入审计与链路追踪体系。

### 2. 观测链路

1. 平台各组件遵循 `OpenTelemetry` 语义规范完成埋点。
2. 指标、日志与追踪数据分别进入 `Prometheus`、`Loki` 等观测后端。
3. `Grafana` 提供统一监控视图，`LangFuse` 提供 LLM 专项观测与样本回放能力。

### 3. 发布门槛链路

1. 候选版本在发布前先执行 `k6` 压测与关键质量指标验证。
2. 结合评测得分、SLO 达标情况与错误率共同决策是否放量。

## 治理要求

- **策略全生命周期受控**：权限策略须支持版本化管理、变更审计与一键回滚。
- **观测数据脱敏保护**：观测采集链路必须严格控制敏感信息的暴露范围与脱敏规则。
- **评测与版本强绑定**：LLM 评测结果、质量样本与发布门槛须与具体发布版本绑定留档。
- **全链路标识贯通**：所有关键调用链路均须透传统一的 `Trace ID` 或等价调用标识。

## 部署与发布要求

- **与业务运行面解耦**：授权引擎、日志、指标与回放服务应与业务运行面解耦部署。
- **观测自身容量治理**：观测系统需规划独立的存储容量与数据保留策略，避免观测体系反噬生产资源。
- **门禁流水线化**：发布前压测与质量评测应集成至 CI/CD 流水线或标准化检查流程。
- **全栈监控告警**：监控告警不仅覆盖基础算力与容器指标，还须覆盖 LLM 调用质量、成本与业务成功率。

## 风险与取舍

- **策略分散推高整改成本**：若权限策略散落在各子系统中，后续合规审计与集中整改成本将急剧上升。
- **监控盲区掩盖生产风险**：若仅关注 CPU、内存等基础资源而忽视 Agent 输出质量与调用成本，线上业务风险将被严重低估。
- **未脱敏日志形成次生风险**：若日志与追踪数据未执行脱敏治理，治理与观测层本身将演变为新的敏感数据泄露源。

## 关联文档

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
