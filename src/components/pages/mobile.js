import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container, AppBar, Fab,  Typography, Grow, Grid } from '@material-ui/core';
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
import Line from "../Line";
import ImageSlider from './imageSlider';
import { Add } from "@material-ui/icons";
import { History } from '@material-ui/icons';
import {CircularProgress,Paper,  Modal, Fade, Backdrop } from '@material-ui/core';
import "../progressbarStyles.css";
import "./PaymentForm.css";
import CloseIcon from '@material-ui/icons/Cancel';

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
  const [open_his, setOpen_his] = React.useState(false);
  const handleHis = () => {
    setOpen_his(true);
  };
  const handleClose_his = () => {
    setOpen_his(false);
    
  };
  const [open, setOpen] = React.useState(false);
  const handleAdd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    
  };

    return (
      <Container maxWidth="lg">
        <div style={{ zIndex: 3 }}>
      <Scroll showBelow={50} />
      </div>
   
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
            <Grid item xs={12} sm={12} md={6}>
            {user!==undefined && planuser.length!=0?<><DataUsageMPlans/></>:<></>}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              >


              <Fade in={open}>
              <div className={classes.paper}style={{
              position: 'absolute', left: '50%', top:'50%',
              transform: 'translate(-50%, -50%)', marginTop:"10px"
              }}>
                <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose}>Close</Button>
             <Form currentId={currentId} setCurrentId={setCurrentId} />
              </div>
              </Fade>
              </Modal>

           <><MobileCurrent/></>
            { profile?.user?.role==1?(<Fab color="primary" aria-label="add" size="medium" style={{ position: "fixed", bottom: "142px", right: "44px" }}>
            <Add  onClick={handleAdd}  />
            </Fab>):<></>}
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open_his}
            onClose={handleClose_his}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            >
            <Fade in={open_his}>
            <div className={classes.paper}style={{
            position: 'absolute', left: '50%', top:'50%',
            transform: 'translate(-50%, -50%)', marginTop:"10px"
            }}>
               <div class="wrapperone">
               <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose_his}>Close</Button>
                         <><MPlansHistory/></> 
                         </div>
            </div>
            </Fade>
            </Modal>


            { profile?.user ?(<Fab color="primary" aria-label="add" size="medium" style={{ position: "fixed", bottom: "86px", right: "44px" }}>
            <History  onClick={handleHis} />
            </Fab>):<></>}
            </Grid>
            </Grid>
          </>
          </>
          : 
          <>
          {value==="add" ?
          <>
          <div >
             <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
            </>
             :    <> {value==="prev" ?
             <>
                <><MPlansHistory/></> 
               </>
                :    <>  <div><span  STYLE="color:black;font-weight:600;font-size:38px">MOBILE PLANS</span></div>
                <Line color="#3f51b5"/> 
                <ImageSlider/>
       </> 
             }</> 
          }
          </>
     }
     
       </Container>
    )}
    
  

  export default Mobile;
