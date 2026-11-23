# RustFS

> 类型：高性能 S3 兼容对象存储
>
> 采用定位：条件引入（轻量 S3 平替备选，与 `SeaweedFS` 按规模与运维偏好选择；优先复用企业既有 S3 兼容对象存储）
>
> 所属层：基础设施层
>
> 官方网站：https://rustfs.com/
>
> 开源仓库地址：https://github.com/rustfs/rustfs

## 当前定位

`RustFS` 是本方案基础设施层面向轻量与纯 S3 兼容场景的条件引入对象存储组件，采用标准 `Apache-2.0` 许可证。项目基于 Rust 实现，聚焦高性能纯 S3 API 兼容、低资源占用与开箱即用的内置 Web 管理控制台，适合希望以较低运维复杂度快速完成 S3 平替的私有化团队。

::: tip 与 SeaweedFS 的选型分工
- **优先复用企业现有对象存储**：若企业已建有稳定的 S3 兼容对象存储服务，默认直接复用既有底座，不重复建设。
- **自建默认与轻量备选分工**：需随平台自建对象存储时，默认推荐经过 10 余年 PB 级验证、支持海量小文件 `O(1)` 寻址以及 POSIX / FUSE 与 Iceberg / S3 Tables 的 [SeaweedFS](/components/seaweedfs)；若业务聚焦标准 S3 对象存取、偏好低运维开销与内置 Web 控制台，可按需选择 `RustFS` 作为轻量 S3 平替。
:::

## 主要职责

- **标准 S3 兼容对象存取**：以纯 S3 API 为平台各组件提供知识源文件、附件与执行产物的统一对象读写能力。
- **解析与评测产物承载**：存储 [Docling](/components/docling) 生成的结构化 Markdown / JSON 解析产物、中间文件及 [LangSet](/components/langset) 离线评测数据集与导出归档。
- **轻量可视化运维管理**：依托内置 Web 管理控制台，支持 Bucket 创建、对象浏览、策略配置与基础状态观测，降低中小规模环境的日常运维门槛。
- **低开销私有化部署**：借助 Rust 原生内存安全与低运行时开销特性，在轻量单机或小规模集群环境中提供稳定的对象存储吞吐。

## 与其他组件关系

- **与 [SeaweedFS](/components/seaweedfs) 按场景二选一**：两者同属 `Apache-2.0` 协议的 S3 兼容对象存储底座，不建议在同一环境长期并行部署。大规模海量小文件、需 POSIX / FUSE 挂载或湖仓表格式对接时选用 `SeaweedFS`；聚焦纯 S3 API 平替与内置 Web 控制台的轻量部署时选用 `RustFS`。
- **与 [PostgreSQL](/components/postgresql) 互补**：`RustFS` 承载非结构化文件本体与大对象，`PostgreSQL` 承载文件元数据、业务权限映射与运行状态。
- **与 [Docling](/components/docling)、[Apache Tika](/components/apache-tika) 及 [SeaTunnel](/components/seatunnel) 协同**：通过标准 S3 协议承接同步入湖的原始文档，并为解析引擎提供源文件读取与结构化产物回写能力。
- **与 [LangSet](/components/langset) 与 [Agent Sandbox](/components/agent-sandbox) 联动**：为 `LangSet` 提供 S3 兼容后端，并通过短期预签名 URL 或受限临时凭证与沙箱安全交换执行产物。
- **与企业现有 KMS / 证书体系配合**：统一完成传输加密、静态加密与访问凭据治理。

## 适合场景

- 追求纯 S3 API 平滑替代、且看重开箱即用内置 Web 管理控制台的私有化部署环境
- 部门级或中小规模生产环境的知识库源文件、附件与解析产物存储
- 运维团队精简、希望以较低硬件与维护成本落地 `Apache-2.0` 合规对象存储的场景
- 从已归档的 [MinIO](/components/minio) 社区版向标准开源 S3 兼容存储迁移的轻量环境

## 边界

- **不承担结构化事务查询**：不替代 [PostgreSQL](/components/postgresql) 承担关系型数据持久化与事务查询。
- **不承担向量与全文检索**：不替代 [Weaviate](/components/weaviate)、[Milvus](/components/milvus) 或 [Elasticsearch](/components/elasticsearch) 提供语义与关键词检索能力。
- **不覆盖多协议文件与湖仓扩展**：若明确需要 POSIX / FUSE 挂载、PB 级亿级小文件治理或 Iceberg / S3 Tables 能力，应直接选用 [SeaweedFS](/components/seaweedfs)。
- **不承担上层业务权限裁决**：仅执行存储层 Bucket 策略与 Access Key 校验，不替代应用鉴权与 [Casbin](/components/casbin) 权限决策。

## 采用规则

- **复用优先**：企业已有成熟 S3 兼容对象存储底座时优先直接复用，不新增自建存储组件。
- **条件引入定位**：与默认自建底座 [SeaweedFS](/components/seaweedfs) 按规模、协议需求与运维偏好二选一，同一环境内避免长期双对象存储并行。
- **生产验证要求**：用于大规模核心生产环境前，需结合目标数据量、并发读写模型与高可用拓扑完成容量压测与故障恢复演练。
- **历史参考说明**：原 [MinIO](/components/minio) 社区版已归档只读且停止安全补丁维护，不再作为默认选型。

## 治理注意点

- **Bucket 隔离与生命周期**：按业务域、环境（`dev` / `staging` / `prod`）与数据类型拆分 Bucket，明确配置对象生命周期、版本留存与定期备份策略。
- **控制台与访问权限收敛**：内置 Web 管理控制台仅限内网运维平面访问，禁止直接暴露至公网；业务文件访问须经应用层鉴权或短期预签名 URL。
- **凭据最小权限与加密**：按组件独立签发最小权限 Access Key / Secret Key，避免共享根凭据，并结合企业 KMS / 证书体系落实 TLS 与静态加密。
- **版本锁定与升级验证**：在部署清单中固定稳定发布版本，升级前先在 `staging` 环境验证 S3 客户端兼容性与数据完整性。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [数据与存储底座](/components/infrastructure-data-storage)
- [SeaweedFS](/components/seaweedfs)
- [Docling](/components/docling)
- [LangSet](/components/langset)
- [MinIO（历史参考）](/components/minio)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [RustFS Official Website](https://rustfs.com/)
- [RustFS GitHub Repository](https://github.com/rustfs/rustfs)
- [RustFS License (Apache-2.0)](https://github.com/rustfs/rustfs/blob/main/LICENSE)
