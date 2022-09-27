import React, { useState } from 'react';
import RoutesApp from './Routes/Routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { Menu, Layout, Space } from 'antd';
import { HomeOutlined, CalendarOutlined, PlayCircleOutlined, LoginOutlined, UserOutlined, UserAddOutlined, PictureOutlined, MailOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import type { MenuProps } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

type MenuItem = Required<MenuProps>['items'][number];

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
  getItem(<Link to='/'>Home</Link>, '1', <HomeOutlined />),
  getItem(<Link to='/agenda'>Agenda</Link>, '2', <CalendarOutlined />),
  getItem(<Link to='/galeria'>Galeria</Link>, '5', <PictureOutlined />),
  getItem(<Link to='/cifras'>Cifras</Link>, '3', <PlayCircleOutlined />),
  getItem(<Link to='/contato'>Contato</Link>, '6', <MailOutlined />),
  getItem('Usuário', '4', <UserOutlined />, [
    getItem(<Link to='/login'>Login</Link>, '4.1', <LoginOutlined />),
    getItem(<Link to='/cadastro'>Cadastro</Link>, '4.2', <UserAddOutlined />),
  ]),
];

function App() {
  return (
    <Router>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }} /> 
        <Layout>
          <Sider>
            <div className="logo">
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            <Header className='icones-rede-social' style={{ padding: 0 }}> 
            </Header>
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
                <RoutesApp />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
