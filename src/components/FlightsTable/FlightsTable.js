import React from "react";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function createData({
  icao24,
  firstSeen,
  estDepartureAirport,
  lastSeen,
  estArrivalAirport,
  departureAirportCandidatesCount,
  arrivalAirportCandidatesCount
}) {
  return {
    icao24,
    firstSeen,
    estDepartureAirport,
    lastSeen,
    estArrivalAirport,
    departureAirportCandidatesCount,
    arrivalAirportCandidatesCount
  };
}

const secondsToDate = seconds =>
  moment.unix(seconds).format("YYYY/MM/DD HH:mm");

export default function FlightsTable({ flights, loading }) {
  if (!flights) return null;

  const rows = flights.map(item => createData(item));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="flights table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              Estimated time of departure for the flight as Unix time
            </TableCell>
            <TableCell align="center">
              ICAO code of the estimated departure airport
            </TableCell>
            <TableCell align="center">
              Estimated time of arrival for the flight as Unix time
            </TableCell>
            <TableCell align="center">
              ICAO code of the estimated arrival airport
            </TableCell>
            <TableCell align="center">
              Number of other possible departure airports
            </TableCell>
            <TableCell align="center">
              Number of other possible departure airports
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.icao24}>
              <TableCell align="center">
                {secondsToDate(row.firstSeen)}
              </TableCell>
              <TableCell align="center">{row.estDepartureAirport}</TableCell>
              <TableCell align="center">
                {secondsToDate(row.lastSeen)}
              </TableCell>
              <TableCell align="center">{row.estArrivalAirport}</TableCell>
              <TableCell align="center">
                {row.departureAirportCandidatesCount}
              </TableCell>
              <TableCell align="center">
                {row.arrivalAirportCandidatesCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
