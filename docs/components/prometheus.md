# Prometheus

> 类型：指标采集与告警基础
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：治理与观测层

## 当前定位

`Prometheus` 负责平台运行指标的采集、存储、规则计算和告警基础能力，是可观测体系中的指标底座。

## 主要职责

- 服务与基础设施指标采集
- 时序指标存储
- 告警规则计算
- 容量与稳定性趋势分析

## 与其他组件关系

- 与 `OpenTelemetry` 语义和各类 Exporter 协同形成指标采集基础。
- 与 [Grafana](/components/grafana) 组合提供统一看板和运营视图。
- 与 [k6](/components/k6) 联动验证压测后的容量表现。
- 与 [Loki](/components/loki) 和 [LangFuse](/components/langfuse) 互补，分别承担指标、日志和 LLM 观测职责。

## 适合场景

- 平台服务健康监控
- 资源利用率和容量趋势分析
- 异常阈值告警

## 边界

- 不替代日志检索
- 不替代 Trace 语义标准
- 不替代 LLM 评测系统

## 采用规则

- 当前方案默认以 `Prometheus` 作为指标底座。
- 平台和关键业务服务都应接入统一指标采集，而不是各自维护私有监控口径。
- 告警规则需要和发布门槛、值班机制和容量规划联动。

## 治理注意点

- 指标命名、标签和保留策略要统一，避免高基数失控。
- 告警阈值要区分资源健康、服务健康和业务健康，不应只盯系统层指标。
- 需要建立关键 SLI / SLO 指标集合，支撑发布和回滚判断。
- 观测数据保留周期和存储成本需要提前规划。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [Grafana](/components/grafana)
- [部署与发布](/deployment)
- [安全与治理](/governance)

## 参考资料

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Prometheus GitHub Repository](https://github.com/prometheus/prometheus)
