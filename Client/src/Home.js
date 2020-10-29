import React, { useState, useEffect } from "react";
import Header from "./Header";
import Product from "./Product";
import CartMin from "./CartMin";
import Carta from "./Cart";
import Search from "./Search";
import Admin from "./Admin";
// import AddProduct from "./AddProduct";
import Footer from "./Footer";
import Axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { Slider, Switch } from "antd";
import BackTopButton from "./BackTop";

// import socketIOClient from "socket.io-client";

import "./Home.css";

import {
  useParams,
  BrowserRouter as Router,
  Switch as SwitchRout,
  Route,
  Link,
} from "react-router-dom";

const Home = (props) => {
  const [Products, setProducts] = useState([]);
  const [ProductTocart, setProductTocart] = useState({});
  const [ProductFromcart, setProductFromcart] = useState({});
  const [ProductListToCart, setProductListToCart] = useState([]);
  const [ProductCount, setProductCount] = useState([]);

  const [Cartv, setCartv] = useState(0);
  const [Min, setMin] = useState(0);
  const [Max, setMax] = useState(0);
  const [Minimum, setMinimum] = useState(0);
  const [Maximum, setMaximum] = useState(0);
  const [RendDrawer, setRendDrawer] = useState(false);

  const params = useParams();
  //console.log("params", params);

  const doAxios = (isSlider, isSearch, isAddProduct, url, val1, val2) => {
    Axios.get(url)
      .then((res) => {
        //console.log("res.data", res.data);
        //console.log(url);
        let Prices = res.data.map((prod) => prod.price);
        if (isSlider) {
          const newProducts = res.data.filter(
            (prod) => prod.price <= val1 && prod.price >= val2
          );
          setProducts(newProducts);
        } else if (isSearch) {
          setProducts(res.data);
        } else if (isAddProduct) {
          setProducts(res.data);
          //console.log("Prices");
          //console.log(Min, Max);
          //console.log("Products", Products);
          setTimeout(() => {
            //console.log(Prices);
            setMin(Math.min(...Prices));
            setMax(Math.max(...Prices));
            setMinimum(Math.min(...Prices));
            setMaximum(Math.max(...Prices));
            //console.log(Min, Max);
          }, 500);
        } else {
          setProducts(res.data);
          //console.log("Products", Products);
          //console.log("Prices", Prices);
          setMin(Math.min(...Prices));
          setMax(Math.max(...Prices));
          setMinimum(Math.min(...Prices));
          setMaximum(Math.max(...Prices));
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      doAxios(false, false, false, "/api/products");
    }, 1000);
  }, []);
  // //console.log(Products[0]);
  let UpdateState = false;

  return (
    <div className="Home">
      <Header
        doAxiosonSearch={(isSlider, isSearch, isAddProduct, link) => {
          doAxios(false, true, false, link);
        }}
        Render="Home"
        UserName={params.name}
      />
      <div className="SliderAndSearch">
        <div className="Slider">
          <div className="Slidercontent">
            <div>
              <div className="Text">:אנא בחר טווח מחירים</div>

              {Minimum && Maximum && Min && Max ? (
                <Slider
                  tooltipVisible
                  min={Min}
                  max={Max}
                  range
                  defaultValue={[Minimum, Maximum]}
                  onAfterChange={(value) => {
                    //console.log("val");
                    //console.log(value);
                    doAxios(
                      true,
                      false,
                      false,
                      "/api/products",
                      value[1],
                      value[0]
                    );
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* <div> */}
        <Search
          Search={(e) => {
            //console.log(67);
            const UserInput = document.querySelector(".input").value;
            //console.log(UserInput);
            const link = "/api/products?search=" + UserInput;
            //console.log(link);
            doAxios(false, true, false, link);
          }}
        />
      </div>
      <CartMin ProductListToCart={ProductListToCart} Cartp={Cartv} />

      {Products.length > 0 && (
        <div className="Products">
          {Products.map((product, productIndex) => (
            <Product
              key={product._id}
              id={product._id}
              src={product.image}
              name={product.title}
              price={product.price}
              Quantity={product.quantity}
              ProductListToCart={ProductListToCart}
              Cartp={Cartv}
              AllProducts={Products}
              ProductCount={ProductCount}
              // ChangQuantity={(data) => {
              //   let productsQuantityList = cloneDeep(Products);
              //   productsQuantityList.forEach(
              //     (productFromList, productfromlistIndex) => {
              //       if (productFromList._id === data.id) {
              //         productFromList.quantity = data.quantity;
              //         setProducts(productsQuantityList);
              //       }
              //     }
              //   );
              // }}
              Plus={(e) => {
                let productsList = cloneDeep(Products);
                let vProductListToCart = cloneDeep(ProductCount);
                let quantityUpdate = true;
                let index = "";
                productsList.forEach(
                  (productFromList, productfromlistIndex) => {
                    if (
                      productfromlistIndex === productIndex &&
                      productFromList.quantity > 0
                    ) {
                      productFromList.quantity = productFromList.quantity - 1;

                      index = vProductListToCart.findIndex(
                        (x) => x._id === productFromList._id
                      );

                      if (index === -1) {
                        vProductListToCart = [
                          ...vProductListToCart,
                          productFromList,
                        ];
                        quantityUpdate = false;
                      }

                      index = vProductListToCart.findIndex(
                        (x) => x._id === productFromList._id
                      );

                      if (index >= 0 && !quantityUpdate) {
                        // //console.log("+", vProductListToCart[index]);
                        let ThisItem = { ...vProductListToCart[index] };
                        //console.log(ThisItem);
                        if (
                          ThisItem.quantity < Products[productIndex].quantity
                        ) {
                          ThisItem.quantity =
                            Products[productIndex].quantity -
                            productFromList.quantity;

                          vProductListToCart.splice(index, 1, ThisItem);
                        }
                      } else if (index >= 0 && quantityUpdate) {
                        let ThisItem = { ...vProductListToCart[index] };
                        if (
                          ThisItem.quantity < Products[productIndex].quantity
                        ) {
                          ThisItem.quantity = ThisItem.quantity + 1;
                          vProductListToCart.splice(index, 1, ThisItem);
                        }
                      }

                      UpdateState = true;

                      if (UpdateState) {
                        setTimeout(() => {
                          // setProducts(productsList);
                          // setCartv(Cartv + 1);
                          // setProductListToCart(vProductListToCart);
                          setProductCount(vProductListToCart);
                        }, 1);
                      } else {
                        setProducts(productsList);
                        // setCartv(Cartv);
                        // setProductTocart("");
                        // setProductFromcart("");
                      }
                    }
                  }
                );
              }}
              Minus={(e) => {
                let productsList = cloneDeep(Products);
                let vProductListToCart = cloneDeep(ProductCount);
                let quantityUpdate = true;
                let index = "";
                productsList.forEach(
                  (productFromList, productfromlistIndex) => {
                    if (
                      productfromlistIndex === productIndex &&
                      productFromList.quantity >= 0
                    ) {
                      index = ProductCount.findIndex(
                        (x) => x._id === productFromList._id
                      );

                      if (index >= 0) {
                        let ThisItem = { ...vProductListToCart[index] };
                        if (ThisItem.quantity > 0) {
                          productFromList.quantity =
                            productFromList.quantity + 1;
                          ThisItem.quantity = ThisItem.quantity - 1;
                          vProductListToCart.splice(index, 1, ThisItem);

                          UpdateState = true;
                        }
                      } else {
                        productFromList.quantity = productFromList.quantity;
                      }

                      productsList[productfromlistIndex] = productFromList;
                    }
                    //console.log("update", UpdateState);
                    if (UpdateState) {
                      setProducts(productsList);
                      // setCartv(Cartv - 1);
                      // setProductFromcart(RemoveProductToCartItem);
                      // setProductTocart("");
                      // setProductListToCart(vProductListToCart);
                      setProductCount(vProductListToCart);
                    } else {
                      setProducts(productsList);
                      // setCartv(Cartv);
                      setProductTocart("");
                      // setProductFromcart("");
                    }
                  }
                );
              }}
              addTocart={(ProductDetails) => {
                setProductListToCart(ProductCount);
                setCartv(Cartv + 1);
                Axios.post("/api/AddToCart", ProductDetails)
                  .then((res) => {
                    console.log("res.data", res.data);
                  })
                  .catch(function (error) {
                    //console.log(error);
                  });
              }}
            />
          ))}
        </div>
      )}
      <BackTopButton />

      <Footer />
    </div>
  );
};

export default Home;
