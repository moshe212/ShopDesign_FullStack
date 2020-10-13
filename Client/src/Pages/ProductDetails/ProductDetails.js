import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import CartMin from "../../CartMin";
import "./ProductDetails.css";

import {
  useParams,
  BrowserRouter as Router,
  Switch as SwitchRout,
  Route,
  Link,
} from "react-router-dom";
import Axios from "axios";
import { Redirect } from "react-router";
import { parseInt } from "lodash";

const ProductDetails = (props) => {
  const [ClickArrow, setClickArrow] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8000/products")
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("LocalProductList", JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const LocalProduct = localStorage.getItem("LocalProductList");
  const params = useParams();
  console.log("params", params);
  //   console.log(props);
  console.log(window.history.state.state);
  //   console.log(LocalProduct);
  const Details = window.history.state.state;

  const HandleClick = () => {
    console.log("clickarrow");

    // <Redirect
    //   to={{
    //     pathname: "/Products/" + params.id + 1,
    //   }}
    // ></Redirect>;
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

  const Productdetails_Json = JSON.parse(LocalProduct);
  console.log("Productdetails_Json", Productdetails_Json);
  for (i = 0; i < Productdetails_Json.length; i++) {
    const id = Productdetails_Json[i]._id;
    console.log("id", id, parseInt(params.id));
    if (id === params.id) {
      console.log("equal");
      PD_Name = Productdetails_Json[i].title;
      PD_Quantity = Productdetails_Json[i].Quantity;
      PD_Img = Productdetails_Json[i].image;
      PD_Price = Productdetails_Json[i].price;
      PD_ArrayLocation = i;
      break;
    }
  }
  return (
    <div className="PD_Root">
      <Header />
      <CartMin
        ProductListToCart={Details ? Details.ProductListToCart : []}
        Cartp={Details ? Details.Cartv || 0 : 0}
      />
      <div className="PD_nav">
        <img className="Arrow" src="../../../Images/back.svg"></img>
        <Link
          to={{
            pathname: "/Products/" + Productdetails_Json[i - 1]._id,
          }}
        >
          <span onClick={HandleClick}> הקודם </span>
        </Link>

        <span>|</span>
        <Link
          to={{
            pathname: "/Products/" + Productdetails_Json[i + 1]._id,
          }}
        >
          <span onClick={HandleClick}> הבא </span>
        </Link>

        <img className="Arrow" src="../../../Images/next.svg"></img>
      </div>
      <div id={params.id} className="ProductDetails">
        <div className="PD_ImgContent grid-item">
          <img className="PD_ProductImg" src={PD_Img} alt="" />
        </div>
        <div className="Details grid-item">
          <div className="PD_Name">{PD_Name}</div>
          {/* <div className="PD_Quantity"> {Details.Quantity}</div> */}
          <div className="PD_Price">₪{PD_Price}</div>
        </div>
      </div>
      <div className="PD_BtnDiv">
        <button className="PD_Btn">הוסף לסל</button>
      </div>
    </div>
  );
};

export default ProductDetails;
