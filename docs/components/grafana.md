# Grafana

> 类型：可视化与观测工作台
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：治理与观测层

## 当前定位

`Grafana` 负责把指标、日志和链路数据汇总为统一看板与观测入口，作为平台运维和运营的可视化工作台。

## 主要职责

- 指标看板与可视化
- 告警展示与联动
- 多数据源统一视图
- 故障分析工作台

## 与其他组件关系

- 与 [Prometheus](/components/prometheus) 组合展示指标趋势和告警结果。
- 与 [Loki](/components/loki) 配合查看日志并支撑问题定位。
- 可接入 `OpenTelemetry` 相关数据源以及其他平台监控数据。
- 与 [LangFuse](/components/langfuse) 互补，分别覆盖平台运行视图和 LLM 链路视图。

## 适合场景

- 平台运行大盘
- 团队级服务观测看板
- 故障排查与值班视图

## 边界

- 不直接负责指标采集
- 不替代日志存储和检索后端
- 不替代 LLM 级别的质量评测

## 采用规则

- 当前方案默认以 `Grafana` 作为统一观测工作台。
- 指标、日志和关键业务视图优先在统一看板中汇总，不建议每个团队独立维护完全割裂的观测前台。
- `Grafana` 负责可视化与联动，不负责底层数据采集或存储。

## 治理注意点

- 看板权限、数据源权限和运维账号管理需要受控。
- 关键发布视图、值班视图和容量视图要标准化，避免告警和看板口径不一致。
- 需要关注数据源数量、查询复杂度和看板性能。
- 仓库许可证口径需与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [Prometheus](/components/prometheus)
- [Loki](/components/loki)
- [部署与发布](/deployment)

## 参考资料

- [Grafana Documentation](https://grafana.com/docs/)
- [Grafana GitHub Repository](https://github.com/grafana/grafana)
