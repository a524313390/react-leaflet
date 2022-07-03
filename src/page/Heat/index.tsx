import React, { useEffect, useState } from 'react'
import MapBox from '@/components/MapBox';
import L, { HeatLatLngTuple } from 'leaflet'
import * as turf from '@turf/turf'
import 'leaflet.heat'

export default function Cluster() {
    const [map, setMap] = useState<L.Map>();
    useEffect(() => {
        if (map) {
            var points = turf.randomPoint(300, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
            const positionArr: HeatLatLngTuple[] = [];
            points.features.forEach(item => {
                const latlng = item.geometry.coordinates as number[];
                const intensity = Math.random() * (1000) + 1000//强度
                positionArr.push([latlng[1], latlng[0], intensity])
            })
            const heatLayer = L.heatLayer(positionArr, { radius: map.getZoom() }).addTo(map)
            //半径随着地图的放大层级倍数相应的改变
            map.on("zoomend", function () {
                heatLayer.setOptions({ radius: map.getZoom() });
            });
        }
    }, [map]);

    return (
        <>
            <MapBox setMap={setMap} />
        </>
    )
}
