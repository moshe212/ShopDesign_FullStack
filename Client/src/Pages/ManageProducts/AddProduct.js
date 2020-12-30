import React, { useState } from "react";
import { Modal, Button } from "antd";
import Form from "./Form";
import MyForm from "./MyForm";

import "./AddProduct.css";

const AddProduct = (props) => {
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
        <Form onSubmit={closeModal} />
      </Modal>
    </>
  );
};

export default AddProduct;
