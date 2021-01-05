import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import ProductsTableMaterial from "./ProductsTableMaterial";
import AddProduct from "./AddProduct";
import MyForm from "./MyForm";
import Form from "./Form";
import UpdateProduct from "./UpdateProduct";

import "./ManageProducts.css";

const ManageProducts = () => {
  return (
    <div>
      <Header doAxiosonSearch={""} Render="Admin" Active="ManageProducts" />
      <ProductsTableMaterial />
      <div className="Text_AddUpdateProd">
        <p dir="rtl">
          לעדכון או הוספת מוצר כאשר התמונה עולה לשרת כקובץ בחר אחד מן האפשרויות
          הבאות:{" "}
        </p>
      </div>
      <div className="Btns">
        <div className="AddWithUpImg">
          <AddProduct />
        </div>
        <div className="UpdateWithImg">
          <UpdateProduct />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageProducts;
