import { theme } from 'antd'
import { useSelector } from 'react-redux'
import useDicts, { dictSelect } from '@/hooks/useDicts'
import { formatDate } from '@/utils'

function FateData() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const { dicts } = useDicts({ type: 'VIP_LEVEL' })

  const userInfo = useSelector((state) => state.user.userInfo)

  return (
    <div
      style={{ borderRadius: borderRadiusLG }}
      className='bg-[#fff] p-[15px] mb-[15px]'>
      <div className='text-[18px]'>
        欢迎{' '}
        {dicts['VIP_LEVEL'] && dictSelect(dicts['VIP_LEVEL'], userInfo.level)}
        <span className='font-bold'> {userInfo.name}</span>
      </div>
      <div className='text-[#8a919f] text-[16px] mt-[10px]'>
        {formatDate(new Date(), 'YYYY-MM-DD')} 到访 !
      </div>
    </div>
  )
}

export default FateData
