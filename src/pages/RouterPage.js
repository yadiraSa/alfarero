import React, { useContext } from "react";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileTextFilled,
  UploadOutlined,
  LoginOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { Registro } from "./Registro";
import { Turno } from "./Turno";
import { CrearTurno } from "./CrearTurno";
import { Escritorio } from "./Escritorio";
import { UiContext } from "../context/UiContext";
import { IngresarHost } from "./IngresarHost";

const { Sider, Content, Header } = Layout;

export const RouterPage = () => {
  const { ocultarMenu } = useContext(UiContext);
  const menuItems = [
    {
      key: "1",
      icon: <LoginOutlined />,
      label: <Link to="/ingresar-host">Ingresar Huésped</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/registro">Registro</Link>,
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: <Link to="/crear">Crear</Link>,
    },
    {
      key: "4",
      icon: <FileTextFilled />,
      label: <Link to="/turnos">Turnos</Link>,
    },
    {
      key: "5",
      icon: <IdcardOutlined />,
      label: <Link to="/escritorio">Escritorio</Link>,
    },
  ];

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsedWidth="0" breakpoint="md" hidden={ocultarMenu}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              position: "sticky",
              zIndex: 100,
              top: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#fff",
            }}
          >
            <div className="header"></div>
            <div>Plan de Cuidado de Pacientes</div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/ingresar-host" component={IngresarHost} />
              <Route path="/registro" component={Registro} />
              <Route path="/turnos" component={Turno} />
              <Route path="/crear" component={CrearTurno} />

              <Route path="/escritorio" component={Escritorio} />

              <Redirect to="/ingresar-host" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
