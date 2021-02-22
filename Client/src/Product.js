import React, { useState, useContext } from "react";
import "./Product.css";
import { Redirect } from "react-router";
import OrderContext from "./OrderContext";

const Product = (props) => {
  const [Click, setClick] = useState(false);
  const [Product, setProduct] = useState({ props: props, isSocket: false });

  const IsNewOrder = useContext(OrderContext).data;
  const changeIsNewOrder = useContext(OrderContext).changeIsNewOrder;

  let QuantityToCart;
  props.ProductCount.forEach((prod, prodIndex) => {
    if (prod._id === props.id) {
      QuantityToCart = prod.quantity;
    }
  });

  let catImg = "";
  switch (props.mainCategory.name) {
    case "פירות":
      catImg = "/Images/harvest.svg";
      break;
    case "פירות קפואים":
      catImg = "/Images/frozen.svg";
      break;
    case "ירקות":
      catImg = "/Images/vegetable.svg";
      break;
    case "שייקים":
      catImg = "/Images/healthy-shakes.svg";
      break;
    case "עוגות":
      catImg = "/Images/cake.svg";
      break;
    default:
  }

  const LocalCart = JSON.parse(
    localStorage.getItem("LocalOpenOrderForCustomer")
  );

  let OldQuantityToCart;
  if (LocalCart != null) {
    LocalCart.forEach((prod, prodIndex) => {
      if (String(prod.id).trim() === String(props.id).trim()) {
        OldQuantityToCart = prod.quantity;
      }
    });
  }

  const SaveProdinCart = () => {
    if (QuantityToCart > 0) {
      changeIsNewOrder(false);
      props.addTocart({
        IsNewOrder: IsNewOrder,
        ProductID: props.id,
        UnitPrice: props.price,
        Quantity: QuantityToCart,
        CustomerID: localStorage.getItem("LocalCustomerID")
          ? localStorage.getItem("LocalCustomerID").split(",")[0]
          : "",
      });
    }
  };

  const ClickImg = () => {
    setClick(true);
  };

  if (Click) {
    return (
      <Redirect
        to={{
          pathname: "/Products/" + props.id,
          state: {
            ProductListToCart: props.ProductListToCart,
            Cartp: props.Cartv,
            AllProducts: props.AllProducts,
          },
        }}
      ></Redirect>
    );
  }

  const makeFixedPosition = (e) => {
    if (props.Quantity > 0 && QuantityToCart > 0) {
      const item = document.getElementById([props.id]);
      const img = item.querySelector(".ProductImg");
      const CloneImg = item.querySelector(".Clone");
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
    }
  };
  return (
    <div id={props.id} className="Product">
      <div className="Name">{props.name}</div>
      <div className="Price"> ₪{props.price}</div>
      <div className="ImgContent" onClick={ClickImg}>
        <img className="ProductImg" src={props.src} alt="" />
        <img className="Clone" src={props.src} alt="" />
        <p className="QuantityToCart">{QuantityToCart}</p>
        <span className="OldQuantityToCart">{OldQuantityToCart}</span>
        <div dir="rtl" className="catImg">
          <img className="catImgIcon" src={catImg}></img>
          {/* {props.mainCategory.name}/{props.subCategory.name} */}
        </div>
      </div>

      <div className="ProdDetails">
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
        <div className="btnAddProdDiv">
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
    </div>
  );
};

export default Product;
