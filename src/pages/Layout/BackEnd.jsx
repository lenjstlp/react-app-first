import { Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  FileTextOutlined
} from '@ant-design/icons'

const menuItems = [
  {
    label: '首页',
    key: '/backend',
    icon: <HomeOutlined />
  },
  {
    label: '文章',
    key: 'article',
    icon: <FileTextOutlined />,
    children: [
      {
        key: '/backend/publish',
        label: '创建文章',
        icon: <DiffOutlined />
      },
      {
        key: '/backend/articleManage',
        label: '管理文章',
        icon: <EditOutlined />
      }
    ]
  },
  {
    label: '基础服务',
    key: 'basicServices',
    icon: <FileTextOutlined />,
    children: [
      {
        label: '字典平台',
        key: 'dicts',
        children: [
          {
            key: '/backend/createDict',
            label: '创建字典',
            icon: <DiffOutlined />
          },
          {
            key: '/backend/manageDicts',
            label: '管理字典',
            icon: <EditOutlined />
          }
        ]
      },
      {
        label: '权限',
        key: 'permission',
        children: [
          {
            key: '/backend/permissionList',
            label: '权限列表',
            icon: <DiffOutlined />
          },
          {
            key: '/backend/managePermission',
            label: '权限管理',
            icon: <EditOutlined />
          }
        ]
      }
    ]
  },
  {
    label: '用户',
    key: '/users',
    icon: <FileTextOutlined />,
    children: [
      {
        key: '/backend/userList',
        label: '用户列表',
        icon: <DiffOutlined />
      },
      {
        key: '/backend/manageUsers',
        label: '用户管理',
        icon: <EditOutlined />
      }
    ]
  }
]

function BackEnd() {
  // siderMenu
  const navigate = useNavigate()
  function siderMenuClick({ key }) {
    navigate(key)
  }
  const location = useLocation()
  console.log('当前路由', location.pathname)

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <Layout className='h-[100%]'>
      <Layout.Sider width={200} style={{ background: colorBgContainer }}>
        <Menu
          mode='inline'
          selectedKeys={location.pathname}
          defaultOpenKeys={['article', 'basicServices', 'dicts', 'permission']}
          className='h-[100%] br-[0]'
          items={menuItems}
          onClick={siderMenuClick}
        />
      </Layout.Sider>
      <Layout className='p-[15px] overflow-hidden'>
        <Layout.Content
          style={{
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
          className='p-[15px] m-[0] min-h-300 overflow-auto'>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BackEnd
