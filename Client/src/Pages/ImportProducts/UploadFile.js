import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Axios from "axios";
import "./UploadFile.css";

const UploadFile = () => {
  const { Dragger } = Upload;
  let status = "";
  const doAxios = (operation, url, obj, param) => {
    Axios[operation](url, obj, param)
      .then((res) => {
        //console.log("res.data", res.data);
        status = res.data;
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  const props = {
    name: "file",
    multiple: true,
    action: "/api/upload?",
    onChange(info) {
      setTimeout(() => {
        if (info.file && status === "") {
          doAxios("post", "/api/upload", info.fileList[0].originFileObj, {
            params: { filename: info.fileList[0].name },
          });
        }
        if (status !== "uploading") {
          //console.log(info.fileList[0]);
          //console.log(status);
        }
        if (status === "OK") {
          message.success(`${info.file.name} file uploaded successfully.`);
          status = "";
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }, 1500);

      //   const { status } = info.file;
      //   if (info.file) {
      //     if (status !== "uploading") {
      //       //console.log(info.fileList[0]);
      //       //console.log(status);
      //     }
      //     if (status === "done") {
      //       message.success(`${info.file.name} file uploaded successfully.`);
      //     } else if (status === "error") {
      //       message.error(`${info.file.name} file upload failed.`);
      //     }
      //   }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">.הקש או גרור קובץ לצורך העלאה לשרת</p>
      <p className="ant-upload-hint">.תומך בהעלאת קובץ בודד או כמות</p>
    </Dragger>
    // mountNode
  );
};

export default UploadFile;
