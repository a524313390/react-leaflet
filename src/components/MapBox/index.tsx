import React, { useEffect, useRef } from 'react'
import { DynamicMapLayer, dynamicMapLayer } from 'esri-leaflet'
import './index.less'
import L from 'leaflet';
import { baseMap } from '@/assets/js/config';
interface Props {
    setMap?: Function;
}
export default function MapBox(props: Props) {
    const { setMap } = props;
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const layers: any[] = [];
        baseMap.forEach(item => {
            const layer = L.tileLayer(item.url, {
                id: item.id,
                opacity: item.visible ? 1 : 0,
            })

            layers.push(layer)
        })
        const map = L.map(mapRef.current as HTMLDivElement, {
            center: [31.285216573725478, 120.59921259060503],
            zoom: 10,
            zoomControl: false,
            attributionControl: false,
            layers,
        })

        setMap && setMap(map)
    }, []);
    return (
        <div ref={mapRef} className='map-box'> </div>
    )
}
