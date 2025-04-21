// 用户相关状态管理
import { createSlice } from '@reduxjs/toolkit'
import http from '@/http'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

const { setToken } = userStore.actions

const userReducer = userStore.reducer

const login = (loginForm, callback) => {
    return async (dispatch) => {
        const res = await http.post('/api/login', loginForm)
        if (res.code === 0) {
            dispatch(setToken(res.data))
            callback()
            return
        }
        dispatch(setToken(''))
    }
}

export { setToken, login }

export default userReducer