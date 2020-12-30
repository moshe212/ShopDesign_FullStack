import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Admin.css";

const Admin = (props) => {
  const doAxiosForAddProduct = (isSlider, isSearch, isAddProduct, link) => {
    props.doAxiosonSearch(false, true, false, link);
  };
  return (
    <div>
      <Header doAxiosonSearch={""} Render="Admin" />
      <Footer />
    </div>
  );
};

export default Admin;
