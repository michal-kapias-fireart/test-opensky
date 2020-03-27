import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import DeparturesBoard from "../DeparturesBoard/DeparturesBoard";
import { getAirports } from "../../store/modules/airports";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarContent: {
    justifyContent: "flex-end"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  list: {
    width: "100%"
  },
  icao: {
    textAlign: "right"
  },
  listItem: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    }
  },
  spinner: {
    position: "absolute",
    top: "200px",
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto"
  },
  modal: {
    width: "80%"
  },
  dialogTitle: {
    textAlign: "center"
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isModalOpen, setModalPosition] = useState(false);

  const { user } = useSelector(state => state.login);
  const { airports, loading } = useSelector(state => state.airports);

  const closeModal = () => setModalPosition(false);
  const openModal = () => setModalPosition(true);

  useEffect(() => {
    if (!airports) {
      dispatch(getAirports());
    }
  }, [airports, dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar classes={{ root: classes.appBarContent }}>
          <Typography variant="h6" noWrap>
            {`Hellow, ${user}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <ListItemIcon>
              <LocalAirportIcon />
            </ListItemIcon>
            <ListItemText primary="Air traffic" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <List component="nav" className={classes.list} aria-label="airports">
          {airports &&
            airports.map(airport => (
              <ListItem
                button
                onClick={openModal}
                classes={{ root: classes.listItem }}
              >
                <ListItemIcon>
                  <LocalAirportIcon />
                </ListItemIcon>
                <ListItemText primary={airport.name} />
                <ListItemText
                  primary={airport.ICAO}
                  classes={{ root: classes.icao }}
                />
              </ListItem>
            ))}
          {loading && (
            <CircularProgress
              color="secondary"
              classes={{ root: classes.spinner }}
            />
          )}
        </List>
      </main>
      <Dialog
        maxWidth={false}
        aria-labelledby="dialog-title"
        open={isModalOpen}
        classes={{ paper: classes.modal }}
        onClose={closeModal}
      >
        <DialogTitle id="dialog-title" classes={{ root: classes.dialogTitle }}>
          Flights
        </DialogTitle>
        <DialogContent dividers>
          <DeparturesBoard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
