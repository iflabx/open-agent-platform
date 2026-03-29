# OpenClaw

> 类型：开源超级智能体产品候选
>
> 复用规则：条件引入的组件说明页
>
> 所属层：门户与应用层
>
> 官方网站：https://openclaw.ai/
>
> 开源仓库地址：https://github.com/openclaw/openclaw

## 当前定位

`OpenClaw` 当前公开定位是一个可自托管的 `personal AI assistant`，自带多渠道接入、Gateway 控制面、Control UI、技能体系、长期会话和多端交互能力。

在当前方案中，如果需要的不只是统一门户壳，而是一个更接近“成品化超级智能体产品”的前台形态，`OpenClaw` 可以作为门户与应用层的条件组件引入。

它的主归属放在门户与应用层，是因为用户真正看到和直接操作的是一个智能体产品本身；它内部虽然包含自己的 gateway、session、skills 和 runtime 机制，但在这套方案里不按通用编排平台归类。

## 主要职责

- 成品化超级智能体前台
- 多渠道会话入口与持续交互
- Control UI、WebChat、Canvas 和多端体验
- 个人 / 旗舰智能体产品形态承载
- 技能、记忆和长期会话的前台承接

## 与其他组件关系

- 与 [AgentifUI](/components/agentifui) 的关系是互补而非默认替代：`AgentifUI` 仍是统一门户前台，`OpenClaw` 更适合作为旗舰超级智能体产品或单一高价值应用前台。
- 对外暴露的 Web 控制面、WebChat 和远程访问能力，仍应与 [APISIX](/components/apisix) 的统一入口治理配合，不建议绕开北向统一接入边界。
- 企业化落地时，模型访问仍应尽量统一经由 [LiteLLM](/components/litellm) 和模型层收敛，而不是直接把产品前台耦合到多个模型提供方。
- 多渠道消息入口、技能执行、浏览器 / 设备控制等能力，需要与 [Casbin](/components/casbin)、[LangFuse](/components/langfuse) 和统一审计链路配套使用。
- 如果后端仍存在复杂流程、外部工具编排或企业级状态机，应该继续由 [LangGraph](/components/langgraph) 或主平台路线承接，而不是把所有复杂度都塞进前台产品。

## 适合场景

- 希望交付一个成品化的超级智能体产品，而不是只有门户壳的场景
- 需要单一助手跨多渠道、多终端持续服务的场景
- 需要语音、Canvas、Control UI 和实时多端交互体验的场景
- 需要把“超级助手”作为企业旗舰应用而不是普通应用目录项的场景

## 边界

- 不默认替代企业统一门户、应用目录和 `BFF` 控制面。
- 不按通用主平台路线或低代码编排平台理解。
- 不替代 [APISIX](/components/apisix) 的北向网关职责，也不替代 [agentgateway](/components/agentgateway) 的内部 AI 原生协议网关职责。
- 不应绕过统一身份、模型网关、审计和权限体系直接形成独立技术孤岛。

## 采用规则

- 当前方案默认门户前台仍以 [AgentifUI](/components/agentifui) 为主，`OpenClaw` 只在需要成品化超级智能体产品形态时条件引入。
- 引入时应优先把它定位为“旗舰智能体应用”或“高价值个人助手产品”，而不是第二套通用门户。
- 企业化部署时，需要明确多渠道接入边界、身份映射方式、模型接入方式和审计留痕方式。
- 对浏览器控制、设备节点、语音、远程访问和消息入口这类高敏能力，应先完成安全评估和最小权限收敛。

## 治理注意点

- 多渠道 DM、群聊和外部消息面本质上是非可信输入，应重点审查 pairing、allowlist、来源验证和重放保护。
- 浏览器、设备节点、Canvas、远程控制和自动化动作需要单独做风险分级，不能默认开放给所有用户或所有场景。
- 会话、记忆、渠道身份和企业主身份之间的映射必须可追踪，避免跨渠道形成匿名状态漂移。
- 如果通过 Tailscale、Remote UI 或其他方式做远程暴露，应与企业现有网络和访问控制规则对齐。

## 关联文档

- [3. 门户与应用层](/layers/portal-application)
- [AgentifUI](/components/agentifui)
- [APISIX](/components/apisix)
- [LiteLLM](/components/litellm)
- [安全与治理](/governance)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [OpenClaw 官网](https://openclaw.ai/)
- [OpenClaw 文档首页](https://docs.openclaw.ai/index)
- [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)
- [OpenClaw Getting Started](https://docs.openclaw.ai/start/getting-started)
- [OpenClaw Concepts: Architecture](https://docs.openclaw.ai/concepts/architecture)
- [OpenClaw Channels](https://docs.openclaw.ai/channels)
- [OpenClaw Gateway Security](https://docs.openclaw.ai/gateway/security)
