// 配置路由
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import { AuthRoute } from './AuthRoute'
import { lazyLoad } from '@/utils'

const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login/index'))
const NotFound = lazy(() => import('@/components/NotFound'))
const Write = lazy(() => import('@/pages/write'))

// 管理平台
const Backend = lazyLoad(() => import('@/pages/Layout/Backend'))
const Home = lazyLoad(() => import('@/pages/Home'))
const Publish = lazyLoad(() => import('@/pages/publish'))
const ArticleManage = lazyLoad(() => import('@/pages/articleManage'))
// 研究院
const CodeResearch = lazyLoad(() => import('@/pages/CodeResearch'))
const Article = lazyLoad(() => import('@/pages/article/index'))
const User = lazyLoad(() => import('@/pages/user/index'))
const ColumnDetail = lazyLoad(
  () => import('@/pages/user/column/ColumnDetail/index')
)
const ResultPage = lazyLoad(() => import('@/pages/Result/ResultPage'))

// 配置路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: '/backend',
        name: '管理平台',
        element: <Backend />,
        children: [
          {
            path: '',
            index: true,
            name: '首页',
            element: <Home />
          },
          {
            path: 'publish',
            name: '创建文章',
            element: <Publish />
          },
          {
            path: 'articleManage',
            name: '管理文章',
            element: <ArticleManage />
          }
        ]
      },
      {
        index: true,
        name: '研究院',
        element: <CodeResearch />
      },
      {
        path: 'article/:id',
        name: '文章',
        element: <Article />
      },
      {
        path: 'user/:id',
        name: '我的主页',
        element: <User />
      },
      {
        path: 'column/:columnId',
        name: '专栏详情页',
        element: <ColumnDetail />
      },
      {
        path: 'resultPage',
        name: '反馈页面',
        element: <ResultPage />
      }
    ]
  },
  {
    path: '/write',
    name: '写文章',
    element: (
      <AuthRoute>
        <Write />
      </AuthRoute>
    )
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    )
  },
  {
    path: '*',
    element: (
      <AuthRoute>
        <NotFound />
      </AuthRoute>
    )
  }
])

export default router
