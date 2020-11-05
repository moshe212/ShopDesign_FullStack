import React, { useEffect, useContext, useState } from "react";
import "./CartMin.css";
import ProductInCart from "./ProductInCart";
import Axios from "axios";

import { Drawer, Button, Radio, Space } from "antd";
import OrderContext from "./OrderContext";

const CartMin = (props) => {
  const [Visible, setVisible] = useState(false);
  const [Placement, setPlacement] = useState("left");
  // const [OrderFromServer, setOrderFromServer] = useState([]);
  console.log("update", props);
  console.log("update", props.UserID);

  const IsNewOrder = useContext(OrderContext).data;
  const changeIsNewOrder = useContext(OrderContext).changeIsNewOrder;

  const doAxiosGetOrderForCustomer = (UserId) => {
    props.GetOrderForCustomer(UserId);
  };
  // // let OrderFromServer;
  // const CustomerID = localStorage.getItem("LocalCustomerID");
  // console.log("CustomerID", CustomerID);
  useEffect(() => {
    console.log("run", props.UserID);
    doAxiosGetOrderForCustomer(props.UserID);

    // Axios.post("/api/GetOpenOrderForCustomer", { CustomerID: CustomerID })
    //   .then((res) => {
    //     console.log("GetOpenOrderForCustomer", res.data[2]);
    //     setOrderFromServer = res.data[2];
    //     // OrderFromServer = res.data[2];
    //     // setAllProducts(JSON.stringify(res.data));
    //   })
    //   .catch(function (error) {
    //     //console.log(error);
    //   });
  }, [props.UserID]);

  // if (props.UserID.length > 0) {
  //   console.log("bigthen0", props.UserID);
  //   doAxiosGetOrderForCustomer(props.UserID);
  // }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const LocalCart = JSON.parse(
    localStorage.getItem("LocalOpenOrderForCustomer")
  );
  // console.log("LocalCart", LocalCart, props.ProductListToCart);

  let ProductInCartItems;
  if (props.ProductListToCart.length > 0) {
    ProductInCartItems = props.ProductListToCart;
  } else if (LocalCart != null) {
    ProductInCartItems = LocalCart;
  } else {
    ProductInCartItems = props.ProductListToCart;
  }

  let ProductsCount;
  if (props.Cartp > 0) {
    ProductsCount = props.Cartp;
  } else if (ProductInCartItems) {
    ProductsCount = ProductInCartItems.length;
  }

  // const ProductInCartItems = OrderFromServer;
  console.log("ProductInCartItems", ProductInCartItems);

  // const TotalCount = 1;
  const Prices = ProductInCartItems.map(
    (product) => product.quantity * product.price
  );

  const getSum = (total, num) => total + num;

  const TotalPrice = Prices.reduce(getSum, 0);
  console.log("TotalPrice", TotalPrice, ProductInCartItems);
  return (
    <>
      <Space>
        <div className="CartImgDiv" onClick={showDrawer}>
          <div>
            <div className="Count">{ProductsCount}</div>
            <img
              className="CartImg"
              src="/Images/shopping_cart_PNG29.png"
            ></img>
            <div className="TotalCount">
              <span>
                <small className="SmallIcon">₪ </small>
                {TotalPrice}
              </span>
            </div>
          </div>
        </div>
        {/* <Radio.Group defaultValue={Placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group> 
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button> */}
      </Space>
      <Drawer
        headerStyle={{
          textAlign: "right",
          marginRight: 10,
        }}
        width={"25%"}
        title="סל קניות"
        placement={Placement}
        closable={false}
        onClose={onClose}
        visible={Visible}
        footer={
          <div
            style={{
              textAlign: "left",
            }}
          >
            <div className="TotalCountInFullCartDiv">
              <div className="TotalCountInFullCart">
                <span>
                  <small className="SmallIcon">₪ </small>
                  {TotalPrice}
                </span>
              </div>
              <div className="ForPay"> :לתשלום</div>
            </div>
          </div>
        }
        key={Placement}
      >
        {ProductInCartItems.map((product) => (
          <ProductInCart
            key={product._id}
            id={product._id}
            src={product.image}
            name={product.title}
            price={product.price}
            Quantity={product.quantity}
          />
        ))}
      </Drawer>
    </>
  );
};

// const CartMin = (props) => {
//   // const [ProductsIncarts, setProductsInCarts] = useState([]);

//   //console.log(1);

//   //console.log(props.ProductListToCart);
//   // //console.log(props.RenderDrawer);

//   return (
//     <div className="CartImgDiv" onClick={(e) => //console.log("g")}>
//       <div>
//         <div className="Count">{props.Cartp}</div>
//         <img className="CartImg" src="/Images/shopping_cart_PNG29.png"></img>
//       </div>
//     </div>
//   );
// };

export default CartMin;
