import React, { useEffect, useState } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TablePagination from "@material-ui/core/TablePagination";

import "./ManageCustomersMaterial.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function createData(
  name,
  username,
  street,
  home,
  city,
  tel,
  cellphone,
  OrdersArray
) {
  return {
    name,
    username,
    street,
    home,
    city,
    tel,
    cellphone,
    orders: OrdersArray,
    // [
    //   { OrderDate: "2020-01-05", ShippedDate: "11091700", ShipStreet:'', ShipHome:'', ShipCity:'', status:'', totalamount: 3 },
    //   { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    // ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow
        // style={{
        //   "&:nth-of-type(odd)": {
        //     backgroundColor: "#bcb3b3",
        //     opacity: 0.3,
        //   },
        // }}
        className="TblRow"
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.username}</TableCell>
        <TableCell align="center">{row.street}</TableCell>
        <TableCell align="center">{row.home}</TableCell>
        <TableCell align="center">{row.city}</TableCell>
        <TableCell align="center">{row.tel}</TableCell>
        <TableCell align="center">{row.cellphone}</TableCell>

        {/* <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                היסטוריית הזמנות
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">תאריך הזמנה</TableCell>
                    <TableCell align="center">תאריך משלוח</TableCell>
                    <TableCell align="center">רחוב</TableCell>
                    <TableCell align="center">בית</TableCell>
                    <TableCell align="center">עיר</TableCell>
                    <TableCell align="center">סטטוס</TableCell>
                    <TableCell align="center">סה"כ לתשלום</TableCell>

                    {/* <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((historyRow) => (
                    <TableRow align="center" key={historyRow.date}>
                      <TableCell align="center" component="th" scope="row">
                        {dayjs(historyRow.OrderDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(historyRow.ShippedDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.ShipStreet}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.ShipHome}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.ShipCity}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.Status ? "סגורה" : "פתוחה"}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.TotalAmount}
                      </TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CustomersTable() {
  const [rows, setrows] = useState([
    createData("", "", "", "", "", "", "", []),
    createData("", "", "", "", "", "", "", []),
    createData("", "", "", "", "", "", "", []),
    createData("", "", "", "", "", "", "", []),
    createData("", "", "", "", "", "", "", []),
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    Axios.post("/api/GetClients_Admin")
      .then((res) => {
        let rowsArray = [];
        for (let i = 0; i < res.data.length; i++) {
          const create = createData(
            res.data[i].FullName,
            res.data[i].UserName,
            res.data[i].Street,
            res.data[i].Home,
            res.data[i].City,
            res.data[i].Telephone,
            res.data[i].CellPhone,
            res.data[i].Orders
          );
          rowsArray.push(create);
        }
        setrows([]);
        setrows(rowsArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className="CustTbl">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#ffba26" }}>
              <TableCell />
              <TableCell align="center">שם לקוח</TableCell>
              <TableCell align="center">שם משתמש</TableCell>
              <TableCell align="center">רחוב</TableCell>
              <TableCell align="center">בית</TableCell>
              <TableCell align="center">עיר</TableCell>
              <TableCell align="center">טלפון</TableCell>
              <TableCell align="center">סלולרי</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.name} row={row} />
              ))}
            {emptyRows > 0 && (
              <TableRow className="TblRow">
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
