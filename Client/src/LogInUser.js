import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "antd";
import LogInForm from "./LogInForm";
import LoginModalTabs from "./LoginModalTabs";

// import { ConfigProvider } from "antd";
import "./LogInUser.css";

const LogInUser = (props) => {
  const [state, setState] = useState({
    loading: false,
    visible: false,
    // popupPlacement: "bottomRight",
    // direction: "rtl",
  });

  let history = useHistory();

  const showModal = (e) => {
    if (!e.target.innerText.includes("יציאה")) {
      setState({
        visible: true,
      });
    } else {
      localStorage.clear();
      history.push({
        pathname: "/",
        state: { exit: true },
      });
    }
  };

  const doAxiosAfterAddProduct = () => {
    props.doAxiosAfterAddProduct();
  };

  const closeModal = () => {
    setState({ visible: false });
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
  const { visible } = state;
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
        centered
        // title="כניסת משתמשים"
        footer={null}
        header={null}
        // onOk={handleOk}
        onCancel={() => handleCancel()}
        zIndex="2000"
      >
        <LoginModalTabs closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default LogInUser;
