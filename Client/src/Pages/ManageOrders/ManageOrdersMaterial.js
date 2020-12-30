import React, { Component, useState, useEffect } from "react";
import Axios from "axios";

import "./ManageOrdersMaterial.css";

import { forwardRef } from "react";
import MaterialTable from "material-table";
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
  const [columns, setColumns] = useState([
    {
      title: "עיר משלוח",
      field: "ShipCity",
      editable: "never",
    },
    {
      title: "כתובת משלוח",
      field: "ShioAddress",
      editable: "never",
    },
    {
      title: "תאריך משלוח",
      field: "ShippedDate",
      editable: "never",
    },
    {
      title: "תאריך ביקוש",
      field: "RequiredDate",
      editable: "never",
    },
    {
      title: "תאריך הזמנה",
      field: "OrderDate",
      editable: "never",
    },
    {
      title: " מזהה לקוח",
      field: "CustomerID",
      // type: "numeric",
      editable: "never",
    },
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
    <ThemeProvider theme={theme}>
      <div className="TableDiv">
        <MaterialTable
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
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => alert("You saved " + rowData.name),
            },
          ]}
          editable={{
            onRowClick: () => {
              console.log("click");
            },
            onBulkEditRowChanged: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const url = "/api/products";
                  const obj = {
                    title: newData.title,
                    image: newData.avatar,
                    quantity: newData.quantity,
                    price: newData.price,
                  };
                  //console.log(obj);

                  doAxios("post", url, obj);
                  //   setData([...data, newData]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;

                  dataUpdate[index] = newData;
                  const url = "/api/products/" + dataUpdate[index]._id;
                  const obj = {
                    title: dataUpdate[index].title,
                    quantity: dataUpdate[index].quantity,
                    price: dataUpdate[index].price,
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
                  const url = "/api/products/" + dataDelete[index]._id;

                  doAxios("delete", url);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    </ThemeProvider>
  );
};
export default ManageOrdersMaterial;
