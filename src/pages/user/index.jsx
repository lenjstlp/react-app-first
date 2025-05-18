import { useState, useRef } from 'react'
import { theme, Avatar, Button, Tabs } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import UserArticle from './userArticle'
import Column from './column'
import { useContainerScrollToBottom } from '@/hooks/useContainerScrollToBottom'

function User() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  // 滚动事件
  const containerRef = useRef(null)
  const sonRef = useRef(null)
  useContainerScrollToBottom(
    () => {
      console.log('到底部了', sonRef.current)
      sonRef.current.page.total > sonRef.current.articleList.length &&
        sonRef.current.queryArticleList()
    },
    containerRef,
    100
  )

  const userInfo = useSelector((state) => state.user.userInfo)

  const [tab, setTab] = useState('1')
  const tabsItems = [
    // {
    //   key: '0',
    //   label: '动态'
    // },
    {
      key: '1',
      label: '文章',
      ui: <UserArticle ref={sonRef} />
    },
    {
      key: '2',
      label: '专栏',
      ui: <Column />
    },
    // {
    //   key: '3',
    //   label: '收藏'
    // },
    {
      key: '4',
      label: '课程'
    }
  ]
  function tabsChange(key) {
    setTab(key)
  }

  return (
    <div ref={containerRef} className='mt-[15px] h-[100%] overflow-y-auto'>
      <div className='w-[900px] mx-[auto]'>
        <div
          style={{ borderRadius: borderRadiusLG }}
          className='flex items-center p-[15px] h-[150px] bg-[#fff]'>
          {userInfo.avatar ? (
            <Avatar
              size={100}
              src={<img src={userInfo.avatar} alt='avatar' />}
            />
          ) : (
            <Avatar size={100} icon={<UserOutlined />} />
          )}
          <div className='flex flex-col items-start ml-[30px] gap-[10px] text-[#8a919f]'>
            <div className='text-[22px] text-[#000]'>{userInfo.name}</div>
            <div className=''>职业: {userInfo.job}</div>
            <div className=''>
              简介: {userInfo.job || '这个人很懒，什么都没留下...'}
            </div>
          </div>
          <div className='ml-[auto] mt-[auto]'>
            <Button>编辑资料</Button>
          </div>
        </div>
        <div
          style={{ borderRadius: borderRadiusLG }}
          className='flex items-start mt-[15px]'>
          <div style={{ borderRadius: borderRadiusLG }} className='w-[660px]'>
            <Tabs
              style={{
                padding: '0 15px'
              }}
              className='bg-[#fff]'
              defaultActiveKey={tab}
              items={tabsItems}
              onChange={tabsChange}
            />
            <div style={{ borderRadius: borderRadiusLG }} className=''>
              {tabsItems.find((i) => i.key === tab)?.ui}
            </div>
          </div>
          <div
            style={{ borderRadius: borderRadiusLG }}
            className='flex-1 ml-[15px]'>
            <div className='w-[100%] p-[10px] bg-[#fff] mb-[15px]'>
              <div className='w-[100%] pb-[10px] text-[16px]'>个人成就</div>
              <div className='border-b-2 border-[#f7f8f9] h-[1px]'></div>
              <div className='pt-[10px]'>...</div>
            </div>

            <div className='flex w-[100%] h-[60px] text-center bg-[#fff] mb-[15px]'>
              <div className='w-[50%] flex flex-col justify-center'>
                <div className='mb-[5px]'>关注</div>
                <div>0</div>
              </div>
              <div className='border-r-1 border-[#f7f8f9] w-[1px]'></div>
              <div className='w-[50%] flex flex-col justify-center'>
                <div className='mb-[5px]'>粉丝</div>
                <div>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
