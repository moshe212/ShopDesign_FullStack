import React from "react";
import "./ProductInCart.css";

const ProductInCart = (props) => {
  const ProductTotalPrice = props.Quantity * props.price;
  return (
    <div className="Cart_Product" id={props.id}>
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
        <p className="QuantityOfProd">{props.Quantity}</p>
      </div>
    </div>
  );
};

export default ProductInCart;
