import React, { useState } from 'react';
import { Form, Input, Button, Typography, Divider, InputNumber } from 'antd';
import { SaveFilled } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import moment from 'moment';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const { Title, Text } = Typography;
export const firebaseConfig = {
    apiKey: "AIzaSyDXCY9JGX_CFH8odtzH3C1trr9J0kVEugQ",
    authDomain: "ticket-back-nest.firebaseapp.com",
    projectId: "ticket-back-nest",
    storageBucket: "ticket-back-nest.appspot.com",
    messagingSenderId: "32548875194",
    appId: "1:32548875194:web:1d23a60c0335e33b7d0b83"
  };

firebase.initializeApp(firebaseConfig);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const Registro = () => {
  const history = useHistory();
  const [usuario] = useState(getUsuarioStorage());

  useHideMenu(false);

  const onFinish = ({ paciente, edad, tel, sintomas }) => {
    const tiempo = moment().format("D [de] MMMM [de] YYYY, HH:mm:ss [UTC]Z");  
    const db = firebase.firestore();
    db.collection('patients')
      .add({
        paciente,
        edad,
        tel,
        sintomas,
        tiempo,
      })
      .then(() => {
        localStorage.setItem('paciente', paciente);
        localStorage.setItem('edad', edad);
        localStorage.setItem('tel', tel);
        localStorage.setItem('sintomas', sintomas);
        history.push('/escritorio');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (usuario.agente && usuario.escritorio) {
    return <Redirect to="/escritorio" />;
  }

    return (
        <>
            <Title level={ 1 } style={{color: ' rgba(28, 12, 173, 0.89)'}}>¡Bienvenido!</Title>
            <Title level={ 2 }>Registro</Title>
            <Text>Ingrese los siguientes datos</Text>
            <Divider />

            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Nombre del paciente"
                name="paciente"
                rules={[{ required: true, message: 'Ingrese su nombre' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Edad"
                name="edad"
                rules={[{ required: true, message: 'Ingrese su edad' }]}
            >
                <InputNumber min={ 1 } max={ 99 } />
            </Form.Item>


            <Form.Item
                label="Número de télefono"
                name="tel"
                rules={[{ required: true, message: 'Ingrese un número teléfonico' }]}
            >
                <InputNumber min={ 1 } max={ 99 } />
            </Form.Item>

            <Form.Item
                label="Síntomas"
                name="sintomas"
                rules={[{ required: true, message: 'Ingrese los síntomas presentados' }]}
            >
                <Input />
            </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button 
                        style={{
                            backgroundColor: 'rgba(28, 12, 173, 0.89)',
                            border: 'rgba(28, 12, 173, 0.89)', 
                        }}
                        type="primary" 
                        htmlType="submit"
                        shape="round"
                    >
                        <SaveFilled />
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
