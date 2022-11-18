import Tarjeta from '../tarjetas/index.js'


import { Button } from 'antd';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu } from 'antd';

import React, { useState } from 'react';


const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem('Usuarios', '1', <UserOutlined href={'/Usuarios'} />),
  getItem('Productos', '2', <DesktopOutlined href={'/Productos'} />),
  getItem('Estadisticas', '3', <PieChartOutlined href={'/Estadisticas'} />),
  getItem('Insertar Producto', '4', <Tarjeta />),
];


const App = () => {
  const [collapsed] = useState(true);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;