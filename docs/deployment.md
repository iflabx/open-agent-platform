# 部署与发布

> 角色：平台本体部署与发布治理页
>
> 说明：本文只讨论企业级智能体平台本体的部署、扩缩容、回滚和运行治理，不展开内部文档维护流程。

## 部署规模对照总表

| 档位 | 核心目标 | 最小组件组合（默认基线） | 模型策略 | 推荐服务器数 | 适合阶段 |
| --- | --- | --- | --- | --- | --- |
| `1 台` 最小验证版 | 先验证门户与主平台路线可用 | `AgentifUI + Dify` | 调外部 `OpenAI 兼容 API` | `1` | 首轮 PoC、内测 |
| `2-3 台` 小团队试点版 | 把应用层、数据层、模型层初步拆开 | `APISIX + AgentifUI + Dify + PostgreSQL + Redis + MinIO + Weaviate` | `2` 台时外部模型，`3` 台时可加 `LiteLLM + vLLM + Qwen` | `2-3` | 小团队试点 |
| `5 台` 生产基线版 | 形成可认真生产的最小组合 | `APISIX + AgentifUI + Dify + LiteLLM + vLLM + Qwen + LlamaIndex + Casbin + LangFuse + 平台观测栈` | 默认自托管模型 | `5` | 部门级推广 |
| `7-8 台` 完整功能版 | 补齐数据治理和完整平台能力 | 在 5 台版基础上增加 `OpenMetadata + SeaTunnel + dbt Core + Apache Tika` | 自托管模型，并拆出检索、数据治理、观测单元 | `7-8` | 多部门共用平台 |
| `10-12+ 台` 完整高可用版 | 进入企业级正式生产和故障隔离 | 在 7-8 台版基础上对无状态、数据、GPU 单元分别做双活或高可用 | 自托管模型，多 GPU 节点 | `10-12+` | 企业级正式生产 |

说明：
- 这张表只给决策和预算对齐使用，具体落位方式看下文各档位说明。
- 服务器数按“单环境”计算，不包含企业既有 `SSO / IAM`、`KMS`、`WAF`、`DNS / LB`、托管数据库等复用能力。
- 如果数据库、对象存储或 GPU 使用企业现有托管能力，服务器数可以下降，但部署单元和治理边界不变。
- 上表和下文所有部署图都按 `AgentifUI` 默认门户基线绘制。
- 当第 3 层目标是成品化超级智能体产品时，可在同一“门户单元”位置条件引入 `OpenClaw`；通常不改变服务器档位估算，但会改变应用节点上的前台与会话承载形态。

## 部署原则

当前方案的部署设计遵循以下原则：

- 入口、编排、检索、模型、治理和有状态底座按职责解耦。
- 同一环境只保留一条主平台路线，不长期并行多套主底座。
- `dev`、`staging`、`prod` 必须分离，不能把生产当联调环境。
- 有状态组件必须有持久化、备份和恢复方案。
- 身份、证书和密钥优先复用企业现有体系，不把这类能力误写成新的正式组件。
- 所有会改变运行行为的配置都应走受控发布流程。

## 环境划分

| 环境 | 主要目标 | 数据要求 | 变更要求 |
| --- | --- | --- | --- |
| `dev` | 研发联调、接口打通、功能验证 | 使用脱敏数据、样例数据或受控子集 | 允许较快迭代，但仍需记录关键配置变更 |
| `staging` | 预发布验证、容量基线、回归测试 | 使用接近生产的数据结构和权限模型 | 必须执行评测、压测、灰度演练 |
| `prod` | 真实业务流量承载 | 使用正式数据和正式权限 | 只允许通过标准发布流程变更 |

## 按规模分级的部署建议

### 口径说明

- 以下服务器数量按“单环境”计算，只讨论平台本体，不包含企业既有 `SSO / IAM`、`KMS`、`WAF`、`DNS / LB`、企业数据库托管服务等复用能力。
- 以下硬件值是结合组件官方最低要求、依赖拓扑和可用性留量得出的工程建议，不等于各组件官方最低启动门槛。
- 默认以 `x86_64 Linux` 私有化部署为口径；如果使用云托管数据库、对象存储或 GPU 池，服务器数量可以下降，但部署单元不会消失。
- 以下分级以 `AgentifUI + Dify` 作为默认起步路线展开；若主平台路线改为 `RAGFlow` 或 `Coze Studio`，服务器数量通常不变，但知识链路和运营链路的瓶颈位置会不同。
- 如第 3 层条件引入 `OpenClaw`，其部署位置仍属于同一门户单元，不替代 `APISIX`、主平台路线、`LiteLLM` 或治理链路。

### 1. 1 台：最小验证版

这一档只适合验证“门户 + 主平台路线”是否能跑通，不作为正式生产形态。

<div class="diagram-image">
  <img src="/deployment-scale-1.svg" alt="1 台最小验证版部署架构图" />
</div>

- 目标功能：
  - 默认前台为 `AgentifUI`；如果只验证单一旗舰助手产品体验，也可条件改为 `OpenClaw`
  - `Dify` 应用编排、工作流、基础知识问答
  - 通过外部 `OpenAI 兼容 API` 调用模型，不自托管 `vLLM + Qwen`
- 推荐部署方式：
  - 正式组件默认只落 `AgentifUI + Dify`
  - 如果验证的是成品化超级智能体产品，可用 `OpenClaw + Dify` 代替默认门户前台组合
  - `Dify` 所需 `PostgreSQL / Redis / Weaviate / Nginx / Sandbox` 等依赖以同机容器方式随默认安装栈启动
- 工程建议硬件：
  - `8 vCPU`
  - `16 GiB RAM`
  - `300 GiB NVMe SSD`
- 适用边界：
  - 几十名内部试用用户
  - 只做价值验证，不做严格容量承诺
  - 不建议在这一档叠加 `LiteLLM`、`vLLM`、`Qwen`、`OpenMetadata` 或完整观测栈

说明：`Dify` 官方自托管快速开始给出的最低门槛是 `CPU >= 2 Core`、`RAM >= 4 GiB`，但官方 `Docker Compose` 同时会启动 `5` 个核心服务和 `6` 个依赖组件，因此本方案把单机起步档上调到 `8 vCPU / 16 GiB`，以留出 `AgentifUI` 或 `OpenClaw`、数据卷和回滚空间。

### 2. 2-3 台：小团队试点版

这一档的目标是把应用层、数据层和模型层初步拆开，让平台从“能跑”变成“能试点、能扩展”。

<div class="diagram-image">
  <img src="/deployment-scale-2-3.svg" alt="2-3 台小团队试点版部署架构图" />
</div>

- `2` 台变体：适合仍然使用外部模型 API 的团队
  - 应用节点：`APISIX + AgentifUI / OpenClaw + Dify`
  - 数据节点：`PostgreSQL + Redis + MinIO + Weaviate`
- `3` 台变体：适合开始自托管模型的团队
  - 应用节点：`APISIX + AgentifUI / OpenClaw + Dify + LiteLLM`
  - 数据节点：`PostgreSQL + Redis + MinIO + Weaviate`
  - GPU 节点：`vLLM + Qwen`
- 工程建议硬件：
  - 应用节点：`16 vCPU / 32 GiB / 500 GiB NVMe`
  - 数据节点：`16 vCPU / 64 GiB / 1 TiB NVMe`
  - GPU 节点：`24-32 vCPU / 128 GiB / 1 TiB NVMe / 1 x 48 GiB GPU`
- 适用边界：
  - 小团队正式试点
  - 有真实知识库和权限边界，但仍以单部门为主
  - 可以开始做 `staging` 和灰度验证，但还不是真正高可用

说明：`Weaviate` 官方建议小于 `1M` 对象的项目无需单独做复杂资源规划，但 CPU 和内存仍是核心资源；因此本档默认把 `Weaviate` 与 `PostgreSQL / Redis / MinIO` 放到独立数据节点，而不是继续和应用层混部。

### 3. 5 台：生产基线版

这是当前方案里“最小但认真”的生产基线，重点不是把所有组件堆齐，而是先把核心运行面、状态面和模型面拆开。

<div class="diagram-image">
  <img src="/deployment-scale-5.svg" alt="5 台生产基线版部署架构图" />
</div>

- 推荐组件范围：
  - 入口与应用：`APISIX + AgentifUI / OpenClaw + Dify`
  - 模型链路：`LiteLLM + vLLM + Qwen`
  - 知识链路：`LlamaIndex + Weaviate`
  - 治理与观测：`Casbin + LangFuse + OpenTelemetry + Prometheus + Grafana + Loki`
  - 有状态底座：`PostgreSQL + Redis + MinIO`
- 推荐部署单元：
  - `3` 台 `K3s` 节点：承载 `APISIX`、`AgentifUI / OpenClaw`、`Dify`、`LiteLLM`、`LlamaIndex`、`Casbin`、`LangFuse`、平台观测服务
  - `1` 台数据节点：承载 `PostgreSQL + Redis + MinIO + Weaviate`
  - `1` 台 GPU 节点：承载 `vLLM + Qwen`
- 工程建议硬件：
  - 每台 `K3s` 节点：`8-16 vCPU / 32 GiB / 300-500 GiB SSD`
  - 数据节点：`24 vCPU / 128 GiB / 2 TiB NVMe`
  - GPU 节点：`32 vCPU / 128 GiB / 1-2 TiB NVMe / 1 x 80 GiB GPU` 或 `2 x 48 GiB GPU`
- 适用边界：
  - 部门级推广
  - 需要统一入口、知识库、模型路由、审计和基础观测
  - 可以开始承担正式业务流量，但状态服务仍然是主要容量瓶颈

说明：`K3s` 官方硬件下限只覆盖 `K3s` 自身与打包组件，不包含业务工作负载，因此 5 台档位里的 `K3s` 节点 sizing 明显高于官方最小值；这属于面向平台工作负载的工程推断，而不是对 `K3s` 的官方要求复述。

### 4. 7-8 台：完整功能版

这一档把当前方案的核心功能基本补齐，尤其补齐数据治理层和更完整的观测、检索隔离。

<div class="diagram-image">
  <img src="/deployment-scale-7-8.svg" alt="7-8 台完整功能版部署架构图" />
</div>

- 在 5 台基线版上新增：
  - 数据治理层：`OpenMetadata + SeaTunnel + dbt Core + Apache Tika`
  - 更独立的检索与观测部署单元
  - 需要时引入 `LangGraph` 处理复杂流程、人工介入和长链路恢复
- 推荐部署单元：
  - `3` 台 `K3s` 节点：承载网关、门户、主平台、复杂运行时和控制面服务
  - `1` 台应用扩展节点：承载高流量门户 / 超级智能体前台 / `BFF` / 编排扩展实例
  - `1` 台检索节点：承载 `LlamaIndex + Weaviate`，必要时兼容 `Elasticsearch`
  - `1` 台数据治理节点：承载 `OpenMetadata + SeaTunnel + dbt Core + Apache Tika`
  - `1` 台观测节点：承载 `LangFuse + Prometheus + Grafana + Loki`
  - `1` 台 GPU 节点：承载 `vLLM + Qwen`
- 工程建议硬件：
  - 应用与 `K3s` 节点：`8-16 vCPU / 32 GiB`
  - 检索节点：`24 vCPU / 128 GiB / 2 TiB NVMe`
  - 数据治理节点：`16-24 vCPU / 64-128 GiB / 1 TiB SSD`
  - 观测节点：`16 vCPU / 64 GiB / 2 TiB SSD`
  - GPU 节点：`32 vCPU / 128 GiB / 1-2 x GPU`
- 适用边界：
  - 多部门共用平台
  - 同时承接知识问答、流程类 Agent、数据接入和平台运营
  - 已经需要数据治理链路和正式平台运维分工

说明：`OpenMetadata` 官方生产级最低要求已经包含数据库、搜索实例和 `Airflow` 侧资源，因此它不适合继续和轻量试点环境混部；`SeaTunnel` 官方也明确区分了 `local`、`hybrid` 和 `separated` 三种部署模式，因此这一档可以先以 `hybrid` 形态起步，数据接入规模继续增长后再演进到更独立的集群形态。

### 5. 10-12+ 台：完整高可用版

当平台承接多业务线、多模型池和正式生产流量时，重点不再是“组件有没有”，而是“故障隔离是否充分、状态服务是否可恢复、GPU 是否可切换”。

<div class="diagram-image">
  <img src="/deployment-scale-10-12.svg" alt="10-12 台以上完整高可用版部署架构图" />
</div>

- 推荐能力：
  - 网关、门户、编排、检索、观测、模型分别独立扩缩容
  - 关键无状态服务至少双实例
  - GPU 推理节点至少双节点，避免模型服务成为单点
  - 有状态服务具备备份、恢复和重建预案
  - `dev / staging / prod` 明确分离，并形成标准灰度与回滚流程
- 推荐部署单元：
  - `3` 台 `K3s` 控制 / 通用应用节点
  - `2` 台无状态应用节点
  - `2` 台数据 / 检索节点
  - `2` 台 GPU 节点
  - `1` 台观测节点
  - 按需要再增加 `1-2` 台数据治理或对象存储扩展节点
- 工程建议硬件：
  - 控制 / 通用应用节点：`16 vCPU / 64 GiB / 500 GiB SSD`
  - 数据 / 检索节点：`24-32 vCPU / 128-256 GiB / 2-4 TiB NVMe`
  - GPU 节点：`32-64 vCPU / 128-256 GiB / 1-2 TiB NVMe / 2 x 80 GiB GPU` 或同等级别 GPU
  - 观测节点：`16-24 vCPU / 64-128 GiB / 2-4 TiB SSD`
- 适用边界：
  - 企业级正式生产
  - 多业务线共平台
  - 对故障恢复、容量治理、审计和运维分工有明确要求

说明：如果这一档继续坚持全部状态能力都自建高可用，例如对象存储、缓存和数据库都不复用企业现有托管能力，服务器数量会继续上升，因此 `10-12+` 应理解为“当前方案的高可用起步线”，而不是封顶值。

## 参考拓扑

### 接入层

- 北向入口统一收敛到 `APISIX`
- 门户、管理台、企业 IM 和开放 API 都经过同一入口治理链
- 企业现有 `SSO / IAM` 负责身份源，入口只负责接入和透传

### 应用与编排层

- 主平台路线负责标准场景
- `LangGraph` 负责复杂状态机、人工介入和长链路恢复
- 默认由 `AgentifUI + 门户 / BFF` 负责用户上下文、会话和应用聚合
- 当需要成品化超级智能体产品时，可由 `OpenClaw` 在同一门户单元位置条件承接前台体验

### 知识与数据层

- `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` 处理数据治理
- `LlamaIndex` 负责知识索引编排和检索构建
- `Weaviate` 作为默认向量底座，`Elasticsearch` 作为全文 / 混合检索兼容层

### 模型与治理层

- `LiteLLM` 统一承接上层模型请求
- `vLLM` 负责推理执行
- `Casbin` 负责细粒度授权裁决
- `LangFuse + OpenTelemetry + Prometheus + Grafana + Loki` 负责双层观测

## 按组件划分的部署单元

| 部署单元 | 主要组件 | 说明 |
| --- | --- | --- |
| 入口单元 | `APISIX` | 统一承接北向流量和入口治理 |
| 门户单元 | `AgentifUI` / `OpenClaw` + 门户 / BFF | 默认统一门户以前者为主；需要成品化超级智能体产品时条件引入后者 |
| 主平台单元 | `Dify` / `RAGFlow` / `Coze Studio` | 标准场景只保留一条主平台路线 |
| 复杂运行时单元 | `LangGraph` + `LangChain` | 负责长链路流程、状态机和复杂工具编排 |
| 数据治理单元 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` | 负责采集、清洗、元数据和资产发布 |
| 知识检索单元 | `LlamaIndex` + `Weaviate` | 负责索引编排、召回、重排和引用 |
| 模型服务单元 | `LiteLLM` + `vLLM` + `Qwen` | 负责模型路由和推理执行 |
| 治理观测单元 | `Casbin`、`LangFuse`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki`、`k6` | 负责授权、观测、评测和发布验证 |
| 基础设施单元 | `K3s`、`PostgreSQL`、`Redis`、`MinIO` | 负责运行底座和持久化能力 |

## 有状态组件与持久化

| 组件 | 保存内容 | 部署要求 |
| --- | --- | --- |
| `PostgreSQL` | 平台配置、业务状态、审计元数据 | 必须有持久卷、备份和恢复演练 |
| `Redis` | 会话缓存、任务状态、短期上下文 | 需要明确持久化策略和失效策略 |
| `MinIO` | 原始文档、附件、知识文件、模型产物 | 需要生命周期、分层存储和备份策略 |
| `Weaviate` / `Milvus` | 向量索引与检索状态 | 需要与知识发布节奏联动，避免无序重建 |
| `Elasticsearch` | 全文 / 混合检索索引 | 需要保留索引治理和容量水位 |
| 观测存储 | 指标、日志、追踪、评测数据 | 需要留存周期、冷热分层和清理机制 |

## 发布与回滚

### 发布对象

下列内容都应视为发布项，而不只是“配置改一下”：

- Prompt 模板
- 工具定义与权限策略
- 知识源和索引配置
- 模型路由与配额策略
- 安全规则与阈值
- 入口网关路由与灰度配置

### 标准发布流程

1. 变更进入版本管理。
2. 在 `dev` 完成联调与回归。
3. 在 `staging` 完成评测、权限验证和 `k6` 基线测试。
4. 以小流量灰度方式进入生产。
5. 观察关键指标与审计记录。
6. 指标异常时按预案回滚到上一稳定版本。

## 容量验证

建议把 `k6` 作为统一压测工具，至少覆盖以下链路：

- `APISIX` 入口网关
- 门户 `BFF / API`
- 知识检索与重排服务
- Agent 编排与工具调用入口
- `LiteLLM` 模型网关接口

压测结果要关注：

- 吞吐量、错误率、P95 / P99 时延
- 上游依赖超时与重试放大效应
- 模型 Token 成本和单位请求成本
- 检索耗时、工具耗时和人工接管比率

## 备份、恢复与灾备

### 最低要求

- 核心数据库定期备份并验证恢复流程。
- 知识文件和对象存储具备跨节点或跨存储策略的冗余。
- 索引类服务有重建预案，知道重建时长和业务影响。
- 观测与审计数据至少保留到满足复盘要求的周期。

### 关键恢复指标

- `RPO`：最多允许丢失多少数据
- `RTO`：故障后多长时间恢复
- 知识索引重建窗口
- 模型服务切换时间

## 运维基线

### 最少要监控的指标

- 请求量、成功率、P95 时延
- 网关上游错误率和限流命中率
- 模型 Token 消耗和单位成本
- 检索命中率与引用命中率
- 工具调用成功率与平均耗时
- 安全策略触发次数和人工接管比率

### 不应做的事

- 直接在生产环境手工修改 Prompt、工具或索引配置
- 把试点时期的单机部署直接沿用到生产
- 让模型层、知识层和业务层共享同一组不可观测的隐式状态

## 相关文档

- [总体架构](/architecture)
- [技术选型](/stack)
- [安全与治理](/governance)
- [实施路线图](/roadmap)

## 参考资料

- [Dify Self Host with Docker Compose](https://docs.dify.ai/en/getting-started/install-self-hosted/docker-compose)
- [K3s Requirements](https://docs.k3s.io/installation/requirements)
- [Apache APISIX Architecture](https://apisix.apache.org/docs/apisix/3.14/architecture-design/apisix/)
- [Weaviate Resource Planning](https://docs.weaviate.io/weaviate/concepts/resources)
- [vLLM GPU Installation and Requirements](https://docs.vllm.ai/en/stable/getting_started/installation/gpu.html)
- [Qwen Speed Benchmark](https://qwen.readthedocs.io/en/v2.0/benchmark/speed_benchmark.html)
- [OpenMetadata Minimum Requirements](https://docs.open-metadata.org/v1.11.x/deployment/minimum-requirements)
- [Apache SeaTunnel Engine Deployment](https://seatunnel.apache.org/docs/2.3.10/seatunnel-engine/deployment/)
- [Langfuse Self Hosting with Kubernetes Helm](https://langfuse.com/self-hosting/deployment/kubernetes-helm)
- [Kubernetes Production Environment](https://kubernetes.io/docs/setup/production-environment/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Grafana k6 Overview](https://grafana.com/oss/k6/)
- [OpenClaw 官网](https://openclaw.ai/)
- [OpenClaw Architecture](https://docs.openclaw.ai/concepts/architecture)
