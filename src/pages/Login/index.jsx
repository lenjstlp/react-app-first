import { Card, Button, Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined  } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { login } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const successLogin = () => {
        message.success('登录成功！')
        navigate('/')
    }

    const onFinish = (values) => {
        dispatch(login(values, successLogin))
    }

    return (
        <div className="w-full h-full bg-[#f2f2f2] overflow-hidden">
            <Card style={{width: 300, margin: '200px auto 0'}}>
                <div className='flex justify-center items-center mb-[15px] font-bold text-[24px]'>登 录</div>
                <Form
                    name='login'
                    style={{maxwidth: 360}}
                    validateTrigger="onBlur"
                    initialValues={{
                        mobile: '13109167207',
                        code: '520559'
                    }}
                    onFinish={onFinish}
                >
                    
                    <Form.Item 
                        name='mobile'
                        rules={[
                            { required: true, message: '请填写你的手机号'},
                            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} allowClear placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item 
                        name='code' 
                        rules={[{ required: true, message: '请填写你的密码' }]}
                    >
                        <Input prefix={<LockOutlined />} allowClear placeholder='请输入密码' />
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