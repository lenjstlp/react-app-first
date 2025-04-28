import { Space, theme, message } from 'antd'
import { loginWay } from '@/common'

function OtherLogin() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  function loginWayClick(val) {
    message.info(val.label + '登录暂未接入')
  }

  return (
    <div className='text-[12px]'>
      <div className='text-center mb-[10px]'>其它登录方式</div>
      <Space size='middle' className='flex'>
        {loginWay.map((i) => {
          return (
            <div
              style={{
                borderRadius: borderRadiusLG
              }}
              key={i.key}
              className='flex cursor-pointer py-[5px] px-[10px] hover:bg-[#bae0ff]'
              onClick={() => loginWayClick(i)}>
              {i.icon}
              <div className='ml-[10px]'>{i.label}</div>
            </div>
          )
        })}
      </Space>
    </div>
  )
}

export default OtherLogin
