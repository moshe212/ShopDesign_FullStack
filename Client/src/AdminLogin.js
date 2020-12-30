import React, { useState } from "react";
import { Modal, Button } from "antd";
import LogInForm from "./LogInForm";
import "./AdminLogin.css";

const AdminLogIn = (props) => {
  const [state, setState] = useState({
    loading: false,
    visible: false,
    // popupPlacement: "bottomRight",
    // direction: "rtl",
  });

  const showModal = () => {
    setState({
      visible: true,
    });
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

  const { visible, loading, direction, popupPlacement } = state;
  return (
    <>
      <div className="AdminBtn">
        <Button className="Modalbtn" type="primary" onClick={() => showModal()}>
          ניהול
          <img
            className="AdminIcon"
            src="/Images/FAVPNG_clip-art-the-noun-project-download-image_cneyEXSN.png"
          ></img>
        </Button>
      </div>

      <Modal
        classname="Modal"
        visible={visible}
        mask
        // direction={direction}
        // popupPlacement={popupPlacement}
        centered
        title="כניסה"
        footer={null}
        // onOk={handleOk}
        onCancel={() => handleCancel()}
      >
        <LogInForm onSubmit={closeModal} WhoLogIn={"Admin"} />
      </Modal>
    </>
  );
};

export default AdminLogIn;
