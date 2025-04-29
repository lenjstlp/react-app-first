import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import TopNav from './TopNav'

function ReactLayout() {
  return (
    <Layout className='h-[100%]'>
      <TopNav />
      <div className='h-[calc(100%-60px)] overflow-y-auto'>
        <Outlet />
      </div>
    </Layout>
  )
}

export default ReactLayout
