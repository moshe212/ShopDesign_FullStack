import React, { useState, useEffect } from "react";

import { Table, Button, Space } from "antd";
import Axios from "axios";

let data = [];
// useEffect(() => {
//   Axios.get("/api/orders")
//     .then((res) => {
//       console.log(res.data);
//       data = JSON.stringify(res.data);
//       //   setstate({ AllOrders: JSON.stringify(res.data) });
//     })
//     .catch(function (error) {
//       //console.log(error);
//     });
// }, []);

const ManageOrders = () => {
  //   const { filteredInfo, setfilteredInfo } = useState(null);
  //   const { sortedInfo, setsortedInfo } = useState(null);

  const [state, setstate] = useState({
    filteredInfo: null,
    sortedInfo: null,
    AllOrders: [],
  });
  useEffect(() => {
    Axios.get("/api/orders")
      .then((res) => {
        console.log(res.data);
        data = JSON.stringify(res.data);
        //   setstate({ AllOrders: JSON.stringify(res.data) });
      })
      .catch(function (error) {
        //console.log(error);
      });
  });

  //   useEffect(() => {
  //   Axios.get("/api/orders")
  //     .then((res) => {
  //       console.log(res.data);
  //       setstate({ AllOrders: JSON.stringify(res.data) });
  //     })
  //     .catch(function (error) {
  //       //console.log(error);
  //     });
  //   }, []);
  //   data = state.AllOrders;
  console.log(state.AllOrders);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setstate({ filteredInfo: filters, sortedInfo: sorter });
    // setsortedInfo(sorter);
  };

  const clearFilters = () => {
    setstate({ sortedInfo: null });
    // setsortedInfo(null);
  };

  const clearAll = () => {
    setstate({ filteredInfo: null, sortedInfo: null });
    // setfilteredInfo(null);
    // setsortedInfo(null);
  };

  const setAgeSort = () => {
    setstate({ sortedInfo: { order: "descend", columnKey: "age" } });
    // setfilteredInfo({
    //   order: "descend",
    //   columnKey: "age",
    // });
  };

  let { sortedInfo, filteredInfo } = state;

  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "ID" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "CustomerID:",
      dataIndex: "CustomerID:",
      key: "CustomerID:",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "CustomerID:" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "OrderDate:",
      dataIndex: "OrderDate:",
      key: "OrderDate:",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "OrderDate:" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "RequiredDate:",
      dataIndex: "RequiredDate:",
      key: "RequiredDate:",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "RequiredDate:" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "ShippedDate:",
      dataIndex: "ShippedDate:",
      key: "ShippedDate:",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "ShippedDate:" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "ShioAddress:",
      dataIndex: "ShioAddress:",
      key: "ShioAddress:",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "ShioAddress:" && sortedInfo.order,
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
  //   const columns = [
  //     {
  //       title: "Name",
  //       dataIndex: "name",
  //       key: "name",
  //       filters: [
  //         { text: "Joe", value: "Joe" },
  //         { text: "Jim", value: "Jim" },
  //       ],
  //       filteredValue: filteredInfo.name || null,
  //       onFilter: (value, record) => record.name.includes(value),
  //       sorter: (a, b) => a.name.length - b.name.length,
  //       sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
  //       ellipsis: true,
  //     },
  //     {
  //       title: "Age",
  //       dataIndex: "age",
  //       key: "age",
  //       sorter: (a, b) => a.age - b.age,
  //       sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
  //       ellipsis: true,
  //     },
  //     {
  //       title: "Address",
  //       dataIndex: "address",
  //       key: "address",
  //       filters: [
  //         { text: "London", value: "London" },
  //         { text: "New York", value: "New York" },
  //       ],
  //       filteredValue: filteredInfo.address || null,
  //       onFilter: (value, record) => record.address.includes(value),
  //       sorter: (a, b) => a.address.length - b.address.length,
  //       sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
  //       ellipsis: true,
  //     },
  //   ];
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
