# 部署与发布

::: info 核心摘要
本页提供企业级智能体平台本体的分级部署规模建议、参考拓扑、持久化要求、标准发布流程及容灾运维基线。服务器规模均按单环境估算，不包含企业既有 `SSO / IAM`、`KMS / 证书体系`、`WAF`、`DNS / LB` 与托管数据库等复用能力。
:::

## 部署规模对照总表

| 档位 | 核心目标 | 最小组件组合（默认基线） | 模型策略 | 推荐服务器数 | 适合阶段 |
| --- | --- | --- | --- | --- | --- |
| 1 台最小验证版 | 验证门户与主平台路线可用性 | `AgentifUI` + `Dify` | 调用外部 `OpenAI 兼容 API` | 1 | 首轮 PoC、内测 |
| 2–3 台小团队试点版 | 将应用层、数据层与模型层初步解耦 | `APISIX` + `AgentifUI` + `Dify` + `PostgreSQL` + `Redis` + `MinIO` + `Weaviate` | 2 台时使用外部模型；3 台时可增加 `LiteLLM` + `vLLM` + `Qwen` | 2–3 | 小团队试点 |
| 5 台生产基线版 | 满足部门级生产治理要求的最小组合 | `APISIX` + `AgentifUI` + `Dify` + `LiteLLM` + `vLLM` + `Qwen` + `LlamaIndex` + `Casbin` + `LangFuse` + 平台观测栈 | 默认自托管模型 | 5 | 部门级推广 |
| 7–8 台完整功能版 | 补齐数据治理和完整平台能力 | 在 5 台版基础上增加 `OpenMetadata` + `SeaTunnel` + `dbt Core` + `Apache Tika` | 自托管模型，拆出检索、数据治理、观测单元 | 7–8 | 多部门共用平台 |
| 10–12+ 台完整高可用版 | 进入企业级正式生产与故障隔离 | 在 7–8 台版基础上对无状态、数据、GPU 单元分别实施双活或高可用 | 自托管模型，多 GPU 节点 | 10–12+ | 企业级正式生产 |

::: tip 估算口径说明
- 上表用于决策与预算对齐，各档位具体落位方式见下文分级说明。
- 服务器数按“单环境”计算，不包含企业既有 `SSO / IAM`、`KMS / 证书体系`、`WAF`、`DNS / LB`、托管数据库等复用能力。
- 若数据库、对象存储或 GPU 复用企业现有托管能力，服务器数量可相应减少，但部署单元与治理边界保持不变。
- 上表与下文所有部署图均以 `AgentifUI` + 门户 / BFF 共享多用户门户基线绘制；个人自治型超级智能体扩展能力（如 [OpenClaw](/components/openclaw)）不归属共享门户单元，须在共享门户档位估算之外单独规划 Multi-Instance 独立沙箱节点池与专属资源配额，详见 [扩展升级](/extension-capabilities)。
:::

## 部署原则

部署设计遵循以下六项原则：

- **按职责解耦**：入口、编排、检索、模型、治理和有状态底座按职责独立部署与演进。
- **单轨主平台**：同一环境仅保留一条主平台路线，不长期并行多套主底座。
- **环境严格隔离**：`dev`、`staging`、`prod` 必须分离，严禁将生产环境作为联调环境。
- **有状态可恢复**：所有有状态组件必须具备持久化存储、定期备份与恢复演练方案。
- **复用企业安全底座**：身份认证、证书与密钥体系优先复用企业现有能力，不将其误列为新增组件。
- **配置受控发布**：所有会影响运行时行为的配置变更均须纳入版本管理与受控发布流程。

## 环境划分

| 环境 | 主要目标 | 数据要求 | 变更要求 |
| --- | --- | --- | --- |
| `dev` | 研发联调、接口打通、功能验证 | 使用脱敏数据、样例数据或受控子集 | 允许较快迭代，但仍需记录关键配置变更 |
| `staging` | 预发布验证、容量基线、回归测试 | 使用接近生产的数据结构和权限模型 | 必须执行评测、压测、灰度演练 |
| `prod` | 真实业务流量承载 | 使用正式数据和正式权限 | 仅允许通过标准发布流程变更 |

## 按规模分级的部署建议

### 口径说明

- 以下服务器数量按“单环境”计算，仅覆盖平台本体，不包含企业既有 `SSO / IAM`、`KMS / 证书体系`、`WAF`、`DNS / LB`、企业数据库托管服务等复用能力。
- 以下硬件配置结合组件官方最低要求、依赖拓扑与可用性冗余综合得出，属于工程建议值，不等同于各组件官方最低启动门槛。
- 默认以 `x86_64 Linux` 私有化部署为口径；若使用云托管数据库、对象存储或 GPU 池，服务器数量可相应下降，但部署单元不会消失。
- 以下分级以 `AgentifUI` + `Dify` 作为默认起步路线展开；若主平台路线调整为 `RAGFlow` 或 `Coze Studio`，服务器数量通常不变，但知识链路和运营链路的瓶颈位置会有所差异。
- 个人自治型超级智能体扩展能力（如 `OpenClaw`）不纳入下述共享门户单元估算，须按单用户或高信任小组单独规划 Multi-Instance 独立沙箱节点池、容器 / MicroVM 级隔离边界与专属资源配额，并将模型调用与审计统一收敛至 `LiteLLM` 与平台审计链路。

### 1. 1 台：最小验证版

该档位仅用于验证“门户 + 主平台路线”能否打通，不作为正式生产形态。

<div class="diagram-image">
  <img src="/deployment-scale-1.svg" alt="1 台最小验证版部署架构图" />
</div>

- **目标功能**：
  - `AgentifUI` 统一门户与基础会话入口
  - `Dify` 应用编排、工作流、基础知识问答
  - 通过外部 `OpenAI 兼容 API` 调用模型，不自托管 `vLLM` + `Qwen`
- **推荐部署方式**：
  - 正式组件默认仅部署 `AgentifUI` + `Dify`
  - `Dify` 所需的 `PostgreSQL` / `Redis` / `Weaviate` / `Nginx` / `Sandbox` 等依赖以同机容器方式随默认安装栈启动
- **工程建议硬件**：
  - `8 vCPU`
  - `16 GiB RAM`
  - `300 GiB NVMe SSD`
- **适用边界**：
  - 几十名内部试用用户
  - 仅用于价值验证，不做严格容量承诺
  - 不建议在此档位叠加 `LiteLLM`、`vLLM`、`Qwen`、`OpenMetadata` 或完整观测栈

说明：`Dify` 官方自托管快速开始给出的最低门槛为 `CPU >= 2 Core`、`RAM >= 4 GiB`，但官方 `Docker Compose` 同时会启动 5 个核心服务和 6 个依赖组件，因此本方案将单机起步规格上调至 `8 vCPU / 16 GiB`，以预留 `AgentifUI`、数据卷与回滚空间。

### 2. 2–3 台：小团队试点版

该档位将应用层、数据层与模型层初步拆分，使平台具备正式试点与横向扩展的基础。

<div class="diagram-image">
  <img src="/deployment-scale-2-3.svg" alt="2-3 台小团队试点版部署架构图" />
</div>

- **2 台变体**（继续使用外部模型 API 的团队）：
  - 应用节点：`APISIX` + `AgentifUI` + `Dify`
  - 数据节点：`PostgreSQL` + `Redis` + `MinIO` + `Weaviate`
- **3 台变体**（开始自托管模型的团队）：
  - 应用节点：`APISIX` + `AgentifUI` + `Dify` + `LiteLLM`
  - 数据节点：`PostgreSQL` + `Redis` + `MinIO` + `Weaviate`
  - GPU 节点：`vLLM` + `Qwen`
- **工程建议硬件**：
  - 应用节点：`16 vCPU / 32 GiB / 500 GiB NVMe`
  - 数据节点：`16 vCPU / 64 GiB / 1 TiB NVMe`
  - GPU 节点：`24-32 vCPU / 128 GiB / 1 TiB NVMe / 1 x 48 GiB GPU`
- **适用边界**：
  - 小团队正式试点
  - 具备真实知识库和权限边界，仍以单部门为主
  - 可开始推进 `staging` 环境和灰度验证，但尚未达到高可用要求

说明：`Weaviate` 官方建议小于 1M 对象的项目无需单独做复杂资源规划，但 CPU 和内存仍是核心资源；因此本档位默认将 `Weaviate` 与 `PostgreSQL` / `Redis` / `MinIO` 独立部署至数据节点，不再与应用层混部。

### 3. 5 台：生产基线版

该档位是满足部门级生产治理要求的最小生产基线，核心目标是将运行面、状态面与模型面清晰拆分，而非一次性堆齐所有扩展组件。

<div class="diagram-image">
  <img src="/deployment-scale-5.svg" alt="5 台生产基线版部署架构图" />
</div>

- **推荐组件范围**：
  - 入口与应用：`APISIX` + `AgentifUI` + `Dify`
  - 模型链路：`LiteLLM` + `vLLM` + `Qwen`
  - 知识链路：`LlamaIndex` + `Weaviate`
  - 治理与观测：`Casbin` + `LangFuse` + `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki`
  - 有状态底座：`PostgreSQL` + `Redis` + `MinIO`
- **推荐部署单元**：
  - 3 台 `K3s` 节点：承载 `APISIX`、`AgentifUI`、`Dify`、`LiteLLM`、`LlamaIndex`、`Casbin`、`LangFuse`、平台观测服务
  - 1 台数据节点：承载 `PostgreSQL` + `Redis` + `MinIO` + `Weaviate`
  - 1 台 GPU 节点：承载 `vLLM` + `Qwen`
- **工程建议硬件**：
  - 每台 `K3s` 节点：`8-16 vCPU / 32 GiB / 300-500 GiB SSD`
  - 数据节点：`24 vCPU / 128 GiB / 2 TiB NVMe`
  - GPU 节点：`32 vCPU / 128 GiB / 1-2 TiB NVMe / 1 x 80 GiB GPU` 或 `2 x 48 GiB GPU`
- **适用边界**：
  - 部门级推广
  - 需要统一入口、知识库、模型路由、审计和基础观测
  - 可承接正式业务流量，但有状态服务仍为主要容量瓶颈

说明：`K3s` 官方硬件下限仅覆盖 `K3s` 自身与打包组件，不包含业务工作负载，因此 5 台档位中 `K3s` 节点的规格建议明显高于官方最小值；这属于面向平台工作负载的工程评估，而非对 `K3s` 官方最低要求的复述。

### 4. 7–8 台：完整功能版

该档位补齐方案核心功能，重点完善数据治理层以及检索、观测的独立隔离。

<div class="diagram-image">
  <img src="/deployment-scale-7-8.svg" alt="7-8 台完整功能版部署架构图" />
</div>

- **在 5 台基线版上新增**：
  - 数据治理层：`OpenMetadata` + `SeaTunnel` + `dbt Core` + `Apache Tika`
  - 更独立的检索与观测部署单元
  - 按需引入 `LangGraph` 处理复杂流程、人工介入和长链路恢复
- **推荐部署单元**：
  - 3 台 `K3s` 节点：承载网关、门户、主平台、复杂运行时和控制面服务
  - 1 台应用扩展节点：承载高流量门户 / BFF / 编排扩展实例
  - 1 台检索节点：承载 `LlamaIndex` + `Weaviate`，必要时兼容 `Elasticsearch`
  - 1 台数据治理节点：承载 `OpenMetadata` + `SeaTunnel` + `dbt Core` + `Apache Tika`
  - 1 台观测节点：承载 `LangFuse` + `Prometheus` + `Grafana` + `Loki`
  - 1 台 GPU 节点：承载 `vLLM` + `Qwen`
- **工程建议硬件**：
  - 应用与 `K3s` 节点：`8-16 vCPU / 32 GiB`
  - 检索节点：`24 vCPU / 128 GiB / 2 TiB NVMe`
  - 数据治理节点：`16-24 vCPU / 64-128 GiB / 1 TiB SSD`
  - 观测节点：`16 vCPU / 64 GiB / 2 TiB SSD`
  - GPU 节点：`32 vCPU / 128 GiB / 1-2 x GPU`
- **适用边界**：
  - 多部门共用平台
  - 同时承接知识问答、流程类 Agent、数据接入和平台运营
  - 需要完整数据治理链路与正式平台运维分工

说明：`OpenMetadata` 官方生产级最低要求已包含数据库、搜索实例和 `Airflow` 侧资源，因此不适合继续与轻量试点环境混部；`SeaTunnel` 官方明确区分 `local`、`hybrid` 和 `separated` 三种部署模式，本档位可先以 `hybrid` 形态起步，待数据接入规模增长后再演进为更独立的集群形态。

### 5. 10–12+ 台：完整高可用版

当平台承接多业务线、多模型池和正式生产流量时，建设重点转向故障隔离充分性、有状态服务可恢复性与 GPU 节点可切换性。

<div class="diagram-image">
  <img src="/deployment-scale-10-12.svg" alt="10-12 台以上完整高可用版部署架构图" />
</div>

- **推荐能力**：
  - 网关、门户、编排、检索、观测、模型分别独立扩缩容
  - 关键无状态服务至少双实例部署
  - GPU 推理节点至少双节点部署，消除模型服务单点风险
  - 有状态服务具备备份、恢复与重建预案
  - `dev` / `staging` / `prod` 严格分离，并建立标准灰度与回滚流程
- **推荐部署单元**：
  - 3 台 `K3s` 控制 / 通用应用节点
  - 2 台无状态应用节点
  - 2 台数据 / 检索节点
  - 2 台 GPU 节点
  - 1 台观测节点
  - 按需增加 1–2 台数据治理或对象存储扩展节点
- **工程建议硬件**：
  - 控制 / 通用应用节点：`16 vCPU / 64 GiB / 500 GiB SSD`
  - 数据 / 检索节点：`24-32 vCPU / 128-256 GiB / 2-4 TiB NVMe`
  - GPU 节点：`32-64 vCPU / 128-256 GiB / 1-2 TiB NVMe / 2 x 80 GiB GPU` 或同等级别 GPU
  - 观测节点：`16-24 vCPU / 64-128 GiB / 2-4 TiB SSD`
- **适用边界**：
  - 企业级正式生产
  - 多业务线共用平台
  - 对故障恢复、容量治理、审计和运维分工有明确要求

说明：若该档位所有有状态能力均自建高可用（对象存储、缓存与数据库均不复用企业现有托管能力），服务器数量会进一步增加，因此 10–12+ 台应理解为高可用起步线，而非规模上限。

## 参考拓扑

### 接入层

- 北向入口统一收敛至 `APISIX`。
- 门户、管理台、企业 IM 和开放 API 均经过同一入口治理链。
- 企业现有 `SSO / IAM` 负责身份源，入口层仅负责认证接入与上下文透传。

### 应用与编排层

- 主平台路线负责标准场景。
- `LangGraph` 负责复杂状态机、人工介入和长链路恢复。
- 由 `AgentifUI` + 门户 / BFF 负责用户上下文、会话和应用聚合。

### 知识与数据层

- `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` 承担数据治理。
- `LlamaIndex` 负责知识索引编排与检索构建。
- `Weaviate` 作为默认向量底座，`Elasticsearch` 作为全文 / 混合检索兼容层。

### 模型与治理层

- `LiteLLM` 统一承接上层模型请求。
- `vLLM` 负责推理执行。
- `Casbin` 负责细粒度授权裁决。
- `LangFuse` + `OpenTelemetry` + `Prometheus` + `Grafana` + `Loki` 负责双层观测。

## 按组件划分的部署单元

| 部署单元 | 主要组件 | 说明 |
| --- | --- | --- |
| 入口单元 | `APISIX` | 统一承接北向流量和入口治理 |
| 门户单元 | `AgentifUI` + 门户 / BFF | 统一承接企业共享门户、应用目录、会话上下文与 BFF 聚合 |
| 主平台单元 | `Dify` / `RAGFlow` / `Coze Studio` | 标准场景仅保留一条主平台路线 |
| 复杂运行时单元 | `LangGraph` + `LangChain` | 负责长链路流程、状态机和复杂工具编排 |
| 数据治理单元 | `OpenMetadata`、`SeaTunnel`、`dbt Core`、`Apache Tika` | 负责采集、清洗、元数据和资产发布 |
| 知识检索单元 | `LlamaIndex` + `Weaviate` | 负责索引编排、召回、重排和引用 |
| 模型服务单元 | `LiteLLM` + `vLLM` + `Qwen` | 负责模型路由和推理执行 |
| 治理观测单元 | `Casbin`、`LangFuse`、`OpenTelemetry`、`Prometheus`、`Grafana`、`Loki`、`k6` | 负责授权、观测、评测和发布验证 |
| 基础设施单元 | `K3s`、`PostgreSQL`、`Redis`、`MinIO` | 负责运行底座和持久化能力 |

## 有状态组件与持久化

| 组件 | 保存内容 | 部署要求 |
| --- | --- | --- |
| `PostgreSQL` | 平台配置、业务状态、审计元数据 | 必须配备持久卷、定期备份与恢复演练 |
| `Redis` | 会话缓存、任务状态、短期上下文 | 明确持久化策略与失效策略 |
| `MinIO` | 原始文档、附件、知识文件、模型产物 | 配备生命周期管理、分层存储与备份策略 |
| `Weaviate` / `Milvus` | 向量索引与检索状态 | 与知识发布节奏联动，避免无序重建 |
| `Elasticsearch` | 全文 / 混合检索索引 | 保留索引治理与容量水位监控 |
| 观测存储 | 指标、日志、追踪、评测数据 | 明确留存周期、冷热分层与清理机制 |

## 发布与回滚

### 发布对象

下列配置与资产均须纳入受控发布项，而非常规临时配置修改：

- Prompt 模板
- 工具定义与权限策略
- 知识源与索引配置
- 模型路由与配额策略
- 安全规则与阈值
- 入口网关路由与灰度配置

### 标准发布流程

1. 变更纳入版本管理。
2. 在 `dev` 环境完成联调与回归测试。
3. 在 `staging` 环境完成评测、权限验证与 `k6` 容量基线测试。
4. 以小流量灰度方式发布至 `prod` 环境。
5. 持续观察关键业务指标、性能指标与审计记录。
6. 若出现指标异常，按回滚预案快速回退至上一稳定版本。

## 容量验证

建议以 `k6` 作为统一压测工具，至少覆盖以下核心链路：

- `APISIX` 入口网关
- 门户 `BFF` / API
- 知识检索与重排服务
- Agent 编排与工具调用入口
- `LiteLLM` 模型网关接口

压测结果重点关注：

- 吞吐量、错误率、P95 / P99 时延
- 上游依赖超时与重试放大效应
- 模型 Token 成本与单位请求成本
- 检索耗时、工具耗时与人工接管比率

## 备份、恢复与灾备

### 最低要求

- 核心数据库定期备份并周期性演练恢复流程。
- 知识文件与对象存储具备跨节点或跨存储策略冗余。
- 索引类服务制定重建预案，明确重建耗时与业务影响范围。
- 观测与审计数据留存周期须满足复盘与合规要求。

### 关键恢复指标

- **`RPO`**：允许的最大数据丢失量
- **`RTO`**：故障后的目标恢复时长
- **知识索引重建窗口**：全量或增量重建所需时间窗口
- **模型服务切换时间**：主备模型或节点故障切换耗时

## 运维基线

### 必选监控指标

- 请求量、成功率、P95 时延
- 网关上游错误率与限流命中率
- 模型 Token 消耗与单位成本
- 检索命中率与引用命中率
- 工具调用成功率与平均耗时
- 安全策略触发次数与人工接管比率

::: warning 部署与运维禁区
- 严禁直接在生产环境手工修改 Prompt、工具定义或索引配置。
- 严禁将试点阶段的单机部署形态直接沿用至正式生产环境。
- 严禁让模型层、知识层与业务层共享不可观测的隐式状态。
:::

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
