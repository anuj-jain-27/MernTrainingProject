import React, { useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {Typography,Grid,TextField,FormControlLabel,Checkbox,InputLabel,MenuItem,FormHelperText,FormControl,Select} from '@material-ui/core';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaymentForm({setpayment,payment}) {
  
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(-1);
  const dispatch=useDispatch()
  const profile=JSON.parse(localStorage.getItem('profile'))
  useEffect(async ()=>{
  const {data}=await axios({
    method:"get",
    url:`http://localhost:8000/api/paymentcards/${profile.user._id}`,
    headers: { "Content-Type": "application/json","Authorization": `Bearer ${profile.token}`}
  }) 
  setCards([...data])   
  },[dispatch])
  
  useEffect(()=>{
    if(cardIndex!=-1)
    setpayment({...cards[cardIndex]})
  },[cardIndex])
  const handleChange = (event) => {
    setCardIndex(event.target.value);
    if(cardIndex!=-1)
      setpayment({...cards[cardIndex]})
  };
  console.log(cardIndex)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
      <FormControl className={classes.formControl} style={{width:"480px"}}>
        <InputLabel id="demo-simple-select-helper-label">Add a new payment card</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={cardIndex}
          onChange={handleChange}
        >
          {cards.map((card,index)=>{
            return <MenuItem value={index}>{card.cardtype+" / "+card.cardnumber}</MenuItem>
          })}
        </Select>
      </FormControl>
      </Grid>
       {cardIndex==-1?(<>
       <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" 
          onChange={(e)=>setpayment({...payment,cardtype:e.target.value})} value={payment?.cardtype}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            value={payment?.cardnumber}
            onChange={(e)=>setpayment({...payment,cardnumber:e.target.value})}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth 
          autoComplete="cc-exp" onChange={(e)=>setpayment({...payment,expirydate:e.target.value})}
          value={payment?.expirydate}
          />
        </Grid></>):null}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={(e)=>setpayment({...payment,cvv:e.target.value})}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}