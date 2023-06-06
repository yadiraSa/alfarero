import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;


export const CrearTurno = () => {

    useHideMenu(true);


    const nuevoTicket = () => {
        console.log('nuevoTicket');
    }

    return (
      <>
        <Row>
          <Col span={14} offset={6} align="center">
            <Title level={3}>Presione el botón para un nuevo turno</Title>

            <Button
              style={{
                backgroundColor: " rgba(28, 12, 173, 0.89)",
                border: "rgba(28, 12, 173, 0.89)",
              }}
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="large"
              onClick={nuevoTicket}
            >
              Nuevo Turno
            </Button>
          </Col>
        </Row>

        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Su Turno es:</Text>
            <br />
            <Text type="danger" style={{ fontSize: 55 }}>
              55
            </Text>
          </Col>
        </Row>
      </>
    );
}
