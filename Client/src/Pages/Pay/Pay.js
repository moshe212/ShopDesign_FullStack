import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

import "./Pay.css";

import { Redirect } from "react-router";

const pay = (props) => {
  return (
    <div>
      <Header
        doAxiosonSearch={(isSlider, isSearch, isAddProduct, link) => {
          doAxios(false, true, false, link);
        }}
        Render="Home"
        UserName={params.name}
      />

      <Footer />
    </div>
  );
};

export default Pay;
