import React, { useState, useEffect } from "react";
import { Button, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Axios from "axios";
import "./DownLoadButton.css";

const FileDownload = require("js-file-download");

const DownLoadButton = () => {
  const DownloadFile = () => {
    Axios.get("/api/download/Test.txt")
      .then((res) => {
        FileDownload(res.data, "Text.txt");
      })
      .catch(function (error) {
        //console.log(error);
      });
  };
  const size = "large";
  return (
    <>
      <div className="DownLoadBtnDiv">
        <Button
          onClick={DownloadFile}
          className="DownLoadBtn"
          type="primary"
          icon={<DownloadOutlined />}
          size={size}
        >
          Download
        </Button>
      </div>
    </>
  );
};

export default DownLoadButton;
