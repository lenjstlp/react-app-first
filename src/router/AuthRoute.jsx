import { getToken } from '@/utils'
import { Navigate, useLocation } from 'react-router-dom'

export function AuthRoute({ children }) {
  const token = getToken()
  const location = useLocation()

  if (token) {
    // 若登录且跳转去登录页，导航到首页
    if (location.pathname === '/login') {
      return <Navigate to={'/'} replace />
    }
    // 登录，渲染当前页
    return <>{children}</>
  } else {
    // 若退登，渲染登录页
    if (location.pathname === '/login') {
      return <>{children}</>
    }
    // 非登录页，跳转到登录页
    return <Navigate to={'/login'} replace />
  }
}
