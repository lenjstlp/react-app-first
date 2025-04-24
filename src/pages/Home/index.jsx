import { useEffect, useMemo ,useState } from 'react'
import { Button } from 'antd'
import { log401 } from '@/apis/common'
import ChartsMemo from '@/components/charts'

function Home() {
    const [count, setCount] = useState(10)
    useEffect(() => {
        async function getLogout401() {
            const res = await log401('/logout401')
            console.log(res, '===---');
        }
        // getLogout401()
    }, [])
    const options = useMemo(() => {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }, [])
    // const options = {
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [150, 230, 224, 218, 135, 147, 260],
    //       type: 'line'
    //     }
    //   ]
    // }
    return (
        <div>
          {count}
            <Button onClick={() => setCount(count + 1)}>button</Button>
            <ChartsMemo width='500px' height='500px' options={options} />
        </div>
    )
}

export default Home
