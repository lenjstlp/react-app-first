import { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

function Charts({ width = '300px', height = '300px', options }) {
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
}

export default Charts
