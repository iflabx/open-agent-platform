# SeaweedFS

> 类型：分布式对象存储与文件系统
>
> 采用定位：默认采用（自建 S3 兼容对象存储底座；优先复用企业既有 S3 兼容对象存储）
>
> 所属层：基础设施层
>
> 官方网站：https://seaweedfs.com/
>
> 开源仓库地址：https://github.com/seaweedfs/seaweedfs

## 当前定位

`SeaweedFS` 是本方案基础设施层默认的自建 S3 兼容对象存储底座，采用 `Apache-2.0` 许可证。经过 10 余年 PB 级生产验证，其 `O(1)` 磁盘寻址的小文件存储架构非常契合企业知识库文档、用户上传附件、`Docling` 结构化解析产物与 `LangSet` 评测导出文件的存储特征；同时支持标准 S3 API、POSIX / FUSE 挂载以及 Iceberg / S3 Tables 扩展能力。

::: tip 复用优先与轻量替代口径
- **优先复用企业现有对象存储**：若企业已建有稳定的 S3 兼容对象存储服务，默认直接复用既有存储底座，不重复建设。
- **轻量单机 / 中小规模替代参考**：若仅需轻量级 S3 兼容存储与开箱即用的内置 Web 管理控制台，可按需评估 `RustFS`（`Apache-2.0`，[GitHub](https://github.com/rustfs/rustfs)）作为平滑替代方案。
:::

## 主要职责

- **知识源文件与附件存储**：承载企业知识库原始文档、用户上传附件与多模态源文件本体。
- **解析与评测产物留存**：存储 [Docling](/components/docling) 输出的结构化 Markdown / JSON 解析产物、中间文件及 [LangSet](/components/langset) 离线评测数据集与导出归档。
- **统一 S3 接口与多协议访问**：为平台各组件提供标准 S3 兼容对象访问能力，并按需提供 POSIX / FUSE 挂载与 Iceberg / S3 Tables 湖仓表格式对接能力。
- **海量小文件高效承载**：依托 `O(1)` 索引与卷存储架构，在数百万至亿级企业文档与切片产物场景下保持稳定的读写延迟。

## 与其他组件关系

- **与 [PostgreSQL](/components/postgresql) 互补**：`SeaweedFS` 承载文件本体与大对象，`PostgreSQL` 承载文件元数据、权限映射与业务状态。
- **与 [Docling](/components/docling)、[Apache Tika](/components/apache-tika) 及 [SeaTunnel](/components/seatunnel) 协同**：`SeaTunnel` 将多源文档与对象数据同步入湖，`Apache Tika` 与 `Docling` 从 `SeaweedFS` 读取源文件并回写解析产物。
- **与 [LangSet](/components/langset) 与 [Agent Sandbox](/components/agent-sandbox) 联动**：为 `LangSet` 提供 S3 兼容存储后端，并通过受限预签名或短期临时凭证与 `Agent Sandbox` 安全交换执行产物。
- **与检索底座解耦**：向量与全文检索索引由主平台与 [Weaviate](/components/weaviate) 等检索底座承担，不直接通过对象存储提供检索查询。
- **与企业现有 KMS / 证书体系配合**：统一完成静态加密、传输加密与访问凭据治理。

## 适合场景

- 知识库源文件、合同制度手册与多模态原始文档存储
- 用户上传附件、`Docling` 解析中间产物与结构化输出留存
- `LangSet` 评测语料、导出结果与历史归档文件存储
- 需要标准 S3 兼容 API、海量小文件高性能访问，或需兼顾 POSIX / FUSE 与 Iceberg / S3 Tables 能力的私有化环境

## 边界

- **不承担结构化查询**：不替代 [PostgreSQL](/components/postgresql) 承担关系事务与结构化元数据查询。
- **不承担检索与索引**：不替代 [Weaviate](/components/weaviate)、[Milvus](/components/milvus) 或 [Elasticsearch](/components/elasticsearch) 承担向量与全文检索。
- **不承担权限裁决**：仅执行存储层 Bucket / 凭证校验，不替代上层业务权限与 [Casbin](/components/casbin) 权限决策。

## 采用规则

- **复用优先**：企业已有成熟 S3 兼容对象存储底座时优先直接复用，仅通过标准 S3 API 对接平台组件。
- **自建默认选型**：需随平台自建私有化对象存储时，默认采用 `SeaweedFS`（`Apache-2.0`）。
- **轻量替代参考**：面向极简部署、偏好内置 Web 控制台的轻量 S3 兼容场景，可按需评估 `RustFS`（`Apache-2.0`）。
- **历史参考说明**：原 [MinIO](/components/minio) 社区版已归档只读且停止安全补丁维护，不再作为默认选型。

## 治理注意点

- **Bucket 规划与生命周期**：按业务域、环境（`dev` / `staging` / `prod`）与数据类型拆分 Bucket，提前配置对象生命周期、版本留存、冷热分层及定期备份恢复策略。
- **业务权限联动**：文件访问必须经过应用层鉴权或短期预签名 URL，严禁将存储桶设为匿名公开或仅依赖路径规避越权访问。
- **凭据与加密治理**：按最小权限为不同组件分配独立 Access Key / Secret Key，避免共享高权限根凭据，并结合企业 KMS / 证书体系落实传输与静态加密。
- **容量与小文件治理**：对临时文件、解析中间产物与历史导出文件设置明确 TTL 清理策略，防止无序膨胀。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [数据与存储底座](/components/infrastructure-data-storage)
- [Docling](/components/docling)
- [LangSet](/components/langset)
- [MinIO（历史参考）](/components/minio)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [SeaweedFS Official Website](https://seaweedfs.com/)
- [SeaweedFS GitHub Repository](https://github.com/seaweedfs/seaweedfs)
- [RustFS GitHub Repository](https://github.com/rustfs/rustfs)
