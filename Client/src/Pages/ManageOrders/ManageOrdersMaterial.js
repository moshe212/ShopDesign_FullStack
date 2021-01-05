import React, { Component, useState, useEffect } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import "./ManageOrdersMaterial.css";
import { Drawer, Button, Radio, Space } from "antd";
import ProductInCart from "../../ProductInCart";

import TablePagination from "@material-ui/core/TablePagination";

import { forwardRef } from "react";
import MaterialTable, { MTablePagination } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { createMuiTheme } from "@material-ui/core/styles";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { ThemeProvider } from "@material-ui/styles";
import Icon from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BallotSharpIcon from "@material-ui/icons/BallotSharp";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
const ManageOrdersMaterial = () => {
  const [Visible, setVisible] = useState(false);
  const [Placement, setPlacement] = useState("left");
  const [ProductsInOrder, setProductsInOrder] = useState([]);

  const Prices = ProductsInOrder.map(
    (product) => product.quantity * product.price
  );
  const getSum = (total, num) => total + num;

  const TotalPrice = Prices.reduce(getSum, 0);

  const [columns, setColumns] = useState([
    {
      title: "סטטוס",
      field: "Status",
      render: (rowData) => (rowData.Status ? "סגורה" : "פתוחה"),
      // editable: "never",
    },
    {
      title: "תאריך משלוח",
      field: "ShippedDate",
      render: (rowData) => dayjs(rowData.ShippedDate).format("DD/MM/YYYY"),
      // editable: "never",
    },
    {
      title: "תאריך ביקוש",
      field: "RequiredDate",
      render: (rowData) => dayjs(rowData.RequiredDate).format("DD/MM/YYYY"),
      // editable: "never",
    },
    {
      title: "תאריך הזמנה",
      field: "OrderDate",
      render: (rowData) => dayjs(rowData.OrderDate).format("DD/MM/YYYY"),
      editable: "never",
    },
    {
      title: "עיר",
      field: "ShipCity",
      // type: "numeric",
      // editable: "never",
    },
    {
      title: "בית",
      field: "ShipHome",
      // type: "numeric",
      // editable: "never",
    },
    {
      title: "רחוב",
      field: "ShipStreet",
      // type: "numeric",
      // editable: "never",
    },
    {
      title: "שם לקוח",
      field: "CustomerID",
      // type: "numeric",
      editable: "never",
      render: (rowData) => rowData.CustomerID.FullName,
    },
    // {
    //   title: " מזהה לקוח",
    //   field: "CustomerID",
    //   // type: "numeric",
    //   editable: "never",
    // },
    {
      title: "מזהה",
      field: "_id",
      // type: "numeric",
      editable: "never",
    },
    {
      title: "סידורי",
      field: "tableData.id",
      // type: "numeric",
      editable: "never",
    },
  ]);

  const [data, setData] = useState([]);

  const onClose = () => {
    setVisible(false);
  };
  const doAxios = (operation, url, obj) => {
    Axios[operation](url, obj)
      .then((res) => {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      doAxios("get", "/api/orders");
    }, 500);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="TableDiv">
          <MaterialTable
            // components={{
            //   Pagination: (props) => (
            //     <TablePagination
            //       {...props}
            //       // rowsPerPageOptions={[5, 10, 20, 30]}
            //       rowsPerPage="10"
            //       count="10"
            //     />
            //   ),
            // }}
            color="primary"
            title="טבלת הזמנות"
            icons={tableIcons}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              exportButton: true,
            }}
            columns={columns}
            data={data}
            actions={[
              {
                icon: BallotSharpIcon,
                tooltip: "פרטי הזמנה",
                onClick: (event, rowData) => {
                  // alert("You saved " + rowData._id);
                  Axios.post("/api/GetOrderForCustomer_Admin", {
                    OrderID: rowData._id,
                  })
                    .then((res) => {
                      setVisible(true);
                      setProductsInOrder(res.data);
                    })
                    .catch(function (error) {
                      //console.log(error);
                    });
                },
              },
            ]}
            editable={{
              onRowClick: () => {
                console.log("click");
              },
              // onBulkEditRowChanged: (changes) =>
              //   new Promise((resolve, reject) => {
              //     setTimeout(() => {
              //       resolve();
              //     }, 1000);
              //   }),
              // onRowAdd: (newData) =>
              //   new Promise((resolve, reject) => {
              //     setTimeout(() => {
              //       const url = "/api/products";
              //       const obj = {
              //         title: newData.title,
              //         image: newData.avatar,
              //         quantity: newData.quantity,
              //         price: newData.price,
              //       };
              //       //console.log(obj);

              //       doAxios("post", url, obj);
              //       //   setData([...data, newData]);

              //       resolve();
              //     }, 1000);
              //   }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;

                    dataUpdate[index] = newData;
                    const url = "/api/orders/" + dataUpdate[index]._id;
                    const obj = {
                      ShipStreet: dataUpdate[index].ShipStreet,
                      ShipHome: dataUpdate[index].ShipHome,
                      ShipCity: dataUpdate[index].ShipCity,
                      RequiredDate: dataUpdate[index].RequiredDate,
                      ShippedDate: dataUpdate[index].ShippedDate,
                      Status: dataUpdate[index].Status,
                    };

                    doAxios("put", url, obj);
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    const url = "/api/orders/" + dataDelete[index]._id;

                    doAxios("delete", url);

                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>
      </ThemeProvider>

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
            {/* <button className="PayBtn" onClick={getPay}>
              לתשלום
            </button> */}
          </div>
        }
        key={Placement}
      >
        {ProductsInOrder.map((product) => (
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
export default ManageOrdersMaterial;
