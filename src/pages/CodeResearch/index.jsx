import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { Viewer } from '@bytemd/react'

function CodeResearch() {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center mt-[15px]'>
      <div>左侧导航</div>
      <div className='w-[800px] p-[15px] rounded-[10px] bg-[#fff]'>
        <Viewer />
        <Button onClick={() => navigate('/write')}>写文章</Button>
      </div>
      <div>右侧导航</div>
    </div>
  )
}

export default CodeResearch
