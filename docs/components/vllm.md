# vLLM

> 类型：推理服务
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：模型网关与推理层
>
> 官方网站：https://www.vllm.ai/
>
> 开源仓库地址：https://github.com/vllm-project/vllm

## 当前定位

`vLLM` 是当前方案的统一推理服务底座，负责承载企业内部主模型、代码模型和安全模型的在线推理能力。

## 主要职责

- 模型加载与 GPU 资源利用
- 高并发推理与吞吐优化
- 作为 `LiteLLM` 后端推理服务

## 与其他组件关系

- 上游统一由 `LiteLLM` 调度
- 下游承载 `Qwen` 模型族
- 不直接暴露给业务应用

## 适合场景

- 企业统一推理服务底座
- 需要高吞吐在线推理的私有化部署场景
- 需要把模型执行与业务应用解耦的场景

## 边界

- 不承担业务编排
- 不承担权限治理
- 不承担知识检索

## 采用规则

- 当前方案默认以 `vLLM` 作为主要推理执行引擎，由 [LiteLLM](/components/litellm) 统一向上暴露能力。
- 业务应用、门户和编排层不应直接把 `vLLM` 当作业务接口使用。
- 模型层切换、扩容和发布优先在网关与推理层内部完成，对上游保持稳定接口。

## 治理注意点

- GPU 资源池、模型装载策略和并发限制需要单独规划。
- 模型切换前要完成容量评估、质量回归和故障回退准备。
- 推理服务要接入统一观测链路，记录时延、错误率和资源使用。
- 生产环境应明确在线推理与批量任务的资源隔离策略。

## 关联文档

- [7. 模型网关与推理层](/layers/model-gateway-inference)
- [LiteLLM](/components/litellm)
- [Qwen 模型族](/components/qwen-model-family)
- [部署与发布](/deployment)

## 参考资料

- [vLLM Documentation](https://docs.vllm.ai/)
- [vLLM GitHub Repository](https://github.com/vllm-project/vllm)
