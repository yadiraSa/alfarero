import React, { useEffect, useState } from "react";
import { Table, Image, Space, Popover, Divider, Button, Popconfirm } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { firestore } from "./../helpers/firebaseConfig";
import { handleStatusChange, handleDelete } from "./../helpers/updateStationStatus";
import { useHistory } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import StationEnum from "../helpers/stationEnum";
import { AlertInfo } from "../components/AlertInfo";
import { Link } from "react-router-dom";

export const Anfitrion = () => {
  useHideMenu(true);
  const [data, setData] = useState([]);
  const [station, setStation] = useState("");
  const [hoveredRowKey, setHoveredRowKey] = useState(null);
  const history = useHistory();

  const handleMouseEnter = (record) => {
    setHoveredRowKey(record.pt_no);
  };

  const handleMouseLeave = () => {
    setHoveredRowKey("");
  };

  const salir = () => {
    localStorage.clear();
    history.replace("/ingresar-host");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const collectionRef = firestore.collection("patients");
        const snapshot = await collectionRef.orderBy("start_time").get();
        const initialData = snapshot.docs?.map((doc) => {
          return doc.data();
        });

        if (isMounted) {
          setData(initialData);
        }

      const unsubscribe = collectionRef.onSnapshot((snapshot) => {
        const updatedData = snapshot.docs?.map((doc) => doc.data());

        if (isMounted) {
          setData(updatedData.filter((item) => item.complete !== true));
        }
      });

        return () => {
          unsubscribe();
          isMounted = false;
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderStatusIcon = (status, station) => {
    let statusIcon = null;
    switch (status) {
      case "pending":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/not_planned.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "in_process":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/in_process.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "waiting":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/waiting.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "pay":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/pay.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "complete":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/complete.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "2":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/2.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "3":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/3.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "4":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/4.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "5":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/5.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "6":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/6.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "7":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/7.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      case "fin":
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/fin.png")}
              width={45}
              height={35}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
      default:
        statusIcon = (
          <Popover content={content} title="Cambiar estatus" trigger="hover">
            <Image
              src={require("../img/not_planned.svg")}
              width={30}
              height={80}
              preview={false}
              onMouseEnter={() => {
                setStation(station);
              }}
            />
          </Popover>
        );
        break;
    }
    return statusIcon;
  };

  const content = (
    <Space wrap>
      <Image
        src={require("../img/not_planned.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() =>
          handleStatusChange("not_planned", hoveredRowKey, station)
        }
      />

      <Image
        src={require("../img/in_process.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("in_process", hoveredRowKey, station)}
      />

      <Image
        src={require("../img/waiting.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("waiting", hoveredRowKey, station)}
      />

      <Image
        src={require("../img/pay.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("pay", hoveredRowKey, station)}
      />

      <Image
        src={require("../img/complete.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("complete", hoveredRowKey, station)}
      />

      <Image
        src={require("../img/2.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("2", hoveredRowKey, station)}
      />
      <Image
        src={require("../img/3.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("3", hoveredRowKey, station)}
      />
      <Image
        src={require("../img/4.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("4", hoveredRowKey, station)}
      />
      <Image
        src={require("../img/5.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("5", hoveredRowKey, station)}
      />
      <Image
        src={require("../img/6.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("6", hoveredRowKey, station)}
      />
      <Image
        src={require("../img/7.svg")}
        width={30}
        height={80}
        preview={false}
        onClick={() => handleStatusChange("7", hoveredRowKey, station)}
      />
      <Image
        src={require("../img/fin.png")}
        width={45}
        height={35}
        preview={false}
        onClick={() => handleStatusChange("fin", hoveredRowKey, station)}
      />
    </Space>
  );

  const generateTableData = (extractedPlanOfCare) => {
    const uniqueStations = {};

    // eslint-disable-next-line no-unused-expressions
    extractedPlanOfCare?.sort((a, b) => {
      const startTimeA = new Date(a?.start_time?.toMillis());
      const startTimeB = new Date(b?.start_time?.toMillis());
      return startTimeA - startTimeB;
    });
    // eslint-disable-next-line no-unused-expressions
    extractedPlanOfCare?.forEach((item) => {
      return item.plan_of_care?.forEach((plan) => {
        if (!uniqueStations[plan.station] && item.fin !== true) {
          uniqueStations[plan.station] = {
            dataIndex: plan.station,
            key: plan.station,
            title: StationEnum[plan.station],
            render: (status) => renderStatusIcon(status, plan.station),
            width: 100,
            align: "center",
          };
        }
      });
    });

    const columns = [
      {
        title: "Paciente",
        dataIndex: "patient_name",
        key: "patient",
        width: 100,
        fixed: "left",
      },
      ...Object.values(uniqueStations),
      {
        title: "Tiempo de espera",
        dataIndex: "",
        key: "",
        width: 100,
        fixed: "right",
      },
      {
        title: "Acción",
        dataIndex: "pt_no",
        key: "estado",
        width: 100,
        fixed: "right",
        render: () =>
          dataSource.length >= 1 ? (
            <Popconfirm
              title="Está seguro que quiere eliminar el paciente de la cola?"
              onConfirm={() => handleDelete(hoveredRowKey)}
            >
              <Link to={"#"} style={{ color: "red" }}>
                Eliminar
              </Link>
            </Popconfirm>
          ) : null,
      },
    ];

    const dataSource = extractedPlanOfCare?.map((item, index) => {
      const stations = {};

      // eslint-disable-next-line no-unused-expressions
      item.plan_of_care?.forEach((plan) => {
        stations[plan.station] = plan.status;
      });
      return {
        pt_no: item.pt_no,
        patient_name: item.patient_name,
        ...stations,
      };
    });

    return { columns, dataSource };
  };

  const { columns, dataSource} = generateTableData(data);

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };
  
  return (
    <>
      <AlertInfo />
      <Table
        rowKey={"pt_no"}
        columns={columns}
        dataSource={data.some((d) => d === undefined) ? [] : dataSource}
        scroll={{ x: 1500, y: 1500 }}
        sticky
        offsetScroll={3}
        rowClassName={getRowClassName}
        onRow={(record) => ({
          onMouseEnter: () => handleMouseEnter(record),
          onMouseLeave: () => handleMouseLeave(),
        })}
      />
      <Divider>
        <Button
          shape="round"
          type="danger"
          onClick={salir}
          style={{ marginTop: "10px" }}
        >
          <CloseCircleOutlined />
          Salir
        </Button>
      </Divider>
    </>
  );
};
