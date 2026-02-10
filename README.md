# React + TypeScript + Vite + Electron

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

## 扩展 ESLint 配置

如果你正在开发生产级应用，我们建议更新配置以启用感知类型的 lint 规则：

- 配置顶层的 `parserOptions` 属性如下：

```js
export default {
  // 其他规则...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- 将 `plugin:@typescript-eslint/recommended` 替换为 `plugin:@typescript-eslint/recommended-type-checked` 或 `plugin:@typescript-eslint/strict-type-checked`
- 可选添加 `plugin:@typescript-eslint/stylistic-type-checked`
- 安装 [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) 并添加 `plugin:react/recommended` & `plugin:react/jsx-runtime` 到 `extends` 列表中
