import { theme, Button } from 'antd'

function ArticleColumn() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()
  return (
    <div className='bg-[#fff] w-[800px] mt-[15px] px-[36px] overflow-hidden'>
      <div className='my-[20px] font-bold text-[20px]'>所属专栏</div>
      <div className='flex pb-[15px] border-b-1 border-[#f2f3f5]'>
        <img
          className='w-[110px] h-[80px] object-cover'
          style={{
            borderRadius: borderRadiusLG
          }}
          src={
            'http://localhost:4399/uploads/articlePic/1746353663434-609488233.png'
          }
        />
        <div className='flex flex-col justify-between flex-1 px-[15px] w-[100%]'>
          <div className='text-[16px]'>专栏名称</div>
          <div className='text-[#8a919f] line-clamp-2'>
            专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
            专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
            专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
            专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介专栏简介
          </div>
          <div className='text-[#8a919f]'>15篇文章</div>
        </div>
        <div>
          <Button type='primary' ghost>
            进入专栏
          </Button>
          <Button type='primary' ghost>
            订阅
          </Button>
          <Button type='primary' ghost>
            取消订阅
          </Button>
        </div>
      </div>
      <div className='flex text-[16px] py-[20px]'>
        <div className='flex items-center w-[50%]'>
          <div className='text-[#8a919f] text-[14px] pr-[15px]'>上篇文章</div>
          <div className='flex-1 text-[16px] truncate'>
            上篇文章上篇文章上篇文章上篇文章上篇文章上篇文章上篇文章
          </div>
        </div>
        <div className='flex w-[50%]'>
          <div className='text-[#8a919f] text-[14px] pr-[15px]'>下篇文章</div>
          <div className='flex-1 text-[16px] truncate'>
            下篇文章下篇文章下篇文章下篇文章下篇文章下篇文章下篇文章
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleColumn
