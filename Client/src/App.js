import React, { useState, useEffect, useContext } from "react";
// import Header from "./Header";
// import Product from "./Product";
// import CartMin from "./CartMin";
// import Carta from "./Cart";
// import Search from "./Search";
import Admin from "./Admin";
// import AddProduct from "./AddProduct";
// import Footer from "./Footer";
import Axios from "axios";
// import cloneDeep from "lodash/cloneDeep";
// import { Slider, Switch } from "antd";
import Home from "./Home";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";
import ImportProducts from "./Pages/ImportProducts/ImportProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

import { ProductsProvider } from "./ProductsContext";
// import ProductsContext from "./ProductsContext";

// import socketIOClient from "socket.io-client";

// import "./App.css";

import {
  BrowserRouter as Router,
  Switch as SwitchRout,
  Route,
  Link,
} from "react-router-dom";

const App = () => {
  const [AllProducts, setAllProducts] = useState({ Name: "Moshe" });

  useEffect(() => {
    Axios.get("/api/products")
      .then((res) => {
        console.log(res.data);
        setAllProducts(JSON.stringify(res.data));
      })
      .catch(function (error) {
        //console.log(error);
      });
  }, []);

  // const ProductsContext = React.createContext(AllProducts);
  // const AllProductContext = useContext(ProductsContext);
  console.log("AllProducts", AllProducts);
  return (
    <Router>
      <SwitchRout>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/LoginUser/user/:name">
          <Home />
        </Route>

        <Route path="/Products/:id">
          {/* <ProductsContext.Provider value={AllProducts}> */}
          <ProductsProvider value={AllProducts}>
            <ProductDetails />
          </ProductsProvider>
          {/* </ProductsContext.Provider> */}
        </Route>

        <Route exact path="/Admin">
          <Admin />
        </Route>

        <Route exact path="/Admin/ManageProducts">
          <ManageProducts />
        </Route>

        <Route exact path="/Admin/ImportProducts">
          <ImportProducts />
        </Route>

        {/* <Route path="/todos/:idParam">
          <Todo />
        </Route> */}
      </SwitchRout>
    </Router>
  );
};

export default App;
