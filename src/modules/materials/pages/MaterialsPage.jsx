import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Table,
  Typography,
  Input,
  Modal,
  message,
  Form,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./MaterialsPage.css";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  updateMaterial,
} from "../../../services/MaterialService";

const { Column } = Table;
const { Search } = Input;
const { Option } = Select;

const MaterialsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [event, setEvent] = useState(null);

  const callGetMaterials = async () => {
    setMaterials(await getAllMaterials());
  };

  useEffect(() => {
    callGetMaterials();
  }, []);

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const onFinish = async (values) => {
    console.log("Form values:", values);

    const pointsPerKg = parseFloat(values.pointsPerKg);
    const co2SavedPerKg = parseFloat(values.co2SavedPerKg);

    setLoading(true);

    const success =
      event === "add"
        ? await createMaterial(
            values.name,
            pointsPerKg,
            co2SavedPerKg,
            values.type
          )
        : await updateMaterial(
            selectId,
            values.name,
            pointsPerKg,
            co2SavedPerKg,
            values.type
          );

    if (success) {
      setModalOpen(false);
      form.resetFields();

      if (event === "add") {
        message.success("Added successfully!");
      } else {
        message.success("Updated successfully!");
      }

      callGetMaterials();
    }

    setLoading(false);
  };

  const handleOkDelete = async () => {
    const success = await deleteMaterial(selectId);
    if (success) {
      message.success("Deleted successfully!");
      setSelectId(null);
      callGetMaterials();
    }

    setIsModalDelete(false);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2}>Materials Management</Typography.Title>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search materials"
          onSearch={onSearch}
          enterButton
        />
        <Button
          type="primary"
          style={{ backgroundColor: "#8DD3BB" }}
          onClick={() => {
            setModalOpen(true);
            setEvent("add");
            form.resetFields();
          }}
        >
          Add Material
        </Button>
      </Space>
      <Table dataSource={materials} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Points per Kg"
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
                    type: record.type,
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

      <Modal
        title="Confirm Delete"
        open={isModalDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        centered
      >
        <p>Are you sure you want to delete this material?</p>
      </Modal>

      <Modal
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Typography.Title level={4}>
          {event === "add" ? "Add Material" : "Edit Material"}
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name of material"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the name!",
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
                message: "Please enter Points per Kg!",
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
                message: "Please enter Saved Co2 per Kg!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please select the type!",
              },
            ]}
          >
            <Select>
              <Option value="type1">Type 1</Option>
              <Option value="type2">Type 2</Option>
              <Option value="type3">Type 3</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {event === "add" ? "Add" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaterialsPage;
