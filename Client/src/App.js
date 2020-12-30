import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import Axios from "axios";
import Home from "./Home";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";
import ImportProducts from "./Pages/ImportProducts/ImportProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import SerratedTabs2 from "./Pages/ManageOrders/Tab2";
import DeliveryTracking from "./Pages/DeliveryTracking/DeliveryTracking";

import Recipes from "./Pages/Recipes/Recipes";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Specials from "./Pages/Specials/Specials";
import About from "./Pages/About/About";

import Pay from "./Pages/Pay/Pay";

import { ProductsProvider } from "./ProductsContext";
import { OrderProvider } from "./OrderContext";

import {
  BrowserRouter as Router,
  Switch as SwitchRout,
  Route,
} from "react-router-dom";

const App = () => {
  const [AllProducts, setAllProducts] = useState({});
  const [IsNewOrder, setIsNewOrder] = useState(true);

  const providerOptions = {
    data: IsNewOrder,
    changeIsNewOrder: (value) => setIsNewOrder(value),
  };

  useEffect(() => {
    Axios.get("/api/products")
      .then((res) => {
        setAllProducts(JSON.stringify(res.data));
      })
      .catch(function (error) {
        //console.log(error);
      });
  }, []);

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

        <Route path="/Products/:id">
          <ProductsProvider value={AllProducts}>
            <ProductDetails />
          </ProductsProvider>
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

        <Route exact path="/Admin/ManageOrders">
          <SerratedTabs2 />
        </Route>

        <Route exact path="/PayCart">
          <Pay />
        </Route>

        <Route exact path="/DeliveryTracking">
          <DeliveryTracking />
        </Route>

        <Route exact path="/Recipes">
          <Recipes />
        </Route>

        <Route exact path="/ContactUs">
          <ContactUs />
        </Route>

        <Route exact path="/Specials">
          <Specials />
        </Route>

        <Route exact path="/About">
          <About />
        </Route>

        <Route path="/*">
          <Home />
        </Route>
      </SwitchRout>
    </Router>
  );
};

export default App;
