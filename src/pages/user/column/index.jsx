import { useState, useEffect } from 'react'
import Empty from './empty'
import ColumnModal from './columnModal'

function Column() {
  // 进入该页面先查询专栏列表，为空显示创建专栏
  const [columnList, setColumnList] = useState([])
  function refreshColumnList() {
    setColumnList([])
  }

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    console.log(setColumnList)
  })
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
