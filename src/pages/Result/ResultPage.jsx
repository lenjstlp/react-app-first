import { Button, Result } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location, 'location')

  function backClick() {
    navigate('/')
  }

  const { status = 'success', title = '提交成功' } = location.state
  return (
    <Result
      status={status}
      title={title}
      extra={
        <Button type='primary' onClick={backClick}>
          返回首页
        </Button>
      }
    />
  )
}

export default ResultPage
