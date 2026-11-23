# 8. 治理与观测层

> 定位：提供细粒度授权、审计、追踪、评测、压测与发布门槛能力。
>
> 当前承载组件：`Casbin`、`OpenFGA`（条件组件）、`LangFuse`、`LangSet`（条件组件）、`k6`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki`。

相关文档：

- [安全与治理](/governance)
- [Casbin](/components/casbin)
- [OpenFGA](/components/openfga)
- [LangFuse](/components/langfuse)
- [LangSet](/components/langset)
- [k6](/components/k6)
- [OpenTelemetry](/standards/opentelemetry)

## 本层定义

治理与观测层是贯穿整个智能体平台的横向控制面，覆盖细粒度权限裁决、审计取证、全链路可观测性（Observability）、评测回放与发布门槛控制。

缺失本层支撑时，即使平台功能完备，也难以满足企业生产环境对可审计、可回滚、可度量与可管控的基本要求。

## 本层功能

- **细粒度授权裁决**：遵循从小到大的授权演进路径，默认由 `Casbin` 执行应用内轻量级嵌入式 RBAC / ABAC 与工具动作级策略裁决；大规模跨系统 RAG 文档继承树 ACL 预过滤场景条件引入 `OpenFGA`（CNCF `Apache-2.0` ReBAC，复用既有 `PostgreSQL`）。
- **全链路观测采集**：采集分布式链路追踪、系统与业务指标、结构化日志及调用成本数据。
- **LLM 评测与回放**：承接 LLM 调用观测、样本回放、版本化评测数据集工程与离线回归评测。
- **性能与发布门禁**：承接压力测试、性能基线对比与上线前发布门槛验证。

## 当前承载组件

- [Casbin](/components/casbin)
- [OpenFGA](/components/openfga)（条件组件）
- [LangFuse](/components/langfuse)
- [LangSet](/components/langset)（条件组件）
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
2. 默认由 `Casbin` 依据嵌入式 RBAC / ABAC 与工具动作策略返回允许或拒绝裁决。
3. 在大规模跨系统 RAG 文档继承树检索场景下，按需由条件引入的 `OpenFGA`（复用既有 `PostgreSQL`）执行 ReBAC 关系校验与 `ListObjects` ACL 预过滤。
4. 裁决结果同步写入审计与链路追踪体系。

### 2. 观测链路

1. 平台各组件遵循 `OpenTelemetry` 语义规范完成埋点。
2. 指标、日志与追踪数据分别进入 `Prometheus`、`Loki` 等观测后端。
3. `Grafana` 提供统一监控视图，`LangFuse` 提供 LLM 专项观测与样本回放能力。

### 3. 发布门槛链路

发布前验证沿三段式分工协同推进（`LangSet` → `LangFuse` → `k6`）：

1. **`LangSet`（条件引入）**：负责测试数据集工程、不可变版本血缘管理与离线回归评测触发。
2. **`LangFuse`**：负责在线 Trace、Prompt 观测、评分沉淀与线上样本回放。
3. **`k6`**：负责入口、编排、检索与模型链路的压力测试与容量基线验证。
4. 结合离线回归得分、在线观测反馈、SLO 达标情况与错误率共同决策是否放量。

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
- [OpenFGA Documentation](https://openfga.dev/docs)
- [Langfuse Documentation](https://langfuse.com/docs)
- [LangSet GitHub Repository](https://github.com/iflabx/langset)
- [Grafana k6 Documentation](https://grafana.com/docs/k6/latest/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Loki Documentation](https://grafana.com/docs/loki/latest/)
