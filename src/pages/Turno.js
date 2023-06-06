/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Table, Button } from 'antd';
import { FlagFilled } from '@ant-design/icons';

const columns = [
  {
    title: 'Nombre',
    width: 100,
    dataIndex: 'nombre',
    key: 'nombre',
    fixed: 'left',
  },
  {
    title: 'Próposito de la visita',
    width: 100,
    dataIndex: 'proposito',
    key: 'proposito',
    fixed: 'left',
  },
  {
    title: 'Reg',
    dataIndex: 'reg',
    key: '1',
    width: 150,
  },
  {
    title: 'Enf',
    dataIndex: 'enf',
    key: '2',
    width: 150,
  },
  {
    title: 'Doc',
    dataIndex: 'doc',
    key: '3',
    width: 150,
  },
  {
    title: 'Fis',
    dataIndex: 'fis',
    key: '4',
    width: 150,
  },
  {
    title: 'Ped',
    dataIndex: 'ped',
    key: '5',
    width: 150,
  },
  {
    title: 'Nut',
    dataIndex: 'nut',
    key: '6',
    width: 150,
  },
  {
    title: 'Obs',
    dataIndex: 'obs',
    key: '7',
    width: 150,
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
  },
  {
    title: 'Fin',
    dataIndex: 'fin',
    key: '10',
    render: () => <a><FlagFilled /></a>
  },
  {
    title: 'Tiempo',
    dataIndex: 'tiempo',
    key: '11',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    nombre: `Edward ${i}`,
    edad: 32,
    proposito: `Gripa y marep ${i}`,
    ora: `Dr. Manuel ${i}`,
    fin: `Pagado ${i}`
  });
}
export const Turno = () => (
  <><Table
        columns={columns}
        scroll={{
            x: 1500,
            y: 300,
        }} />
        <Button
            style={{
                position: "sticky",
                display: "flex",
                alignItems: "end",
                margin: '5rem',
                backgroundColor: ' rgba(28, 12, 173, 0.89)',
                border: 'rgba(28, 12, 173, 0.89)', 
                float:'right'

            }}
            type="primary"
            shape="round"
            size="large"
        >
            +

        </Button></>
);
export default Turno;