import { QRCode } from 'antd'

function QRCodeCom() {
  return (
    <div className='flex-3 flex flex-col items-center'>
      <div className='p-[10px]'>扫描二维码登录</div>
      <div className='w-[160px] h-[160px'>
        <QRCode value='-'></QRCode>
      </div>
      <div className='text-[12px]'>
        请使用 <a>赏金代码客户端</a> <br /> 扫码登录或扫码下载APP
      </div>
    </div>
  )
}

export default QRCodeCom
