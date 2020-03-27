import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import TabPanel from "../TabPanel/TabPanel";
import { getDeparture, getArrival } from "../../store/modules/airports";

const useStyles = makeStyles({
  spinner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto"
  },
  errorText: {
    textAlign: "center",
    fontSize: "1em"
  }
});

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { departure, arrival, loading, error } = useSelector(
    state => state.airports
  );
  const [value, setValue] = React.useState(0);
  const [interval, changeInterval] = React.useState(10);

  const change = event => {
    changeInterval(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value) {
      dispatch(getArrival(interval));
    } else {
      dispatch(getDeparture(interval));
    }
  }, [value, interval, dispatch]);

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
      <TabPanel
        value={value}
        index={0}
        interval={interval}
        onChange={change}
        flights={departure}
        flightsType="departing"
      />
      <TabPanel
        value={value}
        index={1}
        interval={interval}
        onChange={change}
        flights={arrival}
        flightsType="arrival"
      />

      {error && (
        <FormHelperText error classes={{ root: classes.errorText }}>
          {error}
        </FormHelperText>
      )}

      {loading && (
        <CircularProgress
          color="secondary"
          classes={{ root: classes.spinner }}
        />
      )}
    </div>
  );
}
