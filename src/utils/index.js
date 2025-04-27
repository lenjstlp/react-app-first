export { getToken, setToken, removeToken } from './token'
export { lazyLoad } from './lazyLoad'
import dayjs from 'dayjs'

// 字典label选取
export function dictSelect(arr, value, field = 'label') {
    return arr.find(i => {
        return i.value === value
    })?.[field] || value
}
// 时间快捷方法
export function formatDate(val, date = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(val).format(date)
}