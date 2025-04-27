import { useEffect, useState } from 'react'
import { message, Table, Tooltip, Button, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { formatDate } from '@/utils'
import { getList, deleteArticle } from '@/apis/article'

function ArticleManage() {
    const [articleList, setArticleList] = useState([])
    async function queryArticleList() {
        const {code, data} = await getList()
        if(code === 0) {
            console.log(data, '======111');
            setArticleList(data)
            message.success('成功获取文章列表')
        }
    }
    useEffect(() => {
        queryArticleList()
    }, [])

    async function deleteClick(id) {
        const { code } = await deleteArticle({ articleId: id })
        if (code === 0) {
            message.success('删除文章成功')
            queryArticleList()
        }
    }

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
            minWidth: 90
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
            render: value => {
                if (!value) return ''
                const arr = value.split(',')
                
                return (
                    <div className='flex'>
                        {
                            arr.map(i => {
                                return (
                                    <img className='w-[80px] mr-[5px]' key={i} src={i} alt="文章封面" /> 
                                )
                            })
                        }
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
                        <Tooltip title="编辑">
                            <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="删除">
                        <Popconfirm
                            title="删除确认"
                            description="确定要删除这篇文章吗?"
                            onConfirm={() => deleteClick(record.id)}
                            onCancel={() => message.info('取消删除')}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button 
                                type="primary" 
                                shape="circle" 
                                danger 
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                        </Tooltip>
                    </Space>
                )
            }
        },
    ]

    return (
        <div className='h-[100%] flex flex-col'>
            <div className='h-[20%]'>筛选form</div>
            <div className='flex-1'>
                <Table columns={columns} dataSource={articleList}></Table>
            </div>
        </div>
    )
}

export default ArticleManage