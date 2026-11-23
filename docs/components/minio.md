# MinIO

> 类型：S3 兼容对象存储（存量兼容项）
>
> 采用定位：存量兼容与过渡复用（存量环境可受控复用或升级商业版 `AIStor`；新建默认采用 [SeaweedFS](/components/seaweedfs) 或轻量平替 [RustFS](/components/rustfs)）
>
> 所属层：基础设施层
>
> 官方网站：https://min.io/docs/minio
>
> 开源仓库地址：https://github.com/minio/minio

## 当前定位

`MinIO` 在企业私有化环境中拥有极高的存量部署率。在本方案中，`MinIO` **不再作为新建环境的默认对象存储底座**，而是定位为**存量兼容与过渡复用项**：面向已部署 `MinIO` 集群的企业，支持在受控边界内通过标准 S3 API 平稳过渡或升级商业版 `AIStor`；新建私有化环境则优先复用企业既有 S3 兼容对象存储，需自建时默认采用 [SeaweedFS](/components/seaweedfs)（`Apache-2.0`），轻量化或资源受限场景按需采用 [RustFS](/components/rustfs)（`Apache-2.0`）。

::: warning 社区版归档与维护风险提示
- `minio/minio` 开源社区版仓库已归档为只读状态，不再提供社区安全补丁与持续维护，且采用强 copyleft 的 `AGPL-3.0` 许可证。
- 面向数万人规模企业与长期私有化生产运行，**新建环境不推荐选用社区版 `MinIO`**；既有存量集群须按内网隔离与过渡治理要求受控复用，并结合企业运维现状选择升级商业版 `AIStor` 或基于标准 S3 API 渐进迁往 [SeaweedFS](/components/seaweedfs)、[RustFS](/components/rustfs) 或企业统一对象存储。
:::

## 存量 MinIO 的四条现实过渡路径

针对企业现网广泛存在的存量 `MinIO` 集群，可按安全基线、预算与演进节奏选择以下四条现实过渡路径：

1. **内网强隔离 + 锁定稳定版（短期维稳）**：严禁公网或半公网暴露，关闭外部 Web 控制台入口，仅限内网可信后端服务按最小 Bucket 权限访问，落地“存量维稳、增量落新底座”的过渡策略。
2. **升级官方商业版 `AIStor`**：对重度依赖 `MinIO` 运维体系且预算允许的企业，直接转为官方商业订阅，获取持续安全补丁、企业级控制台与商业 SLA 保障。
3. **评估活跃社区维护分支**：按需核验活跃社区维护分支的长期维护力、发版稳定性与供应链合规性后用于短期过渡（需注意其仍延续 `AGPL-3.0` 许可证约束）。
4. **基于标准 S3 API 双轨渐进迁移**：利用全站组件（`Dify`、`RAGFlow`、`Docling`、`LangFuse`、`LangSet`、`SeaTunnel`）均仅依赖标准 S3 接口的特性，新业务直接落入 [SeaweedFS](/components/seaweedfs)、[RustFS](/components/rustfs) 或企业统一 S3 存储，旧 Bucket 通过 `rclone` 或 S3 同步工具后台增量同步、在业务低峰期切换 Endpoint，实现业务代码零改造平滑迁移。

## 存量兼容职责范围

在存量兼容与过渡复用环境中，对象存储层承担以下基础职责（新建环境由 [SeaweedFS](/components/seaweedfs)、[RustFS](/components/rustfs) 或企业既有 S3 兼容存储承接）：

- 知识源文件存储
- 用户上传附件存储
- 解析产物与导出文件存储

## 与其他组件关系

- **与 [SeaweedFS](/components/seaweedfs) / [RustFS](/components/rustfs) 的替代与过渡关系**：`SeaweedFS`、`RustFS` 与 `MinIO` 均对外暴露标准 S3 API，上层业务组件（如 `Dify`、`RAGFlow`、[Docling](/components/docling)、[LangFuse](/components/langfuse)、[LangSet](/components/langset) 与 [SeaTunnel](/components/seatunnel)）仅通过标准 S3 协议配置接入，可在业务代码零改造的前提下完成存储底座双轨切换。
- **与 [PostgreSQL](/components/postgresql) 互补**：文件元数据由 `PostgreSQL` 管理，对象存储仅承载文件本体。
- **与企业现有 KMS / 证书体系配合**：统一完成加密与访问凭据治理。

## 边界

- 不再作为本方案新建环境的默认对象存储选型
- 不承担结构化查询与检索索引
- 不承担业务权限裁决

## 采用规则

- **新建环境不推荐选用社区归档版**：新建设私有化智能体平台优先复用企业既有 S3 兼容对象存储，需自建时默认采用 [SeaweedFS](/components/seaweedfs)（`Apache-2.0`），轻量单集群或资源受限场景按需选用 [RustFS](/components/rustfs)（`Apache-2.0`）。
- **存量环境受控复用与平滑过渡**：企业现网已稳定运行的 `MinIO` 集群可作为存量兼容项受控复用，通过内网强隔离短期维稳、升级官方商业版 `AIStor`，或基于标准 S3 API 渐进迁往 [SeaweedFS](/components/seaweedfs) / [RustFS](/components/rustfs) / 企业统一 S3 存储。
- **许可证与合规核验**：存量使用须同步对照 [开源状态与许可证说明](/open-source-status) 明确 `AGPL-3.0` 与无安全补丁风险。

## 治理注意点

- **安全漏洞与无补丁风险隔离**：存量社区版实例须严格置于内网受控网段，关闭外部控制台暴露并收紧 Bucket 最小权限，避免暴露在公网或半公网边界。
- **Bucket 与凭据标准化**：保持 Bucket 命名规范与标准 S3 SDK 调用方式，避免绑定专有扩展 API，确保后续切换 Endpoint 时业务代码零改造。
- **文件权限联动**：文件访问权限必须与上层业务权限和知识权限联动，不能仅靠存储路径控制。

## 关联文档

- [SeaweedFS（默认自建对象存储）](/components/seaweedfs)
- [RustFS（轻量 S3 平替对象存储）](/components/rustfs)
- [9. 基础设施层](/layers/infrastructure-layer)
- [数据与存储底座](/components/infrastructure-data-storage)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [MinIO GitHub Repository（已归档）](https://github.com/minio/minio)
- [MinIO Documentation](https://min.io/docs/minio)
