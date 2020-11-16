import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
// import { Modal } from "antd";

import { Animated } from "react-animated-css";
import Modal from "react-animated-modal";

import "./CreditCardDetailForm.css";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxHeight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const useStyles3 = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CreditCardDetailForm = (props) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const [value, setValue] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [state, setState] = useState({
    loading: false,
    visible: false,
    show: "hidden",
    animation: false,
    // popupPlacement: "bottomRight",
    // direction: "rtl",
  });

  const LocalCartCredit = JSON.parse(
    localStorage.getItem("LocalOpenOrderForCustomer")
  );
  console.log("LocalCartCredit", LocalCartCredit);
  let TotalPrice = 0;
  if (LocalCartCredit != null) {
    for (let i = 0; i < LocalCartCredit.length; i++) {
      const Price = LocalCartCredit[i].quantity * LocalCartCredit[i].price;
      console.log("Price", Price);
      TotalPrice = TotalPrice + Price;
    }
  }

  const IsDark_Credit = () => {
    props.IsDark();
  };

  const showModal = () => {
    setState({
      visible: true,
      // show: "visible",
      // animation: true,
    });
  };

  const closeModal = () => {
    setState({ visible: false });

    // setTimeout(() => {
    //   doAxiosAfterAddProduct();
    // }, 500);
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    animation,
    show,
    visible,
    loading,
    direction,
    popupPlacement,
  } = state;
  console.log("show", show);

  return (
    <div className="RootPayForm">
      <div className="T">
        <span className="TotalPay_Form">
          {TotalPrice}
          <small className="SmallIcon">₪ </small>
        </span>
      </div>
      {/* <h1
        className="animate__animated animate__lightSpeedInRight "
        // style={{ visibility: { show } }}
      >
        Hello!!
      </h1> */}

      {/* <Animated
        animationIn="bounceInRight"
        animationOut="fadeOut"
        isVisible={animation}
        animationInDelay={1000}
      >
        <div className="Animation">hello world ;</div>
      </Animated>
       */}

      <div className="Mod">
        <Modal
          visible={visible}
          closemodal={() => {
            setState({ visible: false });
            alert("moshe");
          }}
          type="bounceInRight"
        >
          <img src="/Images/clipart1580817.png"></img>
        </Modal>
      </div>

      <div className="PayForm">
        <form className={classes.root} noValidate autoComplete="off">
          <div dir="rtl">
            <TextField
              id="outlined-multiline-flexible"
              label="שם פרטי"
              multiline
              rowsMax={4}
              value={value}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="שם משפחה"
              multiline
              rowsMax={4}
              value={value}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={{ width: 350 }}
              size="small"
            />
          </div>
          <div dir="rtl">
            <TextField
              id="outlined-multiline-flexible"
              label="מס' אשראי"
              multiline
              rowsMax={4}
              value={value}
              onChange={handleChange}
              variant="outlined"
              size="small"
              style={{ width: 350 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="cvv"
              multiline
              rowsMax={4}
              value={value}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}

              size="small"
            />
          </div>
          <div>
            <FormControl variant="outlined" className={classes2.formControl}>
              <InputLabel
                // style={{ width: 40 }}
                id="demo-simple-select-outlined-label"
              >
                חודש
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label="חודש"
                // size="small"
                style={{
                  height: 40,
                  width: 120,
                  //   marginLeft: 0,
                  //   marginRight: 0,
                  //   marginBottom: 30,
                  //   marginTop: 10,
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes2.formControl}>
              <InputLabel
                // style={{ width: 40 }}
                id="demo-simple-select-outlined-label"
              >
                שנה
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label="שנה"
                // size="small"
                style={{
                  height: 40,
                  width: 120,
                  //   marginLeft: 0,
                  //   marginRight: 8,
                  //   marginBottom: 30,
                  //   marginTop: 10,
                }}
              >
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2026}>2026</MenuItem>
                <MenuItem value={2027}>2027</MenuItem>
                <MenuItem value={2028}>2028</MenuItem>
                <MenuItem value={2029}>2029</MenuItem>
                <MenuItem value={2030}>2030</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-multiline-flexible"
              label="ת.ז"
              multiline
              rowsMax={4}
              value={value}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={{ width: 283, marginTop: 8 }}
              size="small"
            />
          </div>
          {/* <div dir="rtl">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="small"
            id="date-picker-inline"
            label="תוקף אשראי"
            value={selectedDate}
            onChange={handleDateChange}
            size="small"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div> */}
          <Button
            variant="contained"
            style={{
              width: 558,
              marginTop: 25,
              backgroundColor: "#e06da5",
              fontWeight: "bold",
              fontSize: 20,
            }}
            onClick={showModal}
            //   color="#e06da5"
          >
            בצע תשלום
          </Button>
        </form>
      </div>

      <div className="CreditCarrdImgs">
        <img className="Isr" src="./Images/isracrd.jpg"></img>
        <img className="Visa" src="./Images/visa.png"></img>
        <img className="MC" src="./Images/MasterCard_Logo_600.jpg"></img>
        <img className="Leumi" src="./Images/leumi600.jpg"></img>
      </div>
    </div>
  );
};

export default CreditCardDetailForm;
