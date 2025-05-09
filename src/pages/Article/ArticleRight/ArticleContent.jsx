import { theme } from 'antd'

function ArticleContent() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  return (
    <div
      style={{ borderRadius: borderRadiusLG }}
      className='bg-[#fff] p-[15px] mb-[15px]'>
      <div className='text-[16px] pb-[10px] mb-[10px] border-b-1 border-[#f2f3f5]'>
        目录
      </div>
      <div>内容</div>
    </div>
  )
}

export default ArticleContent
