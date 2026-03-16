# 标准页总览

> 角色：当前方案中的标准说明页入口
>
> 说明：本目录聚焦接口兼容、数据结构和运行语义等“标准”。它们不一定是协议，也不是组件，但会直接约束平台如何实现。

## 一、先明确标准页回答什么

标准页主要回答三类问题：

- 这个标准约束什么
- 它在当前方案中落在哪些链路上
- 它不能替代什么

因此，标准页不写成组件百科，也不写成协议百科。

## 二、当前范围

| 标准 | 类型 | 当前主落点 | 说明 |
| --- | --- | --- | --- |
| [JSON Schema](/standards/json-schema) | 数据结构与参数约束标准 | 工具参数、结构化输出、配置约束 | 负责 JSON 结构和约束表达 |
| [OpenAI 兼容 API](/standards/openai-compatible-api) | 模型服务接口兼容标准 | 模型网关、推理服务、上层应用调用 | 负责模型服务接口兼容 |
| [OpenTelemetry](/standards/opentelemetry) | 可观测与运行语义标准 | 追踪、指标、日志、上下文传播 | 负责统一遥测语义和传播链路 |

## 三、当前定位

当前方案中的标准页主要服务于三条主线：

- 让上层应用、Agent 和工具之间的输入输出结构可约束。
- 让模型服务接口保持统一兼容口径。
- 让全链路遥测、传播和语义命名保持一致。

## 四、和组件、协议的区别

- 标准页强调“怎么统一表达和约束”。
- 协议页强调“系统之间怎么交互”。
- 组件页强调“某个具体对象在方案里承担什么职责”。

同一个对象可能同时与协议页、标准页、组件页有关联，但不应混写。

## 五、建议阅读顺序

1. 先看 [协议与标准体系](/protocol-standards)，理解标准在整套方案中的位置。
2. 再看具体标准页，确认结构、接口和运行语义口径。
3. 最后回到 [组件](/components) 和 [总体架构](/architecture)，看这些标准如何落到实际组件组合里。

## 参考资料

- [JSON Schema Specification](https://json-schema.org/specification)
- [OpenAI API Overview](https://developers.openai.com/api/reference/overview)
- [OpenTelemetry Specifications](https://opentelemetry.io/docs/specs/)
