import { theme } from 'antd'
import { useSelector } from 'react-redux'
import useDicts, { dictSelect } from '@/hooks/useDicts'

function VipText() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const userInfo = useSelector((state) => state.user.userInfo)

  const { dicts } = useDicts({ type: 'VIP_LEVEL' })

  return (
    <span
      style={{
        // backgroundColor: colorPrimary,
        backgroundColor: '#002fa7',
        borderRadius: borderRadiusLG
      }}
      className='text-white text-[12px] px-[5px] mx-[2px] text-nowrap'>
      {dicts['VIP_LEVEL'] && dictSelect(dicts['VIP_LEVEL'], userInfo.level)}
    </span>
  )
}

export default VipText
