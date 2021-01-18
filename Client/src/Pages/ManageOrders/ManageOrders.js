import React, { useState, useEffect } from "react";

import { Table, Button, Space } from "antd";
import Axios from "axios";

let data = [];

const ManageOrders = () => {
  const [state, setstate] = useState({
    filteredInfo: null,
    sortedInfo: null,
    AllOrders: [],
  });
  useEffect(() => {
    Axios.get("/api/orders")
      .then((res) => {
        data = JSON.stringify(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const handleChange = (pagination, filters, sorter) => {
    setstate({ filteredInfo: filters, sortedInfo: sorter });
  };

  const clearFilters = () => {
    setstate({ sortedInfo: null });
  };

  const clearAll = () => {
    setstate({ filteredInfo: null, sortedInfo: null });
  };

  const setAgeSort = () => {
    setstate({ sortedInfo: { order: "descend", columnKey: "age" } });
  };

  let { sortedInfo, filteredInfo } = state;

  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",

      ellipsis: true,
    },
    {
      title: "CustomerID:",
      dataIndex: "CustomerID:",
      key: "CustomerID:",

      ellipsis: true,
    },
    {
      title: "OrderDate:",
      dataIndex: "OrderDate:",
      key: "OrderDate:",

      ellipsis: true,
    },
    {
      title: "RequiredDate:",
      dataIndex: "RequiredDate:",
      key: "RequiredDate:",

      ellipsis: true,
    },
    {
      title: "ShippedDate:",
      dataIndex: "ShippedDate:",
      key: "ShippedDate:",

      ellipsis: true,
    },
    {
      title: "ShioAddress:",
      dataIndex: "ShioAddress:",
      key: "ShioAddress:",

      ellipsis: true,
    },
    {
      title: "ShipCity:",
      dataIndex: "ShipCity:",
      key: "ShipCity:",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "ShipCity:" && sortedInfo.order,
      ellipsis: true,
    },
  ];

  return (
    // <>
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
    // </>
  );
};

export default ManageOrders;
