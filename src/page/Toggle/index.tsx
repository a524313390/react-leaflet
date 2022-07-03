import { baseMap } from '@/assets/js/config';
import MapBox from '@/components/MapBox'
import { Space, Button } from 'antd'
import React, { useEffect, useState } from 'react'

export default function Toggle() {
    const [map, setMap] = useState<L.Map>();

    const toggleMap = (item: any) => {
        const { id } = item;
        map?.eachLayer((layer: any) => {
            const layerid = layer?.options?.id;
            if (layerid && layerid.includes('base')) {
                layer.setOpacity(0)
            }
            if (layerid && layerid == id) {
                layer.setOpacity(1)
            }
        })

    }
    return (
        <>
            <Space>
                {baseMap.map(item => {
                    return (<Button type="primary" key={item.id} onClick={() => toggleMap(item)}>{item.name}</Button>);
                })}
            </Space>
            <MapBox setMap={setMap} />
        </>
    )
}
