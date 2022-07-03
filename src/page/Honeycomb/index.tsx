import MapBox from '@/components/MapBox';
import React, { useEffect, useState } from 'react'
import * as turf from '@turf/turf'
import { DataSet, leafletMapLayer } from 'mapv'
export default function Honeycomb() {
    const [map, setMap] = useState<L.Map>();
    const points = turf.randomPoint(50, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
    points.features.forEach((item: any) => {
        item.count = 30 * Math.random()
    })


    useEffect(() => {
        if (map) {
            var dataSet = new DataSet(points.features);


            var options = {
                fillStyle: 'rgba(55, 50, 250, 0.8)',
                shadowColor: 'rgba(255, 250, 50, 1)',
                shadowBlur: 20,
                max: 100,
                size: 50,
                unit: 'px', // unit可选值['px', 'm']，默认值为'px'
                label: {
                    show: true,
                    fillStyle: 'white'
                },
                globalAlpha: 0.5,
                gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
                draw: 'honeycomb',
                methods: {
                    click: (e: any) => {
                        console.log(e);

                    }
                }
            };

            //创建MapV图层
            leafletMapLayer(dataSet, options).addTo(map);
        }
    }, [map]);
    return (
        <>
            <MapBox setMap={setMap} />
        </>
    )
}
