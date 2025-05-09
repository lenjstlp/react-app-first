import { useEffect, useState } from 'react'
import { theme } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { getRecommendArticles } from '@/apis/article'

function ArticleRecommend() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const [hotArticles, setHotArticles] = useState([])
  async function changeHotArticles() {
    const { code, data } = await getRecommendArticles()
    if (code === 0) {
      setHotArticles(data)
    }
  }

  useEffect(() => {
    changeHotArticles()
  }, [])
  return (
    <div
      style={{ borderRadius: borderRadiusLG }}
      className='bg-[#fff] p-[15px] mb-[15px]'>
      <div className='flex justify-between text-[18px] pb-[10px] border-b-1 border-[#f2f3f5]'>
        <div>热门推荐</div>
        <div
          className='cursor-pointer text-[#8a919f] text-[14px]'
          onClick={() => changeHotArticles()}>
          <ReloadOutlined className='mr-[7px]' />
          换一批
        </div>
      </div>
      {hotArticles.map((i, index) => {
        return (
          <div
            key={i.id}
            className='flex items-center h-[36px] text-[16px] cursor-pointer'>
            <div className='mr-[15px]'>{index + 1}</div>
            <div className='truncate'>{i.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArticleRecommend
