import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import DownLoadButton from "./DownLoadButton";
import Axios from "axios";
import "./ImportProducts.css";

const ImportProducts = () => {
  const uploadFile = () => {
    const uploadedFile = document.querySelector(".InputUpload #uploadedFile");
    console.log(uploadedFile.files[0]);
    if (uploadedFile.files[0]) {
      Axios.post("/api/upload", uploadedFile.files[0], {
        params: { filename: uploadedFile.files[0].name },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data === "OK") {
          alert("הקובץ עלה בהצלחה לשרת. רשימת המוצרים התעדכנה בהצלחה.");
        }
      });
    }
  };

  return (
    <div>
      <Header doAxiosonSearch={""} Render="Admin" />
      <div className="Explain">
        <p dir="rtl">
          ניתן להעלות קובץ בפורמט CSV ובו רשימת כל המוצרים. המערכת תבנה באופן
          אוטומטי את רשימת המוצרים מתוך הקובץ ותציג אותם באתר. להורדת קובץ עם
          המבנה הנדרש לחץ על הכפתור :
        </p>
        <DownLoadButton />
      </div>
      <div className="Upload">
        <p dir="rtl">
          להעלאת קובץ נא בחר קובץ באמצעות הכפתור המיועד או גרור קובץ לתוך האזור
          המיועד.
        </p>

        <div className="InputUpload">
          <input type="file" id="uploadedFile" />
          <button onClick={uploadFile}>Upload File</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ImportProducts;
