import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CartMin.css";
import ProductInCart from "./ProductInCart";
import Axios from "axios";
import Modal from "react-animated-modal";
import { Drawer, Button, Radio, Space } from "antd";
import OrderContext from "./OrderContext";
import { Redirect } from "react-router";

const CartMin = (props) => {
  const [Visible, setVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [Placement, setPlacement] = useState("left");
  const [UpdateCart, setUpdateCart] = useState("");

  const [Pay, setPay] = useState(false);
  // const [OrderFromServer, setOrderFromServer] = useState([]);
  // console.log("update", props);
  // console.log("update", props.UserID);

  const IsNewOrder = useContext(OrderContext).data;
  const changeIsNewOrder = useContext(OrderContext).changeIsNewOrder;

  const doAxiosGetOrderForCustomer = (UserId) => {
    props.GetOrderForCustomer(UserId);
  };
  // // let OrderFromServer;
  // const CustomerID = localStorage.getItem("LocalCustomerID");
  // console.log("CustomerID", CustomerID);

  // const LocalCart = JSON.parse(
  //   localStorage.getItem("LocalOpenOrderForCustomer")
  // );
  //console.log("LocalCart", LocalCart, props.ProductListToCart);

  useEffect(() => {
    // console.log("run", props.UserID);
    if (props.UserID) {
      doAxiosGetOrderForCustomer(props.UserID);
    }
  }, [props.UserID]);

  // useEffect(() => {
  //   // setUpdateCart("Y");
  //   setLocalCart(props.ProductListToCart);
  //   console.log("LocalCart", props.ProductListToCart);
  //   // console.log("run", props.UserID);
  // }, [props.ProductListToCart]);

  let history = useHistory();

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
  console.log("LocalCart", LocalCart, props.ProductListToCart);

  let ProductInCartItems;
  if (props.ProductListToCart.length > 0) {
    ProductInCartItems = props.ProductListToCart;
  } else if (LocalCart !== null) {
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
  // console.log("ProductInCartItems", ProductInCartItems);

  // const TotalCount = 1;
  const Prices = ProductInCartItems.map(
    (product) => product.quantity * product.price
  );

  const getSum = (total, num) => total + num;

  const TotalPrice = Prices.reduce(getSum, 0);
  // console.log("TotalPrice", TotalPrice, ProductInCartItems);

  const getPay = () => {
    // setPay(true);

    if (
      localStorage.getItem("LocalCustomerID") &&
      localStorage.getItem("LocalOpenOrderForCustomer")
    ) {
      history.push("/PayCart", { TotalPrice: TotalPrice });
    } else {
      setmodalVisible(true);
    }
  };

  // if (Pay) {
  //   //console.log("props", props.id);
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/PayCart",
  //         state: {
  //           TotalPrice: TotalPrice,
  //           // ProductListToCart: props.ProductListToCart,
  //           // Cartp: props.Cartv,
  //           // AllProducts: props.AllProducts,
  //         },
  //       }}
  //     ></Redirect>
  //   );
  // }

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

              <div className="ForPay"> :סה"כ</div>
            </div>
            <button className="PayBtn" onClick={getPay}>
              לתשלום
            </button>
          </div>
        }
        key={Placement}
      >
        <div className="ModErrorCart">
          <Modal
            zIndex="2000"
            visible={modalVisible}
            closemodal={() => {
              setmodalVisible(false);
            }}
            type="rotateIn"
          >
            <div className="modalTxtErrorCart">
              {/* <div></div> */}
              {localStorage.getItem("LocalCustomerID") ? (
                <div>.בכדי לעבור לתשלום עליך להוסיף מוצרים לעגלה</div>
              ) : (
                <div>.בכדי לעבור לתשלום עליך להירשם\לבצע כניסה</div>
              )}
              {/* <div>.בכדי לעבור לתשלום עליך להירשם\לבצע כניסה</div> */}
            </div>
          </Modal>
        </div>

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

export default CartMin;
