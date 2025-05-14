import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Space, theme, Button } from 'antd'
import ViewerContent from '@/components/Viewer'
import ArticleRight from './ArticleRight'
import Look from '@/assets/svg/look.svg?react'
import Shujia from '@/assets/svg/shujia.svg?react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurArticleInfo } from '@/store/modules/article'
import { getArticleById } from '@/apis/article'
import { formatDate } from '@/utils'

function Article() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    token: { colorPrimary, borderRadiusLG }
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
    <div className='flex items-start justify-center p-[15px] h-[100%] bg-[#f5f5f5]'>
      <div className='w-[100px] bg-[#fff]'>左侧</div>
      <div className='mx-[15px]'>
        <div className='flex flex-col w-[800px] p-[36px] bg-[#fff]'>
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
        <div className='bg-[#fff] w-[800px] mt-[15px] px-[36px] mb-[300px] overflow-hidden'>
          <div className='my-[20px] font-bold text-[20px]'>所属专栏</div>
          <div className='flex pb-[15px] border-b-1 border-[#f2f3f5]'>
            <img
              className='w-[110px] h-[80px] object-cover'
              style={{
                borderRadius: borderRadiusLG
              }}
              src={
                'http://localhost:4399/uploads/articlePic/1746353663434-609488233.png'
              }
            />
            <div className='flex flex-col justify-between flex-1 px-[15px] w-[100%]'>
              <div className='text-[16px]'>专栏名称</div>
              <div className='flex-1 text-[#8a919f]'>
                专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
                专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
                专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
              </div>
              <div className='text-[#8a919f]'>15篇文章</div>
            </div>
            <div>
              <Button type='primary' ghost>
                进入专栏
              </Button>
              <Button type='primary' ghost>
                订阅
              </Button>
            </div>
          </div>
          <div className='flex text-[16px] py-[20px]'>
            <div className='flex items-center w-[50%]'>
              <div className='text-[#8a919f] text-[14px] pr-[15px]'>
                上篇文章
              </div>
              <div className='flex-1 text-[16px] truncate'>
                上篇文章上篇文章上篇文章上篇文章上篇文章上篇文章上篇文章
              </div>
            </div>
            <div className='flex w-[50%]'>
              <div className='text-[#8a919f] text-[14px] pr-[15px]'>
                下篇文章
              </div>
              <div className='flex-1 text-[16px] truncate'>
                下篇文章下篇文章下篇文章下篇文章下篇文章下篇文章下篇文章
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[260px]'>
        <ArticleRight />
      </div>
    </div>
  )
}

export default Article
