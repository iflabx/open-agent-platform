# LangSet

> 类型：测试数据集工程与 Agent 离线评测工作台
>
> 采用定位：条件引入（评测数据集工程与离线回归评测配套组件）
>
> 所属层：治理与观测层
>
> 开源仓库地址：https://github.com/iflabx/langset

## 当前定位

`LangSet` 是面向团队协作的可追溯、可版本化测试数据集工程与 Agent 离线评测工作台，用于将多源原始素材加工为带血缘溯源的不可变评测数据集，并执行离线回归评测与评分闭环。其运行时采用 React + Fastify + Ordinary / Model Worker 架构，直接复用平台既有的 `PostgreSQL` 与 S3 兼容对象存储（默认 [SeaweedFS](/components/seaweedfs) 或企业既有 S3 兼容对象存储），不引入新的数据库类型。

## 主要职责

- **多源素材与背景资料管理**：导入结构化原始素材（CSV / JSON / JSONL）与背景参考资料（PDF / Markdown / 纯文本），统一沉淀评测语料。
- **记录筛选与候选样本加工**：支持按条件筛选记录并对候选样本执行清洗、改写、扩充与生成，提升测试集构建效率。
- **共享草稿与版本化发布**：支持团队协作编辑共享草稿，经显式人工确认后发布带完整血缘溯源（Provenance）的不可变数据集版本。
- **单轮与多轮离线回归评测**：面向 `Dify` Chat / Chatflow 执行单轮与多轮离线评测，沉淀可对比的回归质量基线。
- **评测数据集双向同步**：支持与 `LangFuse` 数据集双向同步，并回拉对应的评测评分与评语结果。
- **项目内辅助分析能力**：通过 AI SDK 接入 `OpenAI 兼容 API` 提供试用项目助手，辅助团队进行样本整理与评测分析。

## 与其他组件关系

- 与 [LangFuse](/components/langfuse) 形成上下游互补：`LangSet` 承担上游测试数据集工程、版本固化与离线回归评测，并与 `LangFuse` 进行数据集双向同步及评分、评语回拉；`LangFuse` 承担在线生产 Trace、Prompt 与 LLM 链路观测。
- 与 [Dify](/components/dify) 编排层直接联动：支持面向 `Dify` Chat / Chatflow 的单轮与多轮离线评测；若企业主平台路线采用 [RAGFlow](/components/ragflow) 或自研 [LangGraph](/components/langgraph)，则使用 `LangSet` 完成版本化测试数据集工程，并通过 `LangFuse` 数据集进行同步或导出对接。
- 与 [LiteLLM](/components/litellm) 模型网关联动：候选样本加工、离线评测及项目助手的模型调用均须经由 `LiteLLM`（`OpenAI 兼容 API`）统一路由，不直连底层推理节点或外部模型服务。
- 与 [PostgreSQL](/components/postgresql)、[SeaweedFS](/components/seaweedfs)（或企业既有 S3 兼容对象存储）复用底座：直接复用平台基础设施层的关系型数据库与 S3 兼容对象存储后端，保持数据底座收敛。
- 与 [k6](/components/k6) 互补：`LangSet` 聚焦测试数据工程与 Agent 效果离线回归，`k6` 聚焦接口性能基线、压力测试与容量验证。

## 适合场景

- 跨职能团队协作构建可追溯、可版本化的测试与回归评测数据集
- 智能体应用上线前与迭代变更后的单轮、多轮离线回归验证
- 以 `Dify` 为主平台路线且需要建立常态化评测发布门槛的团队
- 需要将离线测试集版本管理与 `LangFuse` 评测评分体系打通的质量治理流程

## 边界

- **不替代 `LangFuse`**：不承担在线生产环境的实时 Trace、Prompt 与 LLM 链路观测。
- **不替代 `k6`**：不承担高并发压力测试、性能基线与容量验证。
- **不替代数据治理层**：不承担企业主数据治理、源数据集成或生产知识库资产治理（归属 [5. 数据治理层](/layers/data-governance-layer)）。
- **不绕过模型网关**：模型调用须统一通过 `LiteLLM`（`OpenAI 兼容 API`）接入，避免在评测工作台侧分散管理外部模型密钥。

## 采用规则

- 本方案将 `LangSet` 定位为治理与观测层的**条件引入**组件，作为评测数据集工程与离线回归评测配套工作台，不作为最小起步组合的强制依赖。
- 当业务团队进入常态化应用迭代阶段、需要多人协作维护版本化测试集并建立离线回归质量门槛时引入。
- 主平台路线采用 `Dify` 时可直接执行 Chat / Chatflow 离线评测；采用 `RAGFlow` 或自研 `LangGraph` 时，将其定位为版本化测试数据集工程工作台，通过 `LangFuse` 数据集完成同步与导出衔接。

## 治理注意点

- **显式人工确认与复核**：草稿保存与不可变版本发布须保留显式人工确认机制；模型生成的候选样本与自动评审结果仍须经过人工评估，不可未经复核直接作为发布放行依据。
- **凭据与测试数据隔离**：严禁将模型 API Key、会话 Cookie 及私有测试数据集提交至代码仓库，并做好不同环境与项目的存储隔离。
- **身份与项目级权限管控**：应接入企业现有 `SSO / IAM` 身份体系，并落实项目级的编辑者（Editor）与只读查看者（Viewer）RBAC 权限控制。
- **开源合规口径**：仓库采用标准开源 `Apache-2.0` 许可证，口径需与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [LangFuse](/components/langfuse)
- [Dify](/components/dify)
- [LiteLLM](/components/litellm)
- [安全与治理](/governance)
- [部署与发布](/deployment)

## 参考资料

- [LangSet GitHub Repository](https://github.com/iflabx/langset)
- [LangSet Apache-2.0 License](https://github.com/iflabx/langset/blob/main/LICENSE)
