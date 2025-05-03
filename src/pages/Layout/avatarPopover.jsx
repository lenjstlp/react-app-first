import { Popover, Avatar, theme } from 'antd'
import { UserOutlined, LogoutOutlined, RightOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUserInfo } from '@/store/modules/user'
import { vitOptions } from '@/common'
import { dictSelect } from '@/utils'

function AvatarPopover() {
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const userInfo = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function popoverClick() {
    console.log('退出登录', clearUserInfo)
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const avatarContent = (
    <div className='w-[160px] cursor-pointer'>
      <div className='h-[55px] flex flex-col'>
        <div className='text-[#002fa7] self-center text-[16px]'>
          {userInfo.name}
        </div>
        <div className='text-[12px] self-center'>
          <span
            style={{
              borderRadius: borderRadiusLG
            }}
            className='bg-[#002fa7] text-white px-[5px]'>
            {dictSelect(vitOptions, userInfo.level)}
          </span>
        </div>
      </div>
      <div className='border-t-1 border-[#e3e5e7]'></div>
      <div
        style={{ borderRadius: borderRadiusLG }}
        className='h-[39px] flex items-center justify-between px-[10px] hover:bg-[#e6f4ff] hover:text-[#1677ff]'>
        <UserOutlined className='text-[18px]' />
        <div className='text-left flex-1 mx-[10px]'>个人中心</div>
        <RightOutlined className=' text-[18px]' />
      </div>
      <div className='border-t-1 border-[#e3e5e7]'></div>
      <div
        style={{ borderRadius: borderRadiusLG }}
        className='bord h-[39px] flex items-center justify-between px-[10px] hover:bg-[#e6f4ff] hover:text-[#1677ff]'
        onClick={() => popoverClick()}>
        <LogoutOutlined className=' text-[18px]' />
        <div className='text-left flex-1 mx-[10px]'>退出登录</div>
        {/* <RightOutlined className=' text-[18px]' /> */}
      </div>
    </div>
  )

  return (
    <Popover content={avatarContent} trigger='click'>
      {userInfo.avatar ? (
        <Avatar src={<img src={userInfo.avatar} alt='avatar' />} />
      ) : (
        <Avatar icon={<UserOutlined />} />
      )}
    </Popover>
  )
}

export default AvatarPopover
