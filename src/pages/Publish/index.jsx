import { useState } from 'react'
import { Form, Input, Select, Upload, Radio, Button, message, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Editor from '@/components/editor'
import { publishArticle } from '@/apis/article'
import useDicts from '@/hooks/useDicts'

function Publish() {
    // form实例绑定
    const [form] = Form.useForm()

    // 频道字典获取
    const { dicts } = useDicts({ type: 'ARTICLE_CHANNEL' })
    
    async function onFinish(val) {
        if (Number(val.cover) !== fileList.length) {
            return message.warning('封面类型与上传图片数量不匹配')
        }
        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('pics', file.originFileObj)
        })
        Object.keys(val).forEach(i => {
            i !== 'pic' && formData.append(i, val[i])
        })
        const { code } = await publishArticle(formData)
        if (code === 0) {
            form.resetFields()
            message.success('创建文章成功')
        }
    }

    // 封面&图片组联动，无图时隐藏
    const [picShow, SetPicShow] = useState('1')
    const coverList = [
        { value: '1', label: '单图' },
        { value: '3', label: '三图' },
        { value: '0', label: '无图' },
    ]
    function radioGroupChange(e) {
        SetPicShow(e.target.value)
    }

    // 封面图片上传
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])
    function handleChange(val) {
        console.log(val, '-------');
        setFileList(val.fileList)
    }
    function handlePreview(file) {
        console.log(file, 'file===');
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewOpen(true);
    }
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );
 
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
                            dicts['ARTICLE_CHANNEL'] &&
                            dicts['ARTICLE_CHANNEL'].map(i => {
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
                    picShow !== '0' && 
                    <Form.Item label={null} name='pic'>
                        <Upload 
                            listType="picture-card"
                            maxCount={picShow}
                            onChange={handleChange}
                            onPreview={handlePreview}
                            beforeUpload={() => false}
                        >
                            {
                                 uploadButton
                            }
                        </Upload>
                        {
                            previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: visible => setPreviewOpen(visible),
                                        afterOpenChange: visible => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )
                        }
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
