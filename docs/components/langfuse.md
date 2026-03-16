# LangFuse

> 类型：LLM 观测与评测
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：治理与观测层

## 当前定位

`LangFuse` 负责 LLM 链路的 Trace、Prompt、工具调用观测以及评测样本管理。

## 主要职责

- Prompt 与 Trace 观测
- 工具调用回放
- 评测样本管理
- 应用效果分析

## 与其他组件关系

- 与 [Dify](/components/dify)、[LangGraph](/components/langgraph)、[LangChain](/components/langchain) 等编排能力配合采集链路信息。
- 与 [LiteLLM](/components/litellm) 和模型层联动，记录模型调用、成本和结果质量。
- 与 [Prometheus](/components/prometheus)、[Grafana](/components/grafana)、[Loki](/components/loki) 互补，不替代基础设施级观测。
- 为发布门槛、回放分析和效果评测提供 LLM 视角的数据基础。

## 适合场景

- LLM 应用链路追踪
- Prompt 与工具调用回放
- 评测样本管理和质量分析
- 上线前后的效果对比

## 边界

- 不替代基础设施监控
- 不替代日志平台

## 采用规则

- 当前方案默认以 `LangFuse` 承接 LLM 观测、评测样本和回放分析。
- `LangFuse` 与基础观测栈是互补关系，不能因为引入 LLM 观测就省略指标、日志和平台监控。
- 所有关键模型调用链路都应尽量接入统一 LLM 观测，而不是各应用自行记录私有日志。

## 治理注意点

- Prompt、上下文、用户输入和工具结果的采集要控制敏感信息暴露范围。
- 样本、Trace 和评测结果应与具体版本、模型和应用配置绑定。
- 发布前后的质量对比需要形成标准化检查动作，而不是只在问题出现后临时排查。
- 仓库开源口径需与 [开源状态与许可证说明](/open-source-status) 保持一致，按 `Open core` 理解。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [安全与治理](/governance)
- [LiteLLM](/components/litellm)
- [部署与发布](/deployment)

## 参考资料

- [Langfuse Docs](https://langfuse.com/docs)
- [Langfuse GitHub Repository](https://github.com/langfuse/langfuse)
