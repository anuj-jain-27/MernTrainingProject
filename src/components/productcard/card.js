import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ButtonGroup,Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,IconButton,Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {Add,Remove,Shop,AddShoppingCartRounded,Share,Delete,Edit} from "@material-ui/icons";
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import {deleteProduct} from '../../actions/products'
import {addProductToCart} from '../../actions/cart'
import Googlemodal from '../googleauth/googlemodal'
import Checkoutmodal from '../checkout/checkoutModal'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width:"300px",
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

function ProductCard({prod,role=0,setselected,setOpen}) {
  const classes = useStyles();
  const [raised,setRaised]=useState(2);
  const [count,setCount]=useState(0);
  const [openLogin,setOpenLogin]=useState(false)
  const [openPayment,setOpenpayment]=useState(false)

  var profile = JSON.parse(localStorage.getItem("profile"));
  var display=(count>0)
  const dispatch=useDispatch()
  console.log("role card:",role)
  const handleDelete= ()=>{
      dispatch(deleteProduct(prod._id,profile.user._id))
  }
  const handleUpdate=async ()=>{
      setOpen(true)
      setselected({...prod})
  }
  const handleAddcart=(e)=>{
    e.preventDefault()
    if(!profile)
      setOpenLogin(true)
    else
      {
        dispatch(addProductToCart(profile.user._id,{product:prod._id,quantity:count}))
        setCount(0)
      }
  }
  
  const handleBuynow=()=>{
     if(!profile){
      setOpenLogin(true)
     }else{
      setOpenpayment(true)
     }
  }

  return (
    <Card className={classes.root} 
    elevation={raised}  
    onMouseOver={() => setRaised(10)} 
    onMouseOut={() => setRaised(2)}
    >
      <CardMedia
        component="image"
        alt={prod.name}
        className={classes.media}
        height="140"
        image={`data:${prod.photo.contentType};base64,${Buffer.from(prod.photo.data.data).toString('base64')}`}
        title={prod.name}
      />
      <CardHeader
        title={prod.name}
        subheader={prod.description.length>=29?prod.description.slice(0,27)+"..":prod.description}
        action={
            <IconButton aria-label="share">
          <Share />
        </IconButton>
        }
        titleTypographyProps={{variant:'h6' }}
        subheaderTypographyProps={{variant:'subtitle2' }}
      />
      <CardContent>
      <div style={{display:"inline-block",width:"100%",marginTop:"-50px"}}>
        <span style={{float:"left"}}> <Typography variant="body1" color="textPrimary" component="p">
            Rs. {prod.price}
          </Typography></span> 
          <span style={{float:"right",marginTop:"-5px"}}> <ButtonGroup size="small" aria-label="small outlined button group">
        <IconButton disabled={!display} onClick={()=>setCount(count-1)} color="secondary"><Remove fill/></IconButton>
        {display &&(<Button disabled><span style={{fontWeight:"bold",color:"blue"}}>{count}</span></Button>)}
        <IconButton onClick={()=>setCount(count+1)} color="primary"><Add fill/></IconButton>
      </ButtonGroup></span> 
      </div>
      </CardContent >
      <CardActions style={{marginTop:"-10px",display: 'flex'}}>
      <Button
        variant="contained"
        color={role==0?"primary":"secondary"}
        onClick={role==0?handleAddcart:handleDelete}
        style={{marginLeft:"auto",marginRight:"-80px"}}
      >{role==0?<AddShoppingCartRounded/>:<Delete/>}</Button>
      <Button
        variant="contained"
        color="primary"
        onClick={role==0?handleBuynow:handleUpdate}
        style={{marginLeft:"auto"}}
      >{role==0?<Shop/>:<Edit/>}</Button>
      </CardActions>
      <Googlemodal open={openLogin} setOpen={setOpenLogin}/>
      <Checkoutmodal open={openPayment} setOpen={setOpenpayment} isCart={false}
      order={[{_id:prod._id,count:count,name:prod.name,description:prod.description,price:prod.price,category:prod.category}]}
      />
    </Card>
  );
}

  
  export default ProductCard;

  /*
  //inside contentHeader for top right corner of card
         action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
  */