import React, { useState, useContext, useEffect } from "react";
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

import ProductsContext from "../../ProductsContext";

const ProductDetails = (props) => {
  const [ClickArrow, setClickArrow] = useState(false);
  const [Productdetails, setProductdetails] = useState();

  console.log("log");

  const params = useParams();
  console.log("params", params);

  const Details = window.history.state.state;

  const doAxios = () => {
    Axios.get("/api/products")
      .then((res) => {
        // console.log(res.data);
        setProductdetails(res.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

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
  console.log("Context", Context);
  if (Context.length > 0) {
    ProductdetailsList = Context;
    Productdetails_Json = JSON.parse(ProductdetailsList);
  } else {
    Axios.get("/api/products")
      .then((res) => {
        // console.log(res.data);
        setProductdetails(res.data);
        Productdetails_Json = JSON.parse(Productdetails);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }
  // const Productdetails_Json = JSON.parse(Productdetails);
  console.log("Productdetails_Json", Productdetails_Json);
  if (Productdetails_Json) {
    for (i = 0; i < Productdetails_Json.length + 1; i++) {
      const id = Productdetails_Json[i]._id;
      //console.log("id", id, parseInt(params.id));
      if (id === params.id) {
        console.log("i", i, Productdetails_Json.length);
        PD_Name = Productdetails_Json[i].title;
        PD_Quantity = Productdetails_Json[i].Quantity;
        PD_Img = Productdetails_Json[i].image;
        PD_Price = Productdetails_Json[i].price;
        PD_ArrayLocation = i;

        break;
      }
    }
  }
  if (!Productdetails_Json) {
    return <div>"hello"</div>;
  } else {
    return (
      <div className="PD_Root">
        <Header />
        <CartMin
          ProductListToCart={Details ? Details.ProductListToCart : []}
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
            {/* <div className="PD_Quantity"> {Details.Quantity}</div> */}
            <div className="PD_Price">₪{PD_Price}</div>
          </div>
        </div>
        <div className="PD_BtnDiv">
          <button className="PD_Btn">הוסף לסל</button>
        </div>
      </div>
    );
  }
};
export default ProductDetails;
