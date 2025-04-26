import { useState, useEffect } from 'react'
import { Form, Input, Select, Upload, Radio, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Editor from '@/components/editor'
import { getDict } from '@/apis/common'
import { publishArticle } from '@/apis/article'

function Publish() {
    // form实例绑定
    const [form] = Form.useForm()

    // 频道字典获取
    async function getDictList() {
        const { code, data }= await getDict({
            type: 'ARTICLE_CHANNEL'
        })
        if (code === 0) {
            setChannelList(data)
        }
    }
    useEffect(() => {
        getDictList()
    }, [])
    const [channelList, setChannelList] = useState([])

    async function onFinish(val) {
        const params = {
            ...val
        }
        const { code } = await publishArticle(params)
        if (code === 0) {
            form.resetFields()
            message.success('创建文章成功')
        }
    }

    // 封面&图片组联动，无图时隐藏
    const [picShow, SetPicShow] = useState(true)
    const coverList = [
        { value: '1', label: '单图' },
        { value: '2', label: '三图' },
        { value: '3', label: '无图' },
    ]
    function radioGroupChange(e) {
        e.target.value === '3' ? SetPicShow(false) : SetPicShow(true)
    }

    return (
        <div className='h-[100%]'>
            <Form
                form={form}
                name='createArticle'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                initialValues={{
                    channel: '1',
                    cover: '1',
                    content: ''
                }}
                onFinish={onFinish}
            >
                <Form.Item label="标题" name='title' rules={[{ required: true, message: '请填写文章标题' }]} >
                    <Input placeholder='请输入文章标题' />
                </Form.Item>
                <Form.Item label="频道" name='channel'>
                    <Select placeholder='请选择文章频道'>
                        {
                            channelList.map(i => {
                                return  (
                                    <Select.Option value={i.value} key={i.value}>{ i.label }</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="封面" name='cover' >
                    <Radio.Group onChange={radioGroupChange}>
                        {
                            coverList.map(i => {
                                return (
                                    <Radio value={i.value} key={i.value}> { i.label } </Radio>
                                )
                            })
                        }
                    </Radio.Group>
                </Form.Item>
                {
                    picShow && 
                    <Form.Item label={null} name='pic'>
                        <Upload action="/upload.do" listType="picture-card">
                            <button
                                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                                type="button"
                            >
                                <PlusOutlined />
                            </button>
                        </Upload>
                </Form.Item>
                }
                <Form.Item label="内容" name='content' rules={[{ required: true, message: '请填写文章内容' }]}>
                    <Editor />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        发布文章
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Publish
