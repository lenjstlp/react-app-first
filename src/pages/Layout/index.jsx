import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import TopNav from './TopNav'
import useDicts from '@/hooks/useDicts'

const dictsContext = createContext()

function ReactLayout() {
  const { dicts } = useDicts({ type: 'VIP_LEVEL,ARTICLE_CHANNEL' })

  return (
    <dictsContext.Provider value={{ dicts }}>
      <Layout className='h-[100%]'>
        <TopNav />
        <div className='h-[calc(100%-60px)] overflow-hidden'>
          <Outlet />
        </div>
      </Layout>
    </dictsContext.Provider>
  )
}

export default ReactLayout

export { dictsContext }
