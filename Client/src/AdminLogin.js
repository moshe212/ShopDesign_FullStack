import React, { useState } from "react";
import { Modal, Button } from "antd";
import LogInForm from "./LogInForm";
// import { ConfigProvider } from "antd";
import "./AdminLogin.css";

const AdminLogIn = (props) => {
  console.log("ax");
  console.log(props.CloseModal);
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

    // setTimeout(() => {
    //   doAxiosAfterAddProduct();
    // }, 500);
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
        {/* <MyForm /> */}
        <LogInForm onSubmit={closeModal} WhoLogIn={"Admin"} />
      </Modal>
      {/* <ConfigProvider direction={direction}>
        
      </ConfigProvider> */}
    </>
  );
};

export default AdminLogIn;
