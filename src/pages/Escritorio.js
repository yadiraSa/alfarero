import React, { useEffect, useState } from "react";

import { Row, Col, Typography, Button, Divider, Table } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Redirect, useHistory } from "react-router-dom";

import { firestore } from "./../helpers/firebaseConfig";

const { Title, Text } = Typography;

export const Escritorio = () => {
  const [documents, setDocuments] = useState([]);
  const [usuario] = useState(getUsuarioStorage());
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const collectionRef = firestore.collection("patients");
      const snapshot = await collectionRef.get();
      const initialData = snapshot.docs.map((doc) => doc.data());

      if (isMounted) {
        setDocuments(initialData);
      }

      const unsubscribe = collectionRef.onSnapshot((snapshot) => {
        const updatedData = snapshot.docs.map((doc) => doc.data());

        if (isMounted) {
          setDocuments(updatedData);
        }
      });

      return () => {
        unsubscribe();
        isMounted = false;
      };
    };

    fetchData();
  }, []);

  const salir = () => {
    localStorage.clear();
    history.replace("/ingresar-host");
  };

  const siguienteTicket = () => {
    console.log("siguienteTicket");
  };

  useHideMenu(false);

  if (!usuario.host || !usuario.servicio) {
    return <Redirect to="/ingresar-host" />;
  }

  const columns = [
    {
      title: "Nombre del paciente",
      dataIndex: "paciente",
      key: "paciente",
    },
    {
      title: "Edad",
      dataIndex: "edad",
      key: "edad",
    },
    {
      title: "Número de télefono",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Síntomas",
      dataIndex: "sintomas",
      key: "sintomas",
    },
  ];

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.host}</Title>
          <Text>Usted está ofreciendo el servicio: </Text>
          <Text type="success">{usuario.servicio}</Text>
        </Col>

        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          <Text>Atendiendo el paciente número: </Text>
          <Text style={{ fontSize: 30 }} type="danger">
            55
          </Text>
        </Col>
      </Row>

      <Row>
        <Col style={{ padding: 9 }} offset={18} span={6} align="right">
          <Button onClick={siguienteTicket} shape="round" type="primary">
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {documents.length > 0 ? (
            <Table dataSource={documents} columns={columns} />
          ) : (
            <>
              <Text>No hay datos disponibles</Text>
              {console.log("No hay datos disponibles")}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
