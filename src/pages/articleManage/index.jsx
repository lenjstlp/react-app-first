import { useEffect, useState } from 'react'
import { message } from 'antd'
import { getList } from '@/apis/article'

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

    return (
        <div>
            {
                articleList.map(i => {
                    return (
                        <div key={i.id}>
                            <div>{ i.title }</div>
                            <div>{ () => { i.content } } </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ArticleManage