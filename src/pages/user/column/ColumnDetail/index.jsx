import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getColumnArticles } from '@/apis/article'
function ColumnDetail() {
  const location = useLocation()
  const articleIds = location.state.articleIds

  const [articleList, setArticleList] = useState([])
  // 获取专栏文章列表
  async function queryColumnArticles() {
    const { code, data } = await getColumnArticles({ articleIds })
    if (code === 0) {
      setArticleList(data)
    }
  }
  useEffect(() => {
    queryColumnArticles()
  }, [])
  console.log(articleList, '文章列表刷新')

  return <div>专栏详情页面</div>
}

export default ColumnDetail
