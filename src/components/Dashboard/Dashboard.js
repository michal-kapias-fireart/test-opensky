import React, { useEffect } from "react";
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
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
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
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.login);
  const { airports } = useSelector(state => state.airports);

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
                onClick={() => alert(airport.name)}
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
        </List>
      </main>
    </div>
  );
}
