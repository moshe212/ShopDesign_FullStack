import React, { useState, useContext } from "react";
import { message, Button } from "antd";
import Header from "../../Header";

import CartMin from "../../CartMin";
import "./ProductDetails.css";

import { useParams, Link } from "react-router-dom";
import Axios from "axios";

import ProductsContext from "../../ProductsContext";

const ProductDetails = (props) => {
  const [ClickArrow, setClickArrow] = useState(false);
  const [Productdetails, setProductdetails] = useState();
  const [Update, setUpdate] = useState(false);
  const [LocalCart, setLocalCart] = useState(
    JSON.parse(localStorage.getItem("LocalOpenOrderForCustomer"))
  );
  const [TempCart, setTempCart] = useState(
    localStorage.getItem("TempCart")
      ? JSON.parse(localStorage.getItem("TempCart"))
      : []
  );

  const params = useParams();

  const Details = window.history.state.state;

  const HandleClick = () => {
    setTimeout(() => {
      setClickArrow(true);
    }, 500);
  };

  let PD_Name = "";
  let PD_Quantity = "";
  let PD_Img = "";
  let PD_Price = "";
  let PD_ArrayLocation = "";
  let i = 0;

  let ProductdetailsList;
  let Productdetails_Json;

  const Context = useContext(ProductsContext);

  if (Context.length > 0) {
    ProductdetailsList = Context;
    Productdetails_Json = JSON.parse(ProductdetailsList);
  } else {
    Axios.get("/api/products")
      .then((res) => {
        setProductdetails(res.data);
        Productdetails_Json = JSON.parse(Productdetails);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (Productdetails_Json) {
    for (i = 0; i < Productdetails_Json.length + 1; i++) {
      const id = Productdetails_Json[i]._id;
      if (id === params.id) {
        PD_Name = Productdetails_Json[i].title;
        PD_Quantity = Productdetails_Json[i].Quantity;
        PD_Img = Productdetails_Json[i].image;
        PD_Price = Productdetails_Json[i].price;
        PD_ArrayLocation = i;

        break;
      }
    }
  }

  let ProdForCart;
  if (localStorage.getItem("LocalCustomerID") !== null) {
    ProdForCart = {
      IsNewOrder: false,
      ProductID: params.id,
      UnitPrice: PD_Price,
      Quantity: 1,
      CustomerID: localStorage.getItem("LocalCustomerID").split(",")[0],
    };
  } else {
    ProdForCart = {
      _id: params.id,
      title: PD_Name,
      image: PD_Img,
      quantity: 1,
      price: PD_Price,
    };
  }

  let TempProductListToCart = [];
  const AddToCartFromprodDetails = () => {
    message.loading("..מוסיף את המוצר לעגלה", 0);
    if (localStorage.getItem("LocalCustomerID")) {
      Axios.post("/api/AddToCart", ProdForCart)
        .then((res) => {
          localStorage.setItem(
            "LocalOpenOrderForCustomer",
            JSON.stringify(res.data[2])
          );
          // setTimeout(() => {
          setLocalCart(
            JSON.parse(localStorage.getItem("LocalOpenOrderForCustomer"))
          );
          // }, 100);
          message.destroy();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      if (!localStorage.getItem("TempCart")) {
        console.log("!");
        TempProductListToCart.push(ProdForCart);
        localStorage.setItem("TempCart", JSON.stringify(TempProductListToCart));
        setTempCart(JSON.parse(localStorage.getItem("TempCart")));
        message.destroy();
      } else {
        const ExistTempCart = JSON.parse(localStorage.getItem("TempCart"));

        let resultArray = ExistTempCart.filter(function (item) {
          return item["_id"] === params.id;
        });

        if (resultArray.length > 0) {
          ExistTempCart.forEach(function (obj) {
            if (obj._id === params.id) {
              obj.quantity = obj.quantity + 1;
              localStorage.setItem("TempCart", JSON.stringify(ExistTempCart));
              setTempCart(ExistTempCart);
              message.destroy();
            }
          });
        } else {
          ExistTempCart.push(ProdForCart);
          localStorage.setItem("TempCart", JSON.stringify(ExistTempCart));
          setTempCart(ExistTempCart);
          message.destroy();
        }
      }
    }
  };

  if (!Productdetails_Json) {
    return <div>"hello"</div>;
  } else {
    return (
      <div className="PD_Root">
        <Header
          UserName={
            localStorage.getItem("LocalCustomerID")
              ? localStorage.getItem("LocalCustomerID").split(",")[1]
              : ""
          }
        />
        <CartMin
          ProductListToCart={
            LocalCart
              ? LocalCart
              : localStorage.getItem("TempCart")
              ? TempCart
              : []
          }
          Cartp={Details ? Details.Cartv || 0 : 0}
        />

        <div className="PD_nav">
          <img className="Arrow" src="/Images/back.svg"></img>
          <Link
            to={{
              pathname:
                i > 0
                  ? "/Products/" + Productdetails_Json[i - 1]._id
                  : "/Products/" + Productdetails_Json[i]._id,
            }}
          >
            <span onClick={HandleClick}> הקודם </span>
          </Link>

          <span>|</span>
          <Link
            to={{
              pathname:
                i < Productdetails_Json.length - 1
                  ? "/Products/" + Productdetails_Json[i + 1]._id
                  : "/Products/" + Productdetails_Json[i]._id,
            }}
          >
            <span onClick={HandleClick}> הבא </span>
          </Link>

          <img className="Arrow" src="/Images/next.svg"></img>
        </div>

        <div id={params.id} className="ProductDetails">
          <div className="PD_ImgContent grid-item">
            <img className="PD_ProductImg" src={PD_Img} alt="" />
          </div>
          <div className="Details grid-item">
            <div className="PD_Name">{PD_Name}</div>

            <div className="PD_Price">₪{PD_Price}</div>
          </div>
        </div>
        <div className="PD_BtnDiv">
          <Button className="PD_Btn" onClick={AddToCartFromprodDetails}>
            הוסף לסל
          </Button>
        </div>
      </div>
    );
  }
};
export default ProductDetails;
