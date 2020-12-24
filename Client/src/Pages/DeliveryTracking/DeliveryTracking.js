import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Map from "./Map";
import "./DeliveryTracking.css";

const DeliveryTracking = () => {
  const num = "10456";

  const coordinates = [
    { lat: 31.864347, lng: 35.260679, desc: "home" },
    { lat: 31.932534, lng: 35.022965, desc: "school" },
    {
      lat: 31.864347,
      lng: 35.160679,
      desc: "bus location",
    },
  ];

  return (
    <div>
      <div>
        <Header
          UserName={
            localStorage.getItem("LocalCustomerID")
              ? localStorage.getItem("LocalCustomerID").split(",")[1]
              : ""
          }
        />
      </div>
      <h1>מעקב הזמנה</h1>
      <div dir="rtl" className="TrackingDetails_root">
        <div className="TrackingDetails">
          <div className="orderNum">מס' הזמנה: {num} </div>
          <div className="orderStatus">סטטוס הזמנה: {num} </div>
          <div className="orderArraiv">זמן הגעה משוער: {num}</div>
        </div>

        <div className="MapContainer">
          <Map coordinates={coordinates} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryTracking;
