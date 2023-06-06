import React, { useContext } from 'react';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileTextFilled,
  UploadOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import { Registro } from './Registro';
import { Turno } from './Turno';
import { CrearTurno } from './CrearTurno';
import { Escritorio } from './Escritorio';
import { UiContext } from '../context/UiContext';


const { Header, Content } = Layout;


export const RouterPage = () => {

    const { ocultarMenu } = useContext( UiContext )
    

    return (
      <Router>
        <Layout>
          <Header
            className="header"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1 className="header-title">Plan de Cuidado de Pacientes</h1>
            <div className="demo-logo" />
          </Header>
          <Layout className="site-layout">
          <Menu theme="ligth" mode="vertical-right" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/registro">Registro</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FileTextFilled />}>
                <Link to="/turno">Turno del paciente</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/crear">Crear turno</Link>
              </Menu.Item>
            </Menu>
            <Content
              className="site-layout-background"
              style={{
                height: "100vh",
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/registro" component={Registro} />
                <Route path="/turno" component={Turno} />
                <Route path="/crear" component={CrearTurno} />

                <Route path="/escritorio" component={Escritorio} />

                <Redirect to="/ingresar" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
}
