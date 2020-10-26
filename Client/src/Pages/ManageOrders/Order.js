import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import cloneDeep from "lodash/cloneDeep";
import "./Product.css";

import { Redirect } from "react-router";

const Order = (props) => {
  //   const [Click, setClick] = useState(false);
  //   const [Product, setProduct] = useState({ props: props, isSocket: false });

  //   const ClickImg = () => {
  //     //console.log("clickimg");
  //     setClick(true);
  //   };

  //   if (Click) {
  //     //console.log("props", props.id);
  //     return (
  //       <Redirect
  //         to={{
  //           pathname: "/Products/" + props.id,
  //           state: {
  //             // Name: props.name,
  //             // Quantity: props.Quantity,
  //             // Img: props.src,
  //             // Price: props.price,
  //             ProductListToCart: props.ProductListToCart,
  //             Cartp: props.Cartv,
  //             AllProducts: props.AllProducts,
  //           },
  //         }}
  //       ></Redirect>
  //     );
  //   }

  //   };
  return (
    <div id={props.id} className="Product">
      <div className="ImgContent" onClick={ClickImg}>
        <img className="ProductImg" src={props.src} alt="" />
        <img className="Clone" src={props.src} alt="" />
        <p className="QuantityToCart">{QuantityToCart}</p>
      </div>
      <div className="ProdDetails">
        <div className="Name">{props.name}</div>
        {/* <div className="Quantity">כמות: {props.Quantity}</div> */}
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
              // props.addTocart
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
