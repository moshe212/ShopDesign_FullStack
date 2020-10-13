import React, { useState } from "react";
import { Tabs, Radio } from "antd";
import LogInForm from "./LogInForm";

import "./Tab.css";

const { TabPane } = Tabs;

const Tab = (props) => {
  const [State, setState] = useState({ size: "small" });

  const closeModal = () => {
    props.closeModal();
  };

  const { size } = State;
  return (
    <div>
      <Tabs defaultActiveKey="2" type="card" size={size} centered>
        <TabPane tab="הרשם" key="1">
          Content of card tab 2
        </TabPane>
        <TabPane tab="התחבר" key="2">
          <LogInForm onSubmit={closeModal} WhoLogIn={"User"} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Tab;
