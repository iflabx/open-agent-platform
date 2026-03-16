# 企业级智能体开源系统方案

这是一个基于 `VitePress` 的中文文档站，主题聚焦于企业级智能体系统的架构设计、技术选型、安全治理和落地路线，适合直接发布到 GitHub Pages。

## 本地运行

```bash
npm install
npm run docs:dev
```

默认访问地址：

```text
http://localhost:5173/
```

## 构建静态站点

```bash
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist`。

## 发布到 GitHub Pages

1. 将仓库推送到 GitHub。
2. 保持默认分支为 `main`。
3. 进入仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择 `GitHub Actions`。
5. 推送代码后，仓库内置的工作流会自动构建并发布站点。

站点 `base` 会在 GitHub Actions 中根据仓库名自动计算，不需要手动修改。
