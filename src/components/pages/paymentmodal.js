import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../Form/styles';
import { createPost, updatePost } from '../../actions/posts';
import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import {getplans} from "../../actions/plancart";
import { green } from '@material-ui/core/colors';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PaymentForm from './PaymentForm';
import PaymentForm_1 from './PaymentForm_1';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { createBroadbandPlan } from '../../actions/broadband';
import { Card, CardActions, CardContent} from '@material-ui/core/';
import useStyles_1 from "./styles"
import Line from '../Line';
import "./PaymentForm.css";

const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);
  
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  const useStyles_2 = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
function PaymentModal(clicked) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const classes_1 = useStyles_1();
    const [value, setValue] = React.useState('move');
    const details = JSON.parse(localStorage.getItem("profile"));
    const plansMobile = JSON.parse(localStorage.getItem("mobileplan"));
    const broadband = JSON.parse(localStorage.getItem("broadband"));
    const [bwarn, setBWarning] = React.useState(false);
    const [mwarn, setMWarning] = React.useState(false);

  const classes_2 = useStyles_2();
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };
  const handleRemoveBroadband = () => {
    console.log("B is clicked")
    localStorage.removeItem("broadband")
    setBWarning(true)

  };
  const handleRemoveMobile = () => {
    localStorage.removeItem("mobileplan")
    console.log("M is clicked")
    setMWarning(true)
  };
    return (

      <div class="wrapper" >
          <div className={classes_2.paper} >
          <FormControl component="fieldset">
      <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
      <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Card" />
      <FormControlLabel value="move" control={<Radio color="primary" />} label="Continue with Payment" />
      </RadioGroup>
      </FormControl>
      <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
              <Grid item xs={12} sm={6}>
              {value==="add"? <PaymentForm/>: <PaymentForm_1 clicked={clicked} /> }
              {broadband!=null?<><Button type="button" style={{marginTop:"10px" , width:"250px"}} size="small" className={classes.buttonSubmit} variant="contained" color="primary"  onClick={handleRemoveBroadband}>
          Remove Broadband plan
      </Button></>:<></>}

       {plansMobile!=null?<><Button type="button" style={{width:"250px"}} size="small" className={classes.buttonSubmit} variant="contained" color="primary"  onClick={handleRemoveMobile}>
          Remove Mobile plan
      </Button></>:<></>}
              </Grid>
              <Grid style={{marginLeft:"5px"}}item xs={12} sm={5}>
  <Card style={{ width:"250px", justifyContent:"center"}}>
  <div style={{justifyContent:"center", textAlign:"center", marginBottom:"20px"}}>
  <Typography style={{justifyContent:"center"}} variant="h8">Plans Selected</Typography></div>
     
              {
      plansMobile != null && mwarn===false ?<>
      <Card style={{height:"200px", width:"200px", marginLeft: "20px"}}  >
      <div >
      <div><Typography style={{marginLeft:"10px", marginTop:"10px"}} variant="h8">MOBILE PLAN</Typography></div>
      <Line color="#203354"/> 
      <div><Typography style={{marginLeft:"20px"}} variant="h8">Plan: {plansMobile?.plan}</Typography></div>
     <div> <Typography style={{marginLeft:"20px"}} variant="body2" >Validity:  {plansMobile?.validity}</Typography></div>
      </div>
      <CardContent >
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">DATA: </span><span  STYLE="font-size:13px">{plansMobile?.data}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> SMS: </span><span  STYLE="font-size:13px">{plansMobile?.SMS}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">COST: </span><span  STYLE="font-size:13px">{plansMobile?.cost}</span></div>
      </CardContent>
      </Card>
    </>:<></>
      }

{
       broadband !=null  && bwarn===false?<>
      <Card style={{height:"200px", width:"200px", marginTop:"20px",  marginBottom:"20px", marginLeft: "20px"}} >
      <div >
      <Typography style={{marginLeft:"10px",  marginTop:"10px"}} variant="h8">BROADBAND PLAN</Typography>
      <Line color="#203354"/> 
      <div><Typography style={{marginLeft:"20px"}} variant="h8">Plan: {broadband?.name}</Typography></div>
      <div><Typography style={{marginLeft:"20px"}} variant="body2" >Validity: {broadband?.validity}</Typography></div>
    
      </div>
      <CardContent >
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">DATA: </span><span  STYLE="font-size:13px">{plansMobile?.data}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> COST: </span><span  STYLE="font-size:13px">{broadband?.monthlyprice}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">SPEED:</span><span  STYLE="font-size:13px">{plansMobile?.uploadspeed}</span></div>
      </CardContent>
      </Card>
    </>:<></>
      }
     </Card>
              </Grid>
            </Grid>
          </div>
          </div>

    );
  }
  
  export default PaymentModal;

 