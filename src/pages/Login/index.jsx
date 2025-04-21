import { Card, Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined  } from '@ant-design/icons'

function Login() {
    
    const onFinish = (values) => {
        console.log(values, '----====');
    }

    return (
        <div className="w-full h-full bg-[#f2f2f2] overflow-hidden">
            <Card style={{width: 300, margin: '200px auto 0'}}>
                <div className='flex justify-center items-center mb-[15px] font-bold text-[24px]'>登 录</div>
                <Form
                    name='login'
                    style={{maxwidth: 360}}
                    onFinish={onFinish}
                >
                    <Form.Item 
                        name='username' 
                        rules={[{ required: true, message: '请填写你的姓名' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='请输入姓名' />
                    </Form.Item>
                    <Form.Item 
                        name='password' 
                        rules={[{ required: true, message: '请填写你的密码' }]}
                    >
                        <Input prefix={<LockOutlined />} placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit'>
                            登 录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login