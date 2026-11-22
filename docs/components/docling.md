# Docling

> 类型：AI 驱动的非结构化文档解析引擎
>
> 采用定位：默认采用（非结构化文档结构化解析入口）
>
> 所属层：数据治理层
>
> 官方网站：https://docling-project.github.io/docling/
>
> 开源仓库地址：https://github.com/docling-project/docling

## 当前定位

`Docling` 是本方案数据治理层默认的非结构化文档解析引擎，负责将 PDF、Office（DOCX / PPTX / XLSX）、HTML、图片及扫描件等企业非结构化文档，通过 AI 版面分析与表格结构识别，稳定转换为结构化 Markdown 与 JSON 表示，为下游切片、索引与 RAG 检索提供高保真输入。其具备 CPU 友好运行特性，可在不额外占用 GPU 推理池的前提下完成全私有化部署。

## 主要职责

- **AI 版面分析与阅读顺序还原**：精准识别多栏排版、页眉页脚、标题层级、正文段落与图文区域，避免传统纯文本抽取导致的段落错乱与语义断裂。
- **复杂表格与结构化内容还原**：还原跨行、跨列与嵌套表格结构，保留行列对应关系，直接输出结构化 Markdown 表格或 JSON 语义树。
- **多格式文档统一转换**：面向 PDF、DOCX、PPTX、XLSX、HTML、Markdown 及扫描件（配合 OCR）提供一致的结构化解析输出。
- **CPU 友好型私有化解析**：支持在标准 CPU 节点上稳定运行，便于在无 GPU 或 GPU 优先保障在线推理的企业环境中规模化部署。

## 与其他组件关系

- **与 [SeaweedFS](/components/seaweedfs) 配合**：从 `SeaweedFS`（或企业既有 S3 兼容对象存储）读取知识源文件与用户上传附件，并将解析生成的结构化 Markdown / JSON 及中间产物回写留存。
- **与 [SeaTunnel](/components/seatunnel) 互补**：`SeaTunnel` 负责多源文档与对象数据的批量、增量同步采集，`Docling` 负责对入湖后的非结构化文件执行版面感知解析。
- **与 [OpenMetadata](/components/openmetadata) 协同**：将文档来源、解析版本、结构化产物路径与质量状态纳入统一元数据目录与血缘体系。
- **与 [Apache Tika](/components/apache-tika) 分工协作**：`Docling` 承担默认结构化文档解析；当面对老旧格式、生僻文件类型或需要前置 MIME 类型嗅探与路由时，由 `Apache Tika` 作为条件引入的兼容辅助层配合处理。
- **与 [dbt Core](/components/dbt-core) 互补**：`dbt Core` 负责结构化数据的主题建模与口径治理，`Docling` 负责非结构化文档的结构化解析，共同完善企业 AI 数据底座。
- **向下游知识与检索层供数**：向 [LlamaIndex](/components/llamaindex)、主平台知识工程链路及 [Weaviate](/components/weaviate) 等检索底座输出高质量结构化文本，提升语义切片与检索召回质量。

## 适合场景

- 企业制度手册、合同、技术规范、招投标文件、财报及研报等复杂版面 PDF / Office 文档解析
- 包含大量表格、多级标题和图文混排的知识库入库预处理
- 面向高精度 RAG 与 Agent 知识问答的非结构化数据底座建设
- 需要纯私有化、CPU 友好运行且保持结构化输出一致性的文档处理链路

## 边界

- **不替代索引与检索引擎**：不承担向量化、全文索引、混合检索或重排职责（归属 [6. 知识与检索层](/layers/knowledge-retrieval)）。
- **不替代元数据治理中枢**：不承担企业级数据资产目录、责任人登记、分类分级与血缘管理（归属 [OpenMetadata](/components/openmetadata)）。
- **不替代复杂编排与 RAG 运行时**：不承担召回策略编排、上下文拼装、Prompt 管理或对话路由。
- **不覆盖全部生僻历史文件格式**：对于非主流老旧归档格式或仅需快速元数据嗅探的场景，应交由 [Apache Tika](/components/apache-tika) 执行前置识别或兜底提取。

## 采用规则

- 本方案将 `Docling` 作为数据治理层**默认采用**的非结构化文档解析引擎，替代传统纯文本抽取方式作为知识入库主入口。
- 生产环境建议优先在独立 CPU 工作节点池运行 `Docling` 解析任务，与模型推理 GPU 池解耦；若存在高并发重度扫描件 OCR 需求，可按需评估独立加速资源。
- 当企业存量文档包含大量生僻、老旧二进制格式或需统一前置文件类型检测时，可条件引入 [Apache Tika](/components/apache-tika) 进行格式嗅探与路由分流。
- 文档经 `Docling` 输出结构化 Markdown / JSON 后，仍须进入元数据登记、权限标签绑定、语义切片与索引发布链路，不可直接视为已治理知识资产。

## 治理注意点

- **全链路溯源与版本化**：须记录原始文件 URI、哈希校验值、解析引擎版本、解析时间与产物位置，确保知识引用可回溯至原始文档与页码。
- **异常检测与补偿机制**：对加密文档、损坏文件、空内容输出或低置信度 OCR 结果应建立告警、隔离与人工复核通道。
- **权限与密级透传**：非结构化文档原有的部门归属、密级标签与访问控制属性不得在解析转换过程中丢失，须随结构化产物一并写入资产目录。
- **离线模型资产管控**：全私有化环境须提前在内部制品库固定 `Docling` 版面分析与表格识别模型权重版本，禁止运行期向公网拉取未受控权重。

## 关联文档

- [5. 数据治理层](/layers/data-governance-layer)
- [数据治理层（企业 AI 数据底座）](/data-governance)
- [Apache Tika](/components/apache-tika)
- [OpenMetadata](/components/openmetadata)
- [SeaweedFS](/components/seaweedfs)
- [6. 知识与检索层](/layers/knowledge-retrieval)

## 参考资料

- [Docling Documentation](https://docling-project.github.io/docling/)
- [Docling GitHub Repository](https://github.com/docling-project/docling)
- [Docling MIT License](https://github.com/docling-project/docling/blob/main/LICENSE)
