import Layouts from '@/Layouts';
import Home from '@/page/Home';
import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import Toggle from '@/page/Toggle';
import QuerySapce from '@/page/QuerySapce';
import Draw from '@/page/Draw';
import DraePlugin from '@/page/DraePlugin';
import Cluster from '@/page/Cluster';
import Heat from '@/page/Heat';
import CustomMarker from '@/page/CustomMarker';
import CustomPopup from '@/page/CustomPopup';
import EchartsView from '@/page/EchartsView';
import CustomMapv from '@/page/CustomMapv';
import Honeycomb from '@/page/Honeycomb';
import { BASE_NAME } from '@/constant';
const IconFont = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/font_2757048_r9484jlw56g.js'],
});
export const menuList = [
    { name: '初始化地图', path: '/', exact: true, component: Home, icon: <IconFont type="icon-map" /> },
    { name: '底图切换', path: '/toggle', exact: true, component: Toggle, icon: <IconFont type="icon-dituqiehuan" /> },
    { name: '空间查询', path: '/queryspace', exact: true, component: QuerySapce, icon: <IconFont type="icon-kongjianchaxun" /> },
    { name: '绘制点线面', path: '/draw', exact: true, component: Draw, icon: <IconFont type="icon-kongjianchaxun" /> },
    { name: '封装点线面插件', path: '/draeplugin', exact: true, component: DraePlugin, icon: <IconFont type="icon-kongjianchaxun" /> },
    { name: '聚合', path: '/cluster', exact: true, component: Cluster, icon: <IconFont type="icon-danchuang" /> },
    { name: '热力', path: '/heat', exact: true, component: Heat, icon: <IconFont type="icon-juhe" /> },
    { name: '自定义marker', path: '/custommarker', exact: true, component: CustomMarker, icon: <IconFont type="icon-marker" /> },
    { name: '自定义气泡框', path: '/custompopup', exact: true, component: CustomPopup, icon: <IconFont type="icon-qipao" /> },
    { name: '使用echarts', path: '/echarts', exact: true, component: EchartsView, icon: <IconFont type="icon-tubiao" /> },
    { name: 'mapv迁徙图', path: '/mapv', exact: true, component: CustomMapv, icon: <IconFont type="icon-zhuantitu-qianxitu" /> },
    { name: 'mapv蜂巢图', path: '/honeycomb', exact: true, component: Honeycomb, icon: <IconFont type="icon-fengchao" /> },
];
export default function RouterBox() {
    return (
        <>
            <Router basename={BASE_NAME}>
                <Layouts>
                    <Switch>
                        {menuList.map(item => {
                            return <Route path={item.path} exact={item.exact} component={item.component} key={item.path}></Route>;
                        })}
                        <Redirect to="/"></Redirect>
                    </Switch>
                </Layouts>
            </Router>
        </>
    );
}
