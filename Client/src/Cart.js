import React from "react";
import "./Cart.css";
import Product from "./Product";

const Cart = (props) => {
  return (
    <div className="Cart">
      <div className="CartHeader">Cart</div>
      <div className="Content">
        <div>Count:{props.Cartp}</div>
        <div className="ProductListToCart">
          {props.ProductListToCart.length > 0 && (
            <div className="ProductsInCart">
              {props.ProductListToCart.map(
                (product, productIndex) =>
                  product.quantity > 0 && (
                    <Product
                      key={product.id}
                      id={product.id}
                      src={product.image}
                      name={product.title}
                      price={product.price}
                      Quantity={product.quantity}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
