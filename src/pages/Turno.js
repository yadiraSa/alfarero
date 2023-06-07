/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { FlagFilled } from '@ant-design/icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const Turno = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = firebase.firestore().collection('patients');
        const querySnapshot = await collectionRef.get();

        const newData = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          nombre: doc.data().nombre,
          proposito: doc.data().proposito,
          reg: doc.data().reg,
          enf: doc.data().enf,
          doc: doc.data().doc,
          fis: doc.data().fis,
          ped: doc.data().ped,
          nut: doc.data().nut,
          obs: doc.data().obs,
          ora: doc.data().ora,
          edad: doc.data().edad, // Nuevo campo: Edad
          paciente: doc.data().paciente, // Nuevo campo: Paciente
          sintomas: doc.data().sintomas, // Nuevo campo: Síntomas
          tel: doc.data().tel, // Nuevo campo: Tel
          fin: doc.data().fin,
          tiempo: doc.data().tiempo,
        }));

        setData(newData);
      } catch (error) {
        console.log('Error getting documents:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Paciente',
      dataIndex: 'paciente', // Nuevo campo: Paciente
      key: '11',
      width: 150,
    },
    {
      title: 'Síntomas',
      dataIndex: 'sintomas',
      key: '12',
      width: 150,
    },
    {
      title: 'Tel',
      dataIndex: 'tel', // Nuevo campo: Tel
      key: '13',
      width: 200,
    },
    {
      title: 'Tiempo',
      dataIndex: 'tiempo', // Nuevo campo: Timestamp
      key: '14',
      width: 150,
    },
    {
      title: 'Reg',
      dataIndex: 'reg',
      key: '1',
      width: 100,
    },
    {
      title: 'Enf',
      dataIndex: 'enf',
      key: '2',
      width: 100,
    },
    {
      title: 'Doc',
      dataIndex: 'doc',
      key: '3',
      width: 100,
    },
    {
      title: 'Fis',
      dataIndex: 'fis',
      key: '4',
      width: 100,
    },
    {
      title: 'Ped',
      dataIndex: 'ped',
      key: '5',
      width: 100,
    },
    {
      title: 'Nut',
      dataIndex: 'nut',
      key: '6',
      width: 100,
    },
    {
      title: 'Obs',
      dataIndex: 'obs',
      key: '7',
      width: 100,
    },
    {
      title: 'Far',
      key: '8',
      fixed: 'right',
      width: 100,
      render: () => <a>action</a>,
    },
    {
      title: 'Ora',
      dataIndex: 'ora',
      key: '9',
      width: 100
    },
    {
      title: 'Edad', // Nuevo campo: Edad
      dataIndex: 'edad',
      key: '10',
    },
    {
      title: 'Fin',
      dataIndex: 'fin',
      key: '15',
      width: 100,
      render: () => <a><FlagFilled /></a>,
    },
    {
      title: 'Acción',
      key: '17',
      fixed: 'right',
      width: 100,
      render: () => <Button type="primary">Acción</Button>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: 300 }}
      />
      <Button
        style={{
          position: 'sticky',
          display: 'flex',
          alignItems: 'end',
          margin: '5rem',
          backgroundColor: 'rgba(28, 12, 173, 0.89)',
          border: 'rgba(28, 12, 173, 0.89)',
          float: 'right',
        }}
        type="primary"
        shape="round"
        size="large"
      >
        +
      </Button>
    </>
  );
};


    