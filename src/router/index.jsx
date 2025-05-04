// 配置路由
import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import Layout from "@/pages/Layout";
// import Login from "@/pages/Login/index";
// import Home from "@/pages/Home"
// import Article from "@/pages/Article"
// import Publish from "@/pages/Publish"
// import NotFound from '@/components/NotFound'

import { AuthRoute } from './AuthRoute'
import { lazyLoad } from '@/utils'

const Layout = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Login/index'))
// const Home = lazy(() => import('@/pages/Home'))
// const Article = lazy(() => import('@/pages/Article'))
// const Publish = lazy(() => import('@/pages/Publish'))
const NotFound = lazy(() => import('@/components/NotFound'))
const Write = lazy(() => import('@/pages/write'))

// 配置路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={'加载组件动画...'}>
        <AuthRoute>
          <Layout />
        </AuthRoute>
      </Suspense>
    ),
    children: [
      {
        path: '/backend',
        name: '管理平台',
        element: lazyLoad(() => import('@/pages/Layout/Backend')),
        children: [
          {
            path: '',
            index: true,
            name: '首页',
            element: lazyLoad(() => import('@/pages/Home'))
          },
          {
            path: 'publish',
            name: '创建文章',
            element: lazyLoad(() => import('@/pages/publish'))
          },
          {
            path: 'articleManage',
            name: '管理文章',
            element: lazyLoad(() => import('@/pages/articleManage'))
          }
        ]
      },
      {
        path: '/',
        name: '研究院',
        element: lazyLoad(() => import('@/pages/CodeResearch'))
      },
      {
        path: 'article/:id',
        name: '文章',
        element: lazyLoad(() => import('@/pages/article/index'))
      },
      {
        path: 'resultPage',
        name: '反馈页面',
        element: lazyLoad(() => import('@/pages/Result/ResultPage'))
      }
    ]
  },
  {
    path: '/write',
    name: '写文章',
    element: (
      <Suspense fallback={'加载中'}>
        <AuthRoute>
          <Write />
        </AuthRoute>
      </Suspense>
    )
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={'加载中'}>
        <AuthRoute>
          <Login />
        </AuthRoute>
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={'加载中'}>
        <AuthRoute>
          <NotFound />
        </AuthRoute>
      </Suspense>
    )
  }
])

export default router
