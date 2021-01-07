import React, { useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import DownLoadButton from "./DownLoadButton";
import Axios from "axios";
import "./ImportProducts.css";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fileToObject } from "antd/lib/upload/utils";

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

  const props = {
    name: "file",
    action: "/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // const onChange = (info) => {
  //   // בגלל שבטלתי את הפונקציונאליות של הכפתור העלאה זה תמיד יהיה סטטוס נכשל
  //   if (info.file.status === "error") {
  //     Axios.post("/api/upload", info.fileList[0].originFileObj)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data === "ok") {
  //           console.log("success");
  //         } else {
  //           console.log("error");
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e.message);
  //       });
  //   }
  // };

  // const BorderColor = (e) => {
  //   borderColor(e, "btnUploaded");
  // };
  // const noneBorderColor = (e) => {
  //   borderColor(e, false);
  // };

  return (
    <div>
      <Header doAxiosonSearch={""} Render="Admin" Active="ImportProducts" />
      <div className="Explain">
        <p dir="rtl">
          ניתן להעלות קובץ בפורמט CSV ובו רשימת כל המוצרים. המערכת תבנה באופן
          אוטומטי את רשימת המוצרים מתוך הקובץ ותציג אותם באתר. להורדת קובץ עם
          המבנה הנדרש לחץ על הכפתור :
        </p>
        <DownLoadButton />
      </div>
      <div className="Upload">
        <p dir="rtl">להעלאת קובץ נא בחר קובץ באמצעות הכפתור המיועד.</p>

        {/* <Upload {...props}>
          <button
            // onMouseOver={BorderColor}
            // onMouseLeave={noneBorderColor}
            className="btn_homepage btn_uploaded"
          >
            <UploadOutlined />
            העלאת קובץ הזמנה
          </button>
        </Upload> */}
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
