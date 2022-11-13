import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import { Menu, Layout } from 'antd';
import { HomeOutlined, CalendarOutlined, PlayCircleOutlined, SoundOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import type { MenuProps } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { UserContext } from './contexts/UserContext';
import { useContext, useEffect } from 'react';

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
    getItem(<Link to='/agenda'>Agenda</Link>, '2', <CalendarOutlined />),
    getItem(<Link to='/musicas'>Músicas</Link>, '3', <SoundOutlined />),
    getItem(<Link to='/repertorios'>Repertórios</Link>, '4', <PlayCircleOutlined />),
    getItem(<Link to='/usuarios'>Usuários</Link>, '5', <UserOutlined />),
];

export const LayoutComponent = () => {

    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user.autorizado) {
            navigate('/')
        }
    }, [])

    return (

        <Layout>
            <Header className="header" style={{ padding: 0 }}>
                <h3 style={{ color: 'white', textAlign: 'center' }}>MINISTÉRIO PASSOS</h3>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={[]}
                        mode="inline"
                        items={items}
                        style={{ height: 360, borderRight: 0 }} />
                </Sider>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        height: '100%',
                    }}
                >
                    <div>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', padding: '2px', background: '#001529', color: 'white' }}>Created by MINISTÉRIO PASSOS ® 2022</Footer>
        </Layout>
    )
}