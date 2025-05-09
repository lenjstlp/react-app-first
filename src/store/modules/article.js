// 文章相关状态管理
import { createSlice } from '@reduxjs/toolkit'

const articleStore = createSlice({
  name: 'article',
  initialState: {
    // 当前预览文章
    curArticleInfo: {}
  },
  reducers: {
    setCurArticleInfo(state, action) {
      state.curArticleInfo = action.payload
    },
    clearCurArticleInfo(state) {
      state.curArticleInfo = {}
    }
  }
})

const { setCurArticleInfo, clearCurArticleInfo } = articleStore.actions

const articleReducer = articleStore.reducer

export { setCurArticleInfo, clearCurArticleInfo }

export default articleReducer
