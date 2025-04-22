// 配置路由
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/pages/Layout/index.jsx";
import Login from "@/pages/Login/index";
import Home from "@/pages/Home"
import Article from "@/pages/Article"
import Publish from "@/pages/Publish"

import { AuthRoute } from '@/components/AuthRoute'

// 配置路由实例
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                // path: '/home',
                index: true,
                element: <Home />
            },
            {
                path: '/article',
                element: <Article />
            },
            {
                path: '/publish',
                element: <Publish />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router