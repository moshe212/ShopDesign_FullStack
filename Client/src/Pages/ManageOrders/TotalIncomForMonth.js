/* eslint-disable react/no-multi-comp */
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

import "./OrdersForDates.css";

const data = [];

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

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

export default class TotalIncomForMonth extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/nptzh7ez/";
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    return Axios.get("/api/orders/total_income")
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
          <h1 className="TitleTotalOrdersPerDayGraph">סך הכנסות/חודש</h1>
          <LineChart
            width={800}
            height={400}
            data={this.state.data}
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
              dataKey='סה"כ הכנסות'
              stroke="#e06da5"
              label={<CustomizedLabel />}
              strokeDasharray="5 5"
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </div>
      );
  }
}
