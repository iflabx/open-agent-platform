# 数据与存储底座

> 类型：基础设施二级分类页
>
> 范围：数据库、缓存、对象存储与检索底座

本类组件负责承载关系数据、缓存会话、对象存储、向量检索和全文检索能力。

当前包含：

- [PostgreSQL](/components/postgresql)
- [Valkey](/components/valkey)（默认推荐，纯 `BSD-3-Clause` 开源缓存与会话底座，与 `Redis` 协议完全兼容并列）
- [Redis](/components/redis)（兼容并列；企业既有 `Redis` 集群复用或按需采用）
- [SeaweedFS](/components/seaweedfs)（默认自建 S3 兼容对象存储；优先复用企业既有 S3 兼容对象存储，历史参考：[MinIO](/components/minio)）
- [RustFS](/components/rustfs)（条件引入；轻量高性能 S3 兼容对象存储备选，与 `SeaweedFS` 按规模与运维偏好选择）
- [Weaviate](/components/weaviate)
- [Milvus](/components/milvus)
- [Elasticsearch](/components/elasticsearch)
