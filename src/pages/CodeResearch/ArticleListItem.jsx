import { useContext } from 'react'
import { Space, theme } from 'antd'
import Look from '@/assets/svg/look.svg?react'
import Good from '@/assets/svg/good.svg?react'

import { dictSelect } from '@/hooks/useDicts'
import { dictsContext } from '@/pages/Layout'

function ArticleListItem({ articleItem }) {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const { dicts } = useContext(dictsContext)

  return (
    <div
      data-e-key={articleItem.id}
      className='flex w-[100%] h-[100px] border-b-2 border-[#f7f8f9] py-[15px] cursor-pointer hover:bg-[#f5f5f5]'>
      <div
        className='left flex flex-col justify-between'
        style={{
          width: articleItem.cover ? '630px' : '100%'
        }}>
        <div className='text-[20px] font-[600]'>{articleItem.title}</div>
        <div className='py-[2px] text-[#8a919f] truncate'>
          {articleItem.abstract}
        </div>
        <div className='flex'>
          <Space className='text-[#8a919f]'>
            <div>{articleItem.creator}</div>
            <div className='h-[12px] border-r-1 border-[#bcb8b8]'></div>
            <div className='flex items-center'>
              <Look className='text-[18px]' />
              {articleItem.read}
            </div>
            <div className='flex items-center'>
              <Good className='text-[18px]' />
              {articleItem.like}
            </div>
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

export default ArticleListItem
