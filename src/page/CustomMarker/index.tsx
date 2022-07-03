import React, { useEffect, useState } from 'react'
import MapBox from '@/components/MapBox';
import L from 'leaflet'
import * as turf from '@turf/turf'
import ReactDOM from 'react-dom';
import PointMarker from '@/components/PointMarker';

interface MarkerOptions {
    name: string;
    number: number;
    unit?: string;
}
(L as any).animateMarker = function (point: L.LatLng, options: MarkerOptions) {
    const { name, number } = options;

    const div = document.createElement('div');
    ReactDOM.render(<PointMarker name={name} number={number} />, div)

    var myIcon = L.divIcon({ className: 'my-div-icon', html: div });
    var marker = L.marker(point, { icon: myIcon, title: '123213' });
    return marker;
}
export default function CustomMarker() {
    const [map, setMap] = useState<L.Map>();
    const points = turf.randomPoint(10, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
    const [layerGroup, setLayerGaroup] = useState(L.layerGroup())
    useEffect(() => {
        if (map) {
            points.features.forEach(item => {
                const postion = item.geometry.coordinates;
                const latlng = L.latLng(postion[1], postion[0]);
                const marker = (L as any).animateMarker(latlng, { name: '姓名', number: '张三' });
                layerGroup.addLayer(marker)
            })
            layerGroup.addTo(map)
        }
    }, [map]);

    return (
        <>
            <MapBox setMap={setMap} />
        </>
    )
}
