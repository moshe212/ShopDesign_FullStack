import React, { useState } from "react";
import "./ProductInCart.css";

const ProductInCart = (props) => {
  //console.log("ProductTotalPrice", props.Quantity * props.price);
  const ProductTotalPrice = props.Quantity * props.price;
  return (
    <div className="Cart_Product" id={props.id}>
      {/* <div className="Cart_Quantity">כמות: {props.Quantity}</div> */}

      {/* {props.addTocart && (
        <div>
          <button className="Cart_Plus" onClick={(e) => props.addTocart(e)}>
            +
          </button>
          <button className="Cart_Minus" onClick={(e) => props.addTocart(e)}>
            -
          </button>
        </div>
      )} */}

      <span className="TotalPriceincart">
        <small className="SmallIcon">₪ </small>
        <span className="ProdInCartTotalPrice">{ProductTotalPrice}</span>
      </span>
      <div className="CartName_Price">
        <div className="Cart_Name">{props.name}</div>
        <span className="Priceincart">
          <small className="SmallIcon">₪ </small>
          <span className="ProdInCartPrice">{props.price}</span>
        </span>
      </div>
      <div className="Cart_ImgContent">
        <img className="Cart_ProductImg" src={props.src} alt="" />
      </div>
    </div>
  );
};

export default ProductInCart;
