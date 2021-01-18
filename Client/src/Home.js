import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Product from "./Product";
import CartMin from "./CartMin";
import Search from "./Search";
import Footer from "./Footer";
import CategoryMenu from "./CategoryMenu";
import Axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { Slider, message } from "antd";
import BackTopButton from "./BackTop";
import { useLocation } from "react-router-dom";

// import socketIOClient from "socket.io-client";

import "./Home.css";

import OrderContext from "./OrderContext";

import { useParams } from "react-router-dom";

const Home = (props) => {
  const [Products, setProducts] = useState([]);
  const [ProductTocart, setProductTocart] = useState({});
  // const [ProductFromcart, setProductFromcart] = useState({});
  const [ProductListToCart, setProductListToCart] = useState([]);
  const [ProductCount, setProductCount] = useState([]);
  // const [BaseProductCount, setBaseProductCount] = useState();
  const [Category, setCategory] = useState("");
  const [Cartv, setCartv] = useState(0);
  // const [SliderRange, setSliderRange] = useState({
  //   Min: 0,
  //   Max: 0,
  //   Minimum: 0,
  //   Maximum: 0,
  // });
  const [Min, setMin] = useState(0);
  const [Max, setMax] = useState(0);
  const [Minimum, setMinimum] = useState(0);
  const [Maximum, setMaximum] = useState(0);

  const params = useParams();
  let Details;
  if (window.history.state) {
    Details = window.history.state.state;
  }

  const IsNewOrder = useContext(OrderContext).data;
  const changeIsNewOrder = useContext(OrderContext).changeIsNewOrder;

  const location = useLocation();

  const chooseCategory = (choose) => {
    setCategory(choose);
    message.destroy();
  };

  if (location.state) {
    if (location.state.exit) {
      setProductListToCart([]);
      setCartv(0);
      location.state.exit = false;
    }
  }

  const doAxios = (isSlider, isSearch, isAddProduct, url, val1, val2) => {
    Axios.get(url)
      .then((res) => {
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
          setTimeout(() => {
            setMin(Math.min(...Prices));
            setMax(Math.max(...Prices));
            setMinimum(Math.min(...Prices));
            setMaximum(Math.max(...Prices));
          }, 500);
        } else {
          setTimeout(() => {
            setMin(Math.min(...Prices));
            setMax(Math.max(...Prices));
            setMinimum(Math.min(...Prices));
            setMaximum(Math.max(...Prices));
          }, 500);
          // setSliderRange({
          //   Min: Math.min(...Prices),
          //   Max: Math.max(...Prices),
          //   Maximum: Math.max(...Prices),
          //   Minimum: Math.min(...Prices),
          // });
          setProducts(res.data);
          if (Category) {
            message.destroy();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetOrderForCustomer = (UserId) => {
    const CustomerID = UserId;

    if (CustomerID != null && !IsNewOrder) {
      Axios.post("/api/GetOpenOrderForCustomer", { CustomerID: CustomerID })
        .then((res) => {
          localStorage.removeItem("LocalOpenOrderForCustomer");
          localStorage.setItem(
            "LocalOpenOrderForCustomer",
            JSON.stringify(res.data)
          );
          setProductListToCart(res.data);
          setCartv(res.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (location.state) {
      if (
        CustomerID != null &&
        location.state.District_IsNewOrder_Var === false
      ) {
        Axios.post("/api/GetOpenOrderForCustomer", { CustomerID: CustomerID })
          .then((res) => {
            localStorage.removeItem("LocalOpenOrderForCustomer");
            localStorage.setItem(
              "LocalOpenOrderForCustomer",
              JSON.stringify(res.data)
            );
            setProductListToCart(res.data);
            setCartv(res.data.length);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    if (Category) {
      message.loading(`מיד תועבר לרשימת המוצרים בקטגוריית  ${Category}`, 0);
    }

    setTimeout(() => {
      doAxios(false, false, false, "/api/products?category=" + Category);
    }, 1000);
  }, [Category]);

  let UpdateState = false;

  return (
    <div className="Home">
      <Header
        doAxiosonSearch={(isSlider, isSearch, isAddProduct, link) => {
          doAxios(false, true, false, link);
        }}
        Render="Home"
        UserName={
          params.name
            ? params.name
            : localStorage.getItem("LocalCustomerID")
            ? localStorage.getItem("LocalCustomerID").split(",")[1]
            : ""
        }
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
                    doAxios(
                      true,
                      false,
                      false,
                      "/api/products?category=" + Category,
                      value[1],
                      value[0]
                    );
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        <Search
          Search={(e) => {
            const UserInput = document.querySelector(".input").value;
            const link = "/api/products?search=" + UserInput;
            doAxios(false, true, false, link);
          }}
        />
      </div>

      <CartMin
        ProductListToCart={
          localStorage.getItem("TempCart")
            ? JSON.parse(localStorage.getItem("TempCart"))
            : ProductListToCart
        }
        Cartp={Cartv}
        GetOrderForCustomer={GetOrderForCustomer}
        UserID={
          localStorage.getItem("LocalCustomerID")
            ? localStorage.getItem("LocalCustomerID").split(",")[0]
            : ""
        }
      />
      <div dir="rtl" className="mainHome">
        <div dir="rtl" className="catBar">
          <CategoryMenu chooseCategoryFunc={chooseCategory} />
        </div>
        {Products.length > 0 && (
          <div dir="rtl" className="Products">
            {Products.map((product, productIndex) => (
              <Product
                key={product._id}
                id={product._id}
                src={product.image}
                name={product.title}
                price={product.price}
                Quantity={product.quantity}
                mainCategory={product.mainCategoryID}
                subCategory={product.subCategoryID}
                ProductListToCart={ProductListToCart}
                Cartp={Cartv}
                AllProducts={Products}
                ProductCount={ProductCount}
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
                          let ThisItem = { ...vProductListToCart[index] };

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
                            setProductCount(vProductListToCart);
                          }, 1);
                        } else {
                          setProducts(productsList);
                        }
                      }
                    }
                  );
                }}
                Minus={(e) => {
                  let productsList = cloneDeep(Products);
                  let vProductListToCart = cloneDeep(ProductCount);
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

                      if (UpdateState) {
                        setProducts(productsList);
                        setProductCount(vProductListToCart);
                      } else {
                        setProducts(productsList);
                        setProductTocart("");
                      }
                    }
                  );
                }}
                addTocart={(ProductDetails) => {
                  if (!ProductDetails.CustomerID) {
                    let resultArray = ProductListToCart.filter(function (item) {
                      return item["_id"] === ProductCount[0]._id;
                    });

                    if (resultArray.length > 0) {
                      ProductListToCart.forEach(function (obj) {
                        if (obj._id === ProductCount[0]._id) {
                          obj.quantity = obj.quantity + 1;
                          setProductListToCart(ProductListToCart);
                        }
                      });
                    } else {
                      ProductListToCart.push(ProductCount[0]);
                      setProductListToCart(ProductListToCart);
                      setCartv(Cartv + 1);
                    }

                    localStorage.setItem(
                      "TempCart",
                      JSON.stringify(ProductListToCart)
                    );

                    setProductCount([]);
                  } else {
                    Axios.post("/api/AddToCart", ProductDetails)
                      .then((res) => {
                        localStorage.setItem(
                          "LocalOpenOrderForCustomer",
                          JSON.stringify(res.data[2])
                        );
                        setProductListToCart(res.data[2]);
                        setCartv(res.data[2].length);
                        setProductCount([]);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      <BackTopButton />

      <Footer />
    </div>
  );
};

export default Home;
