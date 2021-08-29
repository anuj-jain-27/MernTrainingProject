import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {login} from '../actions/auth'
//import Icon from '@material-ui/core/Icon';
import { Home, PhoneAndroid, Router, Shop, ShoppingCart, AccountBox, ContactSupport } from "@material-ui/icons";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import pic from '../images/telstra.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router'
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#292F33",
    height: "45px",
  },
  drawer: {
    width: "220px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  var icons = [<Home />, <PhoneAndroid />, <Router />, <Shop />, <ShoppingCart />, <AccountBox />, <ContactSupport />]
  var links = ['/', '/mobile', '/broadband', '/products', '/cart', '/profile', '/contactus']
  const token = localStorage.getItem("profile");
  console.log("Token",token)
  var handleLogin=async(e)=>{
       e.preventDefault()
       await dispatch(login())
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <a href="https://telstra.unily.com/">
              <img mheight='24px' width="34px" marginLeft="2px" src={pic} align="center" align="left"></img></a>
            <span style={{ marginBottom: "5px" }}>&nbsp; Telstra</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Home', 'Mobile', 'Broadband', 'Tech Products', 'My Cart', 'My Account', 'Contact Us'].map((text, index) => {

              return (
                <Link className="tags" style={{ textDecoration: 'none', color: "black" }} to={links[index]}>
                  <ListItem button key={text}>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              )

            })}
            <Link className="tags" style={{ textDecoration: 'none', color: "black" }} to='/' onClick={handleLogin}>
                  <ListItem button key="login">
                    <ListItemText primary="Log In" />
                  </ListItem>
                </Link>
          </List>
        </div>
      </Drawer>

    </div>
  );
}
