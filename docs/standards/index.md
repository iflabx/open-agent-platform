# 标准页总览

> 适用定位：平台接口兼容、数据结构与运行语义标准目录
>
> 范围说明：本目录聚焦直接约束平台实现的核心技术标准，涵盖数据结构校验、模型接口兼容与统一遥测语义。

## 标准清单

| 标准 | 类型 | 主落点 | 核心说明 |
| --- | --- | --- | --- |
| [JSON Schema](/standards/json-schema) | 数据结构与参数约束标准 | 工具参数、结构化输出、配置约束 | 统一 JSON 结构定义与校验约束表达 |
| [OpenAI 兼容 API](/standards/openai-compatible-api) | 模型服务接口兼容标准 | 模型网关、推理服务、上层应用调用 | 统一模型服务北向接口的事实兼容基线 |
| [OpenTelemetry](/standards/opentelemetry) | 可观测性（Observability）与运行语义标准 | 追踪、指标、日志、上下文传播 | 统一跨层遥测语义与上下文传播链路 |

## 核心价值主线

本目录中的标准共同服务于三条架构主线：

- **结构可校验**：使上层应用、Agent 与工具之间的输入输出结构具备统一、可校验的数据契约。
- **接口可兼容**：使模型服务北向接口保持统一兼容口径，屏蔽底层推理后端的私有差异。
- **观测可关联**：使全链路遥测数据、上下文传播与语义命名在跨层调用中保持一致。

## 与协议、组件的边界区分

- **标准**：侧重“如何统一表达、校验与约束”（数据结构、接口形态、遥测语义）。
- **协议**：侧重“系统之间如何建立连接、认证与交换消息”。
- **组件**：侧重“具体开源软件在架构中承担的运行时或控制面职责”。

同一技术对象可能同时涉及协议、标准与组件三类文档，各自聚焦对应维度以保持边界清晰。

## 推荐阅读路径

1. 先阅读 [协议与标准体系](/protocol-standards)，从全局理解各类标准在整体架构中的位置。
2. 再进入各具体标准页，确认数据结构、接口兼容与遥测语义的采用基线。
3. 最后结合 [组件](/components) 与 [总体架构](/architecture)，查看各项标准如何落到实际组件组合中。

## 参考资料

- [JSON Schema Specification](https://json-schema.org/specification)
- [OpenAI API Overview](https://developers.openai.com/api/reference/overview)
- [OpenTelemetry Specifications](https://opentelemetry.io/docs/specs/)
