import React from "react";
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

const Demo = (props) => {
  const [form] = Form.useForm();
  const inputEl = React.useRef();

  const onFinish = (values) => {
    props.onSubmit();

    Axios.post(
      "/api/AddProductWithImgFile",

      inputEl.current.files[0],
      {
        params: {
          filename: inputEl.current.files[0].name,
          title: values.product.title,
          // image: values.product.image,
          quantity: values.product.quantity,
          price: values.product.price,
        },
      }
    ).then(
      (response) => {},
      (error) => {
        //console.log(error);
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
          name={["product", "title"]}
          label="שם מוצר"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["product", "image"]}
          label="תמונה"
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
          label="קובץ תמונה"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <div className="Div_FormuploadedFile">
            <input type="file" id="FormuploadedFile" ref={inputEl} />
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
              required: true,
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
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Demo;
