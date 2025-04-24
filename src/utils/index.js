export { getToken, setToken, removeToken } from './token'
export { lazyLoad } from './lazyLoad'

// 字典label选取
export function dictSelect(arr, value) {
    return arr.find(i => {
        return i.value === value
    })?.label || value
}