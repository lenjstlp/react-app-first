// 组合redux子模块，到处store实例
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'
import articleReducer from './modules/article'

export default configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer
  }
})
