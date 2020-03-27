import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label="Departing flights"
            {...a11yProps(0)}
            icon={<FlightTakeoffIcon />}
          />
          <Tab
            label="Arriving flights"
            {...a11yProps(1)}
            icon={<FlightLandIcon />}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Departing flights
      </TabPanel>
      <TabPanel value={value} index={1}>
        Arriving flights
      </TabPanel>
    </div>
  );
}
