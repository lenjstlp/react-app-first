import { useState } from 'react'
import { Layout, Menu, theme, Breadcrumb, Dropdown, Space, Badge, Avatar, Popover } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, FileTextOutlined, SoundOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import AvatarPopover from './AvatarPopover'

import reactLogo from '@/assets/react.svg'

const { Header, Content, Sider } = Layout

const navList = [
    {
        key: '1',
        label: '管理平台'
    },
    {
        key: '2',
        label: '赏金code'
    },
]

const menuItems = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />
    },
    {
        label: '文章',
        key: '/article',
        icon: <FileTextOutlined />,
        children: [
            { 
                key: '/publish', 
                label: '创建文章',
                icon: <DiffOutlined />
            },
            { 
                key: '/articleManage', 
                label: '管理文章',
                icon: <EditOutlined />
            },
        ]
    },
    {
        label: '基础服务',
        key: '/basicServices',
        icon: <FileTextOutlined />,
        children: [
            {
                label: '字典平台',
                key: '/dicts',
                children: [
                    { 
                        key: '/createDict', 
                        label: '创建字典',
                        icon: <DiffOutlined />
                    },
                    { 
                        key: '/manageDicts', 
                        label: '管理字典',
                        icon: <EditOutlined />
                    },
                ],
            },
            {
                label: '权限',
                key: '/permission',
                children: [
                    { 
                        key: '/permissionList', 
                        label: '权限列表',
                        icon: <DiffOutlined />
                    },
                    { 
                        key: '/managePermission', 
                        label: '权限管理',
                        icon: <EditOutlined />
                    },
                ],
            },
        ]
    },
    {
        label: '用户',
        key: '/users',
        icon: <FileTextOutlined />,
        children: [
            { 
                key: '/userList', 
                label: '用户列表',
                icon: <DiffOutlined />
            },
            { 
                key: '/manageUsers', 
                label: '用户管理',
                icon: <EditOutlined />
            },
        ]
    },
]

function ReactLayout() {
    const userInfo = useSelector(state => state.user.userInfo)
    console.log('用户信息', userInfo)
    
    const navigate = useNavigate()
    function siderMenuClick({ key }) {
        navigate(key)
    }

    const location = useLocation()
    console.log('当前路由', location.pathname);

    const { token: { colorBgContainer, borderRadiusLG} } = theme.useToken()

    // 面包屑
    // const [breadcrumbItems, setBreadcrumbItems] = useState([
    //     { title: 'Home' }, 
    //     { title: 'List' }
    // ])

    return (
        <Layout className='h-[100%]'>
            <div className="flex items-center bg-[#fff] h-[55px] px-[15px] shrink-0">
                <div
                    style={{
                        borderRadius: borderRadiusLG
                    }} 
                    className={`flex justify-between items-center mr-[30px] cursor-pointer bg-[#fff] w-[180px] h-[39px] text-[20px]`}
                >
                    <img className='mx-[10px]' src={reactLogo} alt="reactLogo" />
                    <div className='flex-1'>赏金code</div>
                </div>
                <Menu
                    className='min-w-[500px]'
                    style={{
                        borderBottom: 0
                    }}
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={navList}
                />
                <div className='ml-auto cursor-pointer'>
                    <Space size='middle'>
                        <Badge count={5}>
                            <Avatar icon={<SoundOutlined />} />
                        </Badge>
                        {
                            <AvatarPopover />
                        }
                    </Space>
                </div>
            </div>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu 
                        mode='inline' 
                        selectedKeys={location.pathname}
                        defaultOpenKeys={['/article', '/basicServices', '/dicts', '/permission']}
                        className='h-[100%] br-[0]'
                        items={menuItems}
                        onClick={siderMenuClick}
                    />
                </Sider>
                <Layout className="p-[15px] overflow-hidden">
                    {/* <Breadcrumb
                        items={breadcrumbItems}
                        style={{ margin: '16px 0' }}
                    /> */}
                    <Content
                        style={{
                            backgroundColor: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                        className='p-[15px] m-[0] min-h-300 overflow-auto'>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default ReactLayout