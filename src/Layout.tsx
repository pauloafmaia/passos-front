import RoutesApp from './routes/Routes';
import { BrowserRouter as Router, Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { Menu, Layout } from 'antd';
import { HomeOutlined, CalendarOutlined, PlayCircleOutlined, LoginOutlined, UserOutlined, UserAddOutlined, PictureOutlined, MailOutlined } from '@ant-design/icons';
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
    getItem(<Link to='/repertorios'>Repertórios</Link>, '3', <PlayCircleOutlined />),
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

    return (

        <Layout>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Layout>
                <Sider>
                    <div className="logo">
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout
                    style={{ padding: '0 24px 24px', }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 360,
                        }}
                    >
                        <div>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center', backgroundColor: 'gray', padding: '2px' }}>Created by MINISTÉRIO PASSOS ® 2022</Footer>
        </Layout>
    )
}