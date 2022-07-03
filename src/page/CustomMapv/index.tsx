import MapBox from '@/components/MapBox';
import React, { useEffect, useState } from 'react'
import * as turf from '@turf/turf'
import createMapv from './options';
import L from 'leaflet';
import { Button } from 'antd';

const toCenter = L.latLng([31.285216573725478, 120.59921259060503]);
export default function CustomMapv() {

    const [map, setMap] = useState<L.Map>();
    const [mapvLayer, setMapvLayer] = useState<L.FeatureGroup>();
    const points = turf.randomPoint(10, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
    useEffect(() => {
        if (map) {
            const qianxiData = points.features as any
            const mapvLayers = createMapv({
                toCenter,
                qianxiData,
                map,
                click: (e: any) => {
                    console.log(e);

                }
            })
            mapvLayers.addTo(map)
            setMapvLayer(mapvLayers)
        }
    }, [map]);
    const removeLayer = () => {
        mapvLayer && mapvLayer.clearLayers();
    }
    return (
        <>
            <Button type='primary' onClick={removeLayer}>删除图层</Button>
            <MapBox setMap={setMap} />
        </>
    )
}
