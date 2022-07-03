import { EChartsOption } from "echarts";
import 'echarts-liquidfill';
const option = {


    series: [{
        type: 'liquidFill',
        radius: '45%',
        center: ['50%', '50%'],
        data: [0.5, 0.5, 0.5], // data个数代表波浪数
        backgroundStyle: {
            borderWidth: 1,
            color: 'rgb(0,0,0,0.5)'
        },
        label: {
            normal: {
                formatter: (0.5 * 100).toFixed(2) + '%',
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            }
        },
        outline: {
            show: false,
        }
    },
    {
        "type": "pie",
        "center": ["50%", "50%"],
        "radius": ["50%", "52%"],
        "hoverAnimation": false,
        "data": [{
            "name": "",
            "value": 500,
            labelLine: {
                show: false
            },
            itemStyle: {
                color: '#fff'
            },
            emphasis: {
                labelLine: {
                    show: false
                },
                itemStyle: {
                    color: '#fff'
                },
            }
        },
        { //画中间的图标
            "name": "",
            "value": 4,
            labelLine: {
                show: false
            },
            itemStyle: {
                color: 'rgb(21,148,233)',
                "normal": {
                    "color": "rgb(21,148,233)",
                    "borderColor": "rgb(21,148,233)",
                    "borderWidth": 20,
                    // borderRadius: '100%'
                },
            },
            label: {

                borderRadius: '100%'
            },
            emphasis: {
                labelLine: {
                    show: false
                },
                itemStyle: {
                    color: 'rgb(21,148,233)'
                },
            }

        },
        { // 解决圆点过大后续部分显示明显的问题
            "name": "",
            "value": 4.5,
            labelLine: {
                show: false
            },
            itemStyle: {
                color: '#fff'
            },
            emphasis: {
                labelLine: {
                    show: false
                },
                itemStyle: {
                    color: '#fff'
                },
            }
        },
        { //画剩余的刻度圆环
            "name": "",
            "value": 88,
            itemStyle: {
                color: 'rgb(22,151,236)'
            },
            "label": {
                show: false
            },
            labelLine: {
                show: false
            },
            emphasis: {
                labelLine: {
                    show: false
                },
                itemStyle: {
                    color: 'red'
                },
            }
        }
        ]
    }

    ]
} as EChartsOption;



export default option;
