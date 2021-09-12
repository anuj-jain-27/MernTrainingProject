import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container, Button, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './pages/mobilestyles';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../actions/dataconsump"
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress } from '@material-ui/core';
import {getplans} from "../actions/plancart";
import { getCurrentBroadbandPlan } from '../actions/currentbroadband';
import { getbroadbands } from '../actions/broadband';
import currentbroadband from '../reducers/currentbroadband';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import BPost from './BPosts/BPost/BPost';
import BPosts from './BPosts/BPosts';
import Table_broadband from './Table_broadband';
import Table_broadband_Upgrade from './TableBroadbandUpgrade';
import PaymentModal from './pages/paymentmodal';
import Snackbar from '../components/notifications/snackbar'

const useStyles_1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useStyles_2 = makeStyles((theme) => ({
 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
 
}));
function BroadbandCurrent( BUpgrade, setBUpgrade) {
  
  const [currentValue, setCurrentValue] = useState(0);
  const [bid, setBid] = useState(0);
  const [currentBplan, setCurrentBplan] = useState(0);
  const [currentId_broadband, setCurrentId_broadband] = useState(0);
  const [rows, setRows]= useState({});
  const [clicked, setClicked] = useState(null)

  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);


 
  useEffect(() => {
    if (datas.length == 0)
      dispatch(getdataconsump());
  }, [dispatch])

  useEffect(() => {
    if (plans.length == 0)
      dispatch(getplans());
  }, [dispatch])

  useEffect(() => {
    if (broadbands.length == 0)
      dispatch(getbroadbands());
  }, [dispatch])

  const broadbands = useSelector((state) => state.broadbands);
  const plans = useSelector((state) => state.plans);
  console.log(broadbands)
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user=profile?.user?._id
  console.log(BUpgrade)
  useEffect(() => {
    if (currentbroadband.length == 0)
      dispatch(getCurrentBroadbandPlan(user));
  }, [dispatch])

  const currentbroadband = useSelector((state) => state.currentbroadband);
  console.log(currentbroadband)
  var broadbands_upgrades=[]
  for (var j=0; j<broadbands.length; j++){
    if(broadbands[j].monthlyprice+parseInt(broadbands[j].installationcharges)>currentbroadband[currentbroadband.length-1]?.amount){
      broadbands_upgrades.push(broadbands[j])
    }}
  console.log(broadbands_upgrades)


  if(currentbroadband.length!=0){
    var broadbandid=currentbroadband[currentbroadband.length-1].productId}
   console.log(broadbandid)


  var dataconsumed= 12;
  const datas = useSelector((state) => state.datas);

  const [open, setOpen] = React.useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClicked(false)
  };
  //Clicked turns on for payment for upgrade
  const openPayment = () => {
    setClicked(true)
    console.log(clicked)
  };
  const openUpgrade = () => {
    setClicked(false)
    console.log(clicked)
  
  };
  const classes = useStyles();
  const classes_1=useStyles_1();
  console.log(rows)
  if (rows?._id != null){
    localStorage.setItem('broadband',JSON.stringify(rows))
   }
  console.log(currentbroadband[currentbroadband.length-1])
  
    return (
     ( datas.length ==0 || broadbands.length ==0 || currentbroadband.length==0?<CircularProgress />:
      <>
      <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
        <Card className={classes.root} style={{marginBottom:"5px"}} variant="outlined">
        <CardContent>
        <div style={{padding:"10px", backgroundColor:"#8cd2e8"}}>
        <Typography style={{ fontWeight:"fontWeightBold"}} className={classes.title} color="textSecondary" gutterBottom>
        MY CURRENT BROADBAND PLAN
        </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h5">Price -{currentbroadband[currentbroadband.length-1]?.amount} /Month</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Plan Type: {currentbroadband[currentbroadband.length-1]?.plantype}</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Validity: {currentbroadband[currentbroadband.length-1]?.plantill.slice(0,10)} days</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Data:{currentbroadband[currentbroadband.length-1]?.usage} GB</Typography>
        </div>
        <div style={{padding:"10px", backgroundColor:"#203354", color:"white"}}>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL: {currentbroadband[currentbroadband.length-1]?.usage} GB </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL USED:{dataconsumed} </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">BALANCE: 48</Typography>
        </div>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        {currentbroadband[currentbroadband.length-1]?.isupgrade===0?<>
         <Button type="button"  className={classes.buttonSubmit} variant="contained" color="primary" fullWidth onClick={handleOpen}>
          UPGRADE PLAN
      </Button>
         <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes_1.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {clicked?<><PaymentModal clicked={clicked} /> <Button type="button"  style={{right:"100px", top:"180px"}} className={classes.buttonSubmit}  variant="contained" color="primary" onClick={openUpgrade} >
            Back
           </Button></> :
          <><div className={classes_1.paper}>
          <h2 id="transition-modal-title">Choose among the following plans to upgrade</h2>
          <Table_broadband_Upgrade data={broadbands_upgrades} setRows={setRows} rows={rows}/>
          {rows?._id?<> <Button type="button"  className={classes.buttonSubmit} style={{marginTop:"20px", marginleft:"auto", display: "block"}} variant="contained" color="primary" onClick={openPayment} >
            Proceed to payment
           </Button></>:<></>}
        </div></>}
         
        </Fade>
      </Modal>
         
         </>:<></>}
        </CardContent>
        <CardActions>
        </CardActions>
        </Card>
    </Grid>
    </Container>
</Grow>
</Container>
</>
  ));
  };
     
  
  export default BroadbandCurrent;