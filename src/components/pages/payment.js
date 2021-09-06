import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../Form/styles';
import { createPost, updatePost } from '../../actions/posts';
import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import {getplans} from "../../actions/plancart";
import { green } from '@material-ui/core/colors';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import pic from '../../images/cards.png';
import PaymentForm from './PaymentForm';
import PaymentForm_1 from './PaymentForm_1';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Post from "../Posts/Post/Post"
import BPost from "../BPosts/BPost/BPost"
import { createBroadbandPlan } from '../../actions/broadband';
import { Card, CardActions, CardContent, CardMedia, Avatar } from '@material-ui/core/';
import useStyles_1 from "./styles"

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
function Payment() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const classes_1 = useStyles_1();
    const [value, setValue] = React.useState('move');
    const details = JSON.parse(localStorage.getItem("profile"));
    const plansMobile = JSON.parse(localStorage.getItem("mobileplan"));
    const broadband = JSON.parse(localStorage.getItem("broadband"));
   if (plansMobile ==={}){
     console.log(true)
   }

  const posts = useSelector((state) => state.posts);
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };
    return (
    <Container maxWidth="lg">
      <FormControl component="fieldset">
      <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
      <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Card" />
      <FormControlLabel value="move" control={<Radio color="primary" />} label="Continue with Payment" />
      </RadioGroup>
      </FormControl>
      <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
              <Grid item xs={12} sm={5}>
              {value==="add"? <PaymentForm/>: <PaymentForm_1 broadband={broadband} plansMobile={plansMobile}  /> }
              </Grid>
              <Grid style={{marginLeft:"5px"}}item xs={12} sm={6}>

              {
      plansMobile != null ?<>
      <Card style={{height:"200px", width:"200px"}} elevation={6} >
      <div >
      <Typography style={{marginLeft:"20px"}} variant="h8">Plan: {plansMobile.plan}</Typography>
      <Typography style={{marginLeft:"20px"}} variant="body2" >Validity:  {plansMobile.validity}</Typography>
      <Typography variant="body2"></Typography>
      </div>
      <CardContent >
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">DATA: </span><span  STYLE="font-size:13px">{plansMobile.data}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> SMS: </span><span  STYLE="font-size:13px">{plansMobile.SMS}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">COST: </span><span  STYLE="font-size:13px">{plansMobile.cost}</span></div>
      </CardContent>
      </Card>
    </>:<></>
      }

{
       broadband !=null?<>
      <Card style={{height:"200px", width:"200px", marginTop:"20px"}} elevation={6} >
      <div >
      <Typography style={{marginLeft:"20px"}} variant="h8">Plan: {broadband.name}</Typography>
      <Typography style={{marginLeft:"20px"}} variant="body2" >Validity: {broadband.validity}</Typography>
      <Typography variant="body2"></Typography>
      </div>
      <CardContent >
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">DATA: </span><span  STYLE="font-size:13px">{plansMobile.data}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> COST: </span><span  STYLE="font-size:13px">{broadband.monthlyprice}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">SPEED:</span><span  STYLE="font-size:13px">{plansMobile.uploadspeed}</span></div>
      </CardContent>
      </Card>
    </>:<></>
      }
              </Grid>
            </Grid>
    </Container>
    );
  }
  
  export default Payment;

 