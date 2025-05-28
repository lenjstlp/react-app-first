import { theme } from 'antd'
function ArticleLeft() {
  const {
    token: { borderRadiusLG, colorPrimary }
  } = theme.useToken()
  return (
    <div
      style={{ borderRadius: borderRadiusLG, color: colorPrimary }}
      className='w-[260px] p-[15px] bg-[#fff] shrink-0 ml-auto'>
      ArticleLeft
    </div>
  )
}

export default ArticleLeft
