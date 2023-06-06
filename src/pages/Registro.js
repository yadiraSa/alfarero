import React, { useState } from 'react';

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveFilled } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';

import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 14 },
};


export const Registro = () => {

    const history = useHistory();
    const [ usuario ] = useState( getUsuarioStorage() );

    useHideMenu(false);

    const onFinish = ({ agente, escritorio }) => {

        localStorage.setItem('agente', agente );
        localStorage.setItem('escritorio', escritorio );

        history.push('/escritorio');
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if ( usuario.agente && usuario.escritorio ) {
        return <Redirect to="/escritorio" />
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
