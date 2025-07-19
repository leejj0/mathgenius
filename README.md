# MathGenius

一个为小学生设计的趣味数学题生成与练习平台，支持年级和知识点自选，题目自动生成，界面卡通美观，支持批量预取、答案高亮、移动端自适应。

## 主要功能
- 支持六个年级（小学1-6年级）和各年级知识点自选
- 首页知识点选项大卡片风格，交互友好
- 题目生成后进入专属答题页面
- 每次只加载一题，支持批量预取，切题流畅
- 点击“展示答案”后，正确选项高亮显示，解析同步展示
- 支持上一题/下一题切换，切题自动隐藏答案
- 卡通装饰元素丰富，界面美观
- 支持移动端自适应

## 技术栈
- React 19 + react-router-dom 6
- Vercel Serverless API（api/generate.js）
- CSS 自定义样式

## 目录结构
```
mathgenius/
  ├── api/                # Vercel Serverless API（题目生成接口）
  ├── public/             # 静态资源
  ├── src/                # 前端 React 源码
  │   ├── components/     # 组件（MathForm, QuestionCard, BrandLogo等）
  │   ├── App.js          # 路由与主页面
  │   └── App.css         # 全局样式
  ├── package.json        # 依赖与脚本
  └── README.md           # 项目说明
```

## 本地开发
1. 安装依赖
   ```sh
   npm install
   ```
2. 启动本地 Serverless API 和前端
   ```sh
   npx vercel dev
   ```
   或分别启动：
   ```sh
   npm start
   # 另开终端
   cd api && node generate.js
   ```
3. 访问 http://localhost:3000

## Vercel 部署
- 绑定 GitHub 仓库，推送代码后自动部署
- Serverless API 自动生效，无需手动配置

## 常见问题
- **题目接口 404**：请用 `vercel dev` 启动，或确保 `/api/generate` 已被正确代理
- **推送失败/网络问题**：建议用 SSH 或代理推送代码
- **卡通装饰不显示**：请确保 App.js 中装饰元素在 `.App-bg-abs` 容器内
- **答案高亮无效**：请刷新页面，确保样式已更新

## 联系与反馈
如有建议或问题，欢迎在 GitHub Issue 区留言。
