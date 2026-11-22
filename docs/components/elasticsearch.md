# Elasticsearch

> 类型：全文检索与混合检索兼容项
>
> 采用定位：条件引入（全文检索与混合检索兼容项）
>
> 所属层：知识与检索层
>
> 官方网站：https://www.elastic.co/docs
>
> 开源仓库地址：https://github.com/elastic/elasticsearch

## 当前定位

`Elasticsearch` 在本方案中作为全文检索与混合检索兼容项，用于特定主平台路线或全文搜索要求较高的场景。

## 主要职责

- 全文检索
- 关键词检索
- 混合检索兼容支撑

## 与其他组件关系

- 与 [LlamaIndex](/components/llamaindex) 和知识服务协同，用于补足全文和关键词检索需求。
- 与 [Weaviate](/components/weaviate) 或 [Milvus](/components/milvus) 的关系是条件配合，而不是默认主检索底座。
- 在某些主平台路线或既有全文检索场景中承担兼容能力。
- 需要与统一权限、引用和审计链路共同工作，不能孤立使用。

## 适合场景

- 全文搜索要求较高的知识场景
- 需要与特定平台路线配套的检索场景
- 全文与向量混合检索需求

## 边界

- 不作为默认主检索底座
- 存在许可证边界，正式落地前应结合 [开源状态与许可证说明](/open-source-status) 单独确认
- 若企业对许可证边界更敏感，应将其限定为兼容项而非默认主底座

## 采用规则

- `Elasticsearch` 仅在明确存在全文、关键词、高级分析器或既有兼容需求时引入。
- 本方案不将其作为默认长期主检索底座，也不默认与主向量底座长期双主并行。
- 引入前应单独确认官方分发口径与许可证边界。

## 治理注意点

- 全文索引范围、分析器配置和租户隔离策略需统一管理。
- 与向量检索配合时，需明确主召回与补充检索的职责边界，避免链路失控。
- 所有全文结果仍应可回溯至原始资产与权限范围。
- 许可证与交付方式应在实施前完成专项确认，不可仅凭历史印象判断。

## 关联文档

- [6. 知识与检索层](/layers/knowledge-retrieval)
- [技术选型](/stack)
- [开源状态与许可证说明](/open-source-status)
- [LlamaIndex](/components/llamaindex)

## 参考资料

- [Elasticsearch Documentation](https://www.elastic.co/docs)
- [Elastic Licensing FAQ](https://www.elastic.co/pricing/faq/licensing)
