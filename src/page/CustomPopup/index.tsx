import React, { useEffect, useState } from 'react'
import MapBox from '@/components/MapBox';
import L from 'leaflet'
import * as turf from '@turf/turf'
import ReactDOM from 'react-dom';
import Popup from '@/components/Popup';


export default function CustomPopup() {
    const [map, setMap] = useState<L.Map>();
    const points = turf.randomPoint(10, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
    const [layerGroup, setLayerGaroup] = useState(L.layerGroup())
    useEffect(() => {
        if (map) {
            const layer = L.geoJSON(points);
            layer.addTo(map)
            layer.bindPopup(function (layer) {
                const div = document.createElement('div');
                ReactDOM.render(<Popup />, div)
                return div
            }, {
                className: 'custom-popup',
                minWidth: 300,
                maxHeight: 150
            })
        }

    }, [map]);

    return (
        <>
            <MapBox setMap={setMap} />
        </>
    )
}
