# 7. 模型网关与推理层

> 定位：负责模型统一入口、模型路由、配额治理和推理执行。
>
> 当前承载组件：`LiteLLM`、`vLLM`、`Qwen` 模型族。

相关文档：

- [LiteLLM](/components/litellm)
- [vLLM](/components/vllm)
- [Qwen 模型族](/components/qwen-model-family)
- [技术选型](/stack)

## 一、本层定义

模型网关与推理层是平台里所有模型能力的标准供给面。

它负责把聊天、代码、Embedding、Reranker 和安全模型能力以统一接口方式提供给上层，同时把模型路由、配额、回退和推理执行从业务逻辑里剥离出来。

## 二、本层功能

- 提供统一模型调用入口。
- 执行模型路由、配额、限速和失败回退。
- 承载在线推理和批量推理执行。
- 为知识层提供 Embedding / Reranker 能力，为编排层提供生成式能力。

## 三、当前承载组件

- [LiteLLM](/components/litellm)
- [vLLM](/components/vllm)
- [Qwen 模型族](/components/qwen-model-family)

当前方案保持收敛：以 `LiteLLM` 作为统一模型入口，以 `vLLM` 作为主要推理执行引擎，以 `Qwen` 模型族承担当前主要模型能力。

## 四、上下游关系

上游层级：

- [知识与检索层](/layers/knowledge-retrieval)
- [Agent 编排层](/layers/agent-orchestration)
- [门户与应用层](/layers/portal-application)

下游层级：

- [基础设施层](/layers/infrastructure-layer)
- [治理与观测层](/layers/governance-observability)

推荐链路为：

`编排 / 检索请求 -> LiteLLM -> vLLM -> Qwen 模型 -> 观测与配额记录`

## 五、边界

本层不负责：

- 不承载业务会话和应用页面逻辑。
- 不替代编排层做流程编排。
- 不直接处理源数据治理和知识资产发布。
- 不替代细粒度权限引擎做业务级授权判断。

## 六、关键链路

### 1. 生成式推理链路

1. 编排层调用统一模型入口。
2. `LiteLLM` 根据模型目录、策略和配额选择下游。
3. `vLLM` 执行推理并返回结果。
4. 观测层记录调用成本、时延和质量信息。

### 2. 检索辅助链路

1. 知识层请求 Embedding 或 Reranker 能力。
2. 模型层按统一方式提供相应模型能力。
3. 返回向量或重排结果供知识层继续处理。

## 七、治理要求

- 模型目录、用途和配额要清晰区分，避免应用随意硬编码模型。
- 安全模型、Embedding 和主生成模型的用途边界要明确。
- 观测数据应能追踪到应用、用户、模型和版本策略。
- 模型变更要配合回归评估和发布门槛，不直接在生产流量上裸切。

## 八、部署与发布要求

- 模型网关和推理执行建议分层部署，避免职责混杂。
- GPU 资源、批量任务和在线请求应区别规划。
- 模型发布要支持灰度、回退和容量预估。
- 接口协议保持统一，避免上层应用依赖某个特定推理后端细节。

## 九、风险与取舍

- 如果每个应用自己选模型和直连推理服务，后续治理几乎无法收敛。
- 模型能力覆盖面越大，越需要清晰区分默认模型和条件模型。
- 把检索模型、生成模型和安全模型混成一个黑盒入口，会降低排障效率。

## 十、关联文档

- [知识与检索层](/layers/knowledge-retrieval)
- [Agent 编排层](/layers/agent-orchestration)
- [治理与观测层](/layers/governance-observability)
- [部署与发布](/deployment)

## 参考资料

- [LiteLLM Documentation](https://docs.litellm.ai/)
- [vLLM Documentation](https://docs.vllm.ai/)
- [Qwen](https://qwenlm.github.io/)
