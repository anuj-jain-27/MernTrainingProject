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
import { mobileplanpay } from '../../actions/paymentgateway';
import {broadbandpay} from '../../actions/paymentgateway';
import {getcards} from '../../actions/payment';
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
function PaymentForm_1() {
    const [paydetails, setPayDetails] = useState({});
   
    const dispatch = useDispatch();
    const classes = useStyles();
    var TotalCost=0;
    const plansMobile = JSON.parse(localStorage.getItem("mobileplan"));
    const broadband = JSON.parse(localStorage.getItem("broadband"));
    var user=JSON.parse(localStorage.getItem('profile')).user._id
    
    const [cardID, setCardId] = useState({});
    useEffect(() => {
      if (cards.length == 0)
        dispatch(getcards(user));
    }, [dispatch])
    const cards = useSelector((state) => state.cards);

    // console.log(cardID)
    if(parseInt(plansMobile._id)!=" " ){
      TotalCost=TotalCost+parseInt(plansMobile.cost)
    }
    if(parseInt(broadband._id)!=" "){
      TotalCost=TotalCost+parseInt(broadband.monthlyprice)
    }
   
    console.log(paydetails)
    console.log(cards)
  
    console.log(cardID)
    const handleSubmit = e => {
      e.preventDefault()
      for (var i=0; i<cards.length;i++) {
        if(cards[i].cardnumber===Number(paydetails.CardNumber)){
          setCardId(cards[i]._id)

        }
      }
           dispatch(mobileplanpay(paydetails, plansMobile._id, cardID, user));
           dispatch(broadbandpay(paydetails, broadband._id, cardID, user))

          //  if (plansMobile._id != " " && broadbandpay._id!=" ") {
          //    dispatch(mobileplanpay(paydetails, plansMobile._id,cardID, user));
          //    dispatch(broadbandpay(paydetails, plansMobile._id,cardID,  user))
          //    console.log("Payment done")
          //    localStorage.setItem("mobileplan", "");
          //    localStorage.setItem("broadband", "");
          //  } 
          //  else{
          //    if (plansMobile._id!= " "){
          //      dispatch(mobileplanpay(paydetails, plansMobile._id, cardID, user));
          //      console.log("Payment done")
          //      localStorage.setItem("mobileplan", "");
          //    }
          //    else{
          //      dispatch(broadbandpay(paydetails, plansMobile._id,cardID, user))
          //      console.log("Payment done")
          //      localStorage.setItem("broadband", "");
          //    }};
        };
    return (
    <Container maxWidth="lg">
                <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
          <Typography> Payment Confirmation</Typography>
            <img height='40px' width="200px" marginLeft="2px" src={pic} align="center" align="left"></img>
          <Typography variant="h8"></Typography>
            <TextField style={{margin:"10px"}} size="small" name="CardNumber" variant="outlined" label="Card Number" fullWidth value={paydetails.CardNumber} onChange={(e) => setPayDetails({ ...paydetails, CardNumber: e.target.value })}/>
            <TextField style={{margin:"10px"}} size="small" name="CVV" variant="outlined" label="CVV" fullWidth value={paydetails.CVV} onChange={(e) => setPayDetails({ ...paydetails, CVV: e.target.value })} />
            <TextField style={{margin:"10px"}} size="small" name="Address" variant="outlined" label="Address" fullWidth value={paydetails.Address} onChange={(e) => setPayDetails({ ...paydetails, Address: e.target.value })} />
            <Typography>Total Payment: {TotalCost}</Typography>
            <ColorButton  size="small" className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>CONFIRM PAYMENT</ColorButton>
          </form>
        </Paper>
        </Container>
</Grow>
</Container>
    </Container>
    );
  }
  
  export default PaymentForm_1;