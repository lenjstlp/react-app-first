import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  createContext,
  useMemo
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserArticleItem from './userArticleItem'
import { userPageList } from '@/apis/article'

const userArticleContext = createContext() // 创建上下文对象

const UserArticle = forwardRef(function UserArticle(props, ref) {
  const location = useLocation()
  const userId = useMemo(
    () => location.pathname.split('/').pop(),
    [location.pathname]
  )

  const initialPageState = {
    pageNum: 1,
    pageSize: 20,
    total: 0
  }
  const [page, setPage] = useState(initialPageState)
  const [loading, setLoading] = useState(false)
  const [articleList, setArticleList] = useState([])
  async function queryArticleList(isRefresh) {
    if (loading) return
    setLoading(true)

    const params = {
      userId,
      pageNum: isRefresh ? 1 : page.pageNum,
      pageSize: page.pageSize
    }

    const { code, data } = await userPageList(params)
    if (code === 0) {
      if (isRefresh) {
        setArticleList([...data.data])
        // setPage({
        //   ...page,
        //   total: data.total,
        //   pageNum: data.data.length === page.pageSize ? 2 : 1
        // })
        setPage((prevPage) => {
          return {
            ...prevPage,
            total: data.total,
            pageNum: data.data.length === page.pageSize ? 2 : 1
          }
        })
      } else {
        setArticleList([...articleList, ...data.data])
        // setPage({
        //   ...page,
        //   total: data.total,
        //   pageNum:
        //     data.data.length === page.pageSize ? page.pageNum + 1 : page.pageNum
        // })
        setPage((prevPage) => {
          return {
            ...prevPage,
            total: data.total,
            pageNum:
              data.data.length === page.pageSize
                ? page.pageNum + 1
                : page.pageNum
          }
        })
      }
    }
    setLoading(false)
  }

  // 透传刷新页面函数
  function refreshArticleList() {
    setArticleList([])
    setPage((prevPage) => {
      return {
        ...prevPage,
        pageNum: 1,
        total: 0
      }
    })

    queryArticleList(true)
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

  const navigate = useNavigate()
  function articleListClick(e) {
    const targetElement = e.target.closest('[data-e-key]')
    if (targetElement) {
      const id = targetElement.getAttribute('data-e-key')
      navigate(`/article/${id}`)
    }
  }

  return (
    <userArticleContext.Provider value={{ refreshArticleList }}>
      <div
        className='bg-[#fff] mb-[100px] px-[15px]'
        onClick={(e) => articleListClick(e)}>
        {articleList.map((i) => {
          return <UserArticleItem key={i.id} articleItem={i} />
        })}
      </div>
    </userArticleContext.Provider>
  )
})

export default UserArticle

export { userArticleContext }
