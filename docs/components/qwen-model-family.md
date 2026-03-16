# Qwen 模型族

> 类型：模型组合
>
> 复用规则：稳定复用的组件说明页

## 当前方案选型

- `Qwen3.5 27B FP8`：企业通用主模型
- `Qwen3-Coder-Next`：代码与脚本任务
- `Qwen/Qwen3-Embedding-8B`：统一向量化
- `Qwen/Qwen3-Reranker-8B`：统一重排
- `Qwen3Guard-Stream-8B`：输入输出安全审查

## 组合原则

- 通用能力、代码能力、安全能力分池部署
- Embedding 与 Reranker 独立服务化
- 模型切换通过 `LiteLLM` 屏蔽

## 边界

- 模型族描述的是能力组合，不是平台中枢
- 不直接决定门户、知识或流程架构
