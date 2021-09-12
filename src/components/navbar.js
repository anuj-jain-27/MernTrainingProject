import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Typography,List,Toolbar,CssBaseline,Drawer,AppBar,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {googlesignin} from '../actions/auth'
import * as actiontypes from '../constants/actionTypes'

import { GoogleLogin } from 'react-google-login';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Icon from './icons/googleicon'
import { Home, PhoneAndroid, Router, Shop, ShoppingCart, AccountBox, ContactSupport,Payment } from "@material-ui/icons";
import pic from '../images/telstra.png';

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
  var links = ['/', '/mobile', '/broadband', '/products', '/cart', '/profile', '/contactus', ]
  
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  //console.log("Token",token)
 /*var handleLogin=async(e)=>{
       e.preventDefault()
       console.log(localStorage.getItem("profile"))
       await dispatch(login())
  }*/
  var googleSuccess=async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    
    console.log("google response",result,"  ",token)
    try {
      await dispatch(googlesignin({_id:result.googleId,name:result.name,email:result.email,googleId:result.googleId}))
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

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

            {!token?<GoogleLogin
            clientId="107969636236-navdrh3p4eil5r5hf4ifr6hi8kcn7grv.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
              style={{marginLeft:"10px"}} 
              color="primary" 
              onClick={renderProps.onClick} 
              startIcon={<Icon />}
              variant="contained">
                Google Sign In
              </Button>
                )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />:
          <Button
              style={{marginLeft:"10px"}} 
              color="primary" 
              onClick={()=>{
                dispatch({type:actiontypes.LOGOUT})
                window.location.reload();
              }} 
              startIcon={<Icon />}
              variant="contained">
                Log out
          </Button>}
          </List>
        </div>
      </Drawer>

    </div>
  );
}
 /*    
        <Link className="tags" 
        onClick={renderProps.onClick}>
        disabled={renderProps.disabled} 
        style={{ textDecoration: 'none', color: "black" }} 
                  <ListItem button key="login">
                    <ListItemText primary="Google LogIn" />
                    <ListItemIcon><Icon /></ListItemIcon>
                  </ListItem>
            </Link>
        
        <Link className="tags" style={{ textDecoration: 'none', color: "black" }} to='/' onClick={handleLogin}>
                  <ListItem button key="login">
                    <ListItemText primary="Log In" />
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                  </ListItem>
            </Link>*/
            /*  <Button className={classes.googleButton} 
              color="primary" 
              fullWidth onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              startIcon={<Icon />} 
              variant="contained">
                Google Sign In
              </Button>*/