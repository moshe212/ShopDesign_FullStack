import React, { useState, useEffect } from "react";
import "./Header.css";
import Search from "./Search";
import { Redirect } from "react-router";

import AdminLogIn from "./AdminLogin";
import LogInUser from "./LogInUser";

const Header = (props) => {
  // const doAxiosonSearch = (isSlider, isSearch, isAddProduct, link) => {
  //   props.doAxiosonSearch(false, true, false, link);
  // };
  const [redirect_Admin, setredirect_Admin] = useState(false);
  const [redirect_MangeProducts, setredirect_MangeProducts] = useState(false);
  const [redirect_ImportProducts, setredirect_ImportProducts] = useState(false);
  const [redirect_Home, setredirect_Home] = useState(false);

  //console.log("HeaderProps", props);
  //console.log(props.Render);
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

  if (redirect_Admin) {
    //console.log("Redirect");
    return <Redirect push to="/Admin" />;
  } else if (redirect_MangeProducts) {
    return <Redirect push to="/Admin/ManageProducts" />;
  } else if (redirect_ImportProducts) {
    return <Redirect push to="/Admin/ImportProducts" />;
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
      {Render === "Home" ||
        (Render === undefined && (
          <div className="Menu">
            <div>אודות</div>
            <div>מבצעים</div>
            <div>צור קשר</div>
            <div>מתכונים לשייקים</div>
          </div>
        ))}
      {Render === "Admin" && (
        <div className="Menu">
          <div onClick={MangeProducts_handleOnClick}>ניהול מוצרים</div>
          <div onClick={ImportProducts_handleOnClick}>ייבוא מוצרים</div>
        </div>
      )}
    </div>
  );
};

export default Header;
