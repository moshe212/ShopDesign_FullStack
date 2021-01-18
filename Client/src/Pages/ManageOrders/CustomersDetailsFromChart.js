import React from "react";
import "./CustomersDetailsFromChart.css";

import dayjs from "dayjs";

const CustomersDetailsFromChart = (props) => {
  const showChildDrawer = (ProductsCart, TotalPrice, id) => {
    props.showChildrenDrawer(ProductsCart, TotalPrice, id);
  };
  return (
    <div dir="rtl" className="orderDetails" id={props.id}>
      <div className="item">
        <div className="Counter">{props.Counter}</div>
      </div>
      <div className="item">
        <div>שם לקוח: </div>
        <div>{props.ClientName} </div>
      </div>
      {/* <div className="item">
        <div>תאריך הזמנה: </div>
        <div>{dayjs(props.Orderdate).format("DD/MM/YYYY")}</div>
      </div> */}
      <div className="item">
        <div>כמות הזמנות: </div>
        <div>{props.OrderCount}</div>
      </div>
      <div className="Total">
        <div>סה"כ: </div>
        <div>{props.Total}</div>
      </div>
      {/* <div className="orderDetailsBtn">
        <button
          onClick={() => {
            showChildDrawer(props.ProductsList, props.TotalPrice, props.id);
          }}
        >
          פרטי הזמנה
        </button>
      </div> */}
    </div>
  );
};

export default CustomersDetailsFromChart;
