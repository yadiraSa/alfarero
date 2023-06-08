import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { firestore } from "./../helpers/firebaseConfig";
import { useHideMenu } from "../hooks/useHideMenu";

export const Turno = () => {
  useHideMenu(true);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const collectionRef = firestore.collection("patients");
      const snapshot = await collectionRef.get();
      const initialData = snapshot.docs.map((doc) => {
        return doc.data();
      });

      if (isMounted) {
        setData(initialData);
      }

      const unsubscribe = collectionRef.onSnapshot((snapshot) => {
        const updatedData = snapshot.docs.map((doc) => doc.data());

        if (isMounted) {
          setData(updatedData);
        }
      });

      return () => {
        unsubscribe();
        isMounted = false;
      };
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Paciente",
      dataIndex: "paciente", // Nuevo campo: Paciente
      key: "11",
      width: 150,
    },
    {
      title: "Síntomas",
      dataIndex: "sintomas",
      key: "12",
      width: 150,
    },
    {
      title: "Tel",
      dataIndex: "tel", // Nuevo campo: Tel
      key: "13",
      width: 200,
    },
    {
      title: "Tiempo",
      dataIndex: "tiempo", // Nuevo campo: Timestamp
      key: "14",
      width: 150,
    },
    {
      title: "Reg",
      dataIndex: "reg",
      key: "1",
      width: 100,
    },
    {
      title: "Enf",
      dataIndex: "enf",
      key: "2",
      width: 100,
    },
    {
      title: "Doc",
      dataIndex: "doc",
      key: "3",
      width: 100,
    },
    {
      title: "Fis",
      dataIndex: "fis",
      key: "4",
      width: 100,
    },
    {
      title: "Ped",
      dataIndex: "ped",
      key: "5",
      width: 100,
    },
    {
      title: "Nut",
      dataIndex: "nut",
      key: "6",
      width: 100,
    },
    {
      title: "Obs",
      dataIndex: "obs",
      key: "7",
      width: 100,
    },
    {
      title: "Ora",
      dataIndex: "ora",
      key: "9",
      width: 100,
    },
    {
      title: "Edad", // Nuevo campo: Edad
      dataIndex: "edad",
      key: "10",
    },

    {
      title: "Acción",
      key: "17",
      fixed: "right",
      width: 100,
      render: () => <Button type="primary">Acción</Button>,
    },
  ];

  return (
    <>
      <Table
        rowKey={"paciente"}
        columns={columns}
        dataSource={data.some((d) => d === undefined) ? [] : data}
        scroll={{ x: 1500, y: 1500 }}
        sticky
        offsetScroll={3}
      />
    </>
  );
};
