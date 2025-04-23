import { useState, useEffect } from 'react'
import { Card, Button, Form, Input, message, Space, theme, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { login } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { getToken } from '@/utils'
import { prePhoneNumber, loginModeOptions } from "@/common";
import QRCodeCom from './QRCode'
import OtherLogin from './otherLogin'

const { Option } = Select

function Login() {
    useEffect(() => {
        const token = getToken()
        console.log(token);
        
        // token && navigate('/')
    }, [])

    const { token: { colorPrimaryBgHover, colorPrimary } } = theme.useToken()
    console.dir(colorPrimaryBgHover, '----------');
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const successLogin = () => {
        message.success('登录成功！')
        onReset()
        navigate('/', { replace: true})
    }

    const onFinish = (values) => {
        const params = {
            ...values,
            loginMode
         }
        dispatch(login(params, successLogin))
    }

    const [form] = Form.useForm()
    function onReset() {
        form.resetFields();
    }

    // 登录模式
    const [loginMode, setLoginMode] = useState('password')
    function loginModeClick(key) {
        // 每次切换登录模式，清空数据
        onReset()
        setLoginMode(key)
    }

    // 手机号前缀选项
    function selectPhoneBefore() {
        return (
            <Select 
                className='w-[70px]' 
                defaultValue={['86']} 
                dropdownStyle={{ width: '220px' }} 
            >
                {
                    prePhoneNumber.map(i => {
                        const item = { ...i }
                        return (
                            <Option style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between' ,
                                    flexDirection: 'row'
                                }} 
                                key={item.key} 
                                value={ item.key } 
                                >
                                <div className='flex justify-between' >
                                    <div>{ item.label }</div>
                                    <div>{ '+' + item.key }</div>
                                </div>
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }

    return (
        <div className="w-full h-full bg-[#f2f2f2] overflow-hidden">
            <Card style={{width: 700, margin: '200px auto 0'}}>
                <div className='flex flex-row'>
                    <QRCodeCom / >
                    <div className='flex-7 flex flex-col items-center'>
                        <div className='p-[10px] flex justify-between w-[200px]'>
                            {
                                loginModeOptions.map((i, index) => {
                                    return (
                                        <div 
                                            style={{
                                                color: loginMode === i.key ? colorPrimary : '',
                                                borderRight: loginModeOptions.length !== index + 1
                                                ? 
                                                '1px solid #e3e5e7'
                                                :
                                                ''
                                            }}
                                            key={i.key}
                                            className='w-[50%] text-center cursor-pointer'
                                            onClick={ () => loginModeClick(i.key) }
                                        >
                                            { i.label }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='pl-[50px] border-l-1 border-[#e3e5e7]'>
                            {
                                loginMode === 'password'
                                ?
                                <Form
                                    form={form}
                                    name='login'
                                    style={{ width: 360 }}
                                    validateTrigger="onBlur"
                                    initialValues={{
                                        account: '13109167207',
                                        password: '520559'
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item 
                                        name='account'
                                        rules={[
                                            { required: true, message: '请填写你的账号'},
                                        ]}
                                    >
                                        <Input prefix='账号' allowClear placeholder='请输入账号' />
                                    </Form.Item>
                                    <Form.Item 
                                        name='password' 
                                        rules={[{ required: true, message: '请填写你的密码' }]}
                                    >
                                        <Input.Password  prefix='密码' addonAfter="忘记密码？" allowClear placeholder='请输入密码' />
                                    </Form.Item>
                                    <Form.Item>
                                        <div className='flex justify-between'>
                                            <Button className='w-[49%]'>
                                                注 册
                                            </Button>
                                            <Button className='w-[49%]' type='primary' htmlType='submit'>
                                                登 录
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                                :
                                <Form
                                    form={form}
                                    name='login'
                                    style={{ width: 360 }}
                                    validateTrigger="onBlur"
                                    initialValues={{
                                        phone: '13109167207',
                                        code: '520559'
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item 
                                        name='phone'
                                        rules={[
                                            { required: true, message: '请填写你的手机号'},
                                            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确格式的手机号' }
                                        ]}
                                    >
                                        <Input addonBefore={ selectPhoneBefore() } addonAfter="获取验证码" allowClear placeholder='请输入账号' />
                                    </Form.Item>
                                    <Form.Item 
                                        name='code' 
                                        rules={[{ required: true, message: '请填写你的验证码' }]}
                                    >
                                        <Input  prefix='验证码' allowClear placeholder='请输入密码' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button block type='primary' htmlType='submit'>
                                            登 录 / 注 册
                                        </Button>
                                    </Form.Item>
                                </Form>
                                }
                        </div>
                        <OtherLogin />
                    </div>
                </div>
                <div className='text-[12px] text-[#9a9797] mt-[20px] text-center'>
                    未注册过赏金代码的手机号，我们将自动帮您注册账号 <br />
                    完成注册或登录即代表您同意 <a>隐私政策</a> 和 <a>用户协议</a>
                </div>
                
            </Card>
        </div>
    )
}

export default Login