import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input, Button, Popover } from 'antd'
import Editor from '@/components/writeEditor'
import AvatarPopover from '@/pages/Layout/avatarPopover'
import SubmitForm from './SubmitForm'
import { getArticleById } from '@/apis/article'

import useDicts from '@/hooks/useDicts'

function Write() {
  const { dicts } = useDicts({ type: 'ARTICLE_CHANNEL' })

  const [params] = useSearchParams()
  const id = params.get('id') // id 存在作为编辑模式
  async function queryArticleById() {
    const { code, data } = await getArticleById({ id })
    if (code === 0) {
      console.log(data, '===')
      setAddArticleParams({
        ...addArticleParams,
        ...data,
        channel: data.channel ? data.channel.split(',') : []
      })
    }
  }

  useEffect(() => {
    id && queryArticleById() // 编辑模式根据 id 获取文章详情

    !id &&
      setAddArticleParams({
        ...addArticleParams,
        content: JSON.parse(localStorage.getItem('EDIT_ARTICLE')) || ''
      })

    return () => {
      // 编辑状态组件卸载时，清除本地存储
      id && localStorage.removeItem('EDIT_ARTICLE')
    }
  }, [])

  const [addArticleParams, setAddArticleParams] = useState({
    title: '',
    content: '',
    abstract: ''
  })

  function articleContentChange(val) {
    const newData = {
      ...addArticleParams,
      content: val
    }

    setAddArticleParams(newData)

    // debounceArticleContentSetStorage(newData)
    localStorage.setItem('EDIT_ARTICLE', JSON.stringify(val))
  }
  // 静置 5 秒后暂存草稿
  // const debounceArticleContentSetStorage = debounce((val) => {
  //   localStorage.setItem('EDIT_ARTICLE', JSON.stringify(val))
  // }, 5000)

  const [popoverShow, setPopoverShow] = useState(false)
  const releaseContent = (
    <div className='w-[390px]'>
      <div className='text-[20px] pb-[10px] border-b-1 border-[#e3e5e7]'>
        发布文章
      </div>
      <div className='my-[10px]'>
        <SubmitForm
          articleParams={addArticleParams}
          setPopoverShow={setPopoverShow}
          dicts={dicts}
        />
      </div>
    </div>
  )

  return (
    <>
      <div className='flex items-center justify-between h-[60px] bg-[#fff]'>
        <Input
          className='h-[60px]'
          style={{
            width: 700,
            fontSize: '26px'
          }}
          placeholder='请输入标题'
          value={addArticleParams.title}
          variant='borderless'
          onChange={(e) => {
            setAddArticleParams({
              ...addArticleParams,
              title: e.target.value
            })
          }}
        />
        <div className='flex ml-auto mr-[20px]'>
          <Popover
            open={popoverShow}
            placement='bottomRight'
            content={releaseContent}
            trigger='click'>
            <Button
              type='primary'
              onClick={() => {
                setPopoverShow(true)
              }}>
              {id ? '编辑' : '发布'}
            </Button>
          </Popover>
        </div>
        <div className='mr-[20px] cursor-pointer'>
          <AvatarPopover />
        </div>
      </div>
      <div className='h-[100%]'>
        <Editor
          value={addArticleParams.content}
          setValue={(value) => {
            articleContentChange(value)
          }}
        />
      </div>
    </>
  )
}

export default Write
