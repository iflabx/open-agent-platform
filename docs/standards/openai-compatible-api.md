# OpenAI 兼容 API

> 类型：模型服务接口兼容标准
>
> 采用定位：模型服务北向接口统一兼容基线
>
> 当前口径：截至 2026-03-16，OpenAI 官方 API 文档仍以 REST API `v1` 为稳定基础；对新项目推荐优先使用 `Responses API`，同时保留 `Chat Completions` 作为广泛兼容入口

## 定位与价值

`OpenAI 兼容 API` 在本方案中承担“模型服务北向接口兼容标准”角色。

从标准属性看，它属于事实上的生态兼容标准：并非由独立标准组织发布的正式规范，而是围绕 OpenAI 官方 API 形态与主流开源实现形成的生态兼容口径。结合 OpenAI 官方文档、`vLLM` 与 `LiteLLM` 的官方支持说明，本方案将其作为统一模型入口的主要兼容基线。

## 标准约束什么

- **基础路径组织**：规范模型服务的基础 URL 与资源路径组织方式。
- **鉴权与消息形态**：规范 Bearer Token 鉴权及 JSON 请求 / 响应格式。
- **核心交互接口**：规范对话生成、结构化输出、工具调用与流式返回的接口形态。
- **跨层调用契约**：规范上层应用、Agent Runtime 与模型网关之间的基础调用契约。

## 核心内容

- **REST API `v1` 基线**：统一的 REST API `v1` 兼容口径。
- **`Chat Completions` 入口**：广泛支持存量生态的兼容入口。
- **`Responses API` 演进形态**：面向新能力接入的推荐主接口形态。
- **高级调用形状**：结构化输出、函数 / 工具调用、流式返回等统一接口约定。
- **常用扩展接口**：涵盖模型列表、Embedding 等常见模型服务接口兼容能力。

## 在方案中的落点

- **统一模型网关**：[LiteLLM](/components/litellm) 将其作为统一模型网关的北向接口。
- **推理执行后端**：[vLLM](/components/vllm) 通过兼容服务器方式承接下游推理执行。
- **上层统一消费**：门户、BFF、Agent 编排层与知识层通过统一接口调用模型能力。
- **结构化输出协同**：与 [JSON Schema](/standards/json-schema) 配合，形成可编程消费的模型结果。

## 与组件 / 协议关系

- **与 [LiteLLM](/components/litellm) 的关系**：属于“兼容标准”与“统一网关实现”的关系。
- **与 [vLLM](/components/vllm) 的关系**：属于“兼容服务器接口”与“推理执行后端”的关系。
- **与 [JSON Schema](/standards/json-schema) 紧密配合**：集中体现在 Structured Outputs 与函数参数定义场景。
- **与 [APISIX](/components/apisix) 区分**：前者约束模型服务接口形态，后者负责统一北向入口与流量治理。

## 适用场景

- 企业统一模型网关
- 多模型 / 多后端兼容切换
- 上层应用屏蔽底层模型服务差异
- 工具调用与结构化输出场景

## 边界

- 并非由正式标准组织发布的独立标准。
- 声明兼容不代表所有 endpoint、字段与高级能力完全一致。
- 不替代 API 网关、业务接口规范或权限体系。
- 仅约束接口形态，不保证不同模型的生成质量、行为一致性与推理特性。

## 采用规则

- **确立统一入口基线**：以 OpenAI REST API `v1` 兼容口径作为统一模型入口基线。
- **新旧接口平滑演进**：新能力接入优先评估 `Responses API`；存量兼容与广泛生态接入继续保留 `Chat Completions` 支持。
- **明示实际兼容范围**：正式落地时须明确列出实际支持的 endpoint、字段与流式事件清单，避免笼统标注“兼容 OpenAI”。
- **隔离后端私有字段**：上游应用统一通过模型网关调用，禁止将底层推理后端的私有字段暴露为公共契约。

## 治理注意点

- **维护三层兼容矩阵**：持续维护 `LiteLLM`、`vLLM` 与实际模型后端的能力支持矩阵。
- **北向收敛差异**：接口变更、字段差异与模型特性差异应在北向接口层统一收敛并纳入回归测试。
- **贯通请求追踪**：生产环境应记录请求 ID，并将内部追踪 ID 与外部请求追踪关联。
- **联合校验结构化能力**：结构化输出与函数调用须与 `JSON Schema` 兼容性联合验证，不能仅以接口返回 HTTP 200 作为验证通过的依据。

## 关联文档

- [标准页总览](/standards/)
- [JSON Schema](/standards/json-schema)
- [7. 模型网关与推理层](/layers/model-gateway-inference)
- [LiteLLM](/components/litellm)
- [vLLM](/components/vllm)

## 参考资料

- [OpenAI API Overview](https://developers.openai.com/api/reference/overview)
- [OpenAI Chat Completions API Reference](https://platform.openai.com/docs/api-reference/chat/create-chat-completion)
- [Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)
- [vLLM OpenAI-Compatible Server](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html)
- [LiteLLM Docs](https://docs.litellm.ai/)
