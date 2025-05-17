import { formatDate } from '@/utils'

function ColumnListItem({ columnItem }) {
  console.log(columnItem, '---')

  return (
    <div
      data-column-id={columnItem.id}
      className='flex px-[15px] bg-[#fff] w-[100%] h-[100px] border-b-2 border-[#f7f8f9] py-[15px] cursor-pointer hover:bg-[#f5f5f5]'>
      <div className='w-[100px] mr-[10px]'>
        <img
          className='w-[100%] h-[100%] object-cover'
          src={columnItem.columnCover}
          alt=''
        />
      </div>
      <div className='flex flex-col justify-between'>
        <div className='text-[20px]'>{columnItem.columnName}</div>
        <div className='py-[2px] text-[#8a919f] truncate'>
          {columnItem.columnIntro}
        </div>
        <div>
          <div className='flex gap-[10px] text-[#8a919f]'>
            <div>{formatDate(columnItem.createTime)}</div>
            <div className='flex items-center'>
              <div>文章数：</div>
              {columnItem.articleNum}
            </div>
            <div className='flex items-center'>
              <div>订阅数：</div>
              {columnItem.subscriberNum}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColumnListItem
