import React from "react";
import { BackTop } from "antd";

const BackTopButton = () => {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#af4176",
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
  };

  return (
    <div style={{ height: "250vh", padding: 8 }}>
      <BackTop>
        <div style={style}>^</div>
      </BackTop>
    </div>
  );
};

export default BackTopButton;
