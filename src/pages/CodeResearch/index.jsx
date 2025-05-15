import { useState, useRef, useEffect } from 'react'
import { Tabs, theme } from 'antd'
import ArticleList from './ArticleList'
import RightCom from './RightCom/index'
import useDicts from '@/hooks/useDicts'
import { pageList } from '@/apis/article'

import { useContainerScrollToBottom } from '@/hooks/useContainerScrollToBottom'

function CodeResearch() {
  // 滚动事件
  const containerRef = useRef(null)

  const [loading, setLoading] = useState(false)
  useContainerScrollToBottom(
    () => {
      console.log('到底部了', pageConfig)
      pageConfig.total > articleList.length && loadMore()
    },
    containerRef,
    100
  )
  async function loadMore() {
    if (loading) return
    setLoading(true)
    const params = {
      ...articleListParams,
      pageNum: pageConfig.pageNum,
      pageSize: pageConfig.pageSize
    }
    const { code, data } = await pageList(params)
    if (code === 0) {
      console.log(data, '============')
      setArticleList([...articleList, ...data.data])
      // setArticleList([...data.data])
      setPageConfig({
        ...pageConfig,
        total: data.total,
        // pageNum: pageConfig.pageNum
        pageNum:
          data.data.length === pageConfig.pageSize
            ? pageConfig.pageNum + 1
            : pageConfig.pageNum
      })
    }
    setLoading(false)
  }

  const { dicts } = useDicts({ type: 'ARTICLE_CHANNEL' })

  const {
    token: { colorPrimaryBgHover, borderRadiusLG }
  } = theme.useToken()

  const [articleList, setArticleList] = useState([])
  const [pageConfig, setPageConfig] = useState({
    pageNum: 1,
    pageSize: 15,
    total: 0
  })

  const [articleListParams, setArticleListParams] = useState({
    tab: '2',
    channel: ''
  })

  // tabs
  const items = [
    {
      key: '1',
      label: '关注'
    },
    {
      key: '2',
      label: '推荐'
    },
    {
      key: '3',
      label: `最新`
    }
  ]
  function tabChange(key) {
    setArticleListParams({
      ...articleListParams,
      tab: key,
      pageNum: 1
    })
  }

  useEffect(() => {
    loadMore()
  }, [articleListParams])

  return (
    <div
      ref={containerRef}
      className='flex justify-center items-start mt-[15px] h-[100%] overflow-y-auto'>
      <div
        className='sticky top-[15px] w-[120px] text-[16px] text-[#8a919f] bg-[#fff] p-[15px]'
        style={{ borderRadius: borderRadiusLG }}>
        {dicts['ARTICLE_CHANNEL'] &&
          [{ label: '综合', value: '' }, ...dicts['ARTICLE_CHANNEL']].map(
            (i) => {
              return (
                <div
                  key={i.value}
                  style={{
                    borderRadius: borderRadiusLG,
                    backgroundColor:
                      articleListParams.channel !== i.value
                        ? ''
                        : colorPrimaryBgHover
                  }}
                  className='h-[36px] flex items-center cursor-pointer pl-[15px]'
                  onClick={() => {
                    setArticleListParams({
                      ...articleListParams,
                      channel: i.value
                    })
                  }}>
                  {i.label}
                </div>
              )
            }
          )}
      </div>
      <div
        className='w-[800px] px-[15px] mx-[15px] mb-[30px] pb-[15px] rounded-[10px] bg-[#fff]'
        style={{ borderRadius: borderRadiusLG }}>
        <Tabs
          defaultActiveKey={articleListParams.tab}
          items={items}
          onChange={tabChange}></Tabs>
        <ArticleList articleList={articleList} />
      </div>
      <div className='w-[260px]' style={{ borderRadius: borderRadiusLG }}>
        <RightCom />
      </div>
    </div>
  )
}

export default CodeResearch
