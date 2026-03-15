# 玄机问事 V1（易经六爻 + 塔罗问事）

一个可本地直接运行的中文问事占卜网站雏形，基于 Next.js App Router + TypeScript + Tailwind CSS。

## 功能概览

- 首页、占卜方式选择、六爻、塔罗、结果、历史、关于、免责声明完整路由
- 统一问题输入组件（10-100 字校验、问题分类）
- 六爻流程：输入问题 → 模拟六次起爻 → 生成本卦/变卦 → 跳转结果
- 塔罗流程：输入问题 → 洗牌抽三张（过去/现在/未来）→ 跳转结果
- 结果页支持 **高情商版 / 犀利版** 解读风格切换
- localStorage 历史记录（保存、查看详情、删除、清空）
- 免责声明在首页、结果页和独立页面展示
- 预留后续 AI 解读 / 会员 / 支付扩展空间（类型与数据结构已模块化）

## 技术栈

- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- 纯前端本地 mock 数据 + localStorage

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 常用命令

```bash
npm run dev        # 开发模式
npm run build      # 生产构建
npm run start      # 启动生产服务
npm run lint       # ESLint
npm run typecheck  # TypeScript 类型检查
```

## 项目结构

```text
app/                # 页面路由
components/         # 可复用组件
data/               # mock 数据
lib/                # 工具函数（生成逻辑、本地存储）
types/              # 类型定义
```

## 说明

- 当前占卜结果使用 mock 规则生成，重点在产品流程与交互骨架。
- 所有记录保存在浏览器 localStorage，不依赖后端数据库。
