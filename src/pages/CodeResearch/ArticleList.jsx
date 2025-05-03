import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleListItem from './ArticleListItem'
import { pageList } from '@/apis/article'

function ArticleList({ articleListParams }) {
  const navigate = useNavigate()

  const [articleList, setArticleList] = useState([])
  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  async function pageListArticle(val) {
    const params = { ...val, ...articleListParams }
    const { code, data } = await pageList(params)
    if (code === 0) {
      console.log(data, '============')
      setArticleList(data.data)
      setParams({
        ...params,
        total: data.total
      })
    }
  }

  useEffect(() => {
    setArticleList([])
    pageListArticle(params)
  }, [articleListParams])

  function handleClick(e) {
    const targetElement = e.target.closest('[data-e-key]')
    if (targetElement) {
      console.log(targetElement, targetElement.dataset.id)
      const eKey = targetElement.dataset.eKey
      navigate(`/article/${eKey}`)
      // window.open(`/article/${eKey}`, '_blank')
    }
  }

  return (
    <div onClick={(e) => handleClick(e)}>
      {articleList.map((item) => {
        return (
          <ArticleListItem
            key={item.id}
            articleItem={item}
            eventKey={item.id}
          />
        )
      })}
    </div>
  )
}

export default ArticleList
