import { useEffect, useState } from 'react'
import { theme, Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import useDicts, { dictSelect } from '@/hooks/useDicts'

import { getUserInfoDetail } from '@/apis/user'

function ArticleAuthor() {
  const {
    token: { borderRadiusLG, colorPrimary }
  } = theme.useToken()

  const { dicts } = useDicts({ type: 'VIP_LEVEL' })

  const [userInfoDetail, setUserInfoDetail] = useState({})
  async function queryUserInfoDetail() {
    const { code, data } = await getUserInfoDetail()
    if (code === 0) {
      setUserInfoDetail(data)
    }
  }
  useEffect(() => {
    queryUserInfoDetail()
  }, [])

  const userInfo = useSelector((state) => state.user.userInfo)
  // 当前预览文章
  const curArticleInfo = useSelector((state) => state.article.curArticleInfo)

  return (
    <div
      style={{ borderRadius: borderRadiusLG }}
      className='bg-[#fff] p-[15px] mb-[15px]'>
      <div className='flex mb-[10px]'>
        <div className='mr-[10px] w-[50px] h-[50px]'>
          {userInfo.avatar ? (
            <Avatar
              size={50}
              src={<img src={userInfo.avatar} alt='avatar' />}
            />
          ) : (
            <Avatar size={100} icon={<UserOutlined />} />
          )}
        </div>
        <div className='flex flex-col justify-between py-[5px]'>
          <div className='flex items-center text-[16px] px-[5px]'>
            <div className='mr-[5px]'>{userInfo.name}</div>
            <div
              style={{ background: colorPrimary, borderRadius: borderRadiusLG }}
              className='text-[12px] px-[5px] py-[3px] text-[#fff] text-nowrap'>
              {dicts['VIP_LEVEL'] &&
                dictSelect(dicts['VIP_LEVEL'], userInfo.level)}
            </div>
          </div>
          <div className='text-[#8a919f] text-[14px]'>{userInfo.intro}</div>
        </div>
      </div>
      <div className='flex justify-between text-[14px] px-[30px]'>
        <div className='flex flex-col items-center'>
          <div>{userInfoDetail.articlesNum}</div>
          <div className='text-[#8a919f] mt-[5px]'>文章</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>{userInfoDetail.articlesReadNum}</div>
          <div className='text-[#8a919f] mt-[5px]'>阅读</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>{userInfo.fans}</div>
          <div className='text-[#8a919f] mt-[5px]'>粉丝</div>
        </div>
      </div>
      {userInfo.id !== curArticleInfo.creatorId && (
        <Button type='primary' style={{ width: '100%', marginTop: '10px' }}>
          关注
        </Button>
      )}
    </div>
  )
}

export default ArticleAuthor
