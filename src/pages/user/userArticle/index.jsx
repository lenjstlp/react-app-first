import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserArticleItem from './userArticleItem'
import { userPageList } from '@/apis/article'

function UserArticle() {
  const location = useLocation()
  const userId = location.pathname.split('/').pop()

  const [page, setPage] = useState({
    pageNum: 1,
    pageSize: 15
  })
  const [total, setTotal] = useState(0)
  const [articleList, setArticleList] = useState([])
  async function queryArticleList(params) {
    const { code, data } = await userPageList({ ...params, userId })
    if (code === 0) {
      setArticleList(data.data)
      setTotal(data.total)
      console.log(total, setPage)
    }
  }

  useEffect(() => {
    const params = {
      pageNum: page.pageNum,
      pageSize: page.pageSize
    }
    queryArticleList(params)
  }, [page])

  function articleListClick(e) {
    const targetElement = e.target.closest('[data-e-key]')
    if (targetElement) {
      const id = targetElement.getAttribute('data-e-key')
      window.location.href = `/article/${id}`
    }
  }

  return (
    <div
      className='bg-[#fff] mb-[100px] px-[15px]'
      onClick={(e) => articleListClick(e)}>
      {articleList.map((i) => {
        return <UserArticleItem key={i.id} articleItem={i} />
      })}
    </div>
  )
}

export default UserArticle
