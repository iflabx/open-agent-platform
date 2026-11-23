# OpenFGA

> 类型：细粒度关系授权引擎（ReBAC / Zanzibar 模型）
>
> 采用定位：条件引入（大规模跨系统文档继承树与 RAG 文档级 ACL 预过滤演进，与 `Casbin` 互补）
>
> 所属层：治理与观测层
>
> 官方网站：https://openfga.dev/
>
> 开源仓库地址：https://github.com/openfga/openfga

## 当前定位

`OpenFGA` 是本方案治理与观测层条件引入的细粒度关系授权（ReBAC）引擎，属于 CNCF 项目，采用 `Apache-2.0` 许可证，基于 Google Zanzibar 权限模型设计。其核心定位是在大规模跨系统知识库与多层级文档继承场景下，承接复杂的对象关系图谱查询与 RAG 文档级 ACL 预过滤，与默认轻量进程内授权引擎 [Casbin](/components/casbin) 形成互补协作。

::: tip 与 Casbin 的演进边界
中小型部署及常规应用入口、角色属性策略与工具调用授权，默认由 [Casbin](/components/casbin) 在进程内完成裁决；仅当企业 RAG 知识检索跨越多个文档系统、涉及深层嵌套目录继承或动态分享权限时，再条件引入 `OpenFGA` 承接关系图谱授权。
:::

## 主要职责

- **企业级深层权限继承建模**：通过关系元组（Relationship Tuples）统一刻画 `用户 → 群组 → 项目 → 文件夹 → 文档` 等多级继承拓扑与动态分享关系。
- **RAG 检索前置 ACL 过滤**：提供 `ListObjects` 与关系元组展开能力，将当前主体可见的文档或目录范围下推至向量库与搜索引擎执行预过滤，避免越权切片进入召回上下文。
- **AI Agent 一等主体与受限会话委托**：支持将 AI Agent 建模为一等授权主体（First-class Principal），在用户发起会话时按最小权限授予带范围约束的临时委托权限（Scoped Session Delegation），防止 Agent 隐式继承过宽的人类权限。
- **高并发关系图谱裁决**：基于集中式授权服务与关系图遍历缓存，支撑大规模并发下的实时 `Check` 与对象列表反查。

## 与其他组件关系

- **与 [Casbin](/components/casbin) 互补协作**：`Casbin` 负责进程内轻量 `RBAC + ABAC` 裁决（应用访问、角色属性判定与工具动作授权）；`OpenFGA` 负责跨系统、深层对象继承树的 `ReBAC` 关系图谱裁决，两者按职责分层协同而非相互取代。
- **复用平台既有 [PostgreSQL](/components/postgresql) 底座**：关系元组与授权模型持久化优先复用平台既有 `PostgreSQL` 集群，避免引入额外的专用存储组件。
- **与 [6. 知识与检索层](/layers/knowledge-retrieval) 深度联动**：在 [LlamaIndex](/components/llamaindex) 检索编排链路中，调用 `OpenFGA` 的 `ListObjects` 或关系过滤条件，并将结果下推至 [Weaviate](/components/weaviate)、[Milvus](/components/milvus) 或 [Elasticsearch](/components/elasticsearch) 实现文档级预过滤（Pre-filtering）。
- **依托 `SSO / IAM` 与 [APISIX](/components/apisix) 承接身份上下文**：用户与群组身份仍由企业既有 `SSO / IAM` 提供，`APISIX` 负责北向入口认证与上下文透传，`OpenFGA` 仅消费经过校验的主体标识执行关系授权。
- **纳入 [LangFuse](/components/langfuse) 与 [OpenTelemetry](/standards/opentelemetry) 观测体系**：授权裁决延迟、命中结果与预过滤范围应关联至统一 Trace，便于安全审计与检索排障。

## 适合场景

- 跨网盘、Wiki、文档库与业务系统的企业级统一 RAG 检索权限治理
- 存在 `用户 → 群组 → 项目 → 文件夹 → 文档` 多级权限继承与临时分享链接的知识资产访问控制
- 需要对 AI Agent 实施细粒度会话委托与文档级最小权限收敛的场景
- 传统 `RBAC + ABAC` 标签扁平化建模难以维护、易出现权限爆炸的大规模协作环境

## 边界

- **不替代 [Casbin](/components/casbin)**：`Casbin` 仍是本方案默认的进程内 `RBAC + ABAC` 与工具动作授权引擎，常规应用与工具权限无需迁移至 `OpenFGA`。
- **不替代 [APISIX](/components/apisix)**：不承担北向统一入口、路由转发、限流熔断与流量治理职责。
- **不替代企业现有 `SSO / IAM`**：不负责用户认证、口令管理、组织主数据维护或令牌签发。
- **不替代业务审批流**：敏感写操作与高风险动作审批仍由 [Maker-Checker](/norms/maker-checker) 与企业审批流承接。
- **不作为默认必选组件**：部门级试点或目录结构扁平、仅需租户 / 部门标签过滤的 RAG 场景不建议过早引入。

## 采用规则

- **条件引入**：仅在企业知识检索跨越多个源系统、文档权限呈现深层树状或网状继承关系、且静态标签过滤难以准确还原源系统 ACL 时启用 `OpenFGA`。
- **小到大平滑演进**：初期默认以 `Casbin`（`RBAC + ABAC`）承接全部授权；随着知识资产规模与跨系统 ACL 复杂度上升，再叠加 `OpenFGA` 专责文档级 `ReBAC` 预过滤。
- **基础设施收敛**：持久化后端默认复用平台既有 `PostgreSQL`，不单独引入异构图数据库。

## 治理注意点

- **元组同步延迟与最终一致性控制**：上游文档系统（如网盘、Wiki、权限中心）的 ACL 变更通过事件或定时任务同步至 `OpenFGA` 时必然存在同步窗口，需明确同步 SLA、增量对账与补偿机制，高密级文档变更应优先走事件驱动实时同步。
- **权限撤销与缓存失效治理**：当员工离职、调岗或文档收回分享权限时，必须确保 `OpenFGA` 内部决策缓存及检索侧 ACL 缓存及时失效，防止产生“已撤权但仍可召回”的合规风险。
- **Agent 委托权限有效期与范围收敛**：为 AI Agent 授予的会话级关系元组必须设置严格的作用域边界与过期清理机制（TTL），避免临时委托演变为长期隐性权限。
- **授权模型版本化与可审计**：`OpenFGA` 授权模型（Authorization Model）须纳入版本控制与变更评审流程，关键裁决日志与元组变更记录应完整留痕。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [Casbin](/components/casbin)
- [RBAC + ABAC](/norms/rbac-abac)
- [6. 知识与检索层](/layers/knowledge-retrieval)
- [安全与治理](/governance)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [OpenFGA Official Website](https://openfga.dev/)
- [OpenFGA GitHub Repository](https://github.com/openfga/openfga)
- [OpenFGA Documentation](https://openfga.dev/docs/fga)
