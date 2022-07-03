import MapBox from '@/components/MapBox';
import { Space, Button } from 'antd';
import L from 'leaflet';
import React, { useState } from 'react'

export default function Draw() {
    const [map, setMap] = useState<L.Map>();
    const [layer,] = useState(L.layerGroup());
    const draws = {
        polylineTuya: L.polyline([]),//创建涂鸦图层

        point: () => {
            if (!map) return false;
            const handles = (e: any) => {
                const { latlng } = e;
                const marker = L.marker(latlng).addTo(map)
                layer.addLayer(marker)
                // //如果需要连续添加点位,就不需要解除绑定
                // map.off('click', handles)
            }
            map.on('click', handles)
        },
        tuya: () => {
            const line = L.polyline([]);//创建线图层
            let arr = line.getLatLngs();//存储所有经纬度
            const handle = (e: any) => {
                map?.doubleClickZoom.disable()//禁止双击缩放
                const { latlng } = e;

                arr.push(latlng)
                line.setLatLngs(arr);//设置线图层经纬度
                layer.addLayer(line)
                map?.on('mousemove', handle)
            }
            map?.on('click', handle)
            map?.on('dblclick', () => {
                map?.doubleClickZoom.enable()//开启双击缩放
                map.off('click')
                map.off('mousemove', handle)
            })
        },
        line: () => {
            const line = L.polyline([]);//创建线图层
            const arr: L.LatLng[] = []
            layer.addLayer(line)
            const clickArr: L.LatLng[] = []
            const handle = (e: any) => {


                map?.doubleClickZoom.disable()//禁止双击缩放
                const { type, latlng } = e;
                const length = arr.length;
                if (type === 'click') {
                    arr.push(latlng)
                    clickArr.push(latlng)
                    clickArr.forEach(item => {
                        const marker = L.marker(item);
                        layer.addLayer(marker)
                    })
                } else {
                    if (length <= 1) {
                        arr.push(latlng)
                    } else {
                        arr[length - 1] = latlng
                    }
                }

                line.setLatLngs(arr);//设置线图层经纬度

                map?.on('mousemove', handle)
            }
            map?.on('click', handle)
            map?.on('dblclick', () => {
                map?.doubleClickZoom.enable()//开启双击缩放
                map.off('click')
                map.off('mousemove', handle)
            })
        },
        rect: () => {
            let rectArr: L.LatLng[][] = [];


            const handle = (e: any) => {
                map?.doubleClickZoom.disable();
                const { type, latlng } = e;
                if (type === 'click') {
                    rectArr.push(latlng)
                }
                if (type === 'mousemove') {
                    if (rectArr.length <= 1) {
                        rectArr.push([latlng])
                    } else {
                        let rect = (L as any).rectangle(rectArr, { type: 'rect' });
                        map?.eachLayer((layer: any) => {
                            if (layer.options && layer.options.type === 'rect') {
                                layer.remove();
                            }
                        })
                        layer.addLayer(rect)
                        rectArr[rectArr.length - 1] = [latlng]
                    }
                }

                map?.on('mousemove', handle)
                map?.on('dblclick', () => {
                    map?.doubleClickZoom.enable()//开启双击缩放
                    map.off('click')
                    map.off('mousemove', handle)
                })
            }
            map?.on('click', handle)
            map?.on('dblclick', () => {
                map?.doubleClickZoom.enable()//开启双击缩放
                map.off('click')
                map.off('mousemove', handle)
            })
        },
        polygon: () => {
            let latlngs: any[] = []
            let polygon = L.polygon(latlngs);
            layer.addLayer(polygon)
            const handle = (e: any) => {
                map?.doubleClickZoom.disable()//开启双击缩放
                const { type, latlng } = e;
                const length = latlngs.length;
                if (type === 'click') {
                    latlngs.push(latlng)
                    polygon.setLatLngs(latlngs)
                }
                if (type === 'mousemove') {
                    if (length <= 1) {
                        latlngs.push([latlng.lat, latlng.lng])
                    } else {
                        (latlngs as any)[latlngs.length - 1] = [latlng.lat, latlng.lng]
                        polygon.setLatLngs(latlngs)
                    }
                }
                map?.on('mousemove', handle)
            }
            map?.on('click', handle)
            map?.on('dblclick', () => {
                map?.doubleClickZoom.enable()//开启双击缩放
                map.off('click')
                map.off('mousemove', handle)
            })
        }

    }
    const drawHandle = (type: string) => {
        if (!map) return;
        map.off('click')
        layer.addTo(map)
        if (type === 'point') {
            draws.point();
        }
        if (type === 'line') {
            draws.line();
        }
        if (type === 'tuya') {
            draws.tuya();
        }
        if (type === 'rect') {
            draws.rect();
        }
        if (type === 'polygon') {
            draws.polygon();
        }
    }
    return (
        <>
            <Space>
                <Button type='primary' onClick={() => drawHandle('point')}>点</Button>
                <Button type='primary' onClick={() => drawHandle('tuya')}>涂鸦</Button>
                <Button type='primary' onClick={() => drawHandle('line')}>线</Button>
                <Button type='primary' onClick={() => drawHandle('rect')}>矩形</Button>
                <Button type='primary' onClick={() => drawHandle('polygon')}>多边形</Button>
            </Space>
            <MapBox setMap={setMap} />
        </>
    )
}
