---
title: 文档首页
aside: false
outline: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="docs-home-hero">
  <p class="docs-home-kicker">Enterprise Agent Documentation</p>
  <h1>企业级智能体开源系统方案</h1>
  <p class="docs-home-lead">
    面向数万人规模企业、全私有化环境与平台化复用场景的系统建设蓝图。覆盖总体架构、能力规范、协议标准、组件选型与分阶段部署路线，帮助企业构建可治理、可扩展、可复用的智能体底座。
  </p>
  <div class="docs-pill-row">
    <a :href="withBase('/framework')">方案</a>
    <a :href="withBase('/capability-framework')">能力与规范体系</a>
    <a :href="withBase('/protocol-standards')">协议与标准体系</a>
    <a :href="withBase('/components')">组件</a>
    <a :href="withBase('/open-source-status')">开源状态</a>
  </div>
</div>

<div class="docs-home-panel">
  <div class="docs-home-panel-copy">
    <span>推荐起点</span>
    <strong>从主方案建立全局视图，再按架构、协议、组件与治理逐层深入。</strong>
    <p>首次阅读建议直接进入主方案；若当前聚焦平台边界划分与集成规范，可优先查看协议与标准体系及能力规范体系。</p>
  </div>
  <div class="docs-home-panel-actions">
    <a :href="withBase('/framework')">阅读主方案</a>
    <a :href="withBase('/doc-index')">查看总索引</a>
    <a :href="withBase('/deployment')">部署与发布</a>
  </div>
</div>

## 按目标选择阅读入口

<p class="docs-section-intro">根据当前关注重点，选择最高效的切入路径：</p>

<div class="docs-card-grid docs-card-grid-3">
  <a class="docs-card" :href="withBase('/framework')">
    <span>01</span>
    <strong>方案全貌</strong>
    <p>系统了解核心组件组合、职责边界与从试点到生产的实施路线。</p>
  </a>
  <a class="docs-card" :href="withBase('/architecture')">
    <span>02</span>
    <strong>架构与标准</strong>
    <p>厘清九层架构、数据治理、协议互操作与授权审计链路，建立统一技术口径。</p>
  </a>
  <a class="docs-card" :href="withBase('/components')">
    <span>03</span>
    <strong>组件与合规</strong>
    <p>快速核对开源组件清单、采用规则与许可证口径，支撑技术选型与法务评估。</p>
  </a>
</div>

## 从蓝图到生产

<p class="docs-section-intro">沿“理解 → 设计 → 标准化 → 落地”四个阶段，完成企业级智能体平台的规划与投产。</p>

<div class="docs-journey-grid">
  <a class="docs-step-card" :href="withBase('/guide/')">
    <span>1</span>
    <strong>明确目标</strong>
    <p>通过方案综述对齐建设定位、核心原则与优先落地场景。</p>
  </a>
  <a class="docs-step-card" :href="withBase('/architecture')">
    <span>2</span>
    <strong>规划架构</strong>
    <p>对照总体架构、数据治理与安全治理，划清执行面、数据面与控制面边界。</p>
  </a>
  <a class="docs-step-card" :href="withBase('/protocol-standards')">
    <span>3</span>
    <strong>统一标准</strong>
    <p>收敛 <code>MCP</code>、<code>A2A</code>、身份接入、接口契约、授权规范与可观测语义。</p>
  </a>
  <a class="docs-step-card" :href="withBase('/deployment')">
    <span>4</span>
    <strong>分步落地</strong>
    <p>结合组件清单、许可证基线、分规模部署拓扑与路线图，推进试点与规模化投产。</p>
  </a>
</div>

## 规范与参考库

<p class="docs-section-intro">按协议、标准、治理规范与全站目录，快速检索具体技术口径与落地约束。</p>

<div class="docs-card-grid docs-card-grid-4">
  <a class="docs-card docs-card-compact" :href="withBase('/protocols/')">
    <strong>协议页</strong>
    <p><code>MCP</code>、<code>A2A</code>、身份接入协议与 <code>OpenAPI</code> 的接入边界与采用规则。</p>
  </a>
  <a class="docs-card docs-card-compact" :href="withBase('/standards/')">
    <strong>标准页</strong>
    <p><code>JSON Schema</code>、<code>OpenAI 兼容 API</code> 与 <code>OpenTelemetry</code> 的统一基线。</p>
  </a>
  <a class="docs-card docs-card-compact" :href="withBase('/norms/')">
    <strong>规范页</strong>
    <p><code>RBAC + ABAC</code>、<code>Policy as Code</code> 与 <code>Maker-Checker</code> 的治理约束。</p>
  </a>
  <a class="docs-card docs-card-compact" :href="withBase('/doc-index')">
    <strong>总索引</strong>
    <p>按层级与主题浏览全站文档目录，直达任意专题或组件详情页。</p>
  </a>
</div>
