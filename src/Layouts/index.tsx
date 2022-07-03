import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';

import { useToggle } from 'ahooks';
import { menuList } from '@/router';
import { Link, useHistory } from 'react-router-dom';
import './index.less'
const { Header, Sider, Content } = Layout;
interface Props {
    children: any
}
const Layouts = (props: Props) => {
    const [state, { toggle }] = useToggle(false);
    const [selectMenu, setSelectMenu] = useState<string[]>([]);
    const history = useHistory();
    useEffect(() => {
        const pathname = history.location.pathname;

        setSelectMenu([pathname])
    }, [history]);
    return (
        <Layout className='project-layouts'>
            <Sider trigger={null} collapsible collapsed={state}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" selectedKeys={selectMenu}>
                    {menuList.map(item => {
                        return (<Menu.Item key={item.path} icon={item.icon} onClick={() => setSelectMenu([item.path])}  >
                            <Link to={item.path}>{item.name}</Link>
                        </Menu.Item>);
                    })}

                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div className="trigger" onClick={() => toggle()}>
                        {state ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </div>

                </Header>
                <Content
                    className="site-layout-background"
                    style={{ margin: '24px 16px', padding: 24, }}>
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );

}

export default Layouts