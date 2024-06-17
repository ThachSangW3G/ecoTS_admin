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
import "./MaterialsPage.css";

import { compareAsc, format, set } from "date-fns";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  updateMaterial,
} from "../../../services/MaterialService";

const { Dragger } = Upload;

const MaterialsPage = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  const [selectId, setSelectId] = useState(null);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Form values:", values);

    const formData = new FormData();

    const pointsPerKg = parseFloat(values.pointsPerKg);
    const co2SavedPerKg = parseFloat(values.co2SavedPerKg);

    formData.append("name", values.name);
    formData.append("pointsPerKg", pointsPerKg);
    formData.append("co2SavedPerKg", co2SavedPerKg);

    console.log(formData);

    setLoading(true);

    const success =
      event === "add"
        ? await createMaterial(values.name, pointsPerKg, co2SavedPerKg)
        : await updateMaterial(
            selectId,
            values.name,
            pointsPerKg,
            co2SavedPerKg
          );

    if (success) {
      setModalOpen(false);
      form.setFieldsValue({
        name: "",
        pointsPerKg: 0,
        co2SavedPerKg: 0,
      });

      if (event === "add") {
        message.success("Thêm thành công!");
      } else {
        message.success("Cập nhật thành công!");
      }

      callGetMaterials();
    }

    setLoading(false);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [materials, setMaterials] = useState([]);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [event, setEvent] = useState(null);

  const callGetMaterials = async () => {
    setMaterials(await getAllMaterials());
  };

  const handleOkDelete = async () => {
    const success = await deleteMaterial(selectId);
    if (success) {
      message.success("Xóa thành công!");
      setSelectId(null);
      callGetMaterials();
    }

    setIsModalDelete(false);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };

  useEffect(() => {
    callGetMaterials();
  }, []);

  useEffect(() => {}, []);
  return (
    <Flex vertical gap="large">
      <Typography.Title level={2}>Materials Management</Typography.Title>
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
          onClick={() => {
            setModalOpen(true);
            setEvent("add");
            form.setFieldsValue({
              name: "",
              pointsPerKg: 0,
              co2SavedPerKg: 0,
            });
          }}
        >
          Add Material
        </Button>

        <Modal
          title="Xác nhận xóa"
          open={isModalDelete}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
          centered
        >
          <p>Bạn có chắc chắn muốn xóa không?</p>
        </Modal>
        <Modal
          centered
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          <Flex vertical align="center">
            <div className="form-container">
              <h1 className="form-title">A new material infromation</h1>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  name: "",
                  pointsPerKg: 0,
                  co2SavedPerKg: 0,
                }}
              >
                <Form.Item
                  label="Name of material"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Plase select name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Points per Kg"
                  name="pointsPerKg"
                  rules={[
                    {
                      required: true,
                      message: "Plase select Points per kg!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  label="Saved Co2 per Kg"
                  name="co2SavedPerKg"
                  rules={[
                    {
                      required: true,
                      message: "Plase select Saved Co2 per kg!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {event === "add" ? "Thêm" : "Cập nhật"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Flex>
        </Modal>
      </Flex>
      <Table dataSource={materials}>
        <Column title="ID" dataIndex="id" key="id" />

        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Point per Kg"
          dataIndex="pointsPerKg"
          key="pointsPerKg"
        />

        <Column
          title="Saved Co2 per Kg"
          dataIndex="co2SavedPerKg"
          key="co2SavedPerKg"
        />

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                type="primary"
                style={{ backgroundColor: "#8DD3BB" }}
                onClick={() => {
                  setSelectId(record.id);
                  setModalOpen(true);
                  setEvent("update");
                  form.setFieldsValue({
                    name: record.name,
                    pointsPerKg: record.pointsPerKg,
                    co2SavedPerKg: record.co2SavedPerKg,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                danger
                onClick={() => {
                  setIsModalDelete(true);
                  setSelectId(record.id);
                }}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </Flex>
  );
};
export default MaterialsPage;
