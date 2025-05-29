import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, theme, Space, Badge, Input } from 'antd'
import { SignatureFilled, BellFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import AvatarPopover from './AvatarPopover'
import BackEnd from './BackEnd'
import CodeResearch from '@/pages/CodeResearch'

import reactLogo from '@/assets/react.svg'

function TopNav() {
  // user
  const userInfo = useSelector((state) => state.user.userInfo)
  console.log('用户信息', userInfo)

  // nav
  const navigate = useNavigate()
  const location = useLocation()

  const navList = [
    {
      key: '/',
      label: '研究院',
      ui: <CodeResearch />
    },
    {
      key: '/backend',
      label: '管理平台',
      ui: <BackEnd />
    }
  ]
  const [navValue, setNaveValue] = useState('')
  function navListClick({ key }) {
    setNaveValue(key)
    navigate(key)
  }
  useEffect(() => {
    if (location.pathname === '/') {
      setNaveValue('/')
    } else if (location.pathname === '/backend') {
      setNaveValue('/backend')
    } else if (location.pathname.includes('/backend')) {
      setNaveValue('/backend')
    } else {
      setNaveValue('/')
    }
  }, [])

  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  function onSearch(value) {
    const trimValue = value.trim()
    if (value.trim()) {
      console.log(trimValue, '-=-==--==-=-')
    }
  }

  return (
    <div className='flex items-center bg-[#fff] h-[60px] px-[15px] shrink-0'>
      <div
        style={{
          borderRadius: borderRadiusLG
        }}
        className={`flex justify-between items-center mr-[30px] cursor-pointer bg-[#fff] w-[180px] h-[39px] text-[20px]`}>
        <img className='mx-[10px]' src={reactLogo} alt='reactLogo' />
        <div className='flex-1'>代码研究院</div>
      </div>
      <Menu
        className='min-w-[200px]'
        style={{
          borderBottom: 0
        }}
        mode='horizontal'
        selectedKeys={navValue}
        defaultSelectedKeys={[navValue]}
        items={navList}
        onClick={navListClick}
      />
      <Input.Search
        placeholder='请输入关键词搜索'
        onSearch={onSearch}
        style={{ width: 300 }}
      />
      <div className='ml-auto cursor-pointer'>
        <Space size='middle'>
          <div
            className='w-[33px] flex flex-col items-center text-[#6e6b6b]'
            onClick={() => {
              navigate('/write')
            }}>
            <SignatureFilled className='text-[22px]' />
            <div className='text-[12px]'>创作</div>
          </div>
          <Badge count={5}>
            <div className='w-[33px] flex flex-col items-center text-[#6e6b6b]'>
              <BellFilled className='text-[22px]' />
              <div className='text-[12px]'>消息</div>
            </div>
          </Badge>
          {<AvatarPopover />}
        </Space>
      </div>
    </div>
  )
}

export default TopNav
