import { useState } from 'react'
import { Tabs, theme } from 'antd'
import ArticleList from './ArticleList'
import RightCom from './RightCom/index'
import useDicts from '@/hooks/useDicts'

function CodeResearch() {
  const { dicts } = useDicts({ type: 'ARTICLE_CHANNEL' })

  const {
    token: { colorPrimaryBgHover, borderRadiusLG }
  } = theme.useToken()

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
      tab: key
    })
  }

  // channel

  return (
    <div className='flex justify-center items-start mt-[15px]'>
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
        className='w-[800px] px-[15px] mx-[15px] pb-[15px] rounded-[10px] bg-[#fff]'
        style={{ borderRadius: borderRadiusLG }}>
        <Tabs
          defaultActiveKey={articleListParams.tab}
          items={items}
          onChange={tabChange}></Tabs>
        <ArticleList articleListParams={articleListParams} />
      </div>
      <div className='w-[260px]' style={{ borderRadius: borderRadiusLG }}>
        <RightCom />
      </div>
    </div>
  )
}

export default CodeResearch
