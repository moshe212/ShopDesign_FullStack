import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "antd";
import LogInForm from "./LogInForm";
import LoginModalTabs from "./LoginModalTabs";

// import { ConfigProvider } from "antd";
import "./LogInUser.css";

const LogInUser = (props) => {
  //console.log("ax", props);
  //console.log(props.CloseModal);
  const [state, setState] = useState({
    loading: false,
    visible: false,
    // popupPlacement: "bottomRight",
    // direction: "rtl",
  });

  let history = useHistory();

  const showModal = (e) => {
    // console.log("e", e.target.innerText);
    if (!e.target.innerText.includes("יציאה")) {
      setState({
        visible: true,
      });
    } else {
      console.log("e", e.target);
      console.log(props.ExitFuncprop);
      localStorage.clear();
      props.ExitFuncprop();
      // localStorage.removeItem("LocalOpenOrderForCustomer");
      // localStorage.removeItem("LocalCustomerID");
      // localStorage.removeItem("DeliveryDetails");
      history.push("/");
    }
  };

  const doAxiosAfterAddProduct = () => {
    props.doAxiosAfterAddProduct();
  };

  const closeModal = () => {
    setState({ visible: false });

    // setTimeout(() => {
    //   doAxiosAfterAddProduct();
    // }, 500);
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  let BtnText = "";
  if (props.Username) {
    BtnText = "שלום " + props.Username + " | יציאה";
  } else {
    BtnText = "התחבר/הרשם";
  }
  const { visible, loading, direction, popupPlacement } = state;
  return (
    <>
      <Button
        className="LogInuserBtn"
        type="primary"
        onClick={(e) => showModal(e)}
      >
        <p>{BtnText} </p>
      </Button>

      <Modal
        classname="Modal"
        visible={visible}
        mask
        // direction={direction}
        // popupPlacement={popupPlacement}
        centered
        // title="כניסת משתמשים"
        footer={null}
        header={null}
        // onOk={handleOk}
        onCancel={() => handleCancel()}
        zIndex="2000"
      >
        <LoginModalTabs closeModal={closeModal} />
        {/* <LogInForm onSubmit={closeModal} WhoLogIn={"User"} /> */}
      </Modal>
      {/* <ConfigProvider direction={direction}>
        
      </ConfigProvider> */}
    </>
  );
};

export default LogInUser;
