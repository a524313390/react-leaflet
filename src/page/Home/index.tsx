import MapBox from '@/components/MapBox'
import L from 'leaflet'
import React, { useEffect, useState } from 'react'
const corner1 = L.latLng(50.4838600000, 77.1125230000) // 地图左上角
const corner2 = L.latLng(22.5557360000, 138.0866980000) // 地图右上角
const bounds = L.latLngBounds(corner1, corner2) // 根据2个经纬度来确定一个矩形 
export default function Home() {
    const [map, setMap] = useState<L.Map>();
    useEffect(() => {
        if (map) {
            map.setMaxBounds(bounds) // 设置经纬度范围,鼠标拖动的时候,不在设置范围内,会进行回弹

        }
    }, [map]);
    return (
        <>

            <MapBox setMap={setMap} />
        </>
    )
}
