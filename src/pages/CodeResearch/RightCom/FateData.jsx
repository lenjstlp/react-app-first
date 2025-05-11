import { theme } from 'antd'
import { useSelector } from 'react-redux'
import { formatDate } from '@/utils'
import VipText from '@/components/VipText'

function FateData() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const userInfo = useSelector((state) => state.user.userInfo)

  return (
    <div
      style={{ borderRadius: borderRadiusLG }}
      className='bg-[#fff] p-[15px] mb-[15px]'>
      <div className='flex items-center text-[18px]'>
        欢迎
        <VipText />
        <span className='font-bold'> {userInfo.name}</span>
      </div>
      <div className='text-[#8a919f] text-[16px] mt-[10px]'>
        {formatDate(new Date(), 'YYYY-MM-DD')} 到访 !
      </div>
    </div>
  )
}

export default FateData
