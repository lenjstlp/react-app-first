import { useState, useEffect } from 'react'
import Empty from './empty'
import ColumnModal from './columnModal'
import ColumnListItem from './columnListItem'

import { getColumnList } from '@/apis/column'

function Column() {
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

  return (
    <div>
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
