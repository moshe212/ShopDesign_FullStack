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
import ManageOrdersMaterial from "./Pages/ManageOrders/ManageOrdersMaterial";
import SerratedTabs from "./Pages/ManageOrders/Tab";
import SerratedTabs2 from "./Pages/ManageOrders/Tab2";

import { ProductsProvider } from "./ProductsContext";
import { OrderProvider } from "./OrderContext";
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
  const [IsNewOrder, setIsNewOrder] = useState(true);

  const providerOptions = {
    data: IsNewOrder,
    changeIsNewOrder: (value) => setIsNewOrder(value),
  };

  useEffect(() => {
    Axios.get("/api/products")
      .then((res) => {
        // console.log(res.data);
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
          <OrderProvider value={providerOptions}>
            <Home />
          </OrderProvider>
        </Route>

        <Route path="/LoginCustomer/Customer/:name">
          <OrderProvider value={providerOptions}>
            <Home />
          </OrderProvider>
        </Route>

        <Route path="/api/Products/:id">
          {/* <ProductsContext.Provider value={AllProducts}> */}
          <ProductsProvider value={AllProducts}>
            <ProductDetails />
          </ProductsProvider>
          {/* </ProductsContext.Provider> */}
        </Route>

        <Route exact path="/Admin">
          <Admin />
        </Route>

        <Route exact path="/api/Admin/ManageProducts">
          <ManageProducts />
        </Route>

        <Route exact path="/Admin/ImportProducts">
          <ImportProducts />
        </Route>

        <Route exact path="/Admin/ManageOrders">
          <SerratedTabs2 />
          {/* <ManageOrdersMaterial /> */}
        </Route>

        {/* <Route path="/todos/:idParam">
          <Todo />
        </Route> */}

        <Route path="/*">
          <Home />
        </Route>
      </SwitchRout>
    </Router>
  );
};

export default App;
