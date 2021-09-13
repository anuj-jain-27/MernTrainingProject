
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


function Home() {
  localStorage.removeItem("broadband")
  localStorage.removeItem("mobileplan") 
  const classes = useStyles();
  const [elevated, setElevated]=useState(2);
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
 <Grid className={classes.container} style={{marginRight:"5px"}} container alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={3} md={4}>
          <Card  className={classes.card}  elevation={elevated}  
    onMouseOver={() => setElevated(10)} 
    onMouseOut={() => setElevated(2)} >
      <CardMedia className={classes.media} image={pic1}/>
      <CardContent>
      Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers. 4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower
      </CardContent>
    </Card>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
          <Card  className={classes.card}  elevation={elevated}  
    onMouseOver={() => setElevated(10)} 
    onMouseOut={() => setElevated(2)} >
      <CardMedia className={classes.media} image={pic2}/>
      <CardContent>
      Home phone service
+ unlimited standard Australian mobile calls + 100 GBs of Data Consumption
Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.
      </CardContent>
    </Card>
          </Grid>
         
          <Grid item xs={12} sm={3} md={4}>
          <Card  elevation={elevated}  
    onMouseOver={() => setElevated(10)} 
    onMouseOut={() => setElevated(2)} className={classes.card}>
      <CardMedia className={classes.media} image={pic3}/>
      <CardContent>
      Broadband Protect
Cyber threat protection for your family
With parental controls, social network protection and device protection to help keep everyone at home safe online.
Ability to stream movies, play games and lots more
      </CardContent>
    </Card>
          </Grid>
          </Grid>
         
      </Container>
    </div>
    );
  }
  
  export default Home;