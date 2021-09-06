import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ColorButton,ButtonGroup,Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,IconButton,Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {Update,Add,Remove,Shop,AddShoppingCart,Share,Delete,Edit} from "@material-ui/icons";
import { useDispatch} from 'react-redux';
import { useState,useEffect } from 'react';
import {updateCart} from '../../actions/cart'
import Checkoutmodal from '../checkout/checkoutModal'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width:"250px",
    height:"310px",
    marginRight:"5px",
    marginBottom:"5px"
  },
  media: {
    margin: "auto",
    height:"40%",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function ProductCard({prod,setProdtoRemove}) {
  const classes = useStyles();
  const [raised,setRaised]=useState(2);
  const [count,setCount]=useState(prod.quantity);
  const [openPayment,setOpenpayment]=useState(false)
  const [order,setOrder]=useState([])
  
  var profile = JSON.parse(localStorage.getItem("profile"));
  const dispatch=useDispatch()

  const handleBuynow=()=>{
       setOrder([{
        count:prod.quantity,_id:prod.product._id,name:prod.product.name,
        description:prod.product.description,price:prod.product.price,
        category:prod.product.category
      }])
      setOpenpayment(true)
  }
  const handleRemove=(e)=>{
     e.preventDefault()
     dispatch(updateCart(profile.user._id,{id:prod.product._id,quantity:0}))
  }
  const handleUpdate=(e)=>{
    e.preventDefault()
    dispatch(updateCart(profile.user._id,{id:prod.product._id,quantity:count}))  
  }
  function handleInc(){
    setCount(count+1)
  }
  function handleDec(){
    setCount(count-1)
  }
//  console.log(history)
  //onClick={history.push(`/product/${prod._id}`)}
  return (
    <div>
    <Card className={classes.root}  
    elevation={raised} 
    onMouseOver={() => setRaised(10)} 
    onMouseOut={() => setRaised(2)}
    raised={raised}>
      <CardMedia
        component="image"
        alt={prod.product.name}
        className={classes.media}
        height="140"
        image={`data:${prod.product.photo.contentType};base64,${Buffer.from(prod.product.photo.data.data).toString('base64')}`}
        title={prod.product.name}
      />
      <CardHeader
        title={prod.product.name}
        subheader={prod.product.description.length>=29?prod.product.description.slice(0,27)+"..":prod.product.description}
        action={
            <IconButton aria-label="share">
          <Share />
        </IconButton>}
        titleTypographyProps={{variant:'h6' }}
        subheaderTypographyProps={{variant:'subtitle2' }}
      />
      
      <CardContent>
      <div style={{display:"inline-block",width:"100%",marginTop:"-50px"}}>
        <span style={{float:"left"}}> <Typography variant="body1" color="textPrimary" component="p">
            Rs. {prod.product.price}
          </Typography></span> 
          <span style={{float:"right",marginTop:"-5px"}}> <ButtonGroup size="small" aria-label="small outlined button group">
        <IconButton onClick={handleDec} color="secondary"><Remove /></IconButton>
        <Button disabled><span style={{fontWeight:"bold",color:"blue"}}>{count}</span></Button>
        <IconButton onClick={handleInc} color="primary"><Add/></IconButton>
      </ButtonGroup></span> 
      </div>
      </CardContent>
      <CardActions>
      <Button
        variant="contained"
        color="secondary"
        style={{marginLeft:"auto",marginRight:"-80px"}}
        onClick={handleRemove}
      ><Delete/></Button>
      <Button
        variant="contained"
        color="primary"
        style={{marginLeft:"auto"}}
        onClick={prod.quantity==count?handleBuynow:handleUpdate}
      >{prod.quantity==count?<Shop/>:<Update/>}</Button>
      </CardActions>
    </Card>
    <Checkoutmodal open={openPayment} setOpen={setOpenpayment}  order={order} isCart={true} setProdtoRemove={setProdtoRemove} />
    </div>
  );
}

  
  export default ProductCard;

 