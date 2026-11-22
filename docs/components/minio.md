# MinIO

> 类型：对象存储（历史参考）
>
> 采用定位：非默认选型 / 历史参考（已归档不推荐新建；默认采用 [SeaweedFS](/components/seaweedfs) 或复用企业既有 S3 兼容对象存储）
>
> 所属层：基础设施层（仅作存量环境迁移参考）
>
> 官方网站：https://min.io/docs/minio
>
> 开源仓库地址：https://github.com/minio/minio

## 当前定位

`MinIO` 曾广泛用于私有化 S3 兼容对象存储场景。但在本方案中，`MinIO` **不再作为默认对象存储底座**，仅保留为稳定的**历史参考页**，用于说明存量环境兼容性与迁移口径。新建私有化环境优先复用企业既有 S3 兼容对象存储，或默认采用 [SeaweedFS](/components/seaweedfs)（`Apache-2.0`）；轻量单机 / 中小规模替代方案可按需评估 `RustFS`（`Apache-2.0`）。

::: warning 社区版归档与维护风险提示
- `minio/minio` 开源社区版仓库已归档为只读状态，不再提供社区安全补丁与持续维护，且采用强 copyleft 的 `AGPL-3.0` 许可证。
- 面向数万人规模企业与长期私有化生产运行，**禁止在新项目中将社区版 `MinIO` 作为默认对象存储底座**；既有存量环境应逐步规划向企业既有 S3 兼容存储或 [SeaweedFS](/components/seaweedfs) 平滑迁移。
:::

## 历史职责与存量兼容范围

在存量兼容环境中，对象存储层承担以下基础职责（新建环境由 [SeaweedFS](/components/seaweedfs) 或企业既有 S3 兼容存储承接）：

- 知识源文件存储
- 用户上传附件存储
- 解析产物与导出文件存储

## 与其他组件关系

- **与 [SeaweedFS](/components/seaweedfs) 的替代关系**：`SeaweedFS` 与 `MinIO` 均对外暴露标准 S3 API，上层业务组件（如 [Docling](/components/docling)、[LangSet](/components/langset)、[SeaTunnel](/components/seatunnel) 与主平台）只需通过标准 S3 协议配置接入，即可在无需业务代码改造的前提下完成存储底座替换。
- **与 [PostgreSQL](/components/postgresql) 互补**：文件元数据由 `PostgreSQL` 管理，对象存储仅承载文件本体。
- **与企业现有 KMS / 证书体系配合**：统一完成加密与访问凭据治理。

## 边界

- 不再作为本方案新建环境的默认对象存储选型
- 不承担结构化查询与检索索引
- 不承担业务权限裁决

## 采用规则

- **新建环境禁止默认选用**：新建设私有化智能体平台优先复用企业既有 S3 兼容对象存储，需自建时默认采用 [SeaweedFS](/components/seaweedfs)（`Apache-2.0`），或按需评估轻量替代 `RustFS`（`Apache-2.0`）。
- **存量环境受控兼容与迁移**：仅当企业现网已采购商业支持版或存在历史遗留集群尚未完成替换时，通过标准 S3 接口过渡兼容，并制定向 [SeaweedFS](/components/seaweedfs) 或企业统一对象存储的迁移计划。
- **许可证与合规核验**：存量使用须同步对照 [开源状态与许可证说明](/open-source-status) 明确 `AGPL-3.0` 与安全补丁风险。

## 治理注意点

- **安全漏洞与无补丁风险隔离**：存量社区版实例须严格置于内网受控网段，限制管理端口暴露，并尽快排期迁移至持续维护的 `Apache-2.0` 底座。
- **Bucket 与凭据标准化**：保持 Bucket 命名规范与标准 S3 SDK 调用方式，避免绑定专有扩展 API，降低后续存储迁移成本。
- **文件权限联动**：文件访问权限必须与上层业务权限和知识权限联动，不能仅靠存储路径控制。

## 关联文档

- [SeaweedFS（默认自建对象存储）](/components/seaweedfs)
- [9. 基础设施层](/layers/infrastructure-layer)
- [数据与存储底座](/components/infrastructure-data-storage)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [MinIO GitHub Repository（已归档）](https://github.com/minio/minio)
- [MinIO Documentation](https://min.io/docs/minio)
