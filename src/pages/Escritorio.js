import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Row, Col, Typography, Button, Divider, Table } from 'antd';
import { CloseCircleOutlined, RightOutlined, SaveFilled } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect, useHistory } from 'react-router-dom';
import { firebaseConfig } from './Registro';

firebase.initializeApp(firebaseConfig);

const { Title, Text } = Typography;

export const Escritorio = () => {
  const [documents, setDocuments] = useState([]);
  const [usuario] = useState(getUsuarioStorage());
  const history = useHistory();

  useEffect(() => {
    const collectionRef = firebase.firestore().collection('patients');
    collectionRef
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
        console.log('Data from Firestore:', data); // Verificar los datos obtenidos de la base de datos
        setDocuments(data);
      })
      .catch((error) => {
        console.log('Error getting documents:', error);
      });
  }, []);

  const salir = () => {
    localStorage.clear();
    history.replace('/ingresar');
  };

  const siguienteTicket = () => {
    console.log('siguienteTicket');
  };

  useHideMenu(false);

  if (!usuario.agente || !usuario.escritorio) {
    return <Redirect to="/ingresar" />;
  }

  const columns = [
    {
      title: 'Nombre del paciente',
      dataIndex: 'paciente',
      key: 'paciente',
    },
    {
      title: 'Edad',
      dataIndex: 'edad',
      key: 'edad',
    },
    {
      title: 'Número de télefono',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: 'Síntomas',
      dataIndex: 'sintomas',
      key: 'sintomas',
    },
  ];

return (
  <>
   <Row>
    <Col span={24}>
      {documents.length > 0 ? (
        <Table dataSource={documents} columns={columns} />
      ) : (
        <>
          <Text>No hay datos disponibles</Text> 
          {console.log('No hay datos disponibles')}
        </>
      )}
    </Col>
  </Row>
    <Row>
      <Col span={20}>
        <Title level={2}>{usuario.agente}</Title>
        <Text>Usted está trabajando en el escritorio: </Text>
        <Text type="success">{usuario.escritorio}</Text>
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
        <Text>Está atendiendo el ticket número: </Text>
        <Text style={{ fontSize: 30 }} type="danger">
          55
        </Text>
      </Col>
    </Row>

    <Row>
      <Col offset={18} span={6} align="right">
        <Button onClick={siguienteTicket} shape="round" type="primary">
          <RightOutlined />
          Siguiente
        </Button>
      </Col>
    </Row>

    <Row>
      <Col span={20}>
        <Title level={1} style={{ color: 'rgba(28, 12, 173, 0.89)' }}>
          ¡Bienvenido!
        </Title>
        <Title level={2}>Registro</Title>
        <Text>Ingrese los siguientes datos</Text>
        <Divider />

        <form>
          <label htmlFor="paciente">Nombre del paciente:</label>
          <input type="text" id="paciente" name="paciente" />

          <label htmlFor="edad">Edad:</label>
          <input type="number" id="edad" name="edad" min={1} max={99} />

          <label htmlFor="tel">Número de télefono:</label>
          <input type="number" id="tel" name="tel" min={1} max={99} />

          <label htmlFor="sintomas">Síntomas:</label>
          <input type="text" id="sintomas" name="sintomas" />

          <button type="submit">
            <SaveFilled />
            Registrar
          </button>
        </form>
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        <Table dataSource={documents} columns={columns} />
      </Col>
    </Row>
  </>
);
}