# LiteLLM

> 类型：模型网关
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：模型网关与推理层
>
> 官方网站：https://www.litellm.ai/
>
> 开源仓库地址：https://github.com/BerriAI/litellm

## 当前定位

`LiteLLM` 是当前方案的统一模型网关，向上提供统一接口，向下路由到 `vLLM` 及对应模型池。

## 主要职责

- 统一模型访问接口
- 模型路由、限流、配额和熔断
- 请求日志、成本统计和故障切换

## 与其他组件关系

- 上游对接主平台、自研服务和 Agent 运行时。
- 下游连接 [vLLM](/components/vllm) 和具体模型池。
- 向知识层提供统一的 Embedding、Reranker 和生成式模型调用入口。
- 与 [APISIX](/components/apisix) 配合，但两者分别承担入口网关和模型网关职责。

## 适合场景

- 多应用共享统一模型调用入口
- 需要统一配额、限流和路由治理的企业场景
- 需要屏蔽底层推理后端差异的模型服务层

## 边界

- 不承载知识库
- 不负责工作流编排
- 不替代 API 网关

## 采用规则

- 当前方案默认以 `LiteLLM` 作为统一模型入口，不建议让各应用直接分散对接推理服务。
- 所有应用、编排服务和知识服务应优先通过统一模型网关调用模型。
- `LiteLLM` 负责统一访问与治理，不直接承担底层推理执行。

## 治理注意点

- 模型目录、用途、配额和失败回退策略需要集中管理。
- 调用日志、成本口径和应用归属要统一记录，支撑审计与成本分析。
- 生产流量切换模型或后端前要完成评测、灰度和回滚准备。
- 仓库开源口径需与 [开源状态与许可证说明](/open-source-status) 保持一致，不能按“全仓库纯 MIT”简单理解。

## 关联文档

- [7. 模型网关与推理层](/layers/model-gateway-inference)
- [vLLM](/components/vllm)
- [Qwen 模型族](/components/qwen-model-family)
- [技术选型](/stack)

## 参考资料

- [LiteLLM Docs](https://docs.litellm.ai/)
- [LiteLLM GitHub Repository](https://github.com/BerriAI/litellm)
