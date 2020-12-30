import React, { useEffect, PureComponent } from "react";
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

import { Drawer, Button } from "antd";

import "./OrdersForDates.css";

const data = [];

function demoOnClick(e) {
  console.log(e.activeLabel, e.activePayload[0].payload);
  this.showDrawer();
}

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
    };
  }

  showDrawer = (e, data) => {
    this.setState({
      visible: true,
      Title: "רשימת הזמנות לתאריך: " + e.activeLabel,
      ListOrders: data,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
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
        console.log("res", res.data);
        this.setState({ data: res.data });
        this.setState({ loaded: true });
      })
      .catch(function (error) {
        //console.log(error);
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
            // onClick={demoOnClick}
            onClick={(e) => {
              const Date = e.activeLabel;
              Axios.get("/api/orders?search=" + Date)
                .then((res) => {
                  console.log("res", res.data);
                  const OrdersList = res.data;
                  this.showDrawer(e, OrdersList);
                  console.log(e.activeLabel, e.activePayload[0].payload);
                })
                .catch(function (error) {
                  //console.log(error);
                });
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
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>

          <Drawer
            title={this.state.Title}
            width={520}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div className="Content">
              <div>Count:{this.state.ListOrders.length}</div>
              <div className="ProductListToCart">
                <div className="ProductsInCart">
                  {this.state.ListOrders.map((order, orderIndex) => "Hello")}
                </div>
              </div>
            </div>
            <Button type="primary" onClick={this.showChildrenDrawer}>
              Two-level drawer
            </Button>
            <Drawer
              title="Two-level Drawer"
              width={320}
              closable={false}
              onClose={this.onChildrenDrawerClose}
              visible={this.state.childrenDrawer}
            >
              This is two-level drawer
            </Drawer>
          </Drawer>
        </div>
      );
  }
}
