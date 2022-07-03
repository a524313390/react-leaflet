import MapBox from '@/components/MapBox';
import L from 'leaflet'
import React, { useEffect, useState } from 'react'
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import * as turf from '@turf/turf'
import type1 from './img/1.png'
import type2 from './img/2.png'
import type3 from './img/3.png'
import type4 from './img/4.png'


const imgArr = [type1, type2, type3, type4]

export default function Cluster() {
    const [map, setMap] = useState<L.Map>();
    useEffect(() => {
        if (map) {
            var points = turf.randomPoint(300, { bbox: [119.76058554919527, 31.926530566007585, 121.43417843771293, 30.622941962876013] })
            points.features.forEach(item => {
                const properties = item.properties;
                const rand = Math.random() * (5 - 1) + 1;
                properties.type = Math.floor(rand)
            })
            const clusterLayer = L.markerClusterGroup({
                showCoverageOnHover: true,
                zoomToBoundsOnClick: true,
                chunkedLoading: true,
                maxClusterRadius: 40, //默认80
            }).addTo(map);
            const clusterArr: any = [];
            points.features.forEach(item => {
                const latlng = item.geometry.coordinates;
                const type = item.properties.type;

                const img = imgArr[type - 1];


                var myIcon = L.icon({
                    iconUrl: img,
                    iconSize: [25, 25],
                });
                var marker = (L as any).marker(new L.LatLng(latlng[1], latlng[0]), {
                    properties: item.properties,
                    icon: myIcon,
                });
                marker.bindPopup('类型:' + type)
                clusterArr.push(marker)
            })


            clusterLayer.addLayers(clusterArr);
        }
    }, [map]);

    return (
        <>
            <MapBox setMap={setMap} />
        </>
    )
}
