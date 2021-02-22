import React, { PureComponent } from "react";
import Axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Drawer } from "antd";
import dayjs from "dayjs";
import OrderDetailsFromChart from "./OrderDetailsFromChart";
import ProductInCart from "../../ProductInCart";

import "./OrdersForDates.css";

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default class OrdersForDates extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/5br7g9d6/";
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false,
      visible: false,
      childrenDrawer: false,
      Title: "",
      ListOrders: [],
      OrderCart: [],
      OrderTotalPrice: "",
      TotalAmountOrders: "",
      OrderID: "",
      ChildTitle: "",
    };
  }

  showDrawer = (e, data) => {
    const Totals = data.map((order) => order.TotalAmount);

    const getSum = (total, num) => total + num;
    const TotalAmounts = Totals.reduce(getSum, 0);

    this.setState({
      visible: true,
      Title:
        "רשימת הזמנות לתאריך: " + dayjs(e.activeLabel).format("DD/MM/YYYY"),
      ListOrders: data,
      TotalAmountOrders: TotalAmounts,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = (ProductsInCart, TotalPrice, id) => {
    this.setState({
      childrenDrawer: true,
      OrderCart: ProductsInCart,
      OrderTotalPrice: TotalPrice,
      OrderID: id,
      ChildTitle: `פירוט הזמנה מס': ${id}`,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  componentDidMount() {
    return Axios.get("/api/orders/dates")
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
        this.setState({ loaded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.loaded == false) return <h1>loading..</h1>;
    else
      return (
        <div>
          <h1 className="TitleTotalOrdersPerDayGraph">כמות הזמנות/יום</h1>
          <LineChart
            width={800}
            height={400}
            data={this.state.data}
            onClick={(e) => {
              if (e) {
                const Date = e.activeLabel;
                Axios.get("/api/orders?search=" + Date)
                  .then((res) => {
                    const OrdersList = res.data;
                    this.showDrawer(e, OrdersList);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" height={60} tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey='סה"כ הזמנות'
              stroke="#e06da5"
              label={<CustomizedLabel />}
            />
          </LineChart>

          <Drawer
            title={this.state.Title}
            width={570}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div dir="rtl" className="Content">
              <div>כמות הזמנות:{this.state.ListOrders.length}</div>
              <div>
                <span>סה"כ הזמנות: ₪{this.state.TotalAmountOrders}</span>
              </div>
              <div className="ProductListToCart">
                <div className="ProductsInCart">
                  {this.state.ListOrders.map((order, orderIndex) => (
                    <OrderDetailsFromChart
                      id={order._id}
                      ClientName={order.CustomerID.FullName}
                      Orderdate={order.OrderDate}
                      ProdCount={order.Products.length}
                      TotalPrice={order.TotalAmount}
                      ProductsList={order.Products}
                      showChildrenDrawer={this.showChildrenDrawer}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Drawer
              title={this.state.ChildTitle}
              width={320}
              closable={false}
              onClose={this.onChildrenDrawerClose}
              visible={this.state.childrenDrawer}
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
                        {this.state.OrderTotalPrice}
                      </span>
                    </div>

                    <div className="ForPay"> :סה"כ</div>
                  </div>
                </div>
              }
            >
              <div>
                {this.state.OrderCart.map((product, productIndex) => (
                  <ProductInCart
                    key={product.productid._id}
                    id={product.productid._id}
                    src={product.productid.image}
                    name={product.productid.title}
                    price={product.productid.price}
                    Quantity={product.quantity}
                  />
                ))}
              </div>
            </Drawer>
          </Drawer>
        </div>
      );
  }
}
