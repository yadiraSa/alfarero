import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  InputNumber,
  Select,
} from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { useAlert } from "../hooks/alert";
import { firestore } from "./../helpers/firebaseConfig";

import moment from "moment";

const { Title, Text } = Typography;
const stations = [
  { value: "reg", label: "Registro" },
  { value: "nur", label: "Enfermera" },
  { value: "doc", label: "Doctor" },
  { value: "pt", label: "Terapia Fisica" },
  { value: "ped", label: "Pediatria" },
  { value: "nut", label: "Nutricion" },
  { value: "obs", label: "Obstetricia" },
  { value: "pha", label: "Farmacia" },
  { value: "lab", label: "Laboratorio" },
  { value: "pra", label: "Práctica" },
  { value: "pay", label: "Pago" },
  { value: "fin", label: "Finalizar" },
];
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const Registro = () => {
  const { showAlert } = useAlert();
  const [form] = Form.useForm();
  const [patientPlanOfCare, setPatientPlanOfCare] = useState([]);

  useHideMenu(false);

  const generateVisits = (visits) => {
    const planOfCare = visits.map((visit, key) => {
      return {
        order: key + 1,
        procedure_end: new Date(),
        procedure_start: new Date(),
        station: visit,
        status: "in_process",
        wait_end: new Date(),
        wait_start: new Date(),
      };
    });
    setPatientPlanOfCare(planOfCare);
  };

  const handleReset = () => {
    form.setFieldsValue({ stations: [] });
    form.resetFields();
  };

  const onFinish = async (patient) => {
    const tiempo = moment().format("D [de] MMMM [de] YYYY, HH:mm:ss [UTC]Z");
    const formattedPatient = {
      complete: false,
      last_update: new Date(),
      patient_name: patient.paciente,
      plan_of_care: patientPlanOfCare,
      pt_no: "",
      reason_for_visit: patient.motivo,
      start_time: tiempo,
      stop_time: new Date(),
      wait_time: 0,
    };

    await firestore
      .collection("patients")
      .add(formattedPatient)
      .then((docRef) => {
        const ptNo = docRef.id;
        const updatedPatient = { ...formattedPatient, pt_no: ptNo };
        docRef.update(updatedPatient);
        showAlert("Success", "Paciente creado exitosamente", "success");
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        showAlert("Error", error, "error");
      });
  };
  const handleChange = (selectedOption) => {
    generateVisits(selectedOption);
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
        form={form}
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
          rules={[
            {
              required: true,
              message: "Ingrese un número teléfonico",
              pattern: new RegExp(/^\d+$/),
            },
          ]}
        >
          <Input type={"tel"} />
        </Form.Item>

        <Form.Item
          label="Motivo de visita"
          name="motivo"
          rules={[{ required: true, message: "Ingrese su nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Estaciones"
          name="estaciones"
          rules={[
            {
              required: true,
              message: "Ingrese estaciones que el paciente visitará",
            },
          ]}
        >
          <Select
            mode="multiple"
            showArrow
            style={{
              width: "100%",
            }}
            options={stations}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveFilled />
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
