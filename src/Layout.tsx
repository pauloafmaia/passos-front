import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import { Menu, Layout, Breadcrumb } from 'antd';
import { HomeOutlined, PlayCircleOutlined, SoundOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import type { MenuProps } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { UserContext } from './contexts/UserContext';
import { useContext, useEffect, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Sider } = Layout;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
    path?: string,
) {
    return {
        key,
        icon,
        children,
        label,
        type,
        path,
    };
}

const items = [
    getItem(<Link to='/home'>Home</Link>, '1', <HomeOutlined />),
    getItem(<Link to='/musicas'>Músicas</Link>, '2', <SoundOutlined />),
    getItem(<Link to='/eventos'>Eventos</Link>, '3', <PlayCircleOutlined />),
    getItem(<Link to='/usuarios'>Usuários</Link>, '4', <UserOutlined />),
];

export const LayoutComponent = () => {

    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user.autorizado) {
            navigate('/')
        }
    }, [])

    const [collapsed, setCollapsed] = useState(false);

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <h3 style={{ color: 'white', textAlign: 'center' }}>MINISTÉRIO PASSOS</h3>
            </Header>
            <Layout className='site-layout'>
                <Sider className="logo"
                    collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={[]}
                        mode="inline"
                        items={items}
                        style={{ height: 360, borderRight: 0 }} />
                </Sider>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', padding: '2px', background: '#001529', color: 'white' }}>Created by MINISTÉRIO PASSOS ® 2022</Footer>
        </Layout>
    )
}