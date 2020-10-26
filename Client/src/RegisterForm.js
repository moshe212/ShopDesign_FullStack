import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import Axios from "axios";
import { Redirect } from "react-router";
import { message } from "antd";

import "./RegisterForm.css";

const success = () => {
  message.success({
    content: "הינך מועבר לדף הניהול",
    className: "custom-class",
    style: {
      marginTop: "10vh",
    },
  });
};

const Customeruccess = () => {
  message.success({
    content: "הנתונים נכונים, אנו אוספים את הנתונים שלך ומיד תועבר להמשך קניה.",
    className: "custom-class",
    style: {
      marginTop: "10vh",
      margin: "0px auto",
      width: "500px",
      height: "400px",
    },
  });
};

const error = () => {
  message.error({
    content: "שם המשתמש או הססמה אינם נכונים.",
    className: "custom-class",
    style: {
      marginTop: "10vh",
    },
  });
};

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

const LoginForm = (props) => {
  // const [Redirect_MangeProducts, setRedirect_MangeProducts] = useState(false);
  // const [Redirect_Home, setRedirect_Home] = useState(false);
  // const [UserId, setUserId] = useState("");

  const [State, setState] = useState({
    Redirect_MangeProducts: false,
    Redirect_Home: false,
    UserId: "",
    Name: "",
  });

  const [form] = Form.useForm();

  //console.log("WhoLogIn", props.WhoLogIn);
  const { Redirect_MangeProducts, Redirect_Home, UserId, Name } = State;
  if (Redirect_MangeProducts) {
    return <Redirect push to="/Admin/ManageProducts" />;
  } else if (Redirect_Home) {
    //console.log("userid", { UserId }, { Name });
    return <Redirect push to={"/LoginCustomer/Customer/" + Name} />;
    // setTimeout(() => {
    //   return <Redirect push to="/LoginUser/:" {...UserId} />;
    // }, 1000);
  }

  let url = "";

  if (props.WhoLogIn === "User") {
    url = "/api/LogInCustomer";
  } else if (props.WhoLogIn === "Admin") {
    url = "/api/LogInAdmin";
  }
  //console.log(url);
  const onFinish = (values) => {
    //console.log(values.LogIn.Username, values.LogIn.Password);

    props.onSubmit();
    form.resetFields();

    Axios.post(url, {
      Email: values.LogIn.Username,
      Pass: values.LogIn.Password,
    }).then(
      (response) => {
        console.log("response", response.data);
        if (response.data[0] === "OK" || response.data === "OK") {
          if (url === "/api/LogInCustomer") {
            Customeruccess();
            localStorage.setItem("LocalCustomerID", response.data[1]);
          } else {
            success();
          }

          setTimeout(() => {
            //console.log("1000");
            if (url === "/api/LogInCustomer") {
              const id = response.data[1];
              const name = response.data[2];
              //console.log(id, name);
              setState({ UserId: id, Redirect_Home: true, Name: name });
              // setUserId(id);
              // setRedirect_Home(true);
            } else if (url === "/api/LogInAdmin") {
              // setRedirect_MangeProducts(true);
              setState({ Redirect_MangeProducts: true });
            }
          }, 4000);
        } else {
          error();
        }
      },
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
          name={["LogIn", "Username"]}
          label="אימייל"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["LogIn", "Password"]}
          label="ססמה"
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
            כניסה
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
