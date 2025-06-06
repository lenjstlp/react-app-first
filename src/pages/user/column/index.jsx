import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from 'antd'
import Empty from './empty'
import ColumnModal from './columnModal'
import ColumnListItem from './columnListItem'

import { getColumnList } from '@/apis/column'

function Column() {
  const {
    token: { colorPrimary }
  } = theme.useToken()

  // 进入该页面先查询专栏列表，为空显示创建专栏
  const [columnList, setColumnList] = useState([])

  // 格式数据
  function formatNumberData(str) {
    if (!str) return 0
    return str.split(',').length
  }
  // 获取登陆人专栏列表
  async function queryColumnList() {
    const { code, data } = await getColumnList()
    if (code === 0) {
      console.log(data, '-----')
      setColumnList(
        data.map((i) => {
          return {
            ...i,
            articleNum: formatNumberData(i.articleIds),
            subscriberNum: formatNumberData(i.subscriberIds)
          }
        })
      )
    }
  }
  function refreshColumnList() {
    queryColumnList([])
  }

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    queryColumnList()
  }, [])

  const navigate = useNavigate()
  // 跳转专栏详情页
  function columnItemClick(e) {
    const targetElement = e.target.closest('[data-column-id]')
    if (targetElement) {
      const columnId = targetElement.getAttribute('data-column-id')
      const articleIds = columnList.find((i) => i.id === columnId).articleIds
      navigate(`/column/${columnId}`, {
        state: {
          articleIds
        }
      })
    }
  }

  // 创建专栏
  function createColumn() {
    console.log('创建专栏')
    setModalOpen(true)
  }

  return (
    <div onClick={(e) => columnItemClick(e)}>
      <div className='flex h-[26px] px-[15px] bg-[#fff]'>
        <div
          className='ml-auto cursor-pointer leading-[26px]'
          style={{ color: colorPrimary }}
          onClick={createColumn}>
          创建专栏
        </div>
      </div>
      {columnList.length > 0 ? (
        columnList.map((i) => {
          return <ColumnListItem key={i.id} columnItem={i} />
        })
      ) : (
        <Empty setModalOpen={setModalOpen} />
      )}
      <ColumnModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        refreshColumnList={refreshColumnList}
      />
    </div>
  )
}

export default Column
