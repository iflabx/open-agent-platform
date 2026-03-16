# MinIO

> 类型：对象存储
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：基础设施层
>
> 官方网站：https://min.io/docs/minio
>
> 开源仓库地址：https://github.com/minio/minio

## 当前定位

`MinIO` 负责平台中的文件本体存储。

## 主要职责

- 知识源文件存储
- 用户上传附件存储
- 导出结果与中间文件存储

## 与其他组件关系

- 文件元数据由 [PostgreSQL](/components/postgresql) 管理。
- 文档解析和知识接入链路通常由 [Apache Tika](/components/apache-tika)、知识层或主平台进一步处理。
- 检索索引由主平台与 [Weaviate](/components/weaviate) 等检索底座承担。
- 可与企业现有 `KMS / 证书体系` 配合完成加密和凭证治理。

## 适合场景

- 知识源文件和原始文档存储
- 用户上传附件与中间产物存储
- 导出结果、训练材料或解析前文件暂存
- 需要 S3 兼容对象访问模式的场景

## 边界

- 不承担结构化查询
- 不承担权限裁决

## 采用规则

- 当前方案默认以 `MinIO` 作为对象存储能力。
- 文件本体应和结构化元数据、检索索引分开承载，不把对象存储当作数据库或索引系统使用。
- 实施时需要再次确认官方分发与许可证口径，并与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 治理注意点

- Bucket 划分、对象生命周期、备份和恢复策略需要提前设计。
- 文件访问权限必须与业务权限和知识权限联动，不能只靠存储路径控制。
- 大文件、历史文件和临时文件要明确保留周期。
- 社区版交付方式和许可证边界需要在实施前单独确认。

## 关联文档

- [9. 基础设施层](/layers/infrastructure-layer)
- [Apache Tika](/components/apache-tika)
- [部署与发布](/deployment)
- [开源状态与许可证说明](/open-source-status)

## 参考资料

- [MinIO GitHub Repository](https://github.com/minio/minio)
- [MinIO Documentation](https://min.io/docs/minio)
