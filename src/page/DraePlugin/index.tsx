import MapBox from '@/components/MapBox';
import { Space, Button } from 'antd';
import L from 'leaflet';
import React, { useEffect, useState } from 'react'
// import { MeasureDraw } from './fun';

import 'leaflet-measure-path'
import MeasureDraw from 'leaflet-draw-measure'
import 'leaflet-measure-path/leaflet-measure-path.css';
window.document.oncontextmenu = () => false;
export default function DraePlugin() {
    const [map, setMap] = useState<L.Map>();
    const [drawPlugin, setDrawPlugin] = useState<MeasureDraw>();
    useEffect(() => {
        if (map) {
            let draw = new MeasureDraw({ map, measure: true })
            setDrawPlugin(draw)
        }
    }, [map]);
    const drawHandle = (type: string) => {
        if (!drawPlugin) return;

        if (type === 'circle') {
            drawPlugin.createCricle()
        }
        if (type === 'line') {

            console.log('line');

            drawPlugin.createLine();
        }
        if (type === 'rect') {
            drawPlugin.createRectangle()
        }
        if (type === 'polygon') {


            drawPlugin.createPolygon()
        }
        if (type === 'remove') {
            drawPlugin.remove()
        }
    }
    return (
        <>
            <Space>
                <Button type='primary' onClick={() => drawHandle('circle')}>园</Button>
                <Button type='primary' onClick={() => drawHandle('line')}>线</Button>
                <Button type='primary' onClick={() => drawHandle('rect')}>矩形</Button>
                <Button type='primary' onClick={() => drawHandle('polygon')}>多边形</Button>
                <Button type='primary' onClick={() => drawHandle('remove')}>删除</Button>
            </Space>
            <MapBox setMap={setMap} />
        </>
    )
}
