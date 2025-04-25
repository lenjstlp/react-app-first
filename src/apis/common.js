// 公共接口请求
import http from '@/http'

// 404退登测试接口
export function log401() {
    return http.get('/logout401')
}