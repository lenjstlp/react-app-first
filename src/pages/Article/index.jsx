import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Space, theme } from 'antd'
import ViewerContent from '@/components/Viewer'
import ArticleRight from './ArticleRight'
import ArticleLeft from './ArticleLeft'
import Look from '@/assets/svg/look.svg?react'
import Shujia from '@/assets/svg/shujia.svg?react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurArticleInfo } from '@/store/modules/article'
import { getArticleById } from '@/apis/article'
import { formatDate } from '@/utils'

import ArticleColumn from './ArticleColumn/index'

function Article() {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    token: { colorPrimary }
  } = theme.useToken()

  const dispatch = useDispatch()

  const [value, setValue] = useState('')

  // user
  const userInfo = useSelector((state) => state.user.userInfo)

  const isAuthor = userInfo.token && userInfo.id === value.creatorId

  async function queryArticleById() {
    const id = location.pathname.split('/')[2]
    const { code, data } = await getArticleById({ id })
    if (code === 0) {
      dispatch(setCurArticleInfo(data))
      setValue(data)
    }
  }

  useEffect(() => {
    queryArticleById()
  }, [])

  return (
    <div className='flex items-start p-[15px] h-[100%] bg-[#f5f5f5] overflow-y-auto'>
      <ArticleLeft />
      <div className='min-w-[660px] max-w-[800px] mx-[15px]'>
        <div className='flex flex-col p-[36px] bg-[#fff]'>
          <div className='font-bold text-[30px] text-wrap'>{value.title}</div>
          <div className='flex py-[15px] text-[16px] text-[#8a919f]'>
            <Space size='middle'>
              <div>{value.creator}</div>
              <div>{formatDate(value.createTime)}</div>
              <div className='flex items-center justify-center'>
                <Look className='text-[16px] mr-[5px]' />
                {value.read}
              </div>
              {value.specialColumn && (
                <div className='flex items-center justify-center'>
                  <Shujia className='text-[16px] mr-[5px]' />
                  专栏：
                  {value.specialColumn}
                </div>
              )}
            </Space>
            {isAuthor && (
              <div
                style={{ color: colorPrimary }}
                className='flex ml-auto cursor-pointer'
                onClick={() =>
                  navigate('/write' + '?' + 'id' + '=' + value.id)
                }>
                编辑
              </div>
            )}
          </div>
          <div className='flex justify-center items-center h-[50px] text-[19px] text-[#fff] mb-[20px] bg-[tan]'>
            广告位招租！
          </div>
          <ViewerContent value={value.content} />
        </div>
        <ArticleColumn />
      </div>
      <div className='w-[260px] mr-auto'>
        <ArticleRight />
      </div>
    </div>
  )
}

export default Article
