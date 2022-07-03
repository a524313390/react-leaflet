import MapBox from '@/components/MapBox';
import React, { useEffect, useState } from 'react'
import * as turf from '@turf/turf'
import L from 'leaflet';
import { EChartsOption } from 'echarts';
import option from './options'
import ReactDOM from 'react-dom';
import EchartsBox from '@/components/EchartBox';
import './index.less'
(L as any).echartLayer = ((latlng: L.LatLng, options: EChartsOption) => {
    const div = document.createElement('div');
    div.style.width = '100%'
    div.style.height = '100%'
    ReactDOM.render(<EchartsBox options={options} />, div);
    const divicon = L.divIcon({ html: div, className: 'echarts-wrap' });
    const maker = L.marker(latlng, { icon: divicon });

    return maker
})
export default function EchartsView() {

    const [map, setMap] = useState<L.Map>();
    const [layer] = useState(L.layerGroup());
    var points = turf.randomPoint(10, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
    useEffect(() => {
        if (map) {
            points.features.forEach(item => {
                const latlng = item.geometry.coordinates;
                const marker = (L as any).echartLayer(L.latLng(latlng[1], latlng[0]), option)
                layer.addLayer(marker);
            })
            layer.addTo(map)
            map.on('zoom', e => {
                const zoom = map.getZoom();
                if (zoom <= 8) {
                    layer.eachLayer((layer: any) => {
                        layer.setOpacity(0)

                    })
                } else {
                    layer.eachLayer((layer: any) => {
                        layer.setOpacity(1)

                    })
                }
            })
        }
    }, [map]);
    return (
        <>
            <MapBox setMap={setMap} />
        </>
    )
}
