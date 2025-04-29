import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, theme, Space, Badge, Avatar } from 'antd'
import { SoundOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import AvatarPopover from './AvatarPopover'
import BackEnd from './BackEnd'
import CodeResearch from '@/pages/CodeResearch'

import reactLogo from '@/assets/react.svg'

function ReactLayout() {
  // user
  const userInfo = useSelector((state) => state.user.userInfo)
  console.log('用户信息', userInfo)

  // nav
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location, '====')

  const navList = [
    {
      key: '1',
      value: '/',
      label: '研究院',
      ui: <CodeResearch />
    },
    {
      key: '2',
      value: '/backend',
      label: '管理平台',
      ui: <BackEnd />
    }
  ]
  const [navValue, setNaveValue] = useState('2')
  function navListClick({ item, key }) {
    navigate(item.props.value)
    setNaveValue(key)
  }
  useEffect(() => {
    navValue === '2' ? navigate('/backend') : navigate('/')
  }, [])

  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout className='h-[100%]'>
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
        <div className='ml-auto cursor-pointer'>
          <Space size='middle'>
            <Badge count={5}>
              <Avatar icon={<SoundOutlined />} />
            </Badge>
            {<AvatarPopover />}
          </Space>
        </div>
      </div>
      <div className='h-[calc(100%-60px)] overflow-y-auto'>
        <Outlet />
      </div>
    </Layout>
  )
}

export default ReactLayout
