import {
  WechatFilled,
  TikTokFilled,
  AlipayCircleFilled,
  QqOutlined
} from '@ant-design/icons'

// 手机号前缀
export const prePhoneNumber = [
  {
    key: '86',
    label: '中国大陆'
  },
  {
    key: '852',
    label: '中国香港特别行政区'
  },
  {
    key: '853',
    label: '中国澳门特别行政区'
  },
  {
    key: '886',
    label: '中国台湾'
  },
  {
    key: '1',
    label: '美国'
  },
  {
    key: '32',
    label: '比利时'
  }
]

// 登录模式
export const loginModeOptions = [
  {
    key: 'password',
    label: '密码登录'
  },
  {
    key: 'message',
    label: '短信登录'
  }
]

// 第三方登录方式
export const loginWay = [
  {
    label: '微信登录',
    icon: <WechatFilled className='text-[22px]' />,
    color: '#fff',
    backgroundColor: '#57bb40',
    key: '1'
  },
  {
    label: 'QQ登录',
    icon: <QqOutlined className='text-[22px]' />,
    color: '#fff',
    backgroundColor: '#4ca2e5',
    key: '2'
  },
  {
    label: '抖音登录',
    icon: <TikTokFilled className='text-[22px]' />,
    color: '#fff',
    backgroundColor: '#000',
    key: '3'
  },
  {
    label: '支付宝登录',
    icon: <AlipayCircleFilled className='text-[22px]' />,
    color: '#fff',
    backgroundColor: '#1677ff',
    key: '5'
  }
]
