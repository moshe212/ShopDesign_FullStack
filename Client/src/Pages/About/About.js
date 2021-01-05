import React, { useState, useContext, useEffect } from "react";

import Header from "../../Header";
import Footer from "../../Footer";

const About = (props) => {
  return (
    <div className="PD_Root">
      <Header
        UserName={
          localStorage.getItem("LocalCustomerID")
            ? localStorage.getItem("LocalCustomerID").split(",")[1]
            : ""
        }
        Render="Home"
        Active="About"
      />
      <Footer />
    </div>
  );
};

export default About;
