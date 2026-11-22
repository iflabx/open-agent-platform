# OpenTelemetry

> 类型：可观测性（Observability）与运行语义标准
>
> 采用定位：平台级统一遥测与上下文传播标准
>
> 当前口径：截至 2026-03-16，OpenTelemetry 官方规格总览页列出的当前版本包括 `OpenTelemetry Specification 1.55.0`、`OTLP Specification 1.10.0`、`semantic conventions 1.40.0`；`GenAI semantic conventions` 当前状态仍为 `Development`

## 定位与价值

`OpenTelemetry` 是本方案中的统一遥测语义标准，用于约束追踪、指标、日志、上下文传播与语义命名方式。

它并非具体观测组件的替代品，而是将 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki)、[LangFuse](/components/langfuse) 等观测能力贯通起来的共同语义基础。

## 标准约束什么

- **遥测信号模型**：规范 Traces、Metrics、Logs 等遥测信号的 API、SDK 与数据模型。
- **上下文传播**：规范上下文在进程内与跨进程之间的传递方式。
- **统一语义命名**：规范服务、资源、操作、协议、数据库与 GenAI 等对象的语义属性命名。
- **跨后端可移植性**：保障遥测数据在不同观测后端之间的可移植性与关联性。

## 核心内容

- **四层规格体系**：API / SDK / Data / OTLP 四层规范架构。
- **跨服务传播机制**：`Context`、`Propagators` 与分布式上下文传播能力。
- **语义与资源约定**：Resource Attributes 与 Semantic Conventions 体系。
- **三信号统一关联**：Traces、Metrics、Logs 的统一关联模型。
- **GenAI 语义演进**：GenAI / Agent 相关 Semantic Conventions 仍在持续演进，当前处于 `Development` 状态。

## 在方案中的落点

- **全链路 Trace 贯通**：在网关、门户、BFF、编排、知识服务、模型网关与推理服务之间统一 Trace 上下文。
- **平台观测栈对齐**：在 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki) 组合中统一指标、日志与追踪语义。
- **LLM 观测互补**：在 LLM 调用场景中，与 [LangFuse](/components/langfuse) 形成“平台观测 + LLM 观测”的互补体系。
- **治理与发布底座**：在安全与治理场景中，为故障定位、容量分析与发布门槛提供统一遥测基础。

## 与组件 / 协议关系

- **与 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki) 协同**：属于“统一语义标准”与“采集 / 展示 / 检索实现”的关系。
- **与 [LangFuse](/components/langfuse) 互补**：`OpenTelemetry` 负责平台级统一遥测语义，`LangFuse` 侧重 LLM 链路观测与评测。
- **与 [APISIX](/components/apisix)、[LiteLLM](/components/litellm)、[LangGraph](/components/langgraph) 集成**：要求各运行时组件输出可统一关联的标准遥测数据。
- **依赖 `W3C TraceContext`**：默认 propagator 采用 `W3C TraceContext`，直接关联跨服务请求头传播。

## 适用场景

- 全链路追踪
- 指标、日志与追踪统一关联
- 多服务、多组件、多后端的统一观测口径
- LLM / Agent 平台的跨层故障定位与容量分析

## 边界

- 不替代指标存储、日志存储或可视化看板本身。
- 不替代质量评测系统或业务审计系统。
- 不自动保证所有库与组件天然可观测，仍需完成规范埋点与接入。
- GenAI 相关语义约定仍在演进中，不能将实验性语义直接作为长期稳定的固定契约。

## 采用规则

- **统一遥测标准**：统一采用 `OpenTelemetry` 作为平台级遥测语义标准。
- **优先稳定语义**：生产链路优先采用稳定的 Semantic Conventions 与统一资源属性口径。
- **遵循 `W3C TraceContext`**：上下文传播默认遵循 `W3C TraceContext`，确保跨网关、跨服务与跨工具链的 Trace 关联。
- **受控采纳 GenAI 语义**：对 GenAI Semantic Conventions，应明确版本、采纳范围与升级策略，防止实验性字段无序扩散。

## 治理注意点

- **统一基础资源属性**：统一 `service.name`、环境标识、租户或应用标签等基础资源属性命名。
- **严控敏感信息脱敏**：严格限制 Span、Log 与 Metric 中的敏感信息暴露范围。
- **打通多维追踪标识**：将内部请求 ID、网关请求 ID 与 Trace ID 统一关联，提升跨系统排障效率。
- **治理采集成本与升级**：明确采样策略、数据保留周期、存储成本控制与语义版本升级机制。

## 关联文档

- [标准页总览](/standards/)
- [安全与治理](/governance)
- [8. 治理与观测层](/layers/governance-observability)
- [LangFuse](/components/langfuse)
- [Prometheus](/components/prometheus)

## 参考资料

- [OpenTelemetry Specifications](https://opentelemetry.io/docs/specs/)
- [OpenTelemetry Specification 1.55.0](https://opentelemetry.io/docs/specs/otel/)
- [OpenTelemetry Context Propagation](https://opentelemetry.io/docs/concepts/context-propagation/)
- [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/)
- [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
