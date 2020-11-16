import React, { useState, useEffect } from "react";

import Header from "../../Header";
import Footer from "../../Footer";
import CreditCardDetailForm from "./CreditCardDetailForm";

import "./Pay.css";

import { Animated } from "react-animated-css";

import { Redirect } from "react-router";

const Pay = () => {
  return (
    <div classname="PayRoot">
      <Header Render="Home" />
      <div className="GreenLine"></div>
      <div className="PayDiv" dir="rtl">
        <div className="DetailsBlock">
          <p className="Header">פרטי משלוח</p>
          <div className="DetailsLine"></div>
        </div>
        <div className="PayBlock">
          <p className="Header">פרטי תשלום</p>
          <div className="PayLine"></div>
          <CreditCardDetailForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pay;
