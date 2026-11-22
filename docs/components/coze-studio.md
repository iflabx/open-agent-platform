# Coze Studio

> 类型：开源可视化智能体与工作流平台（观察参考）
>
> 采用定位：非主路线观察参考（不纳入默认主平台候选）
>
> 所属层：Agent 编排层（仅作特定约束参考）
>
> 官方网站：https://www.coze.cn/
>
> 开源仓库地址：https://github.com/coze-dev/coze-studio

## 当前定位

`Coze Studio` 是一款开源可视化 Agent 与工作流开发平台，采用 `Apache-2.0` 许可证。在本方案中，`Coze Studio` 定位为**非主路线观察参考**，**不纳入默认主平台候选**（主平台路线收敛为 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 二选一）。

::: info 未纳入默认主平台候选的客观原因
1. **异构中间件栈与底座收敛冲突**：`Coze Studio` 默认强依赖 `MySQL` + `Milvus` + `Elasticsearch` + `NSQ` + `Redis` + `MinIO` + `etcd` 构成的异构中间件栈，与本方案收敛的 `PostgreSQL` + `Weaviate` 基础设施基线存在明显冲突，会显著推高私有化部署与运维复杂度。
2. **开源演进与维护节奏较慢**：相较 `Dify` 与 `RAGFlow`，其开源版本的发布频次、社区问题响应与功能迭代节奏偏慢，不利于企业长期跟进主干能力。
3. **企业级能力需较大规模 Go 二次开发**：开源版在企业级插件生态、多租户隔离与企业 `SSO / IAM` 深度集成方面覆盖有限，直接投入数万人规模企业生产往往需要较大规模的 Go 语言二次开发投入。
:::

## 主要职责

- 可视化 Agent 搭建与编排
- 工作流设计与多节点联动
- 标准智能体应用发布与调试
- 面向业务团队的低代码应用生产

## 与其他组件关系

- 若在特定约束下独立评估采用，上游仍应由 [AgentifUI](/components/agentifui) 或企业门户承接统一应用入口。
- 向下应通过模型网关与治理层获得统一模型路由与审计能力，避免绕过平台边界直连模型服务。
- 与 [LangGraph](/components/langgraph)、[LangChain](/components/langchain) 属于不同抽象层次，复杂状态机与自研工程运行时仍应保持解耦。
- 与本方案默认主平台路线（[Dify](/components/dify)、[RAGFlow](/components/ragflow)）互斥，不建议并行建设。

## 适合场景（仅限特定约束下的独立评估）

仅当企业**同时满足**以下前置条件时，才值得将 `Coze Studio` 作为独立评估对象：

- 具备较强的 Go 微服务研发与持续二次开发能力；
- 企业内部已具备成熟的 `MySQL` + `Milvus` 等基础设施栈与运维团队；
- 法务与内控对主平台存在严格的 `Apache-2.0` 许可证约束，且 [RAGFlow](/components/ragflow) 无法满足业务编排需求。

## 边界

- 不纳入本方案默认主平台路线候选
- 不应与 `Dify` 或 `RAGFlow` 并行形成多套主平台底座
- 不替代门户层、统一控制面与复杂定制编排框架

## 采用规则

- 本方案默认主平台路线收敛为 [Dify](/components/dify) / [RAGFlow](/components/ragflow) 二选一，正式实施时不将 `Coze Studio` 作为默认主平台候选。
- 如因特定许可证或技术栈约束确需评估 `Coze Studio`，应将其列为独立专题评估项，充分核算异构中间件（`MySQL`、`Milvus`、`Elasticsearch`、`NSQ`、`etcd` 等）的运维成本及 Go 二次开发投入。
- 若评估通过并独立立项，仍须严格遵守本方案的统一接入、模型网关、权限隔离与全链路审计红线。

## 治理注意点

- **异构存储与备份治理**：需提前规划 `MySQL`、`Milvus`、`Elasticsearch`、`NSQ`、`etcd` 等多套组件的高可用、备份恢复与版本升级策略。
- **身份与多租户补齐**：实施前需明确企业 `SSO / IAM` 集成、组织权限映射与多租户隔离的二次开发工作量。
- **统一安全与审计边界**：任何模型调用与外部工具调用均不得绕过统一模型网关、授权与审计链路。
- **开源口径与版本基线**：核对目标发布版本的 `Apache-2.0` 许可证边界与社区维护状态，避免对上游特性迭代形成不可控依赖。

## 关联文档

- [4. Agent 编排层](/layers/agent-orchestration)
- [主平台路线](/components/platform-route)
- [技术选型](/stack)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [Coze Studio GitHub Repository](https://github.com/coze-dev/coze-studio)
