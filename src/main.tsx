import React from 'react'
import ReactDOM from 'react-dom'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { ConfigProvider } from 'antd';
import L, { Map } from 'leaflet';
import RouterBox from './router';
import '@/assets/css/index.less'
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css'
import zhCN from "antd/es/locale/zh_CN";

import 'moment/dist/locale/zh-cn';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <RouterBox />
    </ConfigProvider>
    ,
    document.getElementById('root')
)
