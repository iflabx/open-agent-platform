# SGLang

> 类型：面向多步 Agent 与前缀复用优化的高性能推理引擎
>
> 采用定位：条件引入 / Agent 场景优选（与 `vLLM` 互补的推理服务引擎）
>
> 所属层：模型网关与推理层
>
> 官方网站：https://docs.sglang.ai/
>
> 开源仓库地址：https://github.com/sgl-project/sglang

## 当前定位

`SGLang` 是模型网关与推理层中与 [vLLM](/components/vllm) 互补的高性能推理服务引擎。面对多步 Agent 循环、长 System Prompt、多轮工具调用与代码生成等高频共享前缀负载，`SGLang` 凭借 **RadixAttention 自动前缀 KV-Cache 复用**机制显著降低首字延迟（TTFT）并提升 GPU 利用率；在大规模集群场景下，支持 **Prefill-Decode（PD）分离部署**以进一步优化吞吐与尾延迟。

## 主要职责

- **RadixAttention 自动前缀 KV-Cache 复用**：通过基数树（Radix Tree）自动识别并复用多轮对话、多步 Agent 规划、相同工具定义（Tool Schema）与共享上下文的 KV-Cache，显著降低重复计算与首字延迟（TTFT）。
- **结构化输出与约束解码加速**：面向 JSON Schema、函数调用（Function Calling / Tool Calling）与代码生成等强约束输出场景提供高效压缩有限状态机加速。
- **大规模 PD 分离扩展能力**：在多机多卡高并发生产集群中支持 Prefill 与 Decode 阶段分离部署（PD Disaggregation），分别按计算密集型与显存带宽密集型特征独立扩缩容。
- **OpenAI 兼容推理后端**：提供标准 `OpenAI 兼容 API`，作为 [LiteLLM](/components/litellm) 下游推理池无缝接入。

## 与其他组件关系

- **上游统一由 [LiteLLM](/components/litellm) 调度**：业务应用、门户与编排层不直连 `SGLang`，统一经由 `LiteLLM` 按模型别名、场景路由策略与熔断规则分发请求。
- **与 [vLLM](/components/vllm) 互补共存**：`vLLM` 作为平台默认通用推理底座，承担常规问答、通用推理与广泛模型生态承载；`SGLang` 作为条件引入的优选推理引擎，重点承接多步 Agent、高频共享前缀、代码生成与大规模 PD 分离优化场景。两者对上游均通过 `LiteLLM` 暴露一致接口，业务侧无感知。
- **下游承载 [Qwen 模型族](/components/qwen-model-family)**：支持私有化部署主模型、代码模型与工具调用模型，统一纳入企业内部模型制品库管理。
- **接入 [8. 治理与观测层](/layers/governance-observability)**：向 `Prometheus` 与 `Grafana` 暴露 TTFT、TPOT、KV-Cache 命中率与队列长度等核心推理指标。

## 适合场景

- 多步推理与工具调用循环密集的复杂 Agent 工作流（如 ReAct、多步规划与自我反思链路）
- 具备长 System Prompt、固定知识前缀或大量工具定义的高频共享前缀请求
- 企业级代码补全、代码审查与仓库级上下文辅助开发（Coding Agent）场景
- 需要高吞吐、低首字延迟或计划演进至大规模 PD 分离架构的私有化 GPU 推理集群

## 边界

- **不承担统一模型网关与配额治理**：不替代 [LiteLLM](/components/litellm) 承担多模型路由、租户配额、鉴权、降级与调用审计。
- **不承担业务编排与 Agent 状态管理**：不替代 [4. Agent 编排层](/layers/agent-orchestration) 承担工作流编排、长期记忆与工具权限控制。
- **不要求在最小起步阶段强制双引擎并行**：中小规模起步环境可仅以 `vLLM` 单轨落地，待多步 Agent 与前缀复用收益明确后再按需引入 `SGLang`。

## 采用规则

- 本方案将 `SGLang` 定位为模型网关与推理层的**条件引入 / 多步 Agent 与代码负载优选**推理引擎，与默认引擎 [vLLM](/components/vllm) 形成互补而非强制替代关系。
- 当平台出现明显的多步 Agent 工具调用延迟瓶颈、长共享前缀重复计算开销过高或高并发代码生成负载时，建议在 `LiteLLM` 下游新增 `SGLang` 推理池承接对应模型路由。
- 当单集群演进至大规模并发、需对首字延迟（TTFT）与生成吞吐进行精细化分治优化时，可基于 `SGLang` 评估启用 PD 分离部署模式。
- 无论底层采用 `vLLM` 还是 `SGLang`，均须通过 `LiteLLM` 统一对外暴露，严禁业务侧绕过模型网关直连推理实例。

## 治理注意点

- **统一指标观测与基线对比**：引入 `SGLang` 前后应通过 [k6](/components/k6) 与真实多步 Agent 流量进行压测对比，重点监控 TTFT、KV-Cache 命中率、显存占用与长尾延迟。
- **前缀缓存与多租户安全边界**：启用共享前缀 KV-Cache 复用时，应评估多租户或跨密级请求在同一推理池内的隔离策略，高敏感业务建议按独立推理池隔离部署。
- **版本锁定与硬件兼容性验证**：生产环境须固定 `SGLang` 镜像、CUDA / 驱动与模型权重版本，完成结构化输出与工具调用精度回归测试后再上线。
- **平滑灰度和故障回退**：依托 `LiteLLM` 的权重分流与自动故障转移能力，确保在推理池异常时可平滑回退至备用推理实例。

## 关联文档

- [7. 模型网关与推理层](/layers/model-gateway-inference)
- [vLLM](/components/vllm)
- [LiteLLM](/components/litellm)
- [Qwen 模型族](/components/qwen-model-family)
- [部署与发布](/deployment)

## 参考资料

- [SGLang Documentation](https://docs.sglang.ai/)
- [SGLang GitHub Repository](https://github.com/sgl-project/sglang)
- [SGLang Apache-2.0 License](https://github.com/sgl-project/sglang/blob/main/LICENSE)
