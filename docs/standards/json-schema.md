# JSON Schema

> 类型：数据结构与参数约束标准
>
> 当前口径：截至 2026-03-16，`JSON Schema` 官方规范页当前发布版本仍为 `Draft 2020-12`

## 当前定位

`JSON Schema` 是当前方案中用于描述 JSON 结构、约束参数、校验输入输出和表达结构化结果的统一数据结构标准。

在这套方案里，它不是某个单独组件的私有能力，而是跨门户、工具、模型输出、配置和数据契约复用的通用约束语言。

## 标准约束什么

- JSON 请求体、响应体和结构化结果的形状。
- 工具参数、函数参数和受控配置的字段约束。
- 字段类型、必填项、枚举值、组合关系和引用关系。
- 模型结构化输出和工具调用输入中可被程序稳定消费的结构定义。

## 核心内容

- `type`、`properties`、`required`、`enum` 等基础校验关键字。
- `items`、`prefixItems` 等数组结构表达能力。
- `allOf`、`anyOf`、`oneOf`、`not` 等组合约束能力。
- `$schema`、`$ref`、`$defs` 等方言、复用和引用机制。
- `Draft 2020-12` 中对数组、动态引用和 vocabulary 组织方式的更新。

## 在当前方案中的落点

- 在工具调用和结构化输出场景中，作为参数与结果结构的统一描述方式。
- 在模型服务接口中，与 [OpenAI 兼容 API](/standards/openai-compatible-api) 配合约束结构化输出。
- 在门户 / BFF / API 层中，作为 JSON 请求与配置对象的统一校验口径。
- 在协议与互操作场景中，为工具参数、受控输入输出提供可复用结构描述。

## 与组件 / 协议关系

- 与 [OpenAI 兼容 API](/standards/openai-compatible-api) 关系紧密，尤其体现在结构化输出和工具参数约束上。
- 与 [LiteLLM](/components/litellm)、[vLLM](/components/vllm) 等模型层组件是“标准约束”与“接口实现”的关系。
- 与 [OpenAPI](/protocols/openapi) 互补：`OpenAPI` 更关注接口描述，`JSON Schema` 更关注数据结构约束。
- 与 [MCP 协议](/protocols/mcp) 等工具协议页存在配合关系，但不替代协议本身。

## 适合场景

- 工具参数定义与校验
- 模型结构化输出
- 门户 / API 输入输出约束
- 受控配置和数据契约定义

## 边界

- 不替代传输协议或接口协议。
- 不替代权限策略语言和审批规则。
- 不直接等于 UI 标准或表单渲染规范。
- 当用于模型结构化输出时，不同实现通常只支持其子集，不能假定完整特性都可直接使用。

## 采用规则

- 当前方案统一以 `Draft 2020-12` 作为公开基线，不混用多套 Draft 口径。
- 所有正式结构定义建议显式声明 `$schema`，避免隐式方言漂移。
- 面向模型结构化输出时，应优先使用被当前接口和模型实现稳定支持的子集。
- 结构定义应作为可版本化资产管理，而不是散落在应用代码中的匿名对象。

## 治理注意点

- Schema 变更需要明确兼容性策略，区分向后兼容和破坏性变更。
- 生产链路中的校验器和生成器应固定到可验证的 Draft 口径。
- 工具参数、模型输出和配置结构应有统一归口和责任人。
- 对模型结构化输出，必须在真实模型和真实接口上做兼容性验证，避免“Schema 写得出来但模型不稳定遵循”。

## 关联文档

- [标准页总览](/standards/)
- [OpenAI 兼容 API](/standards/openai-compatible-api)
- [协议与标准体系](/protocol-standards)
- [技术选型](/stack)

## 参考资料

- [JSON Schema Specification](https://json-schema.org/specification)
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)
- [JSON Schema Learn](https://json-schema.org/learn)
- [Moving Toward a Stable Spec](https://json-schema.org/blog/posts/stable-json-schema)
