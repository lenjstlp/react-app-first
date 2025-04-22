export { getToken, setToken, removeToken } from './token'

// 字典label选取
export function dictSelect(arr, value) {
    return arr.find(i => {
        return i.value === value
    })?.label || value
}