import React, { useState, useContext, useEffect } from "react";

import Header from "../../Header";
import Footer from "../../Footer";

const ContactUs = (props) => {
  return (
    <div className="PD_Root">
      <Header
        UserName={
          localStorage.getItem("LocalCustomerID")
            ? localStorage.getItem("LocalCustomerID").split(",")[1]
            : ""
        }
        Render="Home"
        Active="ContactUs"
      />
      <Footer />
    </div>
  );
};

export default ContactUs;
