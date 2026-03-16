# Casbin

> 类型：授权与策略裁决引擎
>
> 复用规则：稳定复用的组件说明页
>
> 所属层：治理与观测层
>
> 官方网站：https://casbin.org/docs/overview
>
> 开源仓库地址：https://github.com/apache/casbin

## 当前定位

`Casbin` 是当前方案的统一授权裁决层，负责应用访问、知识权限和工具调用授权。

## 主要职责

- 应用级授权
- 知识库访问控制
- 工具调用权限控制
- 多租户与部门级授权

## 与其他组件关系

- 身份由企业现有 `SSO / IAM` 提供，`Casbin` 负责授权裁决而不是身份认证。
- 与 [APISIX](/components/apisix)、门户层、编排层和知识服务配合，在关键动作处做权限判断。
- 与 [LangFuse](/components/langfuse) 和统一审计链路配合，保留策略生效证据。
- 对工具调用、知识访问和应用入口提供统一授权口径。

## 适合场景

- 企业级应用访问控制
- 知识库与数据服务访问控制
- 工具调用与敏感操作授权
- 多租户、部门级或角色属性混合授权

## 边界

- 不替代身份认证系统
- 不替代业务审批流

## 采用规则

- 当前方案默认以 `Casbin` 作为细粒度授权裁决引擎。
- 身份源继续复用企业既有 `SSO / IAM`，不在组件清单中引入第二套身份系统。
- 任何关键业务动作都不应仅依赖前端可见性或网关路由规则判断权限。

## 治理注意点

- 权限模型、策略版本和发布流程需要可审计、可回滚。
- 应用、知识和工具权限要尽量使用统一口径，而不是每个系统各写一套私有规则。
- 对敏感操作建议配合审批、双人复核或人工确认机制。
- 授权结果和上下文应进入统一追踪链路，便于问题复盘。

## 关联文档

- [8. 治理与观测层](/layers/governance-observability)
- [安全与治理](/governance)
- [身份接入协议](/protocols/identity-access)
- [APISIX](/components/apisix)

## 参考资料

- [Casbin Documentation](https://casbin.org/docs/overview)
- [Apache Casbin GitHub Repository](https://github.com/apache/casbin)
