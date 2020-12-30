import React, { useEffect, useState } from "react";
import "./CartMin.css";
import ProductInCart from "./ProductInCart";

import { Drawer, Button, Radio, Space } from "antd";

const CartMin = (props) => {
  const [Visible, setVisible] = useState(false);
  const [Placement, setPlacement] = useState("right");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const ProductInCartItems = props.ProductListToCart;

  const Prices = ProductInCartItems.map(
    (product) => product.quantity * product.price
  );

  const getSum = (total, num) => total + num;

  const TotalPrice = Prices.reduce(getSum, 0);

  return (
    <>
      <Space>
        <div className="CartImgDiv" onClick={showDrawer}>
          <div>
            <div className="Count">{props.Cartp}</div>
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

export default CartMin;
