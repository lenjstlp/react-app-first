import { useState, useEffect } from 'react'
import Empty from './empty'
import ColumnModal from './columnModal'

import { getColumnList } from '@/apis/column'

function Column() {
  // 进入该页面先查询专栏列表，为空显示创建专栏
  const [columnList, setColumnList] = useState([])
  // 获取登陆人专栏列表
  async function queryColumnList() {
    const { code, data } = await getColumnList()
    if (code === 0) {
      console.log(data, '-----')
      setColumnList(data)
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
        '专栏列表'
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
