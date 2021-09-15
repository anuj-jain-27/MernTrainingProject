
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './mobilestyles';
import { login } from '../../actions/auth';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { Container, AppBar, Grow, Grid} from '@material-ui/core';
import pic1 from '../../images/one.jpg';
import pic2 from '../../images/two.jpg';
import pic3 from '../../images/three.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Line from "../Line";
import ImageSlider from './imageSlider';


function Home() {
  localStorage.removeItem("broadband")
  localStorage.removeItem("mobileplan") 
  const classes = useStyles();
  const [elevated, setElevated]=useState(2);
  return (
    <Container>
      <Typography className={classes.title} style={{marginTop:"10px", fontSize:"25px"}} gutterBottom variant="h6" component="h5">Telstra Enterprise</Typography>
      <Line color="#3f51b5"/> 
<div style={{marginLeft:"20px"}}>
 Are you ready to be what's next?
 We're working with Australian organisations to create progress for their business by harnessing the power of Australia's best network of networks, our world-class experts and adaptive capabilities.
 </div>
 <Typography className={classes.title} style={{marginTop:"10px", fontSize:"25px", fontStyle:"bold"}} gutterBottom variant="h6" component="h5">Included in your Telstra Plan</Typography>
 <Line color="#3f51b5"/> 
 <ImageSlider/>
    </Container>
    );
  }
  
  export default Home;