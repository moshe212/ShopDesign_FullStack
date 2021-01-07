import React from "react";
import "./OrderDetailsFromChart.css";

import dayjs from "dayjs";

const OrderDetailsFromChart = (props) => {
  const showChildDrawer = (ProductsCart, TotalPrice) => {
    props.showChildrenDrawer(ProductsCart, TotalPrice);
  };
  return (
    <div dir="rtl" className="Cart_Product" id={props.id}>
      <div>{props.ClientName}</div>
      <div>{props.id} </div>
      <div>{dayjs(props.Orderdate).format("DD/MM/YYYY")}</div>
      <div>{props.ProdCount}</div>
      <div>{props.TotalPrice}</div>
      <button
        onClick={() => {
          showChildDrawer(props.ProductsList, props.TotalPrice);
        }}
      >
        פרטי הזמנה
      </button>
    </div>
  );
};

export default OrderDetailsFromChart;
