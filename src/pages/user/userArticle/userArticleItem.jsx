import { useContext } from 'react'
import { Space, theme, Popover } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import ArticleListItemSettings from './articleListItemSettings'
import dayjs from '@/utils/dayjs'
import Look from '@/assets/svg/look.svg?react'
import Good from '@/assets/svg/good.svg?react'
import Comments from '@/assets/svg/comments.svg?react'

import useOutSideClickPopover from '@/hooks/useOutSideClickPopover'

import { dictSelect } from '@/hooks/useDicts'
import { dictsContext } from '@/Pages/Layout'

function UserArticleItem({ articleItem, height }) {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const { dicts } = useContext(dictsContext)

  const { popoverShow, setPopoverShow, popoverRef } = useOutSideClickPopover()

  return (
    <div
      data-e-key={articleItem.id}
      style={{ height }}
      className='flex w-[100%] h-[100px] border-b-2 border-[#f7f8f9] py-[10px] cursor-pointer hover:bg-[#f5f5f5]'>
      <div
        style={{
          width: articleItem.cover ? '77%' : '100%'
        }}
        className='flex flex-col justify-between'>
        <div className='text-[20px] font-[600]'>{articleItem.title}</div>
        <div className='py-[2px] text-[#8a919f] truncate'>
          {articleItem.abstract}
        </div>
        <div className='flex'>
          <Space className='text-[#8a919f]' size='middle'>
            <div>{dayjs(articleItem.createTime).fromNow()}</div>
            <div className='h-[12px] border-r-1 border-[#bcb8b8]'></div>
            <div className='flex items-center'>
              <Look className='text-[18px] mr-[5px]' fill='#8a919f' />
              {articleItem.read}
            </div>
            <div className='flex items-center'>
              <Good className='text-[18px] mr-[5px]' fill='#8a919f' />
              点赞
            </div>
            <div className='flex items-center'>
              <Comments className='text-[18px] mr-[5px]' fill='#8a919f' />
              评论
            </div>
            <Popover
              placement='bottom'
              content={
                <ArticleListItemSettings
                  articleItem={articleItem}
                  popoverRef={popoverRef}
                />
              }
              arrow={false}
              open={popoverShow}
              destroyTooltipOnHide={true}>
              <div
                className='flex items-center'
                onClick={(e) => {
                  e.stopPropagation()
                  setPopoverShow(!popoverShow)
                }}>
                <SettingOutlined
                  className='text-[16px] mr-[5px]'
                  fill='#8a919f'
                />
                设置
              </div>
            </Popover>
          </Space>
          <div className='flex ml-auto'>
            {articleItem.channel.split(',').map((item) => {
              return (
                <div
                  key={item}
                  className='flex mr-[5px] px-[10px] bg-[#f5f5f5] text-[#8a919f]'>
                  {dictSelect(dicts['ARTICLE_CHANNEL'], item)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {articleItem.cover && (
        <div className='right flex-1 px-[10px]'>
          <img
            className='w-[100%] h-[100%] object-cover'
            src={articleItem.cover}
            alt='文章封面'
            style={{
              borderRadius: borderRadiusLG
            }}
          />
        </div>
      )}
    </div>
  )
}

export default UserArticleItem
