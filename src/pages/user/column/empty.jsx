import { theme } from 'antd'
import Box from '@/assets/svg/box.svg?react'

function Empty() {
  const {
    token: { colorPrimary }
  } = theme.useToken()

  function createColumn() {
    console.log('创建专栏')
  }
  return (
    <div className='flex flex-col items-center pt-[20px] h-[300px] bg-[#fff] text-[#8a919f]'>
      <Box className='w-[150px] h-[150px] fill-[#8a919f]' />
      <div className='flex items-center gap-[15px]'>
        <div>专栏空空如也~</div>
        <div
          className='cursor-pointer'
          style={{ color: colorPrimary }}
          onClick={() => createColumn()}>
          创建专栏
        </div>
      </div>
    </div>
  )
}

export default Empty
