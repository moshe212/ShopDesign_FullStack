import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import cloneDeep from "lodash/cloneDeep";
import "./Product.css";

import { Redirect } from "react-router";

const Product = (props) => {
  // const [Active, setActive] = useState(false);
  // const ActiveProd = (ActivID) => {
  //   console.log("+", ActivID);
  //   setActive(ActivID);
  // };
  const [Click, setClick] = useState(false);
  const [Product, setProduct] = useState({ props: props, isSocket: false });

  let QuantityToCart;
  props.ProductListToCart.forEach((prod, prodIndex) => {
    if (prod._id === props.id) {
      QuantityToCart = prod.quantity;
    }
  });

  let IsNewOrder;
  if (props.ProductListToCart.length > 1) {
    IsNewOrder = false;
  } else {
    IsNewOrder = true;
  }

  const SaveProdinCart = () => {
    props.addTocart({
      IsNewOrder: IsNewOrder,
      ProductID: props.id,
      UnitPrice: props.price,
      Quantity: QuantityToCart,
    });
  };

  console.log("props", props);
  useEffect(() => {
    const socket = socketIOClient("/UpdateQuantity/:id");
    socket.on("UpdateQuantity", (data) => {
      if (props.id === data.id) {
        props.ChangQuantity(data);
      }
    });
  }, []);

  const ClickImg = () => {
    console.log("clickimg");
    setClick(true);
  };

  if (Click) {
    console.log("props", props.id);
    return (
      <Redirect
        to={{
          pathname: "/Products/" + props.id,
          state: {
            // Name: props.name,
            // Quantity: props.Quantity,
            // Img: props.src,
            // Price: props.price,
            ProductListToCart: props.ProductListToCart,
            Cartp: props.Cartv,
          },
        }}
      ></Redirect>
    );
  }

  const makeFixedPosition = (e) => {
    console.log("props.Quantity", props.Quantity);
    if (props.Quantity > 0) {
      const item = document.getElementById([props.id]);
      // const ElemPosition = item.getBoundingClientRect();
      // console.log(ElemPosition.y, ElemPosition.x, e.clientY, e.clientX);
      const img = item.querySelector(".ProductImg");
      const CloneImg = item.querySelector(".Clone");
      // const CloneImg = React.cloneElement(item);
      // console.log("CloneImg", CloneImg);
      const rect = item.querySelector(".ProductImg").getBoundingClientRect();
      const offset = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };

      const cartPosition = document
        .querySelector(".CartImgDiv")
        .getBoundingClientRect();
      const offsetCart = {
        top: cartPosition.top + window.scrollY,
        left: cartPosition.left + window.scrollX,
      };

      CloneImg.classList.add("animateToCart");
      CloneImg.style.opacity = 20;
      CloneImg.style.zIndex = "2";
      CloneImg.style.transform = `translate(-${
        offset.left - offsetCart.left
      }px, -${offset.top - offsetCart.top}px) scale(0.3) rotate(360deg)`;
      setTimeout(() => {
        CloneImg.style.opacity = 1;
      }, 1000);
      setTimeout(() => {
        CloneImg.style.opacity = 0;
        CloneImg.style.transform = null;
      }, 1500);

      console.log("style", img.style);
    }
  };
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

export default Product;
