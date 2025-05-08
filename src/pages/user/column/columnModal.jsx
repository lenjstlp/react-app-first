import { useState } from 'react'
import { Form, Input, Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { uploadPictures } from '@/apis/common'
import { createColumn as createColumnApi } from '@/apis/article'
function ColumnModal({
  modalOpen,
  setModalOpen,
  columnModalStatus = true,
  refreshColumnList
}) {
  // form实例绑定
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  function handleChange(val) {
    setFileList(val.fileList)
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  // 创建专栏
  async function addColumn(val) {
    const params = {
      ...val
    }
    const { code } = await createColumnApi(params)
    if (code === 0) {
      message.success('创建成功')
      setModalOpen(false)
      refreshColumnList()
    }
  }
  // 上传图片，返回链接String串
  async function uploadPic(val) {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('pics', file.originFileObj)
    })
    const { code, data } = await uploadPictures(formData)
    if (code === 0) {
      addColumn({ ...val, columnCover: data })
    }
  }

  function onFinish(val) {
    console.log(val, fileList)
    fileList.length ? uploadPic(val) : addColumn(val)
  }
  function submit() {
    form.submit()
  }
  function closeModal() {
    form.resetFields()
    setFileList([])
    setModalOpen(false)
  }
  return (
    <Modal
      title={columnModalStatus ? '创建专栏' : '编辑专栏'}
      centered
      open={modalOpen}
      onOk={() => submit()}
      onCancel={() => closeModal()}>
      <Form
        form={form}
        name='createArticle'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        initialValues={{
          columnName: '',
          columnIntro: ''
        }}
        onFinish={onFinish}>
        <Form.Item
          label='专栏名称'
          name='columnName'
          rules={[{ required: true, message: '请输入专栏名称' }]}>
          <Input placeholder='请输入专栏名称'></Input>
        </Form.Item>
        <Form.Item label='专栏封面' name='pic'>
          <Upload
            listType='picture-card'
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}>
            {uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          label='专栏简介'
          name='columnIntro'
          rules={[{ required: true, message: '请输入专栏简介' }]}>
          <Input.TextArea
            placeholder='请输入专栏简介'
            showCount
            maxLength={100}
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ColumnModal
