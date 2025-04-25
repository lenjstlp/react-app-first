import { Form, Input, Select, Upload, Radio, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function Publish() {
    return (
        <div className='h-[100%]'>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
                <Form.Item label="标题">
                    <Input />
                </Form.Item>
                <Form.Item label="频道">
                    <Select>
                        <Select.Option value="1">推荐</Select.Option>
                        <Select.Option value="2">前端</Select.Option>
                        <Select.Option value="3">后端</Select.Option>
                        <Select.Option value="4">html</Select.Option>
                        <Select.Option value="5">css</Select.Option>
                        <Select.Option value="6">C++</Select.Option>
                        <Select.Option value="7">数据库</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="封面">
                    <Radio.Group>
                        <Radio value="1"> 无图 </Radio>
                        <Radio value="2"> 单图 </Radio>
                        <Radio value="3"> 三图 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={null}>
                    <Upload action="/upload.do" listType="picture-card">
                        <button
                        style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                        type="button"
                        >
                        <PlusOutlined />
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item label="内容">
                    <Input />
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
