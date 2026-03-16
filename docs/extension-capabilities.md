# 扩展升级

> 角色：企业智能体系统建设中的扩展能力研究与升级方向页
>
> 说明：本文总结的是企业建设智能体系统时经常需要、但当前正式组件清单尚未纳入的能力与代表性开源组件。本文不是当前正式组件清单，不改变 [组件](/components) 页的公开口径。

相关文档：

- [方案](/framework)
- [组件](/components)
- [技术选型](/stack)
- [企业智能体能力与规范体系](/capability-framework)
- [协议与标准体系](/protocol-standards)
- [开源状态与许可证说明](/open-source-status)

## 一、为什么需要这页

当前方案已经能覆盖企业智能体平台的主干能力，但在真实建设过程中，企业常常还会碰到一些额外能力诉求：

- 长时异步任务和跨系统流程需要更强的持久化编排
- 多系统事件驱动集成需要消息与流式底座
- 多系统统一策略需要更强的 `Policy as Code` 能力
- 敏感数据识别、脱敏和合规审查需要专门能力
- 数据质量和多源查询在部分场景下需要额外补齐
- 浏览器自动化或 UI 级执行需要专门运行能力
- Agent 直接返回表单、卡片和审批界面时，需要声明式动态交互协议

这些能力并不一定都要进入当前正式方案，但在企业级建设中很常见，因此有必要单独说明。

## 二、使用边界

本文遵守三条边界：

1. 这里只讨论“当前正式方案未纳入”的扩展能力与代表性开源组件。
2. 本文不把这些对象自动升级为当前公开主清单。
3. 只有在现有组件边界明显不足时，才建议单独评估是否引入。

## 三、扩展能力总览

| 扩展能力 | 当前方案已覆盖到哪里 | 仍可能不足的地方 | 代表性开源组件（未纳入当前正式清单） |
| --- | --- | --- | --- |
| 长时异步流程与持久化工作流 | `LangGraph` 已覆盖复杂状态机和人工介入 | 跨天 / 跨周任务、独立任务队列、分布式补偿和超长时恢复 | `Temporal` |
| 事件流与异步集成总线 | 当前以同步 API、工具调用和协议层为主 | 大规模事件驱动、松耦合集成、回放和异步解耦 | `Apache Kafka`、`Redpanda` |
| 集中式策略决策与多系统 `Policy as Code` | 当前以 `Casbin` 为主 | 跨平台统一策略评估、独立 PDP、基础设施层策略治理 | `OPA` |
| 密钥、动态凭据与工作负载身份 | 当前默认复用企业现有 `KMS / 证书体系` | 企业缺少统一密钥和动态凭据平台时的落地能力 | `Vault` |
| 敏感信息识别与脱敏 | 当前以规则、权限和模型前后置控制为主 | 专门的 PII 识别、匿名化、图片脱敏和结构化脱敏 | `Presidio` |
| 数据质量验证与发布门槛 | 当前有 `dbt Core`、治理流程和元数据体系 | 面向表、文件、索引发布前的显式质量校验和验证报告 | `Great Expectations` |
| 联邦查询与受控多源分析 | 当前以治理后数据层、`PostgreSQL` 和检索为主 | 多源联邦 SQL、跨存储统一查询入口 | `Trino` |
| 浏览器自动化与 UI 级执行 | 当前主要通过工具调用和协议集成 | Web UI 自动化、浏览器步骤回放、页面级任务执行 | `Playwright` |
| Agent 驱动界面与动态交互协议 | 当前以固定门户页面、组件页面和前端静态组件为主 | 动态表单、审批卡片、工件面板、运行中断补录与跨 runtime 统一交互表达 | `A2UI` |

## 四、逐项说明

## 1. 长时异步流程与持久化工作流

### 这项能力解决什么问题

当流程跨越数小时、数天甚至更久时，仅靠应用内状态机通常会开始变得脆弱。企业会需要：

- 独立任务队列
- 长时任务恢复
- 分布式重试与补偿
- 工作流版本演进

### 当前方案为什么还没纳入

当前正式方案优先用 `LangGraph` 覆盖复杂 Agent 运行时和带人工介入的状态链路，先解决智能体平台主问题，而不是一开始就上独立工作流底座。

### 什么时候值得评估

- 高比例任务跨天执行
- 大量异步回调或批处理
- 需要独立的 workflow service 和 worker fleet

### 代表性组件

- `Temporal`

### 官方参考

- [Temporal Docs](https://docs.temporal.io/)

## 2. 事件流与异步集成总线

### 这项能力解决什么问题

当前方案已能通过 API、工具和协议层实现集成，但在下面这些情况里，事件总线会更合适：

- 多系统松耦合集成
- 实时事件分发
- 异步回放与削峰填谷
- 高吞吐数据流和消费组处理

### 当前方案为什么还没纳入

当前方案优先围绕业务可落地的主链收敛，很多场景在第一阶段并不需要完整消息流平台。

### 什么时候值得评估

- 多系统事件风暴明显
- 同步调用链过长
- 需要离线索引、异步补偿和大规模事件消费

### 代表性组件

- `Apache Kafka`
- `Redpanda`

### 官方参考

- [Apache Kafka 官网](https://kafka.apache.org/)
- [Kafka Introduction](https://kafka.apache.org/35/getting-started/introduction/)
- [Redpanda Kafka Compatibility](https://docs.redpanda.com/25.2/develop/kafka-clients/)

## 3. 集中式策略决策与多系统 `Policy as Code`

### 这项能力解决什么问题

`Casbin` 非常适合当前方案里的应用级和动作级授权，但当企业想把策略统一扩展到更多系统层面时，常见诉求会变成：

- 独立的策略决策点
- 跨系统统一策略评估
- 基础设施与平台策略共用一套语言

### 当前方案为什么还没纳入

当前方案优先收敛授权链路，把复杂度控制在 `Casbin + 规范页体系` 这组能力里。

### 什么时候值得评估

- 多平台都想共用一套策略语言
- 需要独立 PDP
- 希望把应用、平台、基础设施治理统一到同一套 `Policy as Code`

### 代表性组件

- `OPA`

### 官方参考

- [OPA Docs](https://www.openpolicyagent.org/docs)
- [OPA Policy Language](https://www.openpolicyagent.org/docs/policy-language)

## 4. 密钥、动态凭据与工作负载身份

### 这项能力解决什么问题

当前方案默认复用企业现有 `KMS / 证书体系`。但如果企业现有能力不足，通常还需要补齐：

- API Key / Secret 集中管理
- 动态凭据发放
- 短期凭据和轮换
- 工作负载身份与审计

### 当前方案为什么还没纳入

因为这类能力在企业里通常已有统一安全平台，不适合默认作为智能体平台新增组件。

### 什么时候值得评估

- 企业没有成熟的密钥和动态凭据平台
- 智能体工具大量依赖外部 API 密钥
- 需要短期凭据和工作负载身份

### 代表性组件

- `Vault`

### 官方参考

- [How Vault Works](https://developer.hashicorp.com/vault/docs/about-vault/how-vault-works)
- [Manage identities and authentication](https://developer.hashicorp.com/vault/docs/about-vault/why-use-vault/identities)

## 5. 敏感信息识别与脱敏

### 这项能力解决什么问题

当前方案已经强调权限过滤、Prompt 前置控制和输出审查，但企业在合规要求更强时，往往还需要更专门的能力：

- 文本 PII 识别
- 匿名化 / 脱敏
- 图片或扫描件中的敏感信息遮盖
- 结构化 / 半结构化数据脱敏

### 当前方案为什么还没纳入

因为很多企业已经有现成 DLP / 合规平台，或者会先用规则和流程兜底，而不是一开始就引入专门引擎。

### 什么时候值得评估

- 涉及客户、员工、合同、财务等敏感数据
- 对文本和图片都要求脱敏
- 想把脱敏能力做成独立服务

### 代表性组件

- `Presidio`

### 官方参考

- [Presidio 首页](https://microsoft.github.io/presidio/)
- [Presidio Anonymizer](https://microsoft.github.io/presidio/anonymizer/)

## 6. 数据质量验证与发布门槛

### 这项能力解决什么问题

当前方案已有 `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika`，但在某些企业里，仍会需要更显式的数据验证能力，例如：

- 表结构和字段完整性验证
- 索引发布前质量校验
- 验证报告和质量门槛

### 当前方案为什么还没纳入

当前方案优先以治理流程和 `dbt Core` 的建模约束为主，避免在第一阶段再引入独立数据质量平台。

### 什么时候值得评估

- 数据质量问题已经频繁影响回答质量
- 需要显式 Expectation / Validation 报告
- 想把“数据是否可发布给 AI”做成独立门槛

### 代表性组件

- `Great Expectations`

### 官方参考

- [Great Expectations Expectations Overview](https://docs.greatexpectations.io/docs/cloud/expectations/expectations_overview)
- [Great Expectations Validations](https://docs.greatexpectations.io/docs/cloud/validations/validations_lp)
- [Validate data schema with GX](https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/schema/)

## 7. 联邦查询与受控多源分析

### 这项能力解决什么问题

当企业进入复杂分析场景时，仅靠单一治理后数据层和单库查询可能不够，还会出现：

- 多源联合分析
- 跨对象存储、数据库、数据湖查询
- 统一 SQL 访问层

### 当前方案为什么还没纳入

当前方案的数据分析场景先围绕治理后数据层、`OpenMetadata`、`dbt Core`、`PostgreSQL` 和受控应用链路展开，避免一开始引入更重的多源查询底座。

### 什么时候值得评估

- 多源联合分析需求明显增加
- 单一数据库或单一数据层难以承载分析范围
- 需要对外提供统一 SQL 查询入口

### 代表性组件

- `Trino`

### 官方参考

- [Trino 官网](https://trino.io/)

## 8. 浏览器自动化与 UI 级执行

### 这项能力解决什么问题

当前方案支持工具调用，但如果企业有大量“只有 Web UI 没有稳定 API”的系统，往往还需要：

- 浏览器自动化
- UI 步骤回放
- 页面级任务执行
- 端到端交互脚本

### 当前方案为什么还没纳入

因为这类能力并不是所有企业智能体平台都需要；很多企业会优先接 API，而不是先做 UI 自动化。

### 什么时候值得评估

- 关键系统没有稳定 API
- 操作步骤主要发生在浏览器页面
- 需要把人工页面操作变成可复用 Agent 工具

### 代表性组件

- `Playwright`

### 官方参考

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright Writing Tests](https://playwright.dev/docs/writing-tests)

## 9. Agent 驱动界面与动态交互协议

### 这项能力解决什么问题

当前方案已经有统一门户和固定页面，但如果后续希望让 agent 或 runtime 在运行时返回可安全渲染的 UI，企业通常还会需要：

- 动态表单与参数补录界面
- 审批卡片与人工确认面板
- 工件展示卡片和结果工作台
- 运行中断后的上下文补录与恢复
- 不同 runtime 之间更一致的前台交互表达

### 当前方案为什么还没纳入

当前正式方案优先解决统一门户、应用目录、权限、编排接入和治理链路，不把“agent 生成界面协议”作为第一阶段核心依赖。

此外，`A2UI` 当前仍处于公开预览早期阶段，更适合作为扩展升级方向或候选标准，而不是立即升级为当前正式组件。

### 什么时候值得评估

- 需要让 agent 返回表单、卡片或审批界面，而不是只返回文本
- 多个 runtime 都希望通过统一前端协议表达交互界面
- 需要把人工确认、人工补录和工件展示纳入标准事件流
- 希望在门户层建立“声明式动态 UI + 白名单组件渲染”能力

### 代表性组件

- `A2UI`

### 官方参考

- [A2UI GitHub](https://github.com/google/A2UI)
- [Introducing A2UI: An open project for agent-driven interfaces](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)
- [A2UI Quickstart](https://a2ui.org/quickstart/)

## 五、建议的评估顺序

如果企业后续要补齐这些扩展能力，建议按以下优先级评估：

1. 密钥、动态凭据与工作负载身份
2. 数据质量验证与发布门槛
3. 集中式策略决策与多系统 `Policy as Code`
4. 长时异步流程与持久化工作流
5. 事件流与异步集成总线
6. 敏感信息识别与脱敏
7. 联邦查询与受控多源分析
8. 浏览器自动化与 UI 级执行
9. Agent 驱动界面与动态交互协议

前四项更偏平台控制力和生产可控性，后五项更偏场景扩展与规模化深化。

## 六、与当前正式方案的关系

本文与当前正式方案的关系应理解为：

- [组件](/components) 记录的是当前正式清单。
- 本文记录的是企业建设中常见、但当前尚未纳入正式清单的补齐方向。
- 只有在现有能力边界明显不足时，才建议从本文中挑选对象做专项评估。

## 七、一句话收敛

企业智能体平台的扩展重点，不是继续堆更多“看起来先进”的组件，而是在现有组件边界不足时，按能力缺口精准补齐工作流、事件流、策略、密钥、脱敏、数据质量、联邦查询、UI 执行和动态交互协议能力。

## 参考资料

- [Temporal Docs](https://docs.temporal.io/)
- [Apache Kafka 官网](https://kafka.apache.org/)
- [Redpanda Kafka Compatibility](https://docs.redpanda.com/25.2/develop/kafka-clients/)
- [OPA Docs](https://www.openpolicyagent.org/docs)
- [How Vault Works](https://developer.hashicorp.com/vault/docs/about-vault/how-vault-works)
- [Presidio 首页](https://microsoft.github.io/presidio/)
- [Great Expectations Validations](https://docs.greatexpectations.io/docs/cloud/validations/validations_lp)
- [Trino 官网](https://trino.io/)
- [Playwright Docs](https://playwright.dev/docs/intro)
- [A2UI GitHub](https://github.com/google/A2UI)
- [Introducing A2UI: An open project for agent-driven interfaces](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)
- [A2UI Quickstart](https://a2ui.org/quickstart/)
