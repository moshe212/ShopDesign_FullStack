import React, { useState } from "react";
import { Menu, message } from "antd";
import "./CategoryMenu.css";

import Icon from "@ant-design/icons";

// import FruitIcon from "../Images/harvest.svg";
import iconFruit from "./iconFruit";
import iconVegetable from "./iconVegetable";
import iconShake from "./iconShake";
import iconCake from "./iconCake";
import iconFrozen from "./iconFrozen";

const FruitIcon = (props) => <Icon component={iconFruit} {...props} />;
const VegetableIcon = (props) => <Icon component={iconVegetable} {...props} />;
const ShakeIcon = (props) => <Icon component={iconShake} {...props} />;
const CakeIcon = (props) => <Icon component={iconCake} {...props} />;
const FrozenIcon = (props) => <Icon component={iconFrozen} {...props} />;

const { SubMenu } = Menu;

const CategoryMenu = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const chooseCategory = (e) => {
    let catChoosen = "";
    if (typeof e.item.props.children[1] === "string") {
      catChoosen = e.item.props.children[1];
    } else if (typeof e.item.props.children[1] === "object") {
      catChoosen = e.item.props.children[1].props.children;
    }
    message.loading("..מבצע אימות נתונים מול השרת, מיד תועבר להמשך קניה", 0);

    props.chooseCategoryFunc(catChoosen);
  };

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <div className="sideMenuRoot" style={{ width: 256 }}>
      {/* <Button
    type="primary"
    onClick={this.toggleCollapsed}
    style={{ marginBottom: 16 }}
  >
    {React.createElement(
      this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
    )}
  </Button> */}

      <Menu
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed="true"
      >
        <SubMenu
          key="sub1"
          icon={
            <FruitIcon
              style={{
                width: "20px",
                height: "20px",
                // color: "hotpink",
              }}
            />
          }
          title="Fruit"
        >
          <Menu.Item onClick={chooseCategory} key="5">
            פירות טרופיים
          </Menu.Item>
          <Menu.Item onClick={chooseCategory} key="6">
            פירות ים תיכוניים
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          icon={
            <FrozenIcon
              style={{
                width: "20px",
                height: "20px",
                // color: "hotpink",
              }}
            />
          }
          title="Frozen"
        >
          <Menu.Item onClick={chooseCategory} key="5">
            פירות קפואים טרופיים
          </Menu.Item>
          <Menu.Item onClick={chooseCategory} key="6">
            פירות קפואים ים תיכוניים
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="3"
          onClick={chooseCategory}
          icon={
            <VegetableIcon
              style={{
                width: "20px",
                height: "20px",
                // color: "hotpink",
              }}
            />
          }
        >
          ירקות
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={chooseCategory}
          icon={
            <ShakeIcon
              style={{
                width: "20px",
                height: "20px",
                // color: "hotpink",
              }}
            />
          }
        >
          שייקים
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={chooseCategory}
          icon={
            <CakeIcon
              style={{
                width: "20px",
                height: "20px",
                // color: "hotpink",
              }}
            />
          }
        >
          עוגות
        </Menu.Item>

        {/* <SubMenu
      key="sub2"
      icon={<AppstoreOutlined />}
      title="Navigation Two"
    >
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
      <SubMenu key="sub3" title="Submenu">
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </SubMenu> */}
      </Menu>
    </div>
  );
};

export default CategoryMenu;
