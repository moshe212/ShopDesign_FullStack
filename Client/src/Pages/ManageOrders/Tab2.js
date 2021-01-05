import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Header from "../../Header";
import ManageOrdersMaterial from "./ManageOrdersMaterial";
import ManageCustomersMaterial from "./ManageCustomersMaterial";
import OrdersForDates from "./OrdersForDates";
import TotalIncomForMonth from "./TotalIncomForMonth";

import "./Tab2.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <div>
        <Header Render="Admin" Active="ManageOrders" />
      </div>
      <div dir="rtl" className={classes.root}>
        <AppBar position="static" color="white">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            //   variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="ניהול הזמנות" {...a11yProps(0)} />
            <Tab label="ניהול לקוחות" {...a11yProps(1)} />
            <Tab label="גרפים" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ManageOrdersMaterial />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ManageCustomersMaterial />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid-container">
              <div className="grid-item">
                <OrdersForDates />
              </div>
              <div className="grid-item">
                <TotalIncomForMonth />
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}
