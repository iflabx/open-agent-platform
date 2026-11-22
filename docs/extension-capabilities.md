# 扩展升级

::: info 定位与边界
本页梳理企业在建设智能体系统时常见、但未纳入正式组件清单的扩展能力与代表性开源组件。本页不构成正式组件清单，不改变 [组件](/components) 页的既定选型口径；仅当现有组件边界明显不足时，作为专项技术评估参考。

相关文档：[方案](/framework) · [组件](/components) · [技术选型](/stack) · [企业智能体能力与规范体系](/capability-framework) · [协议与标准体系](/protocol-standards) · [开源状态与许可证说明](/open-source-status)
:::

## 定位与演进背景

主干方案已覆盖企业级智能体平台的核心能力，但在复杂业务演进中，企业通常还会遇到以下扩展诉求：

- **长时异步编排**：跨天或跨周任务与跨系统流程需要更强的持久化编排能力。
- **事件驱动集成**：多系统松耦合集成需要消息队列与流式数据底座。
- **跨系统统一策略**：多平台统一治理需要更强的 `Policy as Code` 决策能力。
- **敏感数据合规**：敏感信息识别、匿名化脱敏与合规审查需要专门引擎。
- **数据质量与多源查询**：特定分析场景下需补齐显式数据质量校验与联邦查询能力。
- **UI 级自动化执行**：面向无稳定 API 的存量系统，需要浏览器自动化与页面级执行能力。
- **动态交互界面协议**：Agent 直接返回表单、卡片与审批界面时，需要声明式动态交互协议。
- **个人自治型超级智能体**：面向少量高阶用户、研发或高信任团队的长期自治助手，需采用独立沙箱多实例隔离运行。

上述能力并非所有企业的必选项，但属于中后期高频演进方向，因此在此集中梳理其适用边界与代表性组件。

## 使用边界

1. **严格区分清单**：本页仅讨论未纳入正式方案的扩展能力与代表性开源组件。
2. **不自动升级**：本页所列组件不会自动升级为公开主清单成员。
3. **按缺口引入**：仅在现有正式组件边界明显不足时，按实际业务缺口单独评估引入。

## 扩展能力总览

| 扩展能力 | 现有方案覆盖范围 | 仍可能不足之处 | 代表性开源组件（未纳入正式清单） |
| --- | --- | --- | --- |
| 长时异步流程与持久化工作流 | `LangGraph` 已覆盖复杂状态机和人工介入 | 跨天 / 跨周任务、独立任务队列、分布式补偿和超长时恢复 | `Temporal` |
| 事件流与异步集成总线 | 以同步 API、工具调用和协议层为主 | 大规模事件驱动、松耦合集成、回放和异步解耦 | `Apache Kafka`、`Redpanda` |
| 集中式策略决策与多系统 `Policy as Code` | 以 `Casbin` 为主 | 跨平台统一策略评估、独立 PDP、基础设施层策略治理 | `OPA` |
| 密钥、动态凭据与工作负载身份 | 默认复用企业现有 `KMS / 证书体系` | 企业缺少统一密钥和动态凭据平台时的落地能力 | `Vault` |
| 敏感信息识别与脱敏 | 以规则、权限和模型前后置控制为主 | 专门的 PII 识别、匿名化、图片脱敏和结构化脱敏 | `Presidio` |
| 数据质量验证与发布门槛 | 已有 `dbt Core`、治理流程和元数据体系 | 面向表、文件、索引发布前的显式质量校验和验证报告 | `Great Expectations` |
| 联邦查询与受控多源分析 | 以治理后数据层、`PostgreSQL` 和检索为主 | 多源联邦 SQL、跨存储统一查询入口 | `Trino` |
| 浏览器自动化与 UI 级执行 | 主要通过工具调用和协议集成 | Web UI 自动化、浏览器步骤回放、页面级任务执行 | `Playwright` |
| Agent 驱动界面与动态交互协议 | 以固定门户页面、组件页面和前端静态组件为主 | 动态表单、审批卡片、工件面板、运行中断补录与跨 `Agent Runtime` 统一交互表达 | `A2UI` |
| 个人自治型超级智能体（独立沙箱实例） | 默认门户 `AgentifUI` + 门户 / BFF 覆盖企业全员共享入口与多应用分发 | 面向少量高阶用户、研发或高信任团队的持续会话、技能自治执行与多渠道个人助手形态；严禁作为全员共享多租户门户 | [OpenClaw](/components/openclaw) |

## 1. 长时异步流程与持久化工作流

### 解决的问题

当流程跨越数小时、数天甚至更久时，仅依赖应用内状态机往往难以保证可靠性，企业通常需要：

- 独立任务队列
- 长时任务状态恢复
- 分布式重试与补偿机制
- 工作流版本平滑演进

### 未纳入正式清单的原因

正式方案优先使用 `LangGraph` 覆盖复杂 `Agent Runtime` 与带人工介入的状态链路，聚焦智能体平台主干问题，避免初期即引入独立工作流底座。

### 适用评估时机

- 高比例业务任务跨天执行
- 存在大量异步回调或长周期批处理
- 需要独立的 Workflow Service 与 Worker Fleet

### 代表性组件

- `Temporal`

### 官方参考

- [Temporal Docs](https://docs.temporal.io/)

## 2. 事件流与异步集成总线

### 解决的问题

现有方案可通过 API、工具和协议层完成系统集成，但在以下场景中，事件总线更具优势：

- 多系统松耦合集成
- 实时事件分发
- 异步回放与削峰填谷
- 高吞吐数据流与消费组处理

### 未纳入正式清单的原因

主干方案优先围绕可快速落地的业务主链路收敛，多数场景在初期并不需要完整的消息流平台。

### 适用评估时机

- 多系统间事件风暴显著
- 同步调用链过长导致级联超时风险
- 需要离线索引、异步补偿和大规模事件消费

### 代表性组件

- `Apache Kafka`
- `Redpanda`

### 官方参考

- [Apache Kafka 官网](https://kafka.apache.org/)
- [Kafka Introduction](https://kafka.apache.org/35/getting-started/introduction/)
- [Redpanda Kafka Compatibility](https://docs.redpanda.com/25.2/develop/kafka-clients/)

## 3. 集中式策略决策与多系统 `Policy as Code`

### 解决的问题

`Casbin` 非常适合方案内的应用级与动作级授权，但当企业希望将策略统一扩展至更多平台层面时，常见诉求会演进为：

- 独立的策略决策点（PDP）
- 跨系统统一策略评估
- 基础设施与平台策略共用同一套策略语言

### 未纳入正式清单的原因

正式方案优先收敛授权链路，将复杂度控制在 `Casbin` 与既定授权规范体系内。

### 适用评估时机

- 多平台需要共用同一套策略语言
- 需要独立部署的策略决策点（PDP）
- 希望将应用、平台与基础设施治理统一至同一套 `Policy as Code` 体系

### 代表性组件

- `OPA`

### 官方参考

- [OPA Docs](https://www.openpolicyagent.org/docs)
- [OPA Policy Language](https://www.openpolicyagent.org/docs/policy-language)

## 4. 密钥、动态凭据与工作负载身份

### 解决的问题

主干方案默认复用企业现有 `KMS / 证书体系`。若企业既有能力不足，通常需补齐：

- API Key / Secret 集中管理
- 动态凭据签发
- 短期凭据与自动轮换
- 工作负载身份认证与审计

### 未纳入正式清单的原因

此类能力在大型企业中通常由统一安全平台承接，不适合作为智能体平台的默认新增组件。

### 适用评估时机

- 企业尚未建设成熟的密钥与动态凭据平台
- 智能体工具大量依赖外部 API 密钥
- 需要短期凭据签发与工作负载身份治理

### 代表性组件

- `Vault`

### 官方参考

- [How Vault Works](https://developer.hashicorp.com/vault/docs/about-vault/how-vault-works)
- [Manage identities and authentication](https://developer.hashicorp.com/vault/docs/about-vault/why-use-vault/identities)

## 5. 敏感信息识别与脱敏

### 解决的问题

主干方案已强调权限过滤、Prompt 前置控制与输出审查，但在强合规要求下，企业往往需要专门引擎支撑：

- 文本 PII 识别
- 匿名化与脱敏处理
- 图片或扫描件中的敏感信息遮盖
- 结构化 / 半结构化数据脱敏

### 未纳入正式清单的原因

多数企业已有既成 DLP / 合规平台，或在初期优先以规则和流程机制兜底，无需一开始引入专门脱敏引擎。

### 适用评估时机

- 业务高频涉及客户、员工、合同、财务等敏感数据
- 对文本和图片均提出脱敏合规要求
- 希望将脱敏能力沉淀为独立共享服务

### 代表性组件

- `Presidio`

### 官方参考

- [Presidio 首页](https://microsoft.github.io/presidio/)
- [Presidio Anonymizer](https://microsoft.github.io/presidio/anonymizer/)

## 6. 数据质量验证与发布门槛

### 解决的问题

主干方案已具备 `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Docling`（条件兼容 `Apache Tika`），但在部分企业中仍需更显式的数据验证能力：

- 表结构与字段完整性验证
- 索引发布前质量校验
- 自动化验证报告与质量门槛拦截

### 未纳入正式清单的原因

正式方案初期优先依托治理流程与 `dbt Core` 建模约束保障数据质量，避免第一阶段引入独立数据质量平台。

### 适用评估时机

- 数据质量缺陷频繁影响智能体回答准确率
- 需要显式的 Expectation / Validation 验证报告
- 希望将“数据是否可发布给 AI”固化为独立自动化门槛

### 代表性组件

- `Great Expectations`

### 官方参考

- [Great Expectations Expectations Overview](https://docs.greatexpectations.io/docs/cloud/expectations/expectations_overview)
- [Great Expectations Validations](https://docs.greatexpectations.io/docs/cloud/validations/validations_lp)
- [Validate data schema with GX](https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/schema/)

## 7. 联邦查询与受控多源分析

### 解决的问题

当企业迈入复杂数据分析场景时，仅依赖单一治理后数据层与单库查询可能不足，常见扩展诉求包括：

- 多源联合分析
- 跨对象存储、关系型数据库与数据湖查询
- 统一 SQL 访问层

### 未纳入正式清单的原因

主干方案的数据分析场景优先围绕治理后数据层、`OpenMetadata`、`dbt Core`、`PostgreSQL` 及受控应用链路展开，避免初期引入较重的多源查询引擎。

### 适用评估时机

- 多源联合分析需求显著增长
- 单一数据库或单一数据层难以承载分析范围
- 需要对外提供统一受控 SQL 查询入口

### 代表性组件

- `Trino`

### 官方参考

- [Trino 官网](https://trino.io/)

## 8. 浏览器自动化与 UI 级执行

### 解决的问题

主干方案支持标准工具调用，但如果企业存在大量“仅有 Web UI 而无稳定 API”的存量系统，往往需要：

- 浏览器自动化操作
- UI 执行步骤回放
- 页面级任务执行
- 端到端交互脚本封装

### 未纳入正式清单的原因

此类能力并非所有企业智能体平台的必选项，多数企业会优先通过标准 API 集成，而非率先建设 UI 自动化能力。

### 适用评估时机

- 关键业务系统缺乏稳定 API
- 核心操作步骤主要发生在浏览器页面
- 需要将人工页面操作封装为可复用的 Agent 工具
- 企业化落地时须与第 9 层 [Agent 执行沙箱](/components/agent-sandbox)（`Kubernetes agent-sandbox` + `gVisor` / `Kata Containers`）对齐，将无头浏览器与页面脚本限定在专属沙箱节点池内运行，落实默认拒绝出向白名单与凭据剥离（Secret Stripping）

### 代表性组件

- `Playwright`

### 官方参考

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright Writing Tests](https://playwright.dev/docs/writing-tests)

## 9. Agent 驱动界面与动态交互协议

### 解决的问题

主干方案已具备统一门户与固定页面，但若希望让 Agent 或 `Agent Runtime` 在运行时返回可安全渲染的动态界面，企业通常还需支持：

- 动态表单与参数补录界面
- 审批卡片与人工确认面板
- 工件展示卡片与结果工作台
- 运行中断后的上下文补录与恢复
- 不同 `Agent Runtime` 之间一致的前台交互表达

### 未纳入正式清单的原因

正式方案优先解决统一门户、应用目录、权限、编排接入与治理链路，不将“Agent 生成界面协议”作为第一阶段核心依赖。

此外，`A2UI` 当前仍处于公开预览早期阶段，更适合作为扩展升级方向或候选标准持续跟踪，而不宜直接升级为正式组件。

### 适用评估时机

- 需要让 Agent 直接返回表单、卡片或审批界面，而非仅输出纯文本
- 多个 `Agent Runtime` 希望通过统一前端协议表达交互界面
- 需要将人工确认、参数补录和工件展示纳入标准事件流
- 希望在门户层构建“声明式动态 UI + 白名单组件渲染”能力

### 代表性组件

- `A2UI`

### 官方参考

- [A2UI GitHub](https://github.com/google/A2UI)
- [Introducing A2UI: An open project for agent-driven interfaces](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)
- [A2UI Quickstart](https://a2ui.org/quickstart/)

## 10. 个人自治型超级智能体（独立沙箱实例）

### 解决的问题

主干方案第 3 层（门户与应用层）通过 `AgentifUI` + 门户 / BFF 承接数万人规模企业的共享多应用入口。但在研发、技术专家或少量高信任团队场景中，常出现面向个体的高自治助手需求：

- 面向单人或极小高信任小组的持续会话与长期上下文
- 多渠道接入与多端连续交互体验
- 自治技能调用、本地 / 工作区任务辅助与个人效率自动化

### 未纳入正式清单的原因

个人自治型超级智能体内置独立的 Gateway、会话状态、技能执行与自治运行机制，在安全边界与资源模型上与企业级共享多租户门户存在本质差异：

- **严禁作为全员共享门户**：不得将其部署为面向数万人规模企业的共享多租户门户网关，否则极易引发跨用户会话串扰、凭据泄露与权限逃逸。
- **必须采用 Multi-Instance 独立沙箱隔离**：企业化落地时须按单用户或单个高信任小组分配独立实例，与第 9 层 [Agent 执行沙箱](/components/agent-sandbox)（`Kubernetes agent-sandbox` + `gVisor` 默认 / `Kata Containers` 裸金属 KVM 强隔离）对齐，运行在专属沙箱节点池内并配置独立资源配额。
- **强治理前置条件**：必须配套经审核的企业内部技能仓库白名单、默认拒绝出向白名单与凭据剥离（Secret Stripping），并将所有模型调用与操作审计强制收敛至 `LiteLLM`、`LangFuse` 及平台统一审计体系。

因此，该能力不纳入主方案第 3 层共享门户基线，仅作为面向特定高信任人群的可选扩展能力按需评估。

### 适用评估时机

- 少量高阶用户、研发团队或高信任小组存在明确的个人自治助手需求
- 企业已具备独立沙箱节点池、容器 / MicroVM 级隔离与单实例配额管控能力
- 已建立内部技能审核白名单与凭据剥离机制，禁止实例直连外部未审技能源或持有高权限静态密钥
- 已确保所有模型访问经由 `LiteLLM` 路由，所有会话与工具动作纳入统一审计与观测链路

### 代表性组件

- [OpenClaw](/components/openclaw)

### 官方参考

- [OpenClaw 官网](https://openclaw.ai/)
- [OpenClaw Concepts: Architecture](https://docs.openclaw.ai/concepts/architecture)
- [OpenClaw Gateway Security](https://docs.openclaw.ai/gateway/security)

## 建议评估顺序

若企业后续计划补齐上述扩展能力，建议按以下优先级推进评估：

1. 密钥、动态凭据与工作负载身份
2. 数据质量验证与发布门槛
3. 集中式策略决策与多系统 `Policy as Code`
4. 长时异步流程与持久化工作流
5. 事件流与异步集成总线
6. 敏感信息识别与脱敏
7. 联邦查询与受控多源分析
8. 浏览器自动化与 UI 级执行
9. Agent 驱动界面与动态交互协议
10. 个人自治型超级智能体（独立沙箱实例）

前四项侧重平台控制力与生产可控性，后六项侧重场景扩展、特定人群深化与规模化演进。

## 与正式方案的关系

- [组件](/components) 记录正式清单与各层主归属组件。
- 本页记录企业演进中常见、但尚未纳入正式清单的能力补齐方向。
- 仅在现有能力边界明显不足时，从本页挑选对应能力开展专项评估。

::: tip 扩展原则
企业智能体平台的扩展重点，不在于无序叠加“看似先进”的组件，而在于现有组件边界出现明确缺口时，按需精准补齐工作流、事件流、策略、密钥、脱敏、数据质量、联邦查询、UI 执行、动态交互协议及个人自治型超级智能体等扩展能力。
:::

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
- [OpenClaw 官网](https://openclaw.ai/)
- [OpenClaw Concepts: Architecture](https://docs.openclaw.ai/concepts/architecture)
- [OpenClaw Gateway Security](https://docs.openclaw.ai/gateway/security)
