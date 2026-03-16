# Elasticsearch

> 类型：全文检索与混合检索兼容项
>
> 复用规则：条件引入的组件说明页
>
> 所属层：知识与检索层
>
> 官方网站：https://www.elastic.co/docs
>
> 开源仓库地址：https://github.com/elastic/elasticsearch

## 当前定位

`Elasticsearch` 在当前方案中作为全文检索与混合检索兼容项，用于特定主平台路线或全文搜索要求较高的场景。

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

- 不作为当前默认主检索底座
- 存在许可证边界，正式落地前应结合 [开源状态与许可证说明](/open-source-status) 单独确认
- 若企业对许可证边界更敏感，应把它继续作为兼容项而不是默认主底座

## 采用规则

- `Elasticsearch` 只在明确存在全文、关键词、高级分析器或既有兼容需求时引入。
- 当前方案不把它作为默认长期主检索底座，也不默认与主向量底座长期双主并行。
- 引入前应单独确认当前官方分发口径与许可证边界。

## 治理注意点

- 全文索引范围、分析器配置和租户隔离策略需要统一管理。
- 与向量检索配合时，要明确谁负责主召回、谁负责补充检索，避免链路失控。
- 所有全文结果仍应可回溯到原始资产和权限范围。
- 许可证和交付方式应在实施前做专项确认，不能只按历史印象判断。

## 关联文档

- [6. 知识与检索层](/layers/knowledge-retrieval)
- [技术选型](/stack)
- [开源状态与许可证说明](/open-source-status)
- [LlamaIndex](/components/llamaindex)

## 参考资料

- [Elasticsearch Documentation](https://www.elastic.co/docs)
- [Elastic Licensing FAQ](https://www.elastic.co/pricing/faq/licensing)
