# Loki

> 类型：日志聚合与检索
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：治理与观测层
>
> 官方网站：https://grafana.com/docs/loki/latest/
>
> 开源仓库地址：https://github.com/grafana/loki

## 当前定位

`Loki` 负责平台日志的统一采集接入、聚合存储和检索查询，是可观测体系中的日志底座。

## 主要职责

- 日志聚合与统一接入
- 日志检索与过滤
- 故障定位辅助
- 与指标和看板联动

## 与其他组件关系

- 与 [Grafana](/components/grafana) 组合提供统一日志查看与问题定位能力。
- 与 [Prometheus](/components/prometheus) 互补，分别承担日志和指标职责。
- 可与 `OpenTelemetry` 语义和日志采集链路对接。
- 与 [LangFuse](/components/langfuse) 互补，前者关注平台日志，后者关注 LLM 交互链路。

## 适合场景

- 应用日志集中查询
- 故障排查和回溯
- 与 `Grafana` 联动的日志分析

## 边界

- 不替代指标系统
- 不替代统一 Trace 语义标准
- 不替代审计留痕系统

## 采用规则

- 当前方案默认以 `Loki` 作为日志聚合与检索底座。
- 日志体系应围绕统一采集、统一检索和统一工作台组织，不建议各服务保留割裂的私有日志入口。
- `Loki` 负责日志检索，不替代正式审计系统或结构化业务留痕系统。

## 治理注意点

- 日志采集要控制敏感信息暴露和保留周期。
- 应明确哪些日志用于排障，哪些日志用于审计，避免职责混淆。
- 关键日志要与 Trace ID、请求 ID 或会话 ID 保持联通。
- 仓库许可证口径需与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [Grafana](/components/grafana)
- [Prometheus](/components/prometheus)
- [安全与治理](/governance)

## 参考资料

- [Grafana Loki Documentation](https://grafana.com/docs/loki/latest/)
- [Grafana Loki GitHub Repository](https://github.com/grafana/loki)
