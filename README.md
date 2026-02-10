# React + TypeScript + Vite + Electron

此模板提供了一个最小化的设置，用于在 Vite 中使 React 及其 HMR (热模块替换) 正常工作，并包含了一些 ESLint 规则。

目前，有两个官方插件可用：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) 使用 [Babel](https://babeljs.io/) 实现快速刷新 (Fast Refresh)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) 使用 [SWC](https://swc.rs/) 实现快速刷新 (Fast Refresh)

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
