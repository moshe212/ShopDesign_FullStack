import React, { useState } from "react";
import { Modal, Button } from "antd";
import FormUpdateProd from "./FormUpdateProd";

import "./UpdateProduct.css";

const UpdateProduct = (props) => {
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
        עדכן מוצר
      </Button>
      <Modal
        classname="Modal"
        visible={visible}
        mask
        // direction={direction}
        // popupPlacement={popupPlacement}
        centered
        title="עדכן מוצר"
        footer={null}
        // onOk={handleOk}
        onCancel={() => handleCancel()}
      >
        <FormUpdateProd onSubmit={closeModal} />
      </Modal>
    </>
  );
};

export default UpdateProduct;
