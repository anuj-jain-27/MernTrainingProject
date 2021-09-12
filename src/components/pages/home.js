
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './mobilestyles';
import { login } from '../../actions/auth';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import pic1 from '../../images/one.jpg';
import pic2 from '../../images/two.jpg';
import pic3 from '../../images/three.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Line from "../Line";


function Home() {
  localStorage.removeItem("broadband")
  localStorage.removeItem("mobileplan") 
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title} style={{marginTop:"10px", fontSize:"25px"}} gutterBottom variant="h6" component="h5">Telstra Enterprise</Typography>
      <Line color="#3f51b5"/> 
<div style={{marginLeft:"20px"}}>
 Are you ready to be what's next?
 We're working with Australian organisations to create progress for their business by harnessing the power of Australia's best network of networks, our world-class experts and adaptive capabilities.
 </div>
 <Typography className={classes.title} style={{marginTop:"10px", fontSize:"25px", fontStyle:"bold"}} gutterBottom variant="h6" component="h5">Included in your Telstra Plan</Typography>
 <Line color="#3f51b5"/> 
 <Typography className={classes.title} style={{marginTop:"10px", fontSize:"12px"}} gutterBottom variant="h6" component="h5">A reliable connection is just a start</Typography>
      <Container>
      <Row md={12} sm={12} xs={12} >
    <Col > <img height='200px' width="250px"  src={pic1} align="center" ></img></Col>
    <Col> <img height='200px' width="250px"  src={pic2} align="center" ></img></Col>
    <Col> <img height='200px' width="250px" src={pic3} align="center"></img></Col>
  </Row>
  <Row md={12}  sm={12} xs={12} style={{marginTop:"20px"}} spacing={3}>
    <Col> <p>Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers.

4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower</p></Col>
    <Col><p> Home phone service
+ unlimited standard Australian mobile calls
Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.</p></Col>
    <Col><p> Broadband Protect
Cyber threat protection for your family
With parental controls, social network protection and device protection to help keep everyone at home safe online.</p></Col>
  </Row>
  </Container>

    </div>
    );
  }
  
  export default Home;