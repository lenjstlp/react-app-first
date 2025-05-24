import { useContext } from 'react'
import { theme } from 'antd'
import { useSelector } from 'react-redux'
import { dictSelect } from '@/hooks/useDicts'

import { dictsContext } from '@/pages/Layout'

function VipText() {
  const { dicts } = useContext(dictsContext)

  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const userInfo = useSelector((state) => state.user.userInfo)

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
