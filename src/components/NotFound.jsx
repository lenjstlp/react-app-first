import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

function NotFound() {
  const navigate = useNavigate()

  function backClick() {
    navigate('/')
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle='对不起，没有找到您访问的页面。'
      extra={
        <Button type='primary' onClick={backClick}>
          返回登录页
        </Button>
      }
    />
  )
}

export default NotFound
