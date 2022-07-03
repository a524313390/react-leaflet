import L, { layerGroup } from 'leaflet';
import * as mapv from 'mapv';
interface CreateMapvType {
    toCenter: L.LatLng;
    qianxiData: any[];
    map: L.Map;
    click?: Function;
}

const createMapv = (options: CreateMapvType): L.FeatureGroup => {
    const { toCenter, qianxiData, map, click = null } = options;
    const mapvLayer = L.featureGroup();
    var lineData = [];
    var pointData = [];
    var textData = [];
    var timeData = [];



    for (var i = 0; i < qianxiData.length; i++) {
        const formPoint = qianxiData[i].geometry.coordinates as any;
        var fromCenter = L.latLng([formPoint[1], formPoint[0]]);

        if (!fromCenter || !toCenter) {
            continue;
        }

        pointData.push(
            {
                geometry: {
                    type: 'Point',
                    coordinates: [fromCenter.lng, fromCenter.lat]
                }
            }
        );
        pointData.push(
            {
                geometry: {
                    type: 'Point',
                    coordinates: [toCenter.lng, toCenter.lat]
                }
            }
        );
        textData.push(
            {
                geometry: {
                    type: 'Point',
                    coordinates: [fromCenter.lng, fromCenter.lat]
                },
                text: '文字'
            }
        );
        textData.push(
            {
                geometry: {
                    type: 'Point',
                    coordinates: [toCenter.lng, toCenter.lat]
                },
                text: '文字'
            }
        );

        var curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);

        for (let j = 0; j < curve.length; j++) {
            timeData.push({
                geometry: {
                    type: 'Point',
                    coordinates: curve[j]
                },
                count: 1,
                time: j
            });
        }

        lineData.push({
            geometry: {
                type: 'LineString',
                coordinates: curve
                //coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
            },
            count: 30 * Math.random()
        });

    }


    //文字图层
    var textDataSet = new mapv.DataSet(textData);
    var textOptions = {
        draw: 'text',
        font: '14px Arial',
        fillStyle: 'white',
        shadowColor: 'yellow',
        shadowBlue: 10,
        zIndex: 11,
        shadowBlur: 10,
        methods: {
            click: click
        }

    };
    const textLayer = mapv.leafletMapLayer(textDataSet, textOptions)

    //线图层
    var lineDataSet = new mapv.DataSet(lineData);

    var lineOptions = {
        strokeStyle: 'rgba(255, 250, 50, 0.8)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        lineWidth: 2,
        zIndex: 100,
        draw: 'simple'
    };
    const lineLayer = mapv.leafletMapLayer(lineDataSet, lineOptions)
    //点图层
    var pointOptions = {
        fillStyle: 'rgba(254,175,3,0.7)',
        shadowColor: 'rgba(55, 50, 250, 0.5)',
        shadowBlur: 10,
        size: 5,
        zIndex: 10,
        draw: 'simple',
        methods: {
            click: click
        }
    };


    var pointDataSet = new mapv.DataSet(pointData);
    const pointLayer = mapv.leafletMapLayer(pointDataSet, pointOptions)
    //动画图层
    var timeDataSet = new mapv.DataSet(timeData);

    var timeOptions = {
        fillStyle: 'rgba(255, 250, 250, 0.5)',
        zIndex: 200,
        size: 2.5,
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 50
            },
            trails: 10,
            duration: 2,
        },
        draw: 'simple'
    };

    const timeLayer = mapv.leafletMapLayer(timeDataSet, timeOptions)

    mapvLayer.addLayer(textLayer)
    mapvLayer.addLayer(lineLayer)
    mapvLayer.addLayer(pointLayer)
    mapvLayer.addLayer(timeLayer)

    return mapvLayer;

}

export default createMapv;