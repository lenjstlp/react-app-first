// 配置路由
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/pages/Layout/index.jsx";
import Login from "@/pages/Login/index";

import { AuthRoute } from '@/components/AuthRoute'

// 配置路由实例
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router