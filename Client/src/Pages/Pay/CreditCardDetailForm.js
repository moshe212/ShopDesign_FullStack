import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import Axios from "axios";

import Modal from "react-animated-modal";

import "./CreditCardDetailForm.css";

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

  const [isScreenMax800px, setIsScreenMax800px] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenMax800px(window.innerWidth <= 800);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial value
    handleResize();

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    cardNum: "",
    cvv: "",
    month: "",
    year: "",
    idNum: "",
  });

  const [state, setState] = useState({
    loading: false,
    visible: false,
    visibleError: false,
    visibleErrorFields: false,
    show: "hidden",
    animation: false,
    btnDisabled: true,
  });

  const LocalDeliveryDetails = JSON.parse(
    localStorage.getItem("DeliveryDetails")
  );

  let DataToServer;
  if (LocalDeliveryDetails.firstName) {
    DataToServer = {
      ...LocalDeliveryDetails,
      OwnerFirstName: value.firstName,
      OwnerLastName: value.lastName,
      CardNum: value.cardNum,
      Cvv: value.cvv,
      ExpMonth: value.month,
      ExpYear: value.year,
      IDNum: value.idNum,
      CustomerID: localStorage.getItem("LocalCustomerID").split(",")[0],
    };
  } else {
    DataToServer = {};
  }

  const LocalCartCredit = JSON.parse(
    localStorage.getItem("LocalOpenOrderForCustomer")
  );

  let TotalPrice = 0;
  if (LocalCartCredit != null) {
    for (let i = 0; i < LocalCartCredit.length; i++) {
      const Price = LocalCartCredit[i].quantity * LocalCartCredit[i].price;

      TotalPrice = TotalPrice + Price;
    }
  }

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const showErrorModal = () => {
    setState({
      visibleError: true,
    });
  };

  const sendPayOrderToServer = () => {
    let FormFieldsFull = [];
    for (const property in DataToServer) {
      if (property !== "phone" && property !== "notes") {
        if (DataToServer[property]) {
          FormFieldsFull.push(property);
        }
      }
    }

    if (FormFieldsFull.length === 15) {
      Axios.post("/api/OrderPay", DataToServer).then((response) => {
        if (response.data === "OK") {
          localStorage.removeItem("LocalOpenOrderForCustomer");
          showModal();
        } else {
          showErrorModal();
        }
      });
    } else {
      setState({ visibleErrorFields: true });
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "FirstName":
        setValue({
          firstName: event.target.value,
          lastName: value.lastName,
          cardNum: value.cardNum,
          cvv: value.cvv,
          month: value.month,
          year: value.year,
          idNum: value.idNum,
        });
        break;
      case "LastName":
        setValue({
          firstName: value.firstName,
          lastName: event.target.value,
          cardNum: value.cardNum,
          cvv: value.cvv,
          month: value.month,
          year: value.year,
          idNum: value.idNum,
        });
        break;
      case "CardNum":
        setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          cardNum: event.target.value,
          cvv: value.cvv,
          month: value.month,
          year: value.year,
          idNum: value.idNum,
        });
        break;
      case "Cvv":
        setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          cardNum: value.cardNum,
          cvv: event.target.value,
          month: value.month,
          year: value.year,
          idNum: value.idNum,
        });
        break;
      case "Month":
        setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          cardNum: value.cardNum,
          cvv: value.cvv,
          month: event.target.value,
          year: value.year,
          idNum: value.idNum,
        });
        break;
      case "Year":
        setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          cardNum: value.cardNum,
          cvv: value.cvv,
          month: value.month,
          year: event.target.value,
          idNum: value.idNum,
        });
        break;
      case "IDNum":
        setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          cardNum: value.cardNum,
          cvv: value.cvv,
          month: value.month,
          year: value.year,
          idNum: event.target.value,
        });
        break;
    }
  };

  const { visible, visibleError, visibleErrorFields } = state;

  let history = useHistory();
  return (
    <div className="RootPayForm">
      <div className="T">
        <span className="TotalPay_Form">
          {TotalPrice}
          <small className="SmallIcon">₪ </small>
        </span>
      </div>

      <div className="Mod">
        <Modal
          visible={visible}
          closemodal={() => {
            setState({ visible: false });
            history.push("/DeliveryTracking");
          }}
          type="bounceInRight"
        >
          <img src="/Images/clipart1580817.png"></img>
          <div className="modalTxt">תודה שקניתם אצלנו.. המשלוח בדרך אליכם.</div>
        </Modal>
      </div>

      <div className="ModErrorFields">
        <Modal
          visible={visibleErrorFields}
          closemodal={() => {
            setState({ visibleErrorFields: false });
          }}
          type="rotateIn"
        >
          <div className="modalTxtErrorFields">
            <div>חסרים נתונים. אנא הזינו את כל השדות עם הכוכבית.</div>
          </div>
        </Modal>
      </div>

      <div className="ModError">
        <Modal
          visible={visibleError}
          closemodal={() => {
            setState({ visibleError: false });
          }}
          type="bounceInRight"
        >
          <img src="/Images/clipart1580817.png"></img>
          <div className="modalTxt">
            הנתונים שהוזנו אינם נכונים. אנא הזינו שוב.
          </div>
        </Modal>
      </div>

      <div className="PayForm">
        <form className={classes.root} noValidate autoComplete="off">
          <div dir="rtl">
            <TextField
              required
              name="FirstName"
              id="FirstName"
              label="שם פרטי בעל הכרטיס"
              multiline
              rowsMax={4}
              value={value.firstName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              style={isScreenMax800px ? { width: 350 } : {}}
            />
            <TextField
              required
              name="LastName"
              id="LastName"
              label=" שם משפחה בעל הכרטיס"
              multiline
              rowsMax={4}
              value={value.lastName}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={{ width: 350 }}
              size="small"
            />
          </div>
          <div dir="rtl">
            <TextField
              required
              name="CardNum"
              id="CardNum"
              label="מס' אשראי"
              multiline
              rowsMax={4}
              value={value.cardNum}
              onChange={handleChange}
              variant="outlined"
              size="small"
              style={{ width: 350 }}
            />
            <TextField
              required
              name="Cvv"
              id="Cvv"
              label="cvv"
              multiline
              rowsMax={4}
              value={value.cvv}
              onChange={handleChange}
              variant="outlined"
              size="small"
              style={isScreenMax800px ? { width: 350 } : {}}
            />
          </div>
          <div>
            <FormControl variant="outlined" className={classes2.formControl}>
              <InputLabel required id="Month">
                חודש
              </InputLabel>
              <Select
                required
                name="Month"
                labelId="MonthSLabel"
                id="MonthS"
                value={value.month}
                onChange={handleChange}
                label="חודש"
                style={
                  isScreenMax800px
                    ? { width: 350, height: 40 }
                    : {
                        height: 40,
                        width: 120,
                      }
                }
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
                id="Year"
                required
              >
                שנה
              </InputLabel>
              <Select
                required
                name="Year"
                labelId="demo-simple-select-outlined-label"
                id="YearS"
                value={value.year}
                onChange={handleChange}
                label="שנה"
                // size="small"
                style={
                  isScreenMax800px
                    ? { width: 350, height: 40, marginTop: 20 }
                    : {
                        height: 40,
                        width: 120,
                      }
                }
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
              required
              name="IDNum"
              id="IDNum"
              label="ת.ז"
              multiline
              rowsMax={4}
              value={value.idNum}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={
                isScreenMax800px
                  ? { width: 350, marginTop: 45 }
                  : { width: 283, marginTop: 8 }
              }
              size="small"
            />
          </div>

          <Button
            variant="contained"
            style={
              ({
                marginTop: 25,
                backgroundColor: "#e06da5",
                fontWeight: "bold",
                fontSize: 20,
              },
              isScreenMax800px
                ? {
                    width: 350,
                  }
                : {
                    width: 558,
                  })
            }
            onClick={sendPayOrderToServer}
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
