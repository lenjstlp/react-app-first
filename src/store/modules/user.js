// 用户相关状态管理
import { createSlice } from '@reduxjs/toolkit'
import { login as loginAPI } from '@/apis/user'
import { setToken as _setToken, getToken } from '@/utils'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: JSON.parse(localStorage.getItem('USER_INfO')) || {}
    },
    reducers: {
        setUserInfo(state, action) {
            state.token = action.payload.token
            _setToken(action.payload.token)
            state.userInfo = action.payload
            localStorage.setItem('USER_INfO', JSON.stringify(action.payload))
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            _setToken('')
            localStorage.setItem('USER_INfO', JSON.stringify({}))
        }
    }
})

const { setUserInfo, clearUserInfo } = userStore.actions

const userReducer = userStore.reducer

const login = (loginForm, callback) => {
    return async (dispatch) => {
        const res = await loginAPI('/login', loginForm)
        if (res.code === 0) {
            dispatch(setUserInfo(res.data))
            callback()
            return
        }
        dispatch(clearUserInfo())
    }
}

export { login, clearUserInfo }

export default userReducer