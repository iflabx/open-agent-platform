# K3s

> 类型：轻量级容器运行与服务编排平台
>
> 采用定位：默认采用（2–8 台小规模试点与部门级验证容器底座）
>
> 所属层：基础设施层
>
> 官方网站：https://docs.k3s.io/
>
> 开源仓库地址：https://github.com/k3s-io/k3s

## 当前定位

`K3s` 是本方案面向小规模试点与部门级验证阶段（1–8 台，典型 2–8 台服务器）的默认容器运行与编排底座。

在项目启动初期，`K3s` 能够在无需等待集团级 `Kubernetes` 集群配额审批的前提下，以极低运维开销快速拉起全套智能体平台。当业务进入 10–12+ 台及以上企业级高可用正式生产阶段时，可依托 100% 相同的标准 Kubernetes API、Helm Chart、CRD 与 GPU Operator，零重写平滑演进至标准 `Kubernetes` 或同源的 [RKE2](/components/rke2)。

## 主要职责

- 平台服务部署
- 服务编排与扩容
- 多环境管理
- 配置与密钥挂载

## 与其他组件关系

- 为门户层、编排层、数据治理层、知识层、模型层和观测层提供统一运行底座。
- 与 [PostgreSQL](/components/postgresql)、[Valkey](/components/valkey) / [Redis](/components/redis)、[SeaweedFS](/components/seaweedfs) 等状态型服务共同构成平台基础设施。
- 与企业现有 KMS / 证书体系、网络和存储体系配套使用。
- 为发布、扩容、回滚和环境隔离提供基础能力。

## 适合场景

- 2–8 台服务器规模的私有化试点部署与部门级验证
- 需要快速拉起完整智能体平台、不等待集团级 `Kubernetes` 集群配额审批的早期阶段
- 运维人力有限、希望显著收敛 `Kubernetes` 集群搭建与维护复杂度的场景

## 边界

- 不承载业务流程、权限策略和应用逻辑
- 不替代数据库、缓存和对象存储
- 不替代上层发布治理与观测策略
- 不作为 10–12+ 台及以上大规模高可用正式生产集群的最终形态（该阶段应演进至标准 `Kubernetes` / [RKE2](/components/rke2)）

## 采用规则

- 本方案在 1–8 台（典型 2–8 台）小规模试点与部门级验证阶段默认采用 `K3s` 作为容器运行与服务编排底座。
- 进入 10–12+ 台及以上企业级高可用正式生产阶段时，平滑演进至标准 `Kubernetes` / [RKE2](/components/rke2)（优先复用企业既有标准 `Kubernetes`，从零自建私有化大集群推荐 `RKE2`）。
- `K3s` 与标准 `Kubernetes` / `RKE2` 共享 100% 相同的 Kubernetes API、Helm Chart、CRD 与 GPU Operator，演进过程上层业务配置与部署清单零重写。
- 基础设施层应保持阶段收敛，同一环境不同时维护多套正式容器底座。

## 治理注意点

- 开发、测试、生产环境需要明确隔离。
- 集群升级、备份、恢复和扩容要形成标准化操作流程。
- 密钥、证书和配置分发不能散落在业务镜像或应用代码中。
- 状态型服务和无状态服务的资源规划应区别设计。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [Kubernetes / RKE2](/components/rke2)
- [Agent 执行沙箱（Kubernetes agent-sandbox + gVisor / Kata Containers）](/components/agent-sandbox)
- [部署与发布](/deployment)
- [PostgreSQL](/components/postgresql)
- [SeaweedFS](/components/seaweedfs)

## 参考资料

- [K3s Documentation](https://docs.k3s.io/)
- [K3s GitHub Repository](https://github.com/k3s-io/k3s)
