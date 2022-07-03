import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { Empty } from 'antd';
interface Props {
    options: EChartsOption
}
export default function EchartsBox(props: Props) {
    const { options } = props;
    const echartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        const echart = echarts.init(echartRef.current as HTMLDivElement);
        options && echart.setOption(options)
        const resize = () => {
            echart.resize();
        }
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }

    }, []);
    if (!options) {
        return <Empty />
    }
    return (
        <div ref={echartRef} style={{ width: '100%', height: '100%' }}></div>
    )
}
