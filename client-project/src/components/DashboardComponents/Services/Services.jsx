import React, { useEffect, useState } from "react";
import { ServicesSection } from "../../../api";
import { deleteServiceA, getAllServices } from "../../../redux/servicesSlice";
import { useDispatch } from "react-redux";
import { Avatar, Card, Col, Row, Pagination, Button, Modal, notification } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ENV } from "../../../utils/constants";
import { NewService } from "./NewService";
import "./NewService.scss";

const { Meta } = Card;
const services = new ServicesSection();
const { BASE_RESOURCES } = ENV;
const baseApi = BASE_RESOURCES;

export const Services = () => {
  const [serviceData, setServiceData] = useState([]);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCards = serviceData.length;
  const totalRows = Math.ceil(totalCards / 3);

  const cardsPerPage = 5;
  const rowsPerPage = 2;

  const containerStyle = {
    background: "rgb(236 236 236 / 28%)",
    paddingTop: "30px",
  };

  const addButtonStyle = {
    marginBottom: "16px",
  };

  const cardStyle = {
    width: 300,
    marginBottom: 16,
  };

  const paginationStyle = {
    textAlign: "center",
    marginTop: "16px",
  };

  useEffect(() => {
    services
      .getServices()
      .then((res) => {
        dispatch(getAllServices(res.data));
        setServiceData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, isSubmitting, isModalVisible]);

  console.log(serviceData);
  const startIdx = (currentPage - 1) * cardsPerPage;
  const endIdx = startIdx + cardsPerPage;
  const paginatedData = serviceData.slice(startIdx, endIdx);

  return (
    <div>
      <h1>Servicios &#x1F3D7;</h1>
      <div style={containerStyle}>
        <Button
          type="primary"
          style={addButtonStyle}
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          Crear Servicio
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <Row gutter={16} justify="center">
            {paginatedData.map((service, index) => (
              <Col span={8} key={service.id}>
                <Card
                  style={cardStyle}
                  cover={
                    <img
                      alt={service.service_name}
                      src={`${baseApi}/${service.service_image}`}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  }
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={() => {
                        services
                          .deleteService(service.id)
                          .then((res) => {
                            dispatch(deleteServiceA(service.id));
                            notification.info({
                              message: "Se ha eliminado correctamente",
                              description: "Slide eliminado correctamente.",
                            });
                          })
                          .then(() => {
                            services
                              .getServices()
                              .then((res) => {
                                dispatch(getAllServices(res.data));
                                setServiceData(res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setIsModalVisible(true);
                        setSelectedSlide(service);
                      }}
                    />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src={`${baseApi}/${service.service_image}`} />
                    }
                    title={service.service_name}
                    description={service.service_description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {totalRows > rowsPerPage && (
        <Pagination
          style={paginationStyle}
          defaultPageSize={cardsPerPage}
          total={totalCards}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      <Modal
        title="Nuevo servicio"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
        footer={null}
      >
        <NewService
          closeModal={() => {
            setIsModalVisible(false);
            setIsSubmitting(!isSubmitting);
            setSelectedSlide(null);
          }}
          slide={selectedSlide}
        />
      </Modal>
    </div>
  );
};
