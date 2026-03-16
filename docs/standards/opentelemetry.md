# OpenTelemetry

> 类型：可观测与运行语义标准
>
> 当前口径：截至 2026-03-16，OpenTelemetry 官方规格总览页列出的当前版本包括 `OpenTelemetry Specification 1.55.0`、`OTLP Specification 1.10.0`、`semantic conventions 1.40.0`；`GenAI semantic conventions` 当前状态仍为 `Development`

## 当前定位

`OpenTelemetry` 是当前方案中的统一遥测语义标准，用于约束追踪、指标、日志、上下文传播和语义命名方式。

在这套方案里，它不是某个观测组件的替代品，而是把 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki)、[LangFuse](/components/langfuse) 等观测能力串起来的共同语义基础。

## 标准约束什么

- Traces、Metrics、Logs 等遥测信号的 API、SDK 和数据模型。
- 上下文在进程内和跨进程之间的传播方式。
- 服务、资源、操作、协议、数据库、GenAI 等对象的统一语义命名。
- 遥测数据在不同观测后端之间的可移植性与可关联性。

## 核心内容

- API / SDK / Data / OTLP 四层规格体系。
- `Context`、`Propagators` 和跨服务上下文传播机制。
- Resource attributes 和 semantic conventions。
- traces、metrics、logs 的统一关联语义。
- GenAI / agent 相关 semantic conventions 正在持续演进，当前仍处于 `Development` 状态。

## 在当前方案中的落点

- 在网关、门户、BFF、编排、知识服务、模型网关和推理服务之间统一 Trace 上下文。
- 在 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki) 组合中统一指标、日志和追踪语义。
- 在 LLM 调用场景中，与 [LangFuse](/components/langfuse) 形成“平台观测 + LLM 观测”的互补关系。
- 在安全与治理场景中，为问题定位、容量分析和发布门槛提供统一遥测基础。

## 与组件 / 协议关系

- 与 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki) 的关系是“统一语义标准”与“采集 / 展示 / 检索实现”的关系。
- 与 [LangFuse](/components/langfuse) 互补：`OpenTelemetry` 负责平台级统一遥测语义，`LangFuse` 更偏向 LLM 链路观测与评测。
- 与 [APISIX](/components/apisix)、[LiteLLM](/components/litellm)、[LangGraph](/components/langgraph) 等组件的关系，是要求它们产生可统一关联的遥测数据。
- 默认 propagator 使用 `W3C TraceContext`，因此它与跨服务请求头传播直接相关。

## 适合场景

- 全链路追踪
- 指标、日志和追踪统一关联
- 多服务、多组件、多后端的统一观测口径
- LLM / Agent 平台的跨层问题定位和容量分析

## 边界

- 不替代指标存储、日志存储或可视化看板本身。
- 不替代质量评测系统或业务审计系统。
- 不自动保证所有库、所有组件都天然可观测，仍需要正确埋点和接入。
- GenAI 相关语义约定仍在演进，不能把实验性语义直接当作永远稳定的固定合同。

## 采用规则

- 当前方案统一使用 `OpenTelemetry` 作为平台级遥测语义标准。
- 生产链路优先采用稳定的 semantic conventions 和统一资源属性口径。
- 上下文传播默认遵循 `W3C TraceContext`，确保跨网关、跨服务和跨工具链的 trace 关联。
- 对 GenAI semantic conventions，应明确版本、采纳范围和升级策略，避免实验性字段无控制扩散。

## 治理注意点

- 需要统一 `service.name`、环境标识、租户或应用标签等基础资源属性。
- 需要控制 span、log 和 metric 中的敏感信息暴露范围。
- 需要把内部请求 ID、网关请求 ID 和 trace ID 尽量打通，方便跨系统排障。
- 需要明确采样、保留周期、成本控制和语义版本升级策略。

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
