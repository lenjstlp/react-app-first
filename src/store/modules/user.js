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

const login = (loginForm) => {
    return async (dispatch) => {
        const res = await http.post('/api/login', loginForm)
        dispatch(setToken(res.data))
    }
}

export { setToken, login }

export default userReducer