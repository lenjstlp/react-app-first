import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from 'antd'
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

  const navigate = useNavigate()
  return (
    <div
      style={{ borderRadius: borderRadiusLG }}
      className='bg-[#fff] p-[15px] mb-[15px]'>
      <div className='flex justify-between text-[16px] pb-[10px] border-b-1 border-[#f2f3f5]'>
        <div>相关推荐</div>
      </div>
      {hotArticles.map((i) => {
        return (
          <div
            key={i.id}
            className='flex flex-col h-[50px] text-[16px] cursor-pointer'
            onClick={() => navigate(`/article/${i.id}`)}>
            <div className='text-[16px]/[30px] truncate'>{i.title}</div>
            <div className='text-[14px]/[20px] text-[#8a919f]'>
              {i.read} 阅读 - {i.like} 点赞
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ArticleRecommend
