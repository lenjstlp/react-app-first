import { Layout, Menu, theme, Breadcrumb } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, GlobalOutlined, FileTextOutlined } from '@ant-design/icons'

import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const { Header, Content, Sider } = Layout

const navList = [
    {
        key: '1',
        label: 'nav1'
    },
    {
        key: '2',
        label: 'nav2'
    },
    {
        key: '3',
        label: 'nav3'
    },
]

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />
    },
    {
        label: '文章',
        key: '/articleManage',
        icon: <FileTextOutlined />,
        children: [
            { 
                key: '/publish', 
                label: '创建文章',
                icon: <DiffOutlined />
            },
            { 
                key: '/article', 
                label: '管理文章',
                icon: <EditOutlined />
            },
        ]
    },
]

function ReactLayout() {
    const navigate = useNavigate()
    
    function siderMenuClick({ key }) {
        navigate(key)
    }

    const location = useLocation()
    console.dir(location.pathname, '------');

    const { token: { colorBgContainer, borderRadiusLG} } = theme.useToken()

    return (
        <Layout className='h-[100%]'>
            <Header className="flex items-center">
                <div
                    style={{
                        borderRadius: borderRadiusLG
                    }} 
                    className={`flex justify-center items-center mr-[30px] bg-[#fff] w-[180px] h-[39px] text-[20px]`}>
                    <GlobalOutlined className="mr-[10px]" />
                    ReactWeb模型
                </div>
                <Menu 
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    items={navList}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu 
                        mode='inline' 
                        selectedKeys={location.pathname}
                        defaultOpenKeys={['/articleManage']}
                        className='h-[100%] br-[0]'
                        items={items}
                        onClick={siderMenuClick}
                    />
                </Sider>
                <Layout className="p-[15px]">
                    {/* <Breadcrumb
                        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                        style={{ margin: '16px 0' }}
                    /> */}
                    <Content
                        style={{
                            backgroundColor: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                        className='p-[15px] m-[0] min-h-300'>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default ReactLayout