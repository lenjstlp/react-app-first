import { useEffect, useState } from 'react'
import {
  message,
  Table,
  Tooltip,
  Button,
  Space,
  Tag,
  Popconfirm,
  Form,
  Radio,
  Select,
  DatePicker
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { formatDate, dictSelect } from '@/utils'
import { getList, deleteArticle } from '@/apis/article'
import useDicts from '@/hooks/useDicts'

function ArticleManage() {
  const { dicts } = useDicts({ type: 'AUDIT_STATUS,ARTICLE_CHANNEL' })

  // form
  const [articleParams, setArticleParams] = useState({
    audit: '1',
    channel: '',
    startTime: '',
    endTime: '',
    pageNum: 1,
    pageSize: 10
  })
  function onFinish(val) {
    setArticleParams({
      ...articleParams,
      audit: val.audit,
      channel: val.channel,
      startTime: val.date?.[0]?.format('YYYY-MM-DD'),
      endTime: val.date?.[1]?.format('YYYY-MM-DD')
    })
  }

  async function queryArticleList(val) {
    const { code, data } = await getList(val)
    if (code === 0) {
      setArticleList(data.data)
      setTotal(data.total)
      message.success('成功获取文章列表')
    }
  }
  useEffect(() => {
    queryArticleList(articleParams)
  }, [articleParams])

  async function deleteClick(id) {
    const { code } = await deleteArticle({ articleId: id })
    if (code === 0) {
      message.success('删除文章成功')
      queryArticleList()
    }
  }

  const [articleList, setArticleList] = useState([])
  const [total, setTotal] = useState(0)
  // table
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      minWidth: 120
    },
    {
      title: '审核状态',
      dataIndex: 'audit',
      key: 'audit',
      minWidth: 90,
      render: (val) => {
        return (
          <Tag color={dictSelect(dicts['AUDIT_STATUS'], val, 'color')}>
            {dictSelect(dicts['AUDIT_STATUS'], val)}
          </Tag>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      minWidth: 160,
      render: (value) => {
        return formatDate(value)
      }
    },
    {
      title: '封面',
      dataIndex: 'pics',
      key: 'napicsme',
      width: 500,
      render: (value) => {
        if (!value) return ''
        const arr = value.split(',')

        return (
          <div className='flex'>
            {arr.map((i) => {
              return (
                <img
                  className='w-[80px] mr-[5px]'
                  key={i}
                  src={i}
                  alt='文章封面'
                />
              )
            })}
          </div>
        )
      }
    },
    {
      title: '阅读数',
      dataIndex: 'read',
      key: 'read',
      minWidth: 80
    },
    {
      title: '评论数',
      dataIndex: 'comment',
      key: 'comment',
      minWidth: 80
    },
    {
      title: '点赞数',
      dataIndex: 'like',
      key: 'like',
      minWidth: 80
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      minWidth: 120,
      fixed: 'right',
      render: (val, record) => {
        return (
          <Space>
            <Tooltip title='编辑'>
              <Button type='primary' shape='circle' icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title='删除'>
              <Popconfirm
                title='删除确认'
                description='确定要删除这篇文章吗?'
                onConfirm={() => deleteClick(record.id)}
                onCancel={() => message.info('取消删除')}
                okText='确定'
                cancelText='取消'>
                <Button
                  type='primary'
                  shape='circle'
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        )
      }
    }
  ]

  // page
  function pageChange(page, pageSize) {
    setArticleParams({
      ...articleParams,
      pageNum: page,
      pageSize: pageSize
    })
  }

  return (
    <div className='h-[100%] flex flex-col'>
      <div className='h-[10%]'>
        <Form
          layout='inline'
          initialValues={{
            audit: '3'
          }}
          onFinish={onFinish}>
          <Form.Item className='w-[300px]' label='状态' name='audit'>
            <Radio.Group>
              <Radio value='3'> 全部 </Radio>
              <Radio value='0'> 未审核 </Radio>
              <Radio value='1'> 审核通过 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className='w-[260px]' label='频道' name='channel'>
            <Select placeholder='请选择频道'>
              {dicts['ARTICLE_CHANNEL'] &&
                dicts['ARTICLE_CHANNEL'].map((i) => {
                  return (
                    <Select.Option key={i.value} value={i.value}>
                      {i.label}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
          <Form.Item className='w-[300px]' label='日期' name='date'>
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Button block type='primary' htmlType='submit'>
              筛 选
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='flex-1'>
        <Table
          columns={columns}
          dataSource={articleList}
          pagination={{
            total: total,
            current: articleParams.pageNum,
            pageSize: articleParams.pageSize,
            pageSizeOptions: [10, 20, 50, 100],
            onChange: pageChange
          }}
        />
      </div>
    </div>
  )
}

export default ArticleManage
