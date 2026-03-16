# 第一批文档完善计划

> 状态：执行中
>
> 更新日期：2026-03-16
>
> 范围：首批 9 项文档内容完善与一致性优化
>
> 约束：只做文档内容修改优化，不引入新的组件、不新增公开版本化页面

## 一、执行边界

本轮工作只处理公开文档内容，不改变公开入口规则：

- 公开站点始终只展示一个当前状态。
- 页面标题、导航名称、正文和公开路由不出现内部版本号或内部迭代标识。
- 主方案入口固定为 [方案](/framework)，组件入口固定为 [组件](/components)。
- 组件页、协议页、标准页、规范页继续复用稳定路径。
- 不新增新的组件条目、组件详情页、协议页和标准页，只优化现有内容表达与边界说明。

## 二、当前主要缺口

结合当前仓库内容和 2026 年 3 月的官方资料调研，首批需要优先修复的问题有：

1. [总体架构](/architecture) 仍使用“六层”表述，而 [方案](/framework) 已按“九层”展开，公开口径不一致。
2. 身份与权限链路在不同页面之间口径不统一，既有“复用企业现有 `SSO / IAM`”，也有具体实现推荐，容易让读者误判当前方案是否引入了新的正式组件。
3. 主题页深度不均衡，部分页面仍停留在提纲级，缺少职责边界、落地判断、阶段化建议和与其他页面的联动关系。
4. [部署与发布](/deployment) 混合了“文档站发布”和“平台本体部署”，主题边界不清。
5. [技术选型](/stack) 里存在超出当前正式组件清单的扩散式候选，容易和“只展示当前方案”的公开规则冲突。
6. `RAGFlow` 等组件命名在少数页面写法不一致，需要统一。

## 三、参考资料基线

本轮完善优先参考官方一手资料，避免基于二手文章改写。

### 1. 治理、风险与身份基线

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [NIST AI Resource Center / AI RMF Playbook](https://airc.nist.gov/)
- [NIST Generative AI Profile 说明](https://www.nist.gov/itl/ai-risk-management-framework)
- [RFC 9700: OAuth 2.0 Security BCP](https://www.rfc-editor.org/rfc/rfc9700)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0-18.html)
- [RFC 7644: SCIM Protocol](https://www.rfc-editor.org/rfc/rfc7644)

### 2. 架构、部署与运行基线

- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
- [Kubernetes Production Environment](https://kubernetes.io/docs/setup/production-environment/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [K3s Architecture](https://docs.k3s.io/architecture)

### 3. 协议、互操作与观测基线

- [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2024-11-05/index)
- [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
- [A2A Protocol Roadmap](https://a2a-protocol.org/latest/roadmap/)
- [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/)
- [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)

### 4. 当前正式组件的官方资料

- [Apache APISIX Architecture](https://apisix.apache.org/docs/apisix/3.14/architecture-design/apisix/)
- [LiteLLM Docs](https://docs.litellm.ai/)
- [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph)
- [LlamaIndex Docs](https://docs.llamaindex.ai/)
- [Dify Workflow Docs](https://docs.dify.ai/en/use-dify/workflow/readme)
- [Dify Knowledge Docs](https://docs.dify.ai/en/use-dify/knowledge/manage-knowledge/introduction)
- [RAGFlow 官方仓库](https://github.com/infiniflow/ragflow)
- [Coze Studio 官方仓库](https://github.com/coze-dev/coze-studio)
- [Casbin Docs](https://www.casbin.org/docs)
- [OPA Docs](https://www.openpolicyagent.org/docs)
- [Grafana k6 Overview](https://grafana.com/oss/k6/)
- [Langfuse 官方站点](https://langfuse.com/)

## 四、第一批 9 项修改计划

## 1. 术语与跨文档基线

- 目标：统一公开口径，先消除层次、命名、身份治理和边界表述冲突。
- 参考资料：
  - [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
  - [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)
  - [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0-18.html)
  - [RFC 7644](https://www.rfc-editor.org/rfc/rfc7644)
- 计划修改：
  - 把公开架构主口径统一为“九层”。
  - 身份体系统一为“默认复用企业现有 `SSO / IAM`；若企业暂缺，再按兼容 `OIDC / OAuth2 / SCIM` 的实现自选”，避免把某个实现误写成当前正式组件。
  - 统一 `RAGFlow` 命名写法。
  - 明确协议、组件、主题页之间的边界。
- 影响页面：
  - [方案](/framework)
  - [总体架构](/architecture)
  - [技术选型](/stack)
  - [安全与治理](/governance)
  - [部署与发布](/deployment)
  - [文档索引](/doc-index)

## 2. 完善 [总体架构](/architecture)

- 目标：把页面从提纲页提升为正式架构页，和 [方案](/framework) 保持一致。
- 参考资料：
  - [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
  - [K3s Architecture](https://docs.k3s.io/architecture)
  - [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
  - [A2A Protocol 官方仓库](https://github.com/a2aproject/A2A)
- 计划修改：
  - 以九层架构重写分层说明。
  - 增加“控制面、数据面、治理面”视图。
  - 补齐核心链路、知识入库链路、工具动作链路。
  - 补齐模块边界和反模式。

## 3. 完善 [安全与治理](/governance)

- 目标：建立一页能直接回答“企业级治理到底需要什么”的完整基线页。
- 参考资料：
  - [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
  - [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)
  - [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0-18.html)
  - [RFC 7644](https://www.rfc-editor.org/rfc/rfc7644)
  - [OpenTelemetry GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
  - [Casbin Docs](https://www.casbin.org/docs)
  - [OPA Docs](https://www.openpolicyagent.org/docs)
- 计划修改：
  - 用“身份、数据、模型、工具、发布、人机协同”六个治理域重写。
  - 明确 `APISIX`、`Casbin`、企业 `SSO / IAM` 的分工。
  - 增加审计字段、发布门槛、人工接管要求和角色分工。

## 4. 完善 [部署与发布](/deployment)

- 目标：把页面聚焦到平台本体部署，不再混写文档站发布说明。
- 参考资料：
  - [Kubernetes Production Environment](https://kubernetes.io/docs/setup/production-environment/)
  - [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
  - [K3s Architecture](https://docs.k3s.io/architecture)
  - [Apache APISIX Architecture](https://apisix.apache.org/docs/apisix/3.14/architecture-design/apisix/)
  - [Grafana k6 Overview](https://grafana.com/oss/k6/)
- 计划修改：
  - 区分 `dev`、`staging`、`prod`。
  - 增加单团队试点、部门级推广、企业生产的部署形态。
  - 增加有状态组件、备份恢复、容量验证、回滚和灾备要求。
  - 明确“本页不负责文档站发布”。

## 5. 完善 [实施路线图](/roadmap)

- 目标：把路线图从时间描述提升为可验收的阶段计划。
- 参考资料：
  - [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
  - [NIST AI Resource Center](https://airc.nist.gov/)
  - [Grafana k6 Overview](https://grafana.com/oss/k6/)
  - [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph)
- 计划修改：
  - 增加每阶段的目标、交付物、准入条件、退出条件和常见误区。
  - 增加持续治理主线，强调评测、审计和成本治理不是收尾工作。
  - 强化“不为路线图新增组件”的约束。

## 6. 完善 [典型场景](/scenarios)

- 目标：让场景页能支撑优先级判断和项目立项，而不只是列举案例。
- 参考资料：
  - [NIST Generative AI Profile 说明](https://www.nist.gov/itl/ai-risk-management-framework)
  - [Dify Workflow Docs](https://docs.dify.ai/en/use-dify/workflow/readme)
  - [LlamaIndex Docs](https://docs.llamaindex.ai/)
  - [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph)
- 计划修改：
  - 增加场景选择矩阵。
  - 为四个典型场景分别补充业务目标、推荐链路、治理重点、上线边界和验收指标。
  - 明确场景落地顺序建议。

## 7. 完善 [技术选型](/stack)

- 目标：把页面收敛为“当前推荐技术栈与取舍逻辑”，不扩散到新的组件候选池。
- 参考资料：
  - [LiteLLM Docs](https://docs.litellm.ai/)
  - [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph)
  - [LlamaIndex Docs](https://docs.llamaindex.ai/)
  - [Apache APISIX Architecture](https://apisix.apache.org/docs/apisix/3.14/architecture-design/apisix/)
  - [Casbin Docs](https://www.casbin.org/docs)
  - [Grafana k6 Overview](https://grafana.com/oss/k6/)
- 计划修改：
  - 只保留当前正式组件清单中的技术选项。
  - 把“当前主选”“条件引入”“不建议并行”的边界写清楚。
  - 对主平台路线、检索底座、观测与治理做成明确取舍说明。

## 8. 完善 [组件](/components)

- 目标：把组件清单页从简单列表升级为“当前基线 + 条件引入规则”的入口页。
- 参考资料：
  - [LiteLLM Docs](https://docs.litellm.ai/)
  - [RAGFlow 官方仓库](https://github.com/infiniflow/ragflow)
  - [Coze Studio 官方仓库](https://github.com/coze-dev/coze-studio)
  - [Casbin Docs](https://www.casbin.org/docs)
  - [Langfuse 官方站点](https://langfuse.com/)
- 计划修改：
  - 增加核心基线组件组合。
  - 增加互斥组件与条件引入组件说明。
  - 保持组件数量不变，只优化分组、定位和采用规则。

## 9. 完善 [方案综述](/guide/)

- 目标：把综述页改造成面向决策者、架构师和实施团队的统一导读页。
- 参考资料：
  - [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
  - [Kubernetes Production Environment](https://kubernetes.io/docs/setup/production-environment/)
  - [Model Context Protocol Versioning](https://modelcontextprotocol.io/specification/)
  - [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/)
- 计划修改：
  - 增加站点阅读路径和角色导读。
  - 增加“本方案解决什么、不解决什么”的边界。
  - 用一页把方案、架构、选型、治理、路线图串起来。

## 五、执行顺序

1. 先统一术语和跨文档基线。
2. 再重写 [总体架构](/architecture)、[安全与治理](/governance)、[部署与发布](/deployment)。
3. 然后重写 [实施路线图](/roadmap)、[典型场景](/scenarios)、[技术选型](/stack)。
4. 最后完善 [组件](/components)、[方案综述](/guide/) 并回收索引与维护页联动。

## 六、完成判定

本轮完成的判定标准如下：

- 目标 9 项内容全部落到 Markdown 文件。
- 不新增组件、不新增组件详情页、不新增公开版本化页面。
- [总体架构](/architecture) 与 [方案](/framework) 的架构口径一致。
- [技术选型](/stack)、[组件](/components)、[部署与发布](/deployment)、[安全与治理](/governance) 在身份、治理和组件边界上不再互相冲突。
- 站点标题、导航名称、一级入口名称继续符合仓库公开规则。
- 文档站能够通过本地构建校验。
