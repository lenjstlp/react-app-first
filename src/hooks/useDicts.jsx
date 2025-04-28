import { useState, useEffect } from 'react'
import { getDict } from '@/apis/common'

function useDicts({ type }) {
  const [dicts, setDicts] = useState({})

  async function getDictList() {
    const { code, data } = await getDict({
      type
    })
    if (code === 0) {
      setDicts(data)
    }
  }
  useEffect(() => {
    getDictList()
  }, [])

  return {
    dicts
  }
}

export default useDicts
