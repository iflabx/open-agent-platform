# LibreChat

> 类型：企业级多模型与 MCP 共享对话门户
>
> 采用定位：并列参考（通用多模型 / MCP 共享对话门户，与 `AgentifUI` 按场景选型）
>
> 所属层：门户与应用层
>
> 官方网站：https://www.librechat.ai/
>
> 开源仓库地址：https://github.com/danny-avila/LibreChat

## 当前定位

`LibreChat` 是本方案门户与应用层引入的高成熟度企业级共享对话门户参考实现，采用纯 `MIT` 许可证，社区活跃度高、商业白标与二次开发合规边界清晰。其核心定位是承接企业全员共享的**多模型统一对话工作台与原生 MCP 工具助手入口**，与面向 `Dify` / `LangGraph` 应用目录与受控工作流交付的 [AgentifUI](/components/agentifui) 形成场景互补。

::: tip 与 AgentifUI 的选型边界
- 若企业门户核心诉求是**面向 `Dify` 与 `LangChain / LangGraph` 编排后端的统一应用目录、工作流/表单执行、受控人工确认与报告交付物展示**，优先选用 [AgentifUI](/components/agentifui)。
- 若企业门户核心诉求是**面向全员的高成熟度多模型统一对话（直连 `LiteLLM` / `vLLM`）、原生 `MCP` 工具调用、Artifacts 渲染，以及开箱即用的 `OIDC / SAML / LDAP` 企业身份接入**，优先选用 `LibreChat`。
- 同一企业环境建议围绕主导场景收敛为一套统一共享门户，避免同时向全员分发两套定位重叠的聊天前台；个人自治型超级智能体（如 [OpenClaw](/components/openclaw)）仍归入 [扩展升级](/extension-capabilities) 按独立沙箱实例模式评估，不作为共享门户替代项。
:::

## 主要职责

- **企业全员多模型统一对话工作台**：提供类商业企业版 ChatGPT 的统一交互体验，支持多会话分支、上下文切换、附件上传与 Artifacts 渲染。
- **企业级身份接入与多用户隔离**：原生支持 `OIDC`、`SAML`、`LDAP`、OAuth2 与 2FA，提供完善的多用户数据隔离与角色权限控制（RBAC）。
- **原生 MCP 与自定义 Agent 入口**：支持挂载平台治理后的 `MCP` 工具与自定义助手预设，承接通用问答、代码解释与轻量工具协同。
- **模型网关无缝对接**：通过标准 OpenAI 兼容协议直接对接 [LiteLLM](/components/litellm)，统一消费 `vLLM` / `SGLang` 与 `Qwen` 模型族能力。

## 与其他组件关系

- 上游由 [APISIX](/components/apisix) 承接北向统一入口、流量治理与入口审计。
- 通过企业既有 `SSO / IAM`（`OIDC / SAML / LDAP`）直接完成身份认证与角色映射。
- 模型调用统一经由 [LiteLLM](/components/litellm) 路由至 [vLLM](/components/vllm) / [SGLang](/components/sglang) 与 [Qwen 模型族](/components/qwen-model-family)，不绕过模型网关直连底层推理节点。
- 工具接入统一经由 [agentgateway](/components/agentgateway) 与 [MCP 协议](/protocols/mcp) 受控暴露，避免在门户层散落直连内部业务系统。
- 与 [AgentifUI](/components/agentifui) 属于第 3 层门户的**按场景二选一 / 并列参考关系**；在以 `Dify` 工作流表单与 `LangGraph` 状态机审批为主的场景中，不强行用 `LibreChat` 替代。

## 适合场景

- 企业全员通用 AI 对话门户（多模型切换、统一体验、替代分散商业订阅）
- 需要开箱即用 `OIDC / SAML / LDAP` 认证与高社区成熟度背书的大型企业环境
- 以 `LiteLLM` + `MCP` 工具集 + 轻量助手预设为主的共享工作台场景
- 对开源许可证纯净度（纯 `MIT`）与企业白标定制有严格要求的场景

## 边界

- **不替代编排与知识中枢**：不承担复杂多步状态机编排（由 `LangGraph` 承接），也不作为企业主知识治理与文档解析中枢（由 `Dify` / `RAGFlow` + `LlamaIndex` 承接）。
- **不替代模型网关**：不绕过 `LiteLLM` 承担全平台模型配额、跨团队计费与统一推理调度。
- **不原生覆盖 Dify / LangGraph 专用交互**：对 `Dify` 复杂 Workflow 表单、运行历史及 `LangGraph` 受控人工审批（HITL）等应用编排态能力，需通过 BFF 适配或改选 [AgentifUI](/components/agentifui)。
- **额外数据组件引入成本**：`LibreChat` 默认依赖 `MongoDB`（会话与配置存储）及可选 `Meilisearch`（历史搜索），引入前需评估与平台默认 `PostgreSQL` 栈的运维边界。

## 采用规则

- 按门户主导场景在 `AgentifUI` 与 `LibreChat` 之间明确主选，同一环境不长期并行维护两套全员共享对话前台。
- 所有模型端点必须收敛至 `LiteLLM`，禁止在 `LibreChat` 配置中绕过网关直连外部模型或裸推理端口。
- 所有面向内部系统的 `MCP` 工具接入须经由 `agentgateway` 统一鉴权与审计。
- 生产部署须开启企业级 SSO（`OIDC / SAML / LDAP`），关闭匿名注册与不受控的外部模型直连开关。

## 治理注意点

- **许可证与合规优势**：纯 `MIT` 协议，较 `Open WebUI` 等带品牌/商业限制条款的前端项目更适合企业内控审查与白标定制。
- **存储栈运维收敛**：明确 `MongoDB` / `Meilisearch` 的备份、加密与留存策略，确保对话历史与审计日志符合企业数据合规要求。
- **模型与工具暴露最小化**：通过角色权限限制不同部门可见的模型列表、预设助手与 `MCP` 工具范围。
- **会话与反馈审计贯通**：将门户侧用户标识与请求追踪上下文透传至 `APISIX`、`LiteLLM` 与 `LangFuse`，保障全链路可追溯。

## 关联文档

- [3. 门户与应用层](/layers/portal-application)
- [AgentifUI](/components/agentifui)
- [2. 统一接入与流量治理层](/layers/access-traffic-governance)
- [LiteLLM](/components/litellm)
- [agentgateway](/components/agentgateway)
- [扩展升级](/extension-capabilities)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [LibreChat Official Website](https://www.librechat.ai/)
- [LibreChat GitHub Repository](https://github.com/danny-avila/LibreChat)
- [LibreChat Documentation](https://www.librechat.ai/docs)
