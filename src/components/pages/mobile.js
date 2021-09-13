import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './mobilestyles';
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../../actions/dataconsump";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataUsageMPlans from "../DataUsageMPlans";
import { makeStyles } from '@material-ui/core/styles';
import {getusers} from '../../actions/users';
import Table from '../Table';
import Scroll from "./Scroll";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MobileCurrent from '../MobileCurrentPlan';
import MPlansHistory from '../mplanshistory';
import mobilepic from '../../images/mobileplans.png';
import {Switch} from  '@material-ui/core';
import pic7 from '../../images/seven.jpg';
import pic8 from '../../images/eight.jpg';
import pic9 from '../../images/nine.png';
import { CardMedia } from '@material-ui/core/';
import Line from "../Line";


function Mobile() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log(posts)
  const dispatch = useDispatch();
  useEffect(() => {
    if (datas.length == 0)
      dispatch(getdataconsump());
  }, [dispatch])
  const [currentId, setCurrentId] = useState(0);
  const datas = useSelector((state) => state.datas);
  const [value, setValue] = React.useState('move');
  console.log(value)
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };
  const [toggle, setToggle]=useState(false);
  const toggler=()=>{
    toggle? setToggle(false): setToggle(true);
  }

  console.log(datas)
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user= profile?.user?._id
 
  const planuser = useSelector((state) => state.planuser);
  console.log(planuser)
  const [elevated, setElevated]=useState(2);

  // function handleSub(event) {
  //   clearTimeout(timer);
    
  //   if (event.detail === 1) {
  //     timer = setTimeout(() => {
  //       console.log("SINGLE CLICK");
  //     }, 200)
  
  //   } else if (event.detail === 2) {
  //     console.log("DOUBLE CLICK");
  //   }
  // }
    return (
      <Container maxWidth="lg">
      <Scroll showBelow={50} />
    <FormControl component="fieldset">
   <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>

   <FormControlLabel value="view" control={<Radio color="primary" />} label="View Mobile Plan" />
   {profile?.user?.role===1?<>
   <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Current plans" /></>:<></>}
   {profile?.user?._id!=null?<>
   <FormControlLabel value="prev" control={<Radio color="primary" />} label="View Recharge History " /></>:<></>}
   </RadioGroup>
   </FormControl>
   {value==="view" ?
         <>
         <>
        <Grid container style={{marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
           <Grid item xs={12} sm={12} md={6}>

             <div style={{ display: 'flex',flexDirection: 'row', alignItems:"center"}} >
             <span  STYLE="color:black;font-weight:400;font-size:14px"> Switch to view different layout </span> <Switch color="primary" style={{Bottom:"20px"}} onClick={toggler} alignItems="center" /> 
           </div>
           {toggle ?<> <Table data={posts}/> </>:<><Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
            <Grid item xs={12} sm={12} md={10}>
            <Posts setCurrentId={setCurrentId}  currentId={currentId} />
            </Grid></Grid></>}
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
            <MobileCurrent/>
            {user!==undefined && planuser.length!=0?<><DataUsageMPlans/></>:<></>}
            </Grid>
            </Grid>
          </>
          </>
          : 
          <>
          {value==="add" ?
          <>
          <div style={{
        position: 'absolute', left: '50%',
        transform: 'translate(-50%)', marginTop:"10px"
    }}>
             <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
            </>
             :    <> {value==="prev" ?
             <>
                <><MPlansHistory/></> 
               </>
                :    <>  <div><span  STYLE="color:black;font-weight:600;font-size:38px">MOBILE PLANS</span></div>
                <Line color="#3f51b5"/> 
                <Grid className={classes.container} style={{marginRight:"5px"}} container alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                <Card  className={classes.card}  elevation={elevated}  
          onMouseOver={() => setElevated(10)} 
          onMouseOut={() => setElevated(2)} >
            <CardMedia className={classes.media} image={pic7}/>
            <CardContent>
            Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers. 4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower
            </CardContent>
          </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <Card  className={classes.card}  elevation={elevated}  
          onMouseOver={() => setElevated(10)} 
          onMouseOut={() => setElevated(2)} >
            <CardMedia className={classes.media} image={pic8}/>
            <CardContent>
            Home phone service
+ unlimited standard Australian mobile calls + 100 GBs of Data Consumption
Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.

            </CardContent>
          </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <Card  className={classes.card}  elevation={elevated}  
          onMouseOver={() => setElevated(10)} 
          onMouseOut={() => setElevated(2)} >
            <CardMedia className={classes.media} image={pic9}/>
            <CardContent>
            Broadband Protect
Cyber threat protection for your family
With parental controls, social network protection and device protection to help keep everyone at home safe online.
Ability to stream movies, play games and lots more
            </CardContent>
          </Card>
                </Grid>
                </Grid></> 
             }</> 
          }
          </>
     }
     
       </Container>
    )}
    
  

  export default Mobile;
