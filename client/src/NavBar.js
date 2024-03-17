import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from '@mui/styles'
import { Link } from "react-router-dom";
import DrawerComponent from "./components/DrawerComponent";
import {Db,Auth} from "./firebase/Firebase"

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",

  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
    appbarcolor: {
      color: "blue",
      background: "#f2f2f2"
    }
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  let user = Auth.currentUser;
  return (
    <AppBar position="static" color='primary'  >
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Zapp
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Order
            </Link>
            <Link to="/services" className={classes.link}>
              Services
            </Link>
            <Link to="/pricingpage" className={classes.link}>
              Pricing
            </Link>
            <Link to="/areas" className={classes.link}>
              Areas
            </Link>
            {
              user==null?
              <Link to="/login" className={classes.link}>
              Login
            </Link>:
            <Link to="/logout" className={classes.link}>
            Logout
          </Link>
            }
            
          </div>
        )
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;








