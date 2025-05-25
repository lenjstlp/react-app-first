import { createContext, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import TopNav from './TopNav'
import useDicts from '@/hooks/useDicts'

const dictsContext = createContext()

function ReactLayout() {
  const { dicts } = useDicts({ type: 'VIP_LEVEL,ARTICLE_CHANNEL' })

  const context = useMemo(() => {
    return { dicts }
  }, [dicts])

  return (
    <dictsContext.Provider value={context}>
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
