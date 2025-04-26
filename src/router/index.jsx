// 配置路由
import { createBrowserRouter } from "react-router-dom";
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

// 配置路由实例
const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={'加载中'}><AuthRoute><Layout /></AuthRoute></Suspense>,
        children: [
            {
                // path: '/home',
                index: true,
                name: '首页',
                element: lazyLoad(() => import('@/pages/Home'))
            },
            {
                path: '/publish',
                name: '创建文章',
                element: lazyLoad(() => import('@/pages/publish'))
            },
            {
                path: '/articleManage',
                name: '管理文章',
                element: lazyLoad(() => import('@/pages/articleManage'))
            },
        ]
    },
    {
        path: '/login',
        element: <Suspense fallback={'加载中'}><AuthRoute><Login /></AuthRoute></Suspense>
    },
    {
        path: '*',
        element: <Suspense fallback={'加载中'}><AuthRoute><NotFound /></AuthRoute></Suspense>
    }
])

export default router