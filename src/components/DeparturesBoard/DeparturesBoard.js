import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import FlightsTable from "../FlightsTable/FlightsTable";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { departure, arrival, loading, error } = useSelector(
    state => state.airports
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value) {
      dispatch(getArrival());
    } else {
      dispatch(getDeparture());
    }
  }, [value, dispatch]);

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
        <FlightsTable flights={departure} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Arriving flights
        <FlightsTable flights={arrival} />
      </TabPanel>

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
