import MapBox from '@/components/MapBox';
import { Space, Button } from 'antd';
import { query } from 'esri-leaflet';
import L from 'leaflet';
import React, { useState } from 'react'
let latlngs: L.LatLng[] = []
var citiesUrl = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0';
var polygon = L.polygon([], { color: 'red' })
export default function QuerySapce() {
    const [map, setMap] = useState<L.Map>();

    const click = (e: any) => {
        if (!map) return;
        const { latlng } = e;
        latlngs.push(latlng)
        polygon.setLatLngs(latlngs)
        map?.on('mousemove', mousemove)
        polygon.addTo(map)
    }
    const mousemove = (e: any) => {
        const { latlng } = e;

        if (latlngs.length <= 1) {
            latlngs.push(latlng)
        } else {
            let last = latlngs.length - 1;
            latlngs[last] = latlng;
        }
        polygon.setLatLngs(latlngs)
    }
    const dblclick = () => {
        map?.off('click', click)
        map?.off('mousemove', mousemove)
        map?.off('dblclick', dblclick)
        map?.doubleClickZoom.enable()
        console.log(polygon.getBounds());

        query({
            url: citiesUrl
        }).within(polygon.getBounds()).run(function (error, cities) {
            if (error) {
                return;
            }
            map && L.geoJSON(cities).addTo(map)

        });
    }
    const queryHandle = () => {
        latlngs = [];
        map?.doubleClickZoom.disable()
        map?.on('click', click)
        map?.on('dblclick', dblclick)

    }
    return (
        <>
            <Space>
                <Button type='primary' onClick={queryHandle}>空间查询</Button>
            </Space>
            <MapBox setMap={setMap} />
        </>
    )
}
