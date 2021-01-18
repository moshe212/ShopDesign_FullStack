import React from "react";

import Header from "../../Header";
import Footer from "../../Footer";
import CreditCardDetailForm from "./CreditCardDetailForm";
import DeliveryDetails from "./DeliveryDetails";

import "./Pay.css";

const Pay = (props) => {
  console.log(props);
  return (
    <div className="PayRoot">
      <Header
        Render="Home"
        UserName={
          localStorage.getItem("LocalCustomerID")
            ? localStorage.getItem("LocalCustomerID").split(",")[1]
            : ""
        }
      />
      <div className="GreenLine"></div>
      <div className="PayDiv" dir="rtl">
        <div className="DetailsBlock">
          <p className="Header">פרטי משלוח</p>
          <div className="DetailsLine"></div>
          <DeliveryDetails />
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
