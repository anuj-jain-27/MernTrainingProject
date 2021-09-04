import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,IconButton,Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {Shop,AddShoppingCart,Share,Delete,Edit} from "@material-ui/icons";
import { useDispatch} from 'react-redux';

import {deleteProduct,updateProduct} from '../../actions/products'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width:"350px",
    height:"400px",
    marginRight:"5px",
    marginBottom:"5px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  media1: {
    height: 200,     // as an example I am modifying width and height
    width: 350
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function ProductCard({prod,role,setselected,setOpen}) {
  const classes = useStyles();
  const dispatch=useDispatch()
  //console.log(prod.photo.data.data)  
  
  const handleDelete= ()=>{
      dispatch(deleteProduct(prod._id))
  }
  const handleUpdate=async ()=>{
      setOpen(true)
      setselected({...prod})
  }
  const handleAddcart=()=>{

  }
  const handleBuynow=()=>{

  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media1}
        image={`data:${prod.photo.contentType};base64,${Buffer.from(prod.photo.data.data).toString('base64')}`}
        title={prod.name}
        style={{resizeMode:'contain'}}
      />
      <CardHeader
        title={prod.name}
        subheader={prod.description}
        action={
            <IconButton aria-label="share">
          <Share />
        </IconButton>
        }
      />
      
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
            Rs. {prod.price}
        </Typography>
      </CardContent>
      <CardActions>
      <Button
        variant="contained"
        color={role==0?"primary":"secondary"}
        className={classes.button}
        endIcon={role==0?<AddShoppingCart />:<Delete/>}
        style={{width:"175px"}}
        onClick={role==0?handleAddcart:handleDelete}
      >
        {role==0?"Add To Cart":"Delete"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={role==0?<Shop/>:<Edit/>}
        style={{width:"175px"}}
        onClick={role==0?handleBuynow:handleUpdate}
      >
        {role==0?"Buy Now":"Update"}
      </Button>
      </CardActions>
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