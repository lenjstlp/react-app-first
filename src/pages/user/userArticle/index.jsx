import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation } from 'react-router-dom'
import UserArticleItem from './userArticleItem'
import { userPageList } from '@/apis/article'

const UserArticle = forwardRef((props, ref) => {
  const location = useLocation()
  const userId = location.pathname.split('/').pop()

  const [page, setPage] = useState({
    pageNum: 1,
    pageSize: 15,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [articleList, setArticleList] = useState([])
  async function queryArticleList() {
    if (loading) return
    setLoading(true)
    const params = {
      userId,
      pageNum: page.pageNum,
      pageSize: page.pageSize
    }
    const { code, data } = await userPageList(params)
    if (code === 0) {
      setArticleList([...articleList, ...data.data])
      setPage({
        ...page,
        total: data.total,
        pageNum:
          data.data.length === page.pageSize ? page.pageNum + 1 : page.pageNum
      })
    }
    setLoading(false)
  }

  useImperativeHandle(ref, () => {
    return {
      // 对外暴露的数据方法
      page,
      articleList,
      queryArticleList
    }
  })

  useEffect(() => {
    queryArticleList()
  }, [])

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
})

UserArticle.displayName = 'UserArticle'

export default UserArticle
