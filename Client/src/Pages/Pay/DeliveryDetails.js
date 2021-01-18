import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import "./DeliveryDetails.css";

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

const DeliveryDetails = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    home: "",
    street: "",
    city: "",
    phone: "",
    cellPhone: "",
    email: "",
    notes: "",
  });

  const [state, setState] = useState({
    loading: false,
    visible: false,
    show: "hidden",
    animation: false,
    readonly: false,
    disabled: false,
    firstName_defaultValue: "",
    lastName_defaultValue: "",
    home_defaultValue: "",
    street_defaultValue: "",
    city_defaultValue: "",
    phone_defaultValue: "",
    cellPhone_defaultValue: "",
    email_defaultValue: "",
    shrink: false,
    checked: false,
    // popupPlacement: "bottomRight",
    // direction: "rtl",
  });

  const ChangCheckTotrue = () => {
    setState({
      checked: true,
      disabled: true,
      firstName_defaultValue: User_DeliveryDetails[1].split(" ")[0],
      lastName_defaultValue: User_DeliveryDetails[1].split(" ")[1],
      home_defaultValue: User_DeliveryDetails[2],
      street_defaultValue: User_DeliveryDetails[3],
      city_defaultValue: User_DeliveryDetails[4],
      phone_defaultValue: User_DeliveryDetails[5],
      cellPhone_defaultValue: User_DeliveryDetails[6],
      email_defaultValue: User_DeliveryDetails[7],
      shrink: true,
    });
    setValue({
      firstName: User_DeliveryDetails[1].split(" ")[0],
      lastName: User_DeliveryDetails[1].split(" ")[1],
      home: User_DeliveryDetails[2],
      street: User_DeliveryDetails[3],
      city: User_DeliveryDetails[4],
      phone: User_DeliveryDetails[5],
      cellPhone: User_DeliveryDetails[6],
      email: User_DeliveryDetails[7],
      notes: value.notes,
    });
  };
  const User_DeliveryDetails = localStorage
    .getItem("LocalCustomerID")
    .split(",");

  const changeCheckbox = () => {
    setValue({
      firstName: "",
      lastName: "",
      home: "",
      street: "",
      city: "",
      phone: "",
      cellPhone: "",
      email: "",
      notes: "",
    });
    state.checked
      ? setState({
          checked: false,
          disabled: false,
          firstName_defaultValue: "",
          lastName_defaultValue: "",
          home_defaultValue: "",
          street_defaultValue: "",
          city_defaultValue: "",
          phone_defaultValue: "",
          cellPhone_defaultValue: "",
          email_defaultValue: "",
          shrink: false,
        })
      : ChangCheckTotrue();
  };

  let DeliveryDetailsObj = {
    firstName: value.firstName,
    lastName: value.lastName,
    home: value.home,
    street: value.street,
    city: value.city,
    phone: value.phone,
    cellPhone: value.cellPhone,
    email: value.email,
    notes: value.notes,
  };
  localStorage.setItem("DeliveryDetails", JSON.stringify(DeliveryDetailsObj));
  const handleChange = (event) => {
    switch (event.target.id) {
      case "FirstName":
        setValue({
          firstName: event.target.value,
          lastName: value.lastName,
          home: value.home,
          street: value.street,
          city: value.city,
          phone: value.phone,
          cellPhone: value.cellPhone,
          email: value.email,
          notes: value.notes,
        });

        break;
      case "LastName":
        setValue({
          lastName: event.target.value,
          firstName: value.firstName,
          home: value.home,
          street: value.street,
          city: value.city,
          phone: value.phone,
          cellPhone: value.cellPhone,
          email: value.email,
          notes: value.notes,
        });
        break;
      case "Home":
        setValue({
          home: event.target.value,
          lastName: value.lastName,
          firstName: value.firstName,
          street: value.street,
          city: value.city,
          phone: value.phone,
          cellPhone: value.cellPhone,
          email: value.email,
          notes: value.notes,
        });
        break;
      case "Street":
        setValue({
          street: event.target.value,
          lastName: value.lastName,
          home: value.home,
          firstName: value.firstName,
          city: value.city,
          phone: value.phone,
          cellPhone: value.cellPhone,
          email: value.email,
          notes: value.notes,
        });
        break;
      case "City":
        setValue({
          city: event.target.value,
          lastName: value.lastName,
          home: value.home,
          street: value.street,
          firstName: value.firstName,
          phone: value.phone,
          cellPhone: value.cellPhone,
          email: value.email,
          notes: value.notes,
        });
        break;
      case "Phone":
        setValue({
          phone: event.target.value,
          lastName: value.lastName,
          home: value.home,
          street: value.street,
          city: value.city,
          firstName: value.firstName,
          cellPhone: value.cellPhone,
          email: value.email,
          notes: value.notes,
        });
        break;
      case "CellPhone":
        setValue({
          cellPhone: event.target.value,
          lastName: value.lastName,
          home: value.home,
          street: value.street,
          city: value.city,
          phone: value.phone,
          firstName: value.firstName,
          email: value.email,
          notes: value.notes,
        });
        break;
      case "Email":
        setValue({
          email: event.target.value,
          lastName: value.lastName,
          home: value.home,
          street: value.street,
          city: value.city,
          phone: value.phone,
          cellPhone: value.cellPhone,
          firstName: value.firstName,
          notes: value.notes,
        });
        break;
      case "notes":
        setValue({
          notes: event.target.value,
          lastName: value.lastName,
          home: value.home,
          street: value.street,
          city: value.city,
          phone: value.phone,
          cellPhone: value.cellPhone,
          firstName: value.firstName,
          email: value.email,
        });
        break;
    }
  };

  return (
    <div className="RootPayForm">
      <div className="PayForm">
        <form className={classes.root} noValidate autoComplete="off">
          <div dir="rtl" className="CheckBox_Root">
            <Checkbox
              defaultChecked
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={changeCheckbox}
              checked={state.checked}
            />
            <span className="ChecBox_Text">
              פרטי המשלוח זהים לפרטים המופיעים בכרטיס הלקוח.
            </span>
          </div>

          <div dir="rtl">
            <TextField
              required
              id="FirstName"
              label="שם פרטי"
              value={
                state.checked ? state.firstName_defaultValue : value.firstName
              }
              multiline
              rows={1}
              onChange={handleChange}
              variant="outlined"
              style={{ width: 350 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              defaultValue={state.firstName_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.firstName
                  ? { shrink: true }
                  : { shrink: false }
              }
            />
            <TextField
              required
              id="LastName"
              label="שם משפחה"
              multiline
              rows={1}
              value={
                state.checked ? state.lastName_defaultValue : value.lastName
              }
              onChange={handleChange}
              variant="outlined"
              style={{ width: 435 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              defaultValue={
                state.checked ? state.lastName_defaultValue : value.lastName
              }
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.lastName
                  ? { shrink: true }
                  : { shrink: false }
              }
            />
          </div>
          <div dir="rtl">
            <TextField
              required
              id="Home"
              label="מס' בית"
              multiline
              rows={1}
              value={state.checked ? state.home_defaultValue : value.home}
              onChange={handleChange}
              variant="outlined"
              size="small"
              style={{ width: 200 }}
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              defaultValue={state.home_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.home
                  ? { shrink: true }
                  : { shrink: false }
              }
            />
            <TextField
              required
              id="Street"
              label="רחוב"
              multiline
              rows={1}
              value={state.checked ? state.street_defaultValue : value.street}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={{ width: 285 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              defaultValue={state.street_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.street
                  ? { shrink: true }
                  : { shrink: false }
              }
            />
            <TextField
              required
              id="City"
              label="עיר"
              multiline
              rows={1}
              value={state.checked ? state.city_defaultValue : value.city}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={{ width: 285 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              color="secondary"
              defaultValue={state.city_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.city
                  ? { shrink: true }
                  : { shrink: false }
              }
            />
          </div>
          <div>
            <TextField
              id="Phone"
              label="טלפון"
              multiline
              rows={1}
              value={state.checked ? state.phone_defaultValue : value.phone}
              onChange={handleChange}
              variant="outlined"
              //   labelWidth={120}
              style={{ width: 250, marginTop: 8 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              color="secondary"
              defaultValue={state.phone_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.phone
                  ? { shrink: true }
                  : { shrink: false }
              }
            />

            <TextField
              required
              id="CellPhone"
              label="טלפון נייד"
              multiline
              rows={1}
              value={
                state.checked ? state.cellPhone_defaultValue : value.cellPhone
              }
              onChange={handleChange}
              variant="outlined"
              style={{ width: 250, marginTop: 8 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              color="secondary"
              defaultValue={state.cellPhone_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.cellPhone
                  ? { shrink: true }
                  : { shrink: false }
              }
            />

            <TextField
              required
              id="Email"
              label="דוא'ל"
              multiline
              rows={1}
              value={state.checked ? state.email_defaultValue : value.email}
              onChange={handleChange}
              variant="outlined"
              style={{ width: 270, marginTop: 8 }}
              size="small"
              InputProps={{
                // readOnly: state.readonly,
                disabled: state.disabled,
              }}
              color="secondary"
              defaultValue={state.email_defaultValue}
              InputLabelProps={
                state.checked
                  ? {
                      shrink: state.shrink,
                    }
                  : value.email
                  ? { shrink: true }
                  : { shrink: false }
              }
            />
          </div>

          <div>
            <TextField
              id="notes"
              label="הערות"
              multiline
              rows={5}
              value={value.notes}
              onChange={handleChange}
              onClick={handleChange}
              variant="outlined"
              style={{ width: 802 }}
              //   labelWidth={120}
              //   InputProps={{
              //     // readOnly: state.readonly,
              //     disabled: state.disabled,
              //   }}
              size="small"
              color="secondary"
              //   defaultValue={state.home_defaultValue}
              InputLabelProps={
                value.notes ? { shrink: true } : { shrink: false }
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryDetails;
