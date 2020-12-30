import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import cloneDeep from "lodash/cloneDeep";
import "./Product.css";

const Order = (props) => {
  return (
    <div id={props.id} className="Product">
      <div className="ImgContent" onClick={ClickImg}>
        <img className="ProductImg" src={props.src} alt="" />
        <img className="Clone" src={props.src} alt="" />
        <p className="QuantityToCart">{QuantityToCart}</p>
      </div>
      <div className="ProdDetails">
        <div className="Name">{props.name}</div>

        <div className="Price"> ₪{props.price}</div>
        {props.addTocart && (
          <div className="PlusMinusBtns">
            <button
              className="Plus"
              onClick={(e) => {
                props.Plus(e);
              }}
            >
              +
            </button>
            <button className="Minus" onClick={(e) => props.Minus(e)}>
              -
            </button>
          </div>
        )}
      </div>

      <div>
        {props.Quantity > 0 ? (
          <button
            className="AddToCartOne"
            onClick={(e) => {
              makeFixedPosition(e);
              SaveProdinCart();
            }}
          >
            הוסף לסל
          </button>
        ) : (
          <button className="AddToCartOne">אזל מהמלאי</button>
        )}
      </div>
    </div>
  );
};

export default Order;
