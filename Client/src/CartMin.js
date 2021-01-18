import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CartMin.css";
import ProductInCart from "./ProductInCart";

import Modal from "react-animated-modal";
import { Drawer, Space } from "antd";

const CartMin = (props) => {
  const [Visible, setVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [Placement, setPlacement] = useState("left");

  const doAxiosGetOrderForCustomer = (UserId) => {
    props.GetOrderForCustomer(UserId);
  };

  useEffect(() => {
    if (props.UserID) {
      doAxiosGetOrderForCustomer(props.UserID);
    }
  }, [props.UserID]);

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

  const Prices = ProductInCartItems.map(
    (product) => product.quantity * product.price
  );
  const getSum = (total, num) => total + num;

  const TotalPrice = Prices.reduce(getSum, 0);

  const getPay = () => {
    if (
      localStorage.getItem("LocalCustomerID") &&
      localStorage.getItem("LocalOpenOrderForCustomer")
    ) {
      history.push("/PayCart", { TotalPrice: TotalPrice });
    } else {
      setmodalVisible(true);
    }
  };

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
              {localStorage.getItem("LocalCustomerID") ? (
                <div>.בכדי לעבור לתשלום עליך להוסיף מוצרים לעגלה</div>
              ) : (
                <div>.בכדי לעבור לתשלום עליך להירשם\לבצע כניסה</div>
              )}
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
