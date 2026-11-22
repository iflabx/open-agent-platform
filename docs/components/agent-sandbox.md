# Agent Sandbox（agent-sandbox + gVisor / Kata）

> 类型：Agent 隔离执行沙箱体系
>
> 采用定位：默认采用（高风险代码、脚本与工具隔离执行底座）
>
> 所属层：基础设施层
>
> 官方网站：https://gvisor.dev/ · https://katacontainers.io/
>
> 开源仓库地址：https://github.com/kubernetes-sigs/agent-sandbox · https://github.com/google/gvisor · https://github.com/kata-containers/kata-containers

## 当前定位

`Agent Sandbox` 是本方案基础设施层面向 Agent 代码执行、动态脚本运行、终端命令与不可信工具调用的标准化隔离执行底座。方案采用 **`Kubernetes agent-sandbox`（编排与生命周期管理） + `gVisor`（默认用户态内核运行时） / `Kata Containers`（条件引入硬件虚拟化强隔离运行时）** 的分层组合，确保 Agent 动态生成与执行的不可信负载与核心业务集群、宿主机内核及敏感凭据彻底隔离。

## 主要职责

- **沙箱生命周期编排（`Kubernetes agent-sandbox`）**：基于 Kubernetes 原生声明式机制管理隔离沙箱的快速创建、预热池化、超时回收与资源配额收敛。
- **默认用户态内核隔离（`gVisor`）**：通过拦截并处理容器系统调用缩小宿主机内核攻击面，**无需嵌套虚拟化支持**，可直接部署在普通虚拟机或云主机节点上，作为方案默认沙箱运行时。
- **硬件级 MicroVM 强隔离（`Kata Containers`）**：面向高敏感或强合规场景，在具备裸金属 KVM 能力的节点上提供独立轻量级虚拟机与独立内核隔离边界。
- **不可信负载受控执行**：为代码解释器（Code Interpreter）、数据分析脚本、浏览器自动化与临时工具执行提供短暂、无状态或受控持久化的隔离执行环境。

## 与其他组件关系

- **运行在 [K3s](/components/k3s) / Kubernetes 底座之上**：通过独立 `RuntimeClass`（如 `gvisor`、`kata`）接入集群容器运行时，不改变核心业务工作负载的默认调度路径。
- **服务于 [4. Agent 编排层](/layers/agent-orchestration) 与受控工具链路**：由 [Dify](/components/dify)、[LangGraph](/components/langgraph) 或经由 [agentgateway](/components/agentgateway) 授权的 MCP 工具服务按需拉起沙箱实例，禁止在编排引擎主进程或共享业务容器中直接执行模型生成代码。
- **与 [SeaweedFS](/components/seaweedfs) 配合交换产物**：通过受限临时凭证或单次预签名方式与 `SeaweedFS`（或企业既有 S3 兼容对象存储）交换输入文件与执行产物，避免将共享存储直挂沙箱。
- **与 [8. 治理与观测层](/layers/governance-observability) 联动**：将沙箱创建、命令执行、网络拦截与资源超限事件纳入 `OpenTelemetry`、`Loki` 与统一安全审计链路。
- **与 [OpenClaw](/components/openclaw) 互补**：`OpenClaw` 作为面向个人 / 团队的独立沙箱扩展形态运行，而 `Agent Sandbox` 为平台内各类 Agent 与工具调用提供统一的底层执行隔离基础设施。

## 适合场景

- Agent 代码解释器（Python / Shell / Node.js 等动态脚本执行与图表生成）
- 自动化数据分析、文件格式转换与临时数据处理任务
- 第三方或动态加载的不可信 MCP Tool / 插件脚本隔离执行
- 需要执行浏览器自动化或受限终端操作的复杂任务型 Agent

## 边界

- **不替代上层权限裁决与工具网关**：沙箱解决“执行爆炸半径隔离”，不替代 [Casbin](/components/casbin) 的权限决策与 [agentgateway](/components/agentgateway) 的南向工具治理。
- **不承载核心持久化状态服务**：不用于运行 [PostgreSQL](/components/postgresql)、[Redis](/components/redis)、[SeaweedFS](/components/seaweedfs) 或主平台控制面组件。
- **不替代主机安全与镜像供应链治理**：仍需配合最小化只读根文件系统、非 root 运行与内部可信镜像仓库基线。

## 采用规则

- **默认运行时采用 `gVisor`**：凡涉及 Agent 执行动态代码、脚本或不可信工具的生产场景，默认启用 `Kubernetes agent-sandbox` + `gVisor`；因其不依赖嵌套虚拟化，可在标准 VM 与私有化 K3s 集群快速落地。
- **强隔离场景条件引入 `Kata Containers`**：当企业具备裸金属 KVM 节点，且存在金融级、涉密级或严格监管合规要求（须实现硬件级 / MicroVM 独立内核隔离）时，条件启用 `Kata Containers` 运行时。
- **严禁裸容器直跑不可信代码**：生产环境不得在普通 `runc` 共享容器或编排服务进程内直接执行 LLM 生成的任意代码。

## 治理注意点

::: warning 沙箱安全三条工程红线
1. **独立沙箱节点池（Taint / Toleration）**：沙箱负载必须调度至专用节点池，通过节点污点（Taint）与容忍度（Toleration）与平台核心控制面、数据库及业务服务物理或节点级隔离，严禁混部。
2. **默认拒绝出网与白名单控制（Default-Deny Egress）**：沙箱命名空间与工作负载默认拒绝所有外部网络出站流量（Default-Deny Egress），仅按任务需要通过 NetworkPolicy 或受控代理放行明确白名单目标，严禁沙箱直连内网管理面、云元数据地址与核心数据库。
3. **凭据剥离（Secret Stripping）**：严禁将系统级 API Key、数据库密码、Kubernetes ServiceAccount Token 或长期用户凭据注入沙箱环境变量或挂载卷；沙箱内仅保留最小必要上下文，涉及外部受控调用须通过外置代理或短时最小权限令牌完成。
:::

- **资源配额与超时回收**：为每个沙箱实例强制设置 CPU、内存、临时磁盘、进程数上限与硬性执行超时（TTL），防止死循环与资源耗尽攻击。
- **审计留痕与产物校验**：完整记录沙箱触发主体、输入代码摘要、退出码与拦截日志，并对沙箱导出的文件产物执行类型与安全校验后再返回给用户。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [K3s](/components/k3s)
- [agentgateway](/components/agentgateway)
- [安全与治理](/governance)
- [部署与发布](/deployment)

## 参考资料

- [Kubernetes agent-sandbox GitHub Repository](https://github.com/kubernetes-sigs/agent-sandbox)
- [gVisor Documentation](https://gvisor.dev/)
- [gVisor GitHub Repository](https://github.com/google/gvisor)
- [Kata Containers Official Website](https://katacontainers.io/)
- [Kata Containers GitHub Repository](https://github.com/kata-containers/kata-containers)
