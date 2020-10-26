import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Header from "../../Header";
import ManageOrdersMaterial from "./ManageOrdersMaterial";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div dir="rtl">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            // centered
          >
            <Tab label="ניהול הזמנות" />
            <Tab label="ניהול לקוחות" />
            <Tab label="גרפים" />
          </Tabs>
        </Paper>
      </div>
    </div>
  );
}
