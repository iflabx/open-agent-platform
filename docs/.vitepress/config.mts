import { defineConfig } from 'vitepress'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserOrOrgPagesRepo = repositoryName?.endsWith('.github.io')
const base =
  process.env.GITHUB_ACTIONS === 'true' && repositoryName
    ? isUserOrOrgPagesRepo
      ? '/'
      : `/${repositoryName}/`
    : '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '企业级智能体开源系统方案',
  description: '基于开源软件构建可治理、可扩展、可审计的企业级智能体系统',
  appearance: true,
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#111111' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '企业级智能体开源系统方案' }],
    ['meta', { property: 'og:description', content: '从模型接入、RAG、工作流到安全治理的一体化方案蓝图。' }],
    ['link', { rel: 'icon', href: '/mark.svg' }]
  ],
  themeConfig: {
    logo: '/mark.svg',
    siteTitle: '企业级智能体开源系统方案',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '方案', link: '/framework' },
      { text: '能力规范', link: '/capability-framework' },
      { text: '协议标准', link: '/protocol-standards' },
      { text: '组件', link: '/components' },
      { text: '开源状态', link: '/open-source-status' },
      { text: '技术选型', link: '/stack' },
      { text: '部署与发布', link: '/deployment' }
    ],
    sidebar: [
      {
        text: '开始阅读',
        items: [
          { text: '首页', link: '/' },
          { text: '文档索引', link: '/doc-index' },
          { text: '方案综述', link: '/guide/' },
          { text: '方案', link: '/framework' },
          { text: '组件', link: '/components' },
          { text: '开源状态与许可证', link: '/open-source-status' }
        ]
      },
      {
        text: '核心文档',
        items: [
          { text: '能力与规范体系', link: '/capability-framework' },
          { text: '协议与标准体系', link: '/protocol-standards' },
          { text: '数据治理层', link: '/data-governance' },
          { text: '总体架构', link: '/architecture' },
          { text: '技术选型', link: '/stack' },
          { text: '典型场景', link: '/scenarios' },
          { text: '安全与治理', link: '/governance' },
          { text: '部署与发布', link: '/deployment' },
          { text: '实施路线图', link: '/roadmap' },
          { text: '扩展升级', link: '/extension-capabilities' }
        ]
      },
      {
        text: '协议页',
        items: [
          { text: '协议页总览', link: '/protocols/' },
          { text: 'MCP 协议', link: '/protocols/mcp' },
          { text: 'A2A 协议', link: '/protocols/a2a' },
          { text: '身份接入协议', link: '/protocols/identity-access' },
          { text: 'OpenAPI', link: '/protocols/openapi' }
        ]
      },
      {
        text: '标准页',
        items: [
          { text: '标准页总览', link: '/standards/' },
          { text: 'JSON Schema', link: '/standards/json-schema' },
          { text: 'OpenAI 兼容 API', link: '/standards/openai-compatible-api' },
          { text: 'OpenTelemetry', link: '/standards/opentelemetry' }
        ]
      },
      {
        text: '规范页',
        items: [
          { text: '规范页总览', link: '/norms/' },
          { text: 'RBAC + ABAC', link: '/norms/rbac-abac' },
          { text: 'Policy as Code', link: '/norms/policy-as-code' },
          { text: 'Maker-Checker', link: '/norms/maker-checker' }
        ]
      },
      {
        text: '组件清单',
        items: [
          { text: '组件总览', link: '/components' },
          {
            text: '1. 用户与渠道层',
            link: '/layers/user-channel',
            items: [
              { text: '企业现有 Web / IM / 工单 / CRM / ERP 入口', link: '/components/existing-enterprise-entrypoints' }
            ]
          },
          {
            text: '2. 统一接入与流量治理层',
            link: '/layers/access-traffic-governance',
            items: [
              { text: 'APISIX', link: '/components/apisix' },
              { text: 'agentgateway', link: '/components/agentgateway' }
            ]
          },
          {
            text: '3. 门户与应用层',
            link: '/layers/portal-application',
            items: [
              { text: 'AgentifUI', link: '/components/agentifui' }
            ]
          },
          {
            text: '4. Agent 编排层',
            link: '/layers/agent-orchestration',
            items: [
              { text: 'Dify', link: '/components/dify' },
              { text: 'RAGFlow', link: '/components/ragflow' },
              { text: 'Coze Studio', link: '/components/coze-studio' },
              { text: 'LangGraph', link: '/components/langgraph' },
              { text: 'LangChain', link: '/components/langchain' },
              { text: 'Letta', link: '/components/letta' }
            ]
          },
          {
            text: '5. 数据治理层',
            link: '/layers/data-governance-layer',
            items: [
              { text: 'OpenMetadata', link: '/components/openmetadata' },
              { text: 'SeaTunnel', link: '/components/seatunnel' },
              { text: 'dbt Core', link: '/components/dbt-core' },
              { text: 'Apache Tika', link: '/components/apache-tika' }
            ]
          },
          {
            text: '6. 知识与检索层',
            link: '/layers/knowledge-retrieval',
            items: [
              { text: 'LlamaIndex', link: '/components/llamaindex' },
              { text: 'Weaviate', link: '/components/weaviate' },
              { text: 'Milvus', link: '/components/milvus' },
              { text: 'Elasticsearch', link: '/components/elasticsearch' }
            ]
          },
          {
            text: '7. 模型网关与推理层',
            link: '/layers/model-gateway-inference',
            items: [
              { text: 'LiteLLM', link: '/components/litellm' },
              { text: 'vLLM', link: '/components/vllm' },
              { text: 'Qwen 模型族', link: '/components/qwen-model-family' }
            ]
          },
          {
            text: '8. 治理与观测层',
            link: '/layers/governance-observability',
            items: [
              { text: 'Casbin', link: '/components/casbin' },
              { text: 'LangFuse', link: '/components/langfuse' },
              { text: 'k6', link: '/components/k6' },
              { text: 'OpenTelemetry', link: '/standards/opentelemetry' },
              { text: 'Prometheus', link: '/components/prometheus' },
              { text: 'Grafana', link: '/components/grafana' },
              { text: 'Loki', link: '/components/loki' }
            ]
          },
          {
            text: '9. 基础设施层',
            link: '/layers/infrastructure-layer',
            items: [
              { text: 'K3s', link: '/components/k3s' },
              { text: 'PostgreSQL', link: '/components/postgresql' },
              { text: 'Redis', link: '/components/redis' },
              { text: 'MinIO', link: '/components/minio' }
            ]
          },
          {
            text: '跨层协议与标准',
            items: [
              { text: 'MCP 协议', link: '/protocols/mcp' },
              { text: 'A2A 协议', link: '/protocols/a2a' },
              { text: 'OpenAPI', link: '/protocols/openapi' },
              { text: 'JSON Schema', link: '/standards/json-schema' },
              { text: 'OpenAI 兼容 API', link: '/standards/openai-compatible-api' },
              { text: 'OpenTelemetry', link: '/standards/opentelemetry' }
            ]
          }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页内容'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '主题',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    lastUpdated: {
      text: '最后更新于'
    },
    footer: {
      message: 'Open-source first, enterprise-ready.',
      copyright: 'Copyright © 2026'
    }
  }
})
