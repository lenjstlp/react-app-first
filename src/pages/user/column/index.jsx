import { useState, useEffect } from 'react'
import Empty from './empty'

function Column() {
  // 进入该页面先查询专栏列表，为空显示创建专栏
  const [columnList, setColumnList] = useState([])
  useEffect(() => {
    console.log(setColumnList)
  })
  return <div>{columnList.length > 0 ? '专栏列表' : <Empty />}</div>
}

export default Column
