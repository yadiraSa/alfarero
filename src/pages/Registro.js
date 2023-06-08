import React from "react";
import { Form, Input, Button, Typography, Divider, InputNumber } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";

import { firestore } from "./../helpers/firebaseConfig";

import moment from "moment";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const Registro = () => {
  useHideMenu(false);

  const onFinish = ({ paciente, edad, tel, sintomas }) => {
    const tiempo = moment().format("D [de] MMMM [de] YYYY, HH:mm:ss [UTC]Z");
    const db = firestore.firestore();
    db.collection("patients")
      .add({
        paciente,
        edad,
        tel,
        sintomas,
        tiempo,
      })
      .then(() => {
        localStorage.setItem("paciente", paciente);
        localStorage.setItem("edad", edad);
        localStorage.setItem("tel", tel);
        localStorage.setItem("sintomas", sintomas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title level={2}>Registro de Paciente</Title>
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
          rules={[{ required: true, message: "Ingrese su nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Edad"
          name="edad"
          rules={[{ required: true, message: "Ingrese su edad" }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          label="Número de télefono"
          name="tel"
          rules={[{ required: true, message: "Ingrese un número teléfonico" }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          label="Síntomas"
          name="sintomas"
          rules={[
            { required: true, message: "Ingrese los síntomas presentados" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            style={{
              backgroundColor: "rgba(28, 12, 173, 0.89)",
              border: "rgba(28, 12, 173, 0.89)",
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
  );
};
