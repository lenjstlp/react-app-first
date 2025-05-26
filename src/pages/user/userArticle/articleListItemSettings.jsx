import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { message, Popconfirm } from 'antd'
import DeleteSvg from '@/assets/svg/delete-svg.svg?react'
import Edit from '@/assets/svg/edit.svg?react'

import { deleteArticle } from '@/apis/article'

import { userArticleContext } from './index'

function ArticleListItemSettings({ articleItem, popoverRef }) {
  const { refreshArticleList } = useContext(userArticleContext)
  const navigate = useNavigate()

  function editClick() {
    navigate('/write' + '?' + 'id' + '=' + articleItem.id)
  }
  async function deleteClick() {
    const { code } = await deleteArticle({ articleId: articleItem.id })
    if (code === 0) {
      message.success('删除文章成功')
      refreshArticleList()
    }
  }
  return (
    <div
      ref={popoverRef}
      className='w-[60px] px-[5px] text-[#8a919f] cursor-pointer'>
      <div
        className='flex items-center justify-between py-[5px] hover:bg-[#f5f5f5]'
        onClick={editClick}>
        <Edit className='text-[16px]' fill='#8a919f' />
        编辑
      </div>
      <Popconfirm
        title='确认删除'
        description='是否确定删除这篇文章?'
        okText='确定'
        cancelText='取消'
        onCancel={() => message.info('取消删除')}
        onConfirm={deleteClick}>
        <div className='flex items-center justify-between py-[5px] hover:bg-[#f5f5f5]'>
          <DeleteSvg className='text-[16px]' fill='#8a919f' />
          删除
        </div>
      </Popconfirm>
    </div>
  )
}

export default ArticleListItemSettings
