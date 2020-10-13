import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import Axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormUpdateProd = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log(values);
    // const Modal = document.querySelector(".ant-modal");
    const uploadedFile = document.querySelector(
      ".Div_FormUpateFile #FormUpateFile"
    );
    console.log(uploadedFile.files);
    props.onSubmit();
    form.resetFields();

    Axios.put("http://localhost:8000/UpdateProduct", uploadedFile.files[0], {
      params: {
        filename: uploadedFile.files[0] ? uploadedFile.files[0].name : "",
        id: values.product._id,
        title: values.product.title || "",
        quantity: values.product.quantity || "",
        price: values.product.price || "",
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div dir="rtl">
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["product", "id"]}
          label="מזהה"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["product", "title"]}
          label="שם מוצר"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["product", "imageFile"]}
          label="תמונה"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <div className="Div_FormUpateFile">
            <input type="file" id="FormUpateFile" />
          </div>
        </Form.Item>
        <Form.Item
          name={["product", "quantity"]}
          label="כמות"
          rules={[
            {
              type: "number",
              min: 0,
              max: 10000,
              required: false,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["product", "price"]}
          label="מחיר"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            עדכן מוצר
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormUpdateProd;
