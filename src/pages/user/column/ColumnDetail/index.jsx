import { useEffect, useState } from 'react'
import { theme } from 'antd'
import { useLocation, useParams } from 'react-router-dom'
import { getColumnArticles } from '@/apis/article'
import { getColumnInfoById } from '@/apis/column'
function ColumnDetail() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const location = useLocation()
  const articleIds = location.state.articleIds
  const params = useParams()
  const columnId = params.columnId

  const [columnInfo, setColumnInfo] = useState({})
  // 获取专栏详情
  async function queryColumnInfo() {
    const { code, data } = await getColumnInfoById({ columnId })
    if (code === 0) {
      setColumnInfo(data)
    }
  }

  const [articleList, setArticleList] = useState([])
  // 获取专栏文章列表
  async function queryColumnArticles() {
    const { code, data } = await getColumnArticles({ articleIds })
    if (code === 0) {
      setArticleList(data)
    }
  }
  useEffect(() => {
    queryColumnInfo()
    queryColumnArticles()
  }, [])
  console.log(articleList, columnInfo, '文章列表刷新')

  return (
    <div className='w-[900px] mx-auto'>
      <div
        style={{ borderRadius: borderRadiusLG }}
        className='mt-[15px] bg-[#fff]'>
        <div className='p-[15px]'>专栏详情</div>
      </div>
      <div className='mt-[15px]'>
        <div
          style={{ borderRadius: borderRadiusLG }}
          className='bg-[#fff] p-[15px]'>
          专栏文章列表
        </div>
        <div>articleList</div>
      </div>
    </div>
  )
}

export default ColumnDetail
