import { useEffect, useRef, memo } from 'react'
import * as echarts from 'echarts';

const ChartsMemo = memo(function Charts({ width = '300px', height = '300px', options }) {
    console.log('charts组件渲染', options);
    
    const chartRef = useRef(null)
    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        myChart.setOption(options);
    }, [])

    return (
        <div>
            <div ref={chartRef} style={{ width, height }}></div>
        </div>
    )
})

export default ChartsMemo
