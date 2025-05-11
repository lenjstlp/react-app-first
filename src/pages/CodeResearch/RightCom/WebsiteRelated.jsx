import { QRCode } from 'antd'

function WebsiteRelated() {
  return (
    <div className='w-[100%] mt-[10px]'>
      <div className='flex flex-wrap text-[#8a919f] text-[14px] px-[10px] cursor-pointer'>
        <div className='pb-[10px] pr-[10px]'>关于我们</div>
        <div className='pb-[10px] pr-[10px]'>联系我们</div>
        <div className='pb-[10px] pr-[10px]'>友情链接</div>
        <div className='pb-[10px] pr-[10px]'>用户协议</div>
        <div className='pb-[10px] pr-[10px]'>营业执照</div>
        <div className='pb-[10px] pr-[10px]'>隐私政策</div>
      </div>
      <div className='flex mb-[10px] text-[#8a919f] text-[14px] px-[10px] cursor-pointer'>
        <div>QQ 群：</div>
        <div>987654321</div>
      </div>
      <div className='flex mb-[10px] text-[#8a919f] text-[14px] px-[10px] cursor-pointer'>
        <div>举报邮箱：</div>
        <div>lenjstlp@163.com</div>
      </div>
      <div className='flex mb-[10px] text-[#8a919f] text-[14px] px-[10px] cursor-pointer'>
        <div>捐助：</div>
        <div className='flex'>
          <div className='flex flex-col mr-[10px]'>
            <div className='mb-[5px] pl-[12px]'>微信</div>
            <QRCode value='-' size={90} color='#57bb40' bgColor='#f5f5f5' />
          </div>
          <div className='flex flex-col'>
            <div className='mb-[5px] pl-[12px]'>支付宝</div>
            <QRCode value='-' size={90} color='#1677ff' bgColor='#f5f5f5' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsiteRelated
