import React, { useState } from "react";
import "./Header.css";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

import AdminLogIn from "./AdminLogin";
import LogInUser from "./LogInUser";

import { TagsFilled } from "@ant-design/icons";

const Header = (props) => {
  const [redirect_Admin, setredirect_Admin] = useState(false);
  const [redirect_MangeProducts, setredirect_MangeProducts] = useState(false);
  const [redirect_ImportProducts, setredirect_ImportProducts] = useState(false);
  const [redirect_Home, setredirect_Home] = useState(false);
  const [redirect_ManageOrders, setredirect_ManageOrders] = useState(false);

  let history = useHistory();

  const clickPage = (e) => {
    switch (e.target.innerText) {
      case "מתכונים לשייקים":
        history.push("/Recipes");
        break;
      case "צור קשר":
        history.push("/ContactUs");
        break;
      case "מבצעים":
        history.push("/Specials");
        break;
      case "אודות":
        history.push("/About");
        break;
      default:
    }
  };

  const Render = props.Render;

  const GoHome = () => {
    setredirect_Home(true);
  };

  const handleOnClick = () => {
    setredirect_Admin(true);
  };

  const MangeProducts_handleOnClick = () => {
    setredirect_MangeProducts(true);
  };

  const ImportProducts_handleOnClick = () => {
    setredirect_ImportProducts(true);
  };

  const ManageOrders_handleOnClick = () => {
    setredirect_ManageOrders(true);
  };

  if (redirect_Admin) {
    return <Redirect push to="/Admin" />;
  } else if (redirect_MangeProducts) {
    return <Redirect push to="/Admin/ManageProducts" />;
  } else if (redirect_ImportProducts) {
    return <Redirect push to="/Admin/ImportProducts" />;
  } else if (redirect_ManageOrders) {
    return <Redirect push to="/Admin/ManageOrders" />;
  } else if (redirect_Home) {
    return <Redirect push to="/" />;
  }

  return (
    <div className="header">
      <LogInUser Username={props.UserName} />
      <div className="AdinAndLogoDiv">
        <div onClick={GoHome} className="logo">
          <img src="/Images/clipart1580817.png"></img>
        </div>
        <AdminLogIn />
      </div>
      {Render === "Home" && (
        <div dir="rtl">
          <div className="Menu">
            <div
              className={props.Active === "About" ? "Active" : null}
              onClick={(e) => clickPage(e)}
            >
              אודות
            </div>
            <div
              className={props.Active === "Specials" ? "Active" : null}
              onClick={(e) => clickPage(e)}
            >
              מבצעים
            </div>
            <div
              className={props.Active === "ContactUs" ? "Active" : null}
              onClick={(e) => clickPage(e)}
            >
              צור קשר
            </div>
            <div
              className={props.Active === "Recipes" ? "Active" : null}
              onClick={(e) => clickPage(e)}
            >
              מתכונים לשייקים
            </div>
          </div>
        </div>
      )}
      {Render === "Admin" && (
        <div className="Menu">
          <div
            className={props.Active === "ManageProducts" ? "Active" : null}
            onClick={MangeProducts_handleOnClick}
          >
            ניהול מוצרים
          </div>
          <div
            className={props.Active === "ImportProducts" ? "Active" : null}
            onClick={ImportProducts_handleOnClick}
          >
            ייבוא מוצרים
          </div>
          <div
            className={props.Active === "ManageOrders" ? "Active" : null}
            onClick={ManageOrders_handleOnClick}
          >
            ניהול הזמנות
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
