import { useEffect, useState } from 'react'
import { theme, Avatar } from 'antd'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import VipText from '@/components/VipText'
import UserArticleItem from '../../userArticle/userArticleItem'
import { getColumnArticles } from '@/apis/article'
import { getColumnInfoById } from '@/apis/column'
import { formatDate } from '@/utils'
function ColumnDetail() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  // user
  const userInfo = useSelector((state) => state.user.userInfo)

  const location = useLocation()
  const articleIds = location.state.articleIds
  const params = useParams()
  const columnId = params.columnId

  // 格式数据
  function formatNumberData(str) {
    if (!str) return 0
    return str.split(',').length
  }
  const [columnInfo, setColumnInfo] = useState({})
  // 获取专栏详情
  async function queryColumnInfo() {
    const { code, data } = await getColumnInfoById({ columnId })
    if (code === 0) {
      setColumnInfo({
        ...data,
        articleNum: formatNumberData(data.articleIds),
        subscriberNum: formatNumberData(data.subscriberIds)
      })
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

  function articleListClick(e) {
    const targetElement = e.target.closest('[data-e-key]')
    if (targetElement) {
      const id = targetElement.getAttribute('data-e-key')
      window.location.href = `/article/${id}`
    }
  }
  return (
    <div className='w-[900px] mx-auto'>
      <div
        style={{ borderRadius: borderRadiusLG }}
        className='mt-[15px] bg-[#fff] p-[15px]'>
        <div className='text-[18px] mb-[15px]'>{columnInfo.columnName}</div>
        <div className='flex'>
          <img
            className='w-[120px] h-[100%] object-cover'
            src={columnInfo.columnCover}
            alt=''
          />
          <div className='flex flex-col justify-between flex-1 ml-[15px]'>
            <div className='flex items-center gap-[10px]'>
              <Avatar
                size={30}
                src={<img src={userInfo.avatar} alt='avatar' />}
              />
              <div>{userInfo.name}</div>
              <VipText />
            </div>
            <div className='text-[14px] text-[#8a919f] line-clamp-2'>
              {columnInfo.columnIntro}
            </div>
            <div className='text-[#8a919f] text-[12px] mt-[15px]'>
              <div className='flex gap-[10px] text-[#8a919f]'>
                <div className='flex items-center'>
                  <div>创建于：</div>
                  {formatDate(columnInfo.createTime)}
                </div>
                <div className='flex items-center'>
                  <div>文章数：</div>
                  {columnInfo.articleNum}
                </div>
                <div className='flex items-center'>
                  <div>订阅数：</div>
                  {columnInfo.subscriberNum}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[15px]'>
        <div className='bg-[#fff] text-[16px] p-[15px] border-b-1 border-[#f2f3f5]'>
          专栏文章列表
        </div>
        <div
          className='bg-[#fff] mb-[100px] px-[15px]'
          onClick={(e) => articleListClick(e)}>
          {articleList.map((item) => {
            return (
              <UserArticleItem
                height={'120px'}
                key={item.id}
                articleItem={item}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ColumnDetail
