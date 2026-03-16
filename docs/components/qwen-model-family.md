# Qwen 模型族

> 类型：模型组合
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：模型网关与推理层
>
> 官方网站：https://qwen.readthedocs.io/
>
> 开源仓库地址：https://github.com/QwenLM

## 当前定位

`Qwen` 模型族承担当前方案的主模型能力池，用于覆盖通用生成、代码任务、向量化、重排和安全审查等不同模型职责。

## 主要职责

- 承担通用生成模型能力
- 承担代码与脚本任务能力
- 提供 Embedding 与 Reranker 能力
- 提供输入输出安全审查能力

## 与其他组件关系

- 通过 [LiteLLM](/components/litellm) 暴露统一调用入口。
- 由 [vLLM](/components/vllm) 承担主要在线推理执行。
- 为知识层提供向量化和重排能力，为编排层提供生成式能力。
- 与治理与观测层联动，用于评测、审计和发布门槛验证。

## 适合场景

- 企业通用对话和问答场景
- 代码生成、脚本辅助和工程任务
- 知识检索中的 Embedding 与重排
- 输入输出安全审查链路

## 边界

- 模型族描述的是能力池，不是门户、编排或知识系统本身
- 不直接决定应用工作流架构
- 不应让上游应用硬编码依赖某个临时模型 ID

## 采用规则

- 当前方案按“通用生成模型 + 代码模型 + Embedding 模型 + Reranker 模型 + 安全模型”的组合方式使用 `Qwen` 模型族。
- 公开文档只说明能力分工，不把易变的内部试验型号写成长期公开基线。
- 实施时应锁定具体模型 ID、部署规格和回退策略，并通过 [LiteLLM](/components/litellm) 屏蔽上游差异。

## 治理注意点

- 不同用途模型应分池管理，避免把通用生成、向量化和安全审查混成单一黑盒入口。
- 模型升级、替换和回退前需要完成质量评测和兼容性验证。
- Embedding、Reranker 和安全模型要与知识链路、治理链路保持一致的调用与审计口径。
- 具体模型卡和许可证口径应在实施时再次核对，并与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 关联文档

- [7. 模型网关与推理层](/layers/model-gateway-inference)
- [LiteLLM](/components/litellm)
- [vLLM](/components/vllm)
- [技术选型](/stack)

## 参考资料

- [Qwen Documentation](https://qwen.readthedocs.io/)
- [Qwen GitHub Organization](https://github.com/QwenLM)
- [Qwen Model Hub](https://huggingface.co/Qwen)
