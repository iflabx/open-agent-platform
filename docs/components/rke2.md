# Kubernetes / RKE2

> 类型：企业级大规模容器运行与编排底座
>
> 采用定位：大规模生产演进（10–12+ 台及以上正式高可用生产；优先复用企业既有标准 `Kubernetes`，从零自建私有化大集群推荐 `RKE2`）
>
> 所属层：基础设施层
>
> 官方网站：https://docs.rke2.io/
>
> 开源仓库地址：https://github.com/rancher/rke2

## 当前定位

标准 `Kubernetes` / `RKE2` 是本方案面向 10–12+ 台及以上企业级高可用正式生产阶段的容器运行与编排底座。

在企业落地中遵循“**既有优先复用、自建推荐 `RKE2`**”原则：若企业已建成并稳定运维标准 `Kubernetes` 集群，优先直接复用既有平台与运维体系，避免重复建设；若需在全私有化或内网离线环境下从零自建大规模高可用集群，推荐采用 CNCF 认证、采用 `Apache-2.0` 许可证的 `RKE2`（与试点阶段的 [K3s](/components/k3s) 同源演进）。两者共享 100% 相同的标准 Kubernetes API、Helm Chart、CRD 与 GPU Operator，支持从 `K3s` 试点集群向大规模正式生产集群零重写平滑演进。

## 主要职责

- **大规模高可用服务编排**：采用标准静态 Pod 控制面与高可用 `etcd` 集群，承接门户层、编排层、数据治理层、知识层、模型层与观测层的多节点规模化调度与自愈。
- **内网安全加固与合规基线**：通过 `RKE2` 内置的 `profile: cis` 安全基线能力，满足高合规内网环境的安全加固与审计要求。
- **离线私有化交付**：依托原生 Air-Gapped 离线安装包与镜像包体系，支持无公网环境下的标准化部署、升级与集群扩容。
- **网络策略与沙箱隔离支撑**：内置 `Canal` / `Calico` / `Cilium` 等 CNI 插件并完整支持 `NetworkPolicy`，为 [Agent 执行沙箱](/components/agent-sandbox) 的独立沙箱节点池、默认拒绝出网白名单与东西向隔离提供底层网络能力。
- **异构算力与多环境调度**：统一承载 NVIDIA GPU Operator、推理节点池、状态型服务节点池与多环境（`dev` / `staging` / `prod`）资源隔离。

## 与其他组件关系

- **与 `K3s` 形成分阶段演进关系**：1–8 台（典型 2–8 台）小规模试点与部门级验证阶段默认使用 [K3s](/components/k3s) 快速启动；10–12+ 台及以上正式高可用生产阶段平滑演进至标准 `Kubernetes` / `RKE2`，上层清单、Helm Chart 与 CRD 零重写。
- **与 `Agent 执行沙箱` 深度协同**：通过 `RuntimeClass`、`NetworkPolicy`（基于 `Canal` / `Calico` / `Cilium`）与节点污点/容忍度机制，支撑 [Kubernetes agent-sandbox + gVisor / Kata Containers](/components/agent-sandbox) 的强隔离调度与网络封控。
- **与状态型基础设施配套**：与 [PostgreSQL](/components/postgresql)、[Valkey](/components/valkey) / [Redis](/components/redis)、[SeaweedFS](/components/seaweedfs) / [RustFS](/components/rustfs) 以及企业既有 `KMS / 证书体系`、网络和存储体系共同构成生产级基础设施底座。
- **支撑上层全栈服务**：为 [APISIX](/components/apisix)、[agentgateway](/components/agentgateway)、[AgentifUI](/components/agentifui)、主平台路线与推理服务（[vLLM](/components/vllm) / [SGLang](/components/sglang)）提供高可用运行环境。

## 适合场景

- 10–12+ 台及以上企业级正式高可用生产部署与多团队共享集群运行
- 企业已有成熟标准 `Kubernetes` 平台，需直接纳入既有云原生运维、监控与安全体系的场景
- 金融、政企及强合规内网等需要 `CIS` 安全基线、高可用 `etcd` 与离线 Air-Gapped 交付的私有化自建大集群场景
- 需完整启用 `NetworkPolicy` 以强化 Agent 执行沙箱与多租户东西向网络隔离的生产环境

## 边界

- 不承载业务流程、权限策略裁决与上层应用逻辑
- 不替代数据库、缓存、对象存储与向量检索底座
- 不替代上层发布治理、模型路由与 LLM 可观测性策略
- 企业已具备成熟标准 `Kubernetes` 集群时，不应绕开既有体系重复自建 `RKE2`

## 采用规则

- **优先复用企业既有标准 `Kubernetes`**：若企业已具备标准 `Kubernetes` 集群与运维团队，正式生产阶段直接复用，不额外引入第二套容器平台。
- **从零自建私有化大集群推荐 `RKE2`**：10–12+ 台及以上从零自建私有化生产环境优先选用 `RKE2`（`Apache-2.0`，CNCF 认证 Kubernetes 发行版），兼顾与 `K3s` 的同源体验、标准静态 Pod 控制面、高可用 `etcd`、`profile: cis` 安全基线与离线交付能力。
- **零重写平滑演进**：从 2–8 台 `K3s` 试点验证演进至 10–12+ 台标准 `Kubernetes` / `RKE2` 时，保持统一 Kubernetes API、Helm Chart、CRD 与 GPU Operator 规范，避免业务侧重做编排与发布脚本。
- **基础设施层保持收敛**：同一生产环境只维护一套正式容器编排底座，不长期并行多套同类集群形态。

## 治理注意点

- **控制面与 `etcd` 高可用**：生产集群应按奇数节点（至少 3 个控制面节点）部署高可用 `etcd`，并建立定期快照备份与恢复演练机制。
- **安全基线与网络隔离**：自建 `RKE2` 建议按内网合规等级启用 `profile: cis`；无论复用企业 `Kubernetes` 还是自建 `RKE2`，均需确保 CNI（`Canal` / `Calico` / `Cilium`）启用 `NetworkPolicy`，落实沙箱节点池出网白名单控制。
- **节点池与资源隔离**：控制面、无状态应用、数据与检索节点、GPU 推理节点以及 Agent 执行沙箱节点池应通过标签与污点严格隔离。
- **密钥与离线供应链治理**：密钥与证书统一对接企业 `KMS / 证书体系`，禁止明文写入镜像或代码仓库；离线环境需建立镜像仓库同步与漏洞扫描基线。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [K3s](/components/k3s)
- [Agent 执行沙箱（Kubernetes agent-sandbox + gVisor / Kata Containers）](/components/agent-sandbox)
- [部署与发布](/deployment)
- [PostgreSQL](/components/postgresql)
- [SeaweedFS](/components/seaweedfs)

## 参考资料

- [RKE2 Documentation](https://docs.rke2.io/)
- [RKE2 GitHub Repository](https://github.com/rancher/rke2)
- [RKE2 Security & CIS Hardening Guide](https://docs.rke2.io/security/hardening_guide)
- [RKE2 Air-Gapped Install](https://docs.rke2.io/install/airgap)
