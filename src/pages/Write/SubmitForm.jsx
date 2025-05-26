import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Select,
  Upload,
  Button,
  message,
  Image,
  Space,
  Input,
  Checkbox
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addAndEditArticle } from '@/apis/article'
import { getColumnList } from '@/apis/column'

function SubmitForm({ articleParams, setPopoverShow, dicts }) {
  // form实例绑定
  const [form] = Form.useForm()

  console.log(articleParams, 'articleParams')

  useEffect(() => {
    // 获取专栏下拉
    queryColumnList()

    // form实例绑定
    form.setFieldsValue({ ...articleParams })
    const url = articleParams.cover
    if (url) {
      setFileList([
        {
          uid: '-1',
          name: url.split('/').pop(),
          status: 'done',
          url
        }
      ])
    }
  }, [])

  const navigate = useNavigate()
  async function onFinish(val) {
    const formData = new FormData()

    // 处理封面
    const file = fileList[0]
    if (fileList.length > 0) {
      if (file.originFileObj) {
        formData.append('cover', file.originFileObj)
      } else {
        formData.append('coverUrl', file.url)
      }
    } else {
      formData.append('coverDelete', 'coverDelete')
    }

    const obj = {
      ...val,
      columnIds: val.columnIds ? val.columnIds.join(',') : '',
      channel: val.channel ? val.channel.join(',') : '',
      content: articleParams.content,
      title: articleParams.title,
      id: articleParams.id
    }
    Object.keys(obj).forEach((i) => {
      formData.append(i, obj[i])
    })

    const { code } = await addAndEditArticle(formData, articleParams.id)
    const status = 'success'
    const title = articleParams.id ? '编辑文章成功' : '创建文章成功'
    if (code === 0) {
      form.resetFields()
      localStorage.removeItem('EDIT_ARTICLE')
      setPopoverShow(false)
      navigate('/resultPage', { state: { status, title } })
    } else {
      message.warning(title)
    }
  }

  // 封面图片上传
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  function handleChange(val) {
    setFileList(val.fileList)
  }
  function handlePreview(file) {
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewOpen(true)
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  // 专栏
  // 回填专栏多选框
  function backfillColumnIds(data) {
    const articleId = articleParams.id // 当前文章id
    const arr = []
    data.forEach((i) => {
      const articleIdsArr = i.articleIds.split(',')
      if (articleIdsArr.includes(articleId)) {
        arr.push(i.id)
      }
    })
    form.setFieldValue('columnIds', arr)
  }
  // 获取登陆人专栏列表
  async function queryColumnList() {
    const { code, data } = await getColumnList()
    if (code === 0) {
      const newData = data.map((i) => {
        return {
          ...i,
          value: i.id,
          label: i.columnName
        }
      })
      setColumnOptions(newData)

      // 编辑状态回填专栏多选框
      articleParams.id && backfillColumnIds(newData)
    }
  }
  // 专栏下拉数据
  const [columnOptions, setColumnOptions] = useState([])
  return (
    <Form
      form={form}
      name='createArticle'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
      layout='horizontal'
      style={{ maxWidth: 600 }}
      initialValues={{
        channel: ['1'],
        abstract: ''
      }}
      onFinish={onFinish}>
      <Form.Item
        label='频道'
        name='channel'
        rules={[{ required: true, message: '请输入频道' }]}>
        <Checkbox.Group options={dicts['ARTICLE_CHANNEL']} />
      </Form.Item>
      <Form.Item label={null} name='pic'>
        <div>
          <Upload
            listType='picture-card'
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            beforeUpload={() => false}>
            {uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage('')
              }}
              src={previewImage}
            />
          )}
        </div>
      </Form.Item>
      <Form.Item label='专栏' name='columnIds'>
        <Select
          placeholder='请选择文章专栏'
          mode='multiple'
          allowClear
          options={columnOptions}
        />
      </Form.Item>
      <Form.Item
        label='文章摘要'
        name='abstract'
        rules={[{ required: true, message: '请输入文章摘要' }]}>
        <Input.TextArea
          placeholder='请输入文章摘要'
          showCount
          maxLength={100}
          rows={4}
        />
      </Form.Item>
      <Form.Item style={{ width: '100%' }} label={null}>
        <Space className='flex justify-end w-[100%]'>
          <Button onClick={() => setPopoverShow(false)}>取消</Button>
          <Button type='primary' htmlType='submit'>
            {articleParams.id ? '确定修改' : '确定创建'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SubmitForm
