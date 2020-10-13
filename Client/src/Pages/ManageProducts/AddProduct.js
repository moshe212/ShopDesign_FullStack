import React, { useState } from "react";
import { Modal, Button } from "antd";
import Form from "./Form";
import MyForm from "./MyForm";
// import { ConfigProvider } from "antd";
import "./AddProduct.css";

const AddProduct = (props) => {
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
      <Button className="Modalbtn" type="primary" onClick={() => showModal()}>
        הוסף מוצר
      </Button>
      <Modal
        classname="Modal"
        visible={visible}
        mask
        // direction={direction}
        // popupPlacement={popupPlacement}
        centered
        title="הוסף מוצר"
        footer={null}
        // onOk={handleOk}
        onCancel={() => handleCancel()}
      >
        {/* <MyForm /> */}
        <Form onSubmit={closeModal} />
      </Modal>
      {/* <ConfigProvider direction={direction}>
        
      </ConfigProvider> */}
    </>
  );
};

export default AddProduct;
