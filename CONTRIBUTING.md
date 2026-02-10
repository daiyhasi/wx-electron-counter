# 项目结构与贡献指南

本项目遵循企业级 Electron 架构，实现了关注点严格分离并采用了现代化的工具链。

## 目录结构

```plaintext
wx-electron-counter/
├── src/
│   ├── main/           # 主进程 (Node.js) - 后端逻辑
│   ├── preload/        # 预加载脚本 - 主进程与渲染进程之间的安全桥梁
│   └── renderer/       # 渲染进程 (React + Vite) - 前端 UI
├── dist/               # 渲染进程的生产环境构建产物
├── dist-electron/      # 主进程/预加载脚本的生产环境构建产物
├── electron-builder.json5 # 安装包配置
└── vite.config.ts      # 统一的构建配置
```

## 开发流程

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **启动开发模式**:
    ```bash
    npm run dev
    ```
    这将启动 Vite 开发服务器用于渲染进程，并以监听模式编译主进程。

3.  **生产环境构建**:
    ```bash
    npm run build
    ```
    这将编译 TypeScript，构建渲染进程和主进程，并使用 `electron-builder` 打包应用程序。

## 架构亮点

-   **技术栈**: Electron + Vite + React + TypeScript。
-   **安全性**: 启用了上下文隔离 (Context Isolation)。在渲染进程中禁用了 Node 集成。
-   **通信**: 所有 IPC 通信都应使用类型定义，并建议在 `src/shared` 中定义（推荐）或通过类型化的预加载脚本暴露。
