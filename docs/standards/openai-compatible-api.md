# OpenAI 兼容 API

> 类型：模型服务接口兼容标准
>
> 当前口径：截至 2026-03-16，OpenAI 官方 API 文档仍以 REST API `v1` 为稳定基础；对新项目推荐优先使用 `Responses API`，同时保留 `Chat Completions` 作为广泛兼容入口

## 当前定位

`OpenAI 兼容 API` 在当前方案中承担的是“模型服务北向接口兼容标准”角色。

这里的“标准”更准确地说是事实上的兼容标准：它不是独立标准组织发布的正式规范，而是围绕 OpenAI 官方 API 形态和当前主流实现形成的生态兼容口径。基于 OpenAI 官方文档、`vLLM` 和 `LiteLLM` 的官方说明，当前方案将其作为统一模型入口的主要兼容基线。

## 标准约束什么

- 模型服务的基础 URL 与资源路径组织方式。
- Bearer Token 鉴权和 JSON 请求 / 响应形态。
- 对话生成、结构化输出、工具调用和流式返回的接口组织方式。
- 上层应用、Agent 运行时和模型网关之间的基础调用契约。

## 核心内容

- 统一的 REST API `v1` 兼容口径。
- `Chat Completions` 生态兼容入口。
- `Responses API` 作为新的主接口形态。
- 结构化输出、函数 / 工具调用、流式返回等统一接口形状。
- 与模型列表、Embedding 等常见模型服务接口的兼容扩展。

## 在当前方案中的落点

- [LiteLLM](/components/litellm) 以它作为统一模型网关的北向接口。
- [vLLM](/components/vllm) 通过兼容服务器方式承接下游推理执行。
- 门户、BFF、Agent 编排层和知识层通过统一接口调用模型能力。
- 结构化输出与 [JSON Schema](/standards/json-schema) 配合，形成可编程消费的模型结果。

## 与组件 / 协议关系

- 与 [LiteLLM](/components/litellm) 的关系是“兼容标准”与“统一网关实现”的关系。
- 与 [vLLM](/components/vllm) 的关系是“兼容服务器接口”与“推理执行后端”的关系。
- 与 [JSON Schema](/standards/json-schema) 关系紧密，尤其体现在 structured outputs 和函数参数定义中。
- 与 [APISIX](/components/apisix) 不同：前者约束模型服务接口，后者负责统一入口和流量治理。

## 适合场景

- 企业统一模型网关
- 多模型 / 多后端兼容切换
- 上层应用屏蔽底层模型服务差异
- 工具调用和结构化输出场景

## 边界

- 它不是正式标准组织发布的独立标准。
- 兼容实现不意味着所有 endpoint、字段和高级能力都完全一致。
- 它不替代 API 网关、业务接口规范或权限体系。
- 它只约束接口形态，不保证不同模型的行为、质量和推理特性一致。

## 采用规则

- 当前方案把 OpenAI REST API `v1` 兼容口径作为统一模型入口基线。
- 新能力接入时，优先评估 `Responses API`；生态兼容和历史负担场景继续保留 `Chat Completions` 支持。
- 正式落地时应明确“当前支持哪些 endpoint、哪些字段、哪些流式事件”，而不是笼统写“兼容 OpenAI”。
- 上游应用应通过统一网关调用，不直接把某个底层推理后端的私有字段暴露为公共契约。

## 治理注意点

- 需要维护兼容矩阵，明确 `LiteLLM`、`vLLM` 和实际模型后端支持范围。
- 接口变更、字段差异和模型特性差异应在北向接口层被收敛和测试。
- 生产环境应记录请求 ID，并尽量把内部追踪 ID 与外部请求追踪关联起来。
- 结构化输出与函数调用相关能力要和 `JSON Schema` 兼容性一起验证，不能只看接口是否能返回 200。

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
