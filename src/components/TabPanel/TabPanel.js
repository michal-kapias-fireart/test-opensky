import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FlightsTable from "../FlightsTable/FlightsTable";

const minutes = [10, 20, 30, 40, 50, 60];

export default function TabPanel(props) {
  const {
    children,
    value,
    index,
    interval,
    onChange,
    flights,
    flightsType,
    ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box
        color="text.primary"
        component="div"
        display="flex"
        alignItems="center"
        fontWeight="fontWeightBold"
        p={3}
      >
        {flightsType} flights in the last&nbsp;
        <Select value={interval} onChange={onChange}>
          {minutes.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        &nbsp;minutes (one day ago)
      </Box>
      <FlightsTable flights={flights} />
    </Typography>
  );
}
