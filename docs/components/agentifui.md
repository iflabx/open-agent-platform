# AgentifUI

> 类型：门户、应用分发与应用目录层
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：门户与应用层

## 当前定位

`AgentifUI` 是当前方案统一的门户前台，负责把应用目录、聊天入口、工作台和多应用入口收敛到同一用户界面层。

## 主要职责

- 企业统一 AI 门户
- 应用目录与应用发现
- 会话入口与应用分发
- 用户反馈和交互承接

## 与其他组件关系

- 上游由 [APISIX](/components/apisix) 承接统一入口和认证接入。
- 通过 `BFF` 或 API 层对接 [Dify](/components/dify)、[RAGFlow](/components/ragflow)、[Coze Studio](/components/coze-studio) 和自研服务。
- 与企业现有身份体系联动，决定用户可见应用目录和入口。
- 向下游编排层传递用户上下文、会话上下文和反馈信息。

## 适合场景

- 企业统一 AI 工作台
- 多应用目录与分发入口
- 需要统一聊天入口和反馈承接的场景

## 边界

- 不持有核心编排逻辑
- 不直接耦合模型层
- 不替代完整企业控制面

## 采用规则

- 当前方案默认以 `AgentifUI` 作为统一门户前台，不再额外引入第二套正式门户组件。
- 门户层只承接前台交互和应用分发，业务流程、模型调用和知识检索放在下游层处理。
- 新应用优先通过统一目录和统一入口接入，不建议形成分散前台。

## 治理注意点

- 应用目录的可见范围必须与身份、组织和权限范围一致。
- 前端不应绕过网关和编排层直接访问模型或知识底层。
- 用户反馈、人工转办和会话延续动作要能够追溯到用户和应用。
- 门户层接口契约需要稳定，避免与具体编排实现强耦合。

## 关联文档

- [3. 门户与应用层](/layers/portal-application)
- [2. 统一接入与流量治理层](/layers/access-traffic-governance)
- [4. Agent 编排层](/layers/agent-orchestration)
- [方案综述](/guide/)

## 参考资料

- [AgentifUI](https://agentifui.com/)
- [AgentifUI GitHub Repository](https://github.com/iflabx/agentifui)
