# 观测栈

> 类型：平台可观测体系
>
> 复用规则：稳定复用的组件说明页

## 当前选型

- [OpenTelemetry](/standards/opentelemetry)：统一埋点标准
- [Prometheus](/components/prometheus)：指标采集
- [Grafana](/components/grafana)：可视化与看板
- [Loki](/components/loki)：日志聚合与检索

## 当前定位

这套组合负责平台级指标、日志与基础观测，不与 `LangFuse` 的 LLM 观测职责重叠。

## 主要职责

- 服务健康监控
- 指标采集和告警基础
- 日志检索与问题定位
- 统一遥测标准

## 边界

- 不替代 LLM 链路评测
- 不替代业务审计系统
