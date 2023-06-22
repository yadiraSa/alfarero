import React, { useEffect, useState } from "react";
import {
  Table,
  Image,
  Alert,
  Divider,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import { firestore } from "./../helpers/firebaseConfig";
import { useHideMenu } from "../hooks/useHideMenu";
import StationEnum from "../helpers/stationEnum";
import Footer from "./Footer";

const { Title } = Typography;

export const Turno = () => {
  useHideMenu(true);
  const [data, setData] = useState([]);
  const [alignment, setAlignment] = useState("start");
  const [direction, setDirection] = useState("horizontal");
  const [countdown, setCountdown] = useState({});


  const renderStatusIcon = (status) => {
    let statusIcon = null;
    switch (status) {
      case "pending":
        statusIcon = (
          <Image
            src={require("../img/not_planned.svg")}
            width={20}
            height={80}
          />
        );
        break;
      case "in_process":
        statusIcon = (
          <Image
            src={require("../img/in_process.svg")}
            width={20}
            height={80}
          />
        );
        break;
      case "waiting":
        statusIcon = (
          <Image src={require("../img/waiting.svg")} width={20} height={80} />
        );
        break;
      case "pay":
        statusIcon = (
          <Image src={require("../img/pay.svg")} width={20} height={80} />
        );
        break;
      case "complete":
        statusIcon = (
          <Image src={require("../img/complete.svg")} width={20} height={80} />
        );
        break;
      default:
        statusIcon = null;
        break;
    }
    return statusIcon;
  };

  const generateTableData = (extractedPlanOfCare) => {
    const uniqueStations = {};
    extractedPlanOfCare.forEach((item) => {
      // eslint-disable-next-line no-unused-expressions
      item.plan_of_care?.forEach((plan) => {
        if (!uniqueStations[plan.station]) {
          uniqueStations[plan.station] = {
            dataIndex: plan.station,
            key: plan.station,
            title: StationEnum[plan.station],
            render: (status) => renderStatusIcon(status),
            width: 100,
            align: "center",
          };
        }
      });
    });

    extractedPlanOfCare.sort((a, b) => {
      const startTimeA = new Date(a.start_time.toMillis());
      const startTimeB = new Date(b.start_time.toMillis());
      return startTimeA - startTimeB;
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
        dataIndex: "pt_no",
        key: "countdown",
        width: 100,
        fixed: "right",
        render: (pt_no) => {
          const remainingTime = countdown[pt_no] || 0;
          return <span>{remainingTime}</span>;
        },
      },
    ];

    const dataSource = extractedPlanOfCare.map((item) => {
      const stations = {};
      item.plan_of_care.forEach((plan) => {
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

  const { columns, dataSource } = generateTableData(data);

  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        const collectionRef = firestore.collection("patients");
        const snapshot = await collectionRef.orderBy("start_time").get();
        const initialData = snapshot.docs.map((doc) => {
          return doc.data();
        });
  
        if (isMounted) {
          setData(initialData);
        }
  
        const countdownData = {};
        initialData.forEach((item) => {
          const avgWaitingTime = item.avg_waiting_time || 0;
          countdownData[item.pt_no] = avgWaitingTime;
  
          // Start countdown timer for each patient
          const countdownInterval = setInterval(() => {
            countdownData[item.pt_no] = Math.max(countdownData[item.pt_no] - 1, 0);
            setCountdown({ ...countdownData });
  
            if (countdownData[item.pt_no] === 0) {
              clearInterval(countdownInterval);
            }
          }, 1000); // Update countdown every second
        });
  
        setCountdown(countdownData);
  
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
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, []);  

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <>
      <Alert
        message="Información del Estatus del Paciente "
        description={
          <Row justify="center">
            <Col xs={24} sm={12} md={8} lg={24} style={{ textAlign: "center" }}>
              <Space
                direction={direction}
                align={alignment === "start" ? "start" : "center"}
                wrap
              >
                <Space>
                  <Image
                    src={require("../img/waiting.svg")}
                    width={20}
                    height={80}
                  />
                  <Title level={5}>{"Paciente en espera "}</Title>
                </Space>
                <Divider />
                <Space>
                  <Image
                    src={require("../img/in_process.svg")}
                    width={20}
                    height={80}
                  />
                  <Title level={5}>{"Paciente siendo atendido "}</Title>
                </Space>
                <Divider />
                <Space>
                  <Image
                    src={require("../img/pay.svg")}
                    width={20}
                    height={80}
                  />
                  <Title level={5}> {"Paciente realizó el pago "}</Title>
                </Space>
                <Divider />
                <Space>
                  <Image
                    src={require("../img/complete.svg")}
                    width={20}
                    height={80}
                  />
                  <Title level={5}> {"Paciente completó su visita "}</Title>
                </Space>
              </Space>
            </Col>
          </Row>
        }
        type="info"
        showIcon
      />

      <Divider />
      <Table
        rowKey={"pt_no"}
        columns={columns}
        dataSource={data.some((d) => d === undefined) ? [] : dataSource}
        scroll={{ x: 1500, y: 1500 }}
        sticky
        offsetScroll={3}
        rowClassName={getRowClassName}
      />
      <Footer />
    </>
  );
};
