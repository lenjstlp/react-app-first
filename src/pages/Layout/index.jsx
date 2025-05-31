import { createContext, useMemo, useEffect, useState, useRef } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { Layout, Input } from 'antd'
import TopNav from './TopNav'
import useDicts from '@/hooks/useDicts'

export const dictsContext = createContext()
export const QueryContext = createContext()

function ReactLayout() {
  const { dicts } = useDicts({ type: 'VIP_LEVEL,ARTICLE_CHANNEL' })

  const context = useMemo(() => {
    return { dicts }
  }, [dicts])

  // search
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const s = searchParams.get('s')
    if (s) {
      setSearchValue(s)
    }
  }, [location.search])
  const [searchValue, setSearchValue] = useState('')
  function onSearch(value) {
    const trimValue = value.trim()
    if (value.trim()) {
      setSearchParams({ s: trimValue })
    }
    if (!queryRef.current) return
    queryRef.current()
  }
  const queryRef = useRef(null)
  const queryContextValue = useMemo(() => {
    return {
      // 注册查询函数
      registerQuery: (queryFn) => {
        queryRef.current = queryFn
      }
    }
  }, [searchValue])

  return (
    <dictsContext.Provider value={context}>
      <QueryContext.Provider value={queryContextValue}>
        <Layout className='h-[100%]'>
          <TopNav>
            <Input.Search
              placeholder='请输入关键词搜索'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              allowClear
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </TopNav>
          <div className='h-[calc(100%-60px)] overflow-hidden'>
            <Outlet />
          </div>
        </Layout>
      </QueryContext.Provider>
    </dictsContext.Provider>
  )
}

export default ReactLayout
