import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  // 核心规则
  js.configs.recommended,
  // 浏览器环境配置
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  },
  // React 配置（关键修复）
  {
    // 手动定义 React 插件（避免继承旧格式）
    plugins: {
      react: pluginReact // 将插件对象赋值给 react 键
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // 手动合并推荐规则
      'react/react-in-jsx-scope': 'off'
    }
  },

  // Prettier 集成（必须放在最后）
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': [
        'error',
        {}, // 空对象让 Prettier 读取 .prettierrc.json
        { usePrettierrc: true }
      ]
    }
  }
]
