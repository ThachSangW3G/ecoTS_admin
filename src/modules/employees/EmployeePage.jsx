import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Space,
  Table,
  Tag,
  Typography,
  Input,
  Modal,
  message,
  Upload,
  Divider,
  Form,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
const { Search } = Input;
import "./EmployeePage.css";

import { compareAsc, format, set } from "date-fns";

const { Dragger } = Upload;

const EmployeePage = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Form values:", values);

    // const formData = new FormData();

    // formData.append(
    //   "backGroundImage",
    //   values.backGroundImgUrl[0].originFileObj
    // );

    // values.imgDetailsUrl.forEach((file) => {
    //   formData.append("imageDetails", file.originFileObj);
    // });

    // setLoading(true);

    // const success = await createLocation(
    //   values.locationName,
    //   values.description,
    //   values.address,
    //   values.latitude,
    //   values.longitude,
    //   formData
    // );

    // if (success) {
    //   setModalOpen(false);
    //   form.setFieldsValue({
    //     locationName: "",
    //     description: "",
    //     address: "",
    //     latitude: 0,
    //     longitude: 0,
    //     backGroundImgUrl: null,
    //     imgDetailsUrl: [],
    //   });

    //   callGetLocations();
    // }

    // setLoading(false);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  //const [locations, setLocations] = useState([]);

  //   const callGetLocations = async () => {
  //     setLocations(await getAllLocations());
  //   };

  //   useEffect(() => {
  //     callGetLocations();
  //   }, []);

  return (
    <Flex vertical gap="large">
      <Typography.Title level={2}>Employee Management</Typography.Title>
      <Flex justify="space-between">
        <Search
          placeholder="Search locations"
          onSearch={onSearch}
          enterButton
          className="search-input"
        />
        <Button
          type="primary"
          style={{
            backgroundColor: "#8DD3BB",
            fontWeight: 500,
            width: "fit-content",
          }}
          onClick={() => setModalOpen(true)}
        >
          Add Employee
        </Button>
        <Modal
          centered
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          <Flex vertical align="center">
            <div className="form-container">
              <h1 className="form-title">A new employee information</h1>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  locationName: "",
                  description: "",
                  address: "",
                  latitude: 0,
                  longitude: 0,
                  backGroundImgUrl: null,
                  imgDetailsUrl: [],
                }}
              >
                <Form.Item
                  label="Name of location"
                  name="locationName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter location name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter description!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,

                      message: "Please enter address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Latitude"
                  name="latitude"
                  rules={[
                    {
                      required: true,
                      message: "Plase select latitude!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  label="Longitude"
                  name="longitude"
                  rules={[
                    {
                      required: true,
                      message: "Plase select longitude!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  label="Background image"
                  name="backGroundImgUrl"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="Chọn hoặc kéo thả file vào đây"
                >
                  <Dragger
                    name="backGroundImgUrl"
                    multiple={false}
                    action="/upload.do"
                    listType="picture"
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Nhấp hoặc kéo tệp vào khu vực này để tải lên
                    </p>
                  </Dragger>
                </Form.Item>

                <Form.Item
                  label="Detail images"
                  name="imgDetailsUrl"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="Chọn hoặc kéo thả file vào đây"
                >
                  <Dragger
                    name="imgDetailsUrl"
                    multiple={true}
                    action="/upload.do"
                    listType="picture"
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Nhấp hoặc kéo tệp vào khu vực này để tải lên
                    </p>
                  </Dragger>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Flex>
        </Modal>
      </Flex>
      <Table dataSource={locations}>
        <Column title="ID" dataIndex="id" key="id" />

        <Column title="Name" dataIndex="locationName" key="locationName" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Address"
          dataIndex="typeOfLocation"
          key="typeOfLocation"
        />
        <Column title="Latitude" dataIndex="latitude" key="latitude" />
        <Column title="Longitude" dataIndex="longitude" key="longitude" />
        <Column
          title="Background"
          dataIndex="backGroundImgUrl"
          key="backGroundImgUrl"
          render={(text, record) => (
            <img
              src={record.backGroundImgUrl}
              alt="Background Image"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        />

        <Column
          title="Images Details"
          dataIndex="imgDetailsUrl"
          key="imgDetailsUrl"
          render={(text, record) => (
            <div>
              {record.imgDetailsUrl.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginRight: "5px",
                  }}
                />
              ))}
            </div>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button type="primary" style={{ backgroundColor: "#8DD3BB" }}>
                Edit
              </Button>
              <Button danger>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </Flex>
  );
};
export default EmployeePage;
