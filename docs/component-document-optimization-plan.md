# 组件文档优化计划

> 角色：本轮组件详情页完善计划
>
> 范围：当前正式组件清单中的组件详情页
>
> 日期：2026-03-16

## 一、目标

本轮工作目标是把当前正式组件清单中的组件详情页统一优化为同一写法和同一判断口径，使每个组件页都能清楚回答：

- 这个组件在当前方案中承担什么角色
- 它位于哪一层
- 它和上下游组件如何协同
- 它适合什么场景
- 它不能替代什么
- 它在当前方案中是默认采用、条件引入还是互斥候选

同时，本轮要求每个组件页在底部补齐 `参考资料`，优先引用组件官方文档、官方仓库和官方许可证页面。

## 二、执行原则

1. 只做文档内容优化，不引入新的正式组件。
2. 组件页统一采用仓库已固化的模板结构：
   - `类型`
   - `复用规则`
   - `所属层`
   - `当前定位`
   - `主要职责`
   - `与其他组件关系`
   - `适合场景`
   - `边界`
   - `采用规则`
   - `治理注意点`
   - `关联文档`
   - `参考资料`
3. 每个组件只写一个主归属层，跨层影响放在正文说明，不在多个层里重复定义。
4. 文档重点写“职责、边界、采用条件和治理要求”，不写产品百科或详细部署手册。
5. 对许可证、发行模式或版本口径有特殊要求的组件，必须与 [开源状态与许可证说明](/open-source-status) 保持一致。

## 三、范围说明

本轮纳入的对象是当前正式组件清单中的详情页：

- `APISIX`
- `AgentifUI`
- `Dify`
- `RAGFlow`
- `Coze Studio`
- `LangGraph`
- `LangChain`
- `Letta`
- `OpenMetadata`
- `SeaTunnel`
- `dbt Core`
- `Apache Tika`
- `LlamaIndex`
- `Weaviate`
- `Milvus`
- `Elasticsearch`
- `LiteLLM`
- `vLLM`
- `Qwen` 模型族
- `Casbin`
- `LangFuse`
- `k6`
- `Prometheus`
- `Grafana`
- `Loki`
- `K3s`
- `PostgreSQL`
- `Redis`
- `MinIO`

以下页面当前属于分类页或组合页，不作为本轮组件模板改写对象：

- `/components/platform-route`
- `/components/portal-agent`
- `/components/data-foundation`
- `/components/access-governance`
- `/components/model-inference`
- `/components/observability-stack`
- `/components/infrastructure`
- `/components/infrastructure-data-storage`
- `/components/infrastructure-runtime`
- `/components/infrastructure-observability`
- `/components/protocol-interoperability`

## 四、权威资料检索规则

每个组件页改写前，都应先核对其官方资料。优先顺序如下：

1. 官方文档站
2. 官方仓库
3. 官方许可证页面或官方 FAQ

本轮重点核对的信息包括：

- 当前官方产品名称和主要能力描述
- 官方推荐定位是否与当前方案中的角色匹配
- 当前官方许可证或分发口径是否有变化
- 是否存在需要在组件页中强调的采用边界

## 五、分批执行计划

## 1. 第一批：统一接入与门户层

目标文件：

- `docs/components/apisix.md`
- `docs/components/agentifui.md`

优化重点：

- 明确入口层与门户层分工
- 强化它们不替代模型网关、授权引擎和编排运行时的边界
- 补齐与九层文档的关联

## 2. 第二批：Agent 编排层

目标文件：

- `docs/components/dify.md`
- `docs/components/ragflow.md`
- `docs/components/coze-studio.md`
- `docs/components/langgraph.md`
- `docs/components/langchain.md`
- `docs/components/letta.md`

优化重点：

- 写清主平台路线三选一规则
- 区分主平台、复杂运行时、长期记忆能力的职责边界
- 补齐工具调用、状态管理和人工介入相关治理要求

## 3. 第三批：数据治理层

目标文件：

- `docs/components/openmetadata.md`
- `docs/components/seatunnel.md`
- `docs/components/dbt-core.md`
- `docs/components/apache-tika.md`

优化重点：

- 强化“AI 可消费数据资产”口径
- 明确采集、解析、建模、元数据治理四类职责分工
- 补齐与数据治理层主题页的关联

## 4. 第四批：知识与检索层

目标文件：

- `docs/components/llamaindex.md`
- `docs/components/weaviate.md`
- `docs/components/milvus.md`
- `docs/components/elasticsearch.md`

优化重点：

- 区分知识工程、默认向量底座、条件演进底座和全文兼容项
- 明确默认组合和条件引入规则
- 对 `Elasticsearch` 单独强调兼容项和许可证确认要求

## 5. 第五批：模型网关与推理层

目标文件：

- `docs/components/litellm.md`
- `docs/components/vllm.md`
- `docs/components/qwen-model-family.md`

优化重点：

- 区分模型网关、推理执行和模型族组合三类角色
- 明确统一入口、推理执行和模型能力池之间的关系
- 避免在组件页中写死未来易变的内部模型版本标识

## 6. 第六批：治理与观测层

目标文件：

- `docs/components/casbin.md`
- `docs/components/langfuse.md`
- `docs/components/k6.md`
- `docs/components/prometheus.md`
- `docs/components/grafana.md`
- `docs/components/loki.md`

优化重点：

- 区分授权裁决、LLM 观测、压测、指标、日志和看板职责
- 强化与统一观测语义、发布门槛和审计链路的关系
- 对 `LangFuse`、`k6`、`Grafana`、`Loki` 的许可证或分发边界保持一致口径

## 7. 第七批：基础设施层

目标文件：

- `docs/components/k3s.md`
- `docs/components/postgresql.md`
- `docs/components/redis.md`
- `docs/components/minio.md`

优化重点：

- 说明运行底座、关系型存储、缓存和对象存储的职责边界
- 区分状态、缓存、文件和密钥证书的承载方式
- 对 `Redis` 版本口径和 `MinIO` 交付口径做治理提示

## 六、完成标准

本轮改写完成后，每个组件页都应满足以下标准：

1. 已采用统一模板结构。
2. 已明确主归属层。
3. 已明确当前定位、主要职责和上下游关系。
4. 已明确边界和采用规则。
5. 已补充治理注意点。
6. 已补充关联文档。
7. 已在底部补充 `参考资料`。
8. 内容与 [组件](/components)、[总体架构](/architecture)、[技术选型](/stack)、[开源状态与许可证说明](/open-source-status) 保持一致。

## 七、执行顺序

1. 先优化入口与门户相关组件，收敛前门口径。
2. 再优化编排、数据治理和知识检索组件，稳定平台主链路。
3. 然后优化模型、治理观测和基础设施组件，补齐运行与治理边界。
4. 最后执行站点构建校验，确认所有页面和引用链接可用。

## 参考资料

- [Apache APISIX Documentation](https://apisix.apache.org/docs/)
- [AgentifUI](https://agentifui.com/)
- [Dify Documentation](https://docs.dify.ai/)
- [RAGFlow](https://ragflow.io/)
- [Coze Studio](https://github.com/coze-dev/coze-studio)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangChain Documentation](https://docs.langchain.com/)
- [Letta Documentation](https://docs.letta.com/)
- [OpenMetadata Documentation](https://docs.open-metadata.org/)
- [Apache SeaTunnel](https://seatunnel.apache.org/)
- [dbt Documentation](https://docs.getdbt.com/)
- [Apache Tika](https://tika.apache.org/)
- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [Weaviate Documentation](https://docs.weaviate.io/)
- [Milvus Documentation](https://milvus.io/docs)
- [Elastic Licensing FAQ](https://www.elastic.co/pricing/faq/licensing)
- [LiteLLM Docs](https://docs.litellm.ai/)
- [vLLM Docs](https://docs.vllm.ai/)
- [Qwen Documentation](https://qwen.readthedocs.io/)
- [Casbin Documentation](https://casbin.org/docs/overview)
- [Langfuse Docs](https://langfuse.com/docs)
- [Grafana k6 Docs](https://grafana.com/docs/k6/latest/)
- [Prometheus Docs](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Grafana Loki Documentation](https://grafana.com/docs/loki/latest/)
- [K3s Documentation](https://docs.k3s.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/latest/)
- [MinIO Community README](https://github.com/minio/minio)
