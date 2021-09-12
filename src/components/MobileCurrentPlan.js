import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import useStyles from './pages/mobilestyles';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../actions/dataconsump"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import {CircularProgress } from '@material-ui/core';
import { addtocart, fetchplanscart } from '../api';
import {getplans} from "../actions/plancart";
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Plan from './Posts/Post/Plan';
import { getbroadbands } from '../actions/broadband';
import {getplanbyid} from "../actions/plancart";

const useStyles_1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
function MobileCurrent() {
  const classes_1=useStyles_1
  const [currentValue, setCurrentValue] = useState(0);
  const dispatch = useDispatch();
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user=profile?.user?._id
  useEffect(() => {
    if (planuser.length == 0)
      dispatch(getplanbyid(user));
  }, [dispatch])
  const planuser = useSelector((state) => state.planuser);
  console.log(planuser)

  const [state_start, setState_start] = React.useState({
    age: '',
    name: 'hai',
  });
  const [state_end, setState_end] = React.useState({
    age: '',
    name: 'hai',
  });
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  useEffect(() => {
    if (datas.length == 0)
      dispatch(getdataconsump());
  }, [dispatch])

  useEffect(() => {
    if (plans.length == 0)
      dispatch(getplans());
  }, [dispatch])


  const plans = useSelector((state) => state.plans);
  console.log(plans)
  const posts = useSelector((state) => state.posts);
  const datas = useSelector((state) => state.datas);
  const handleChange_start = (event) => {
    const name = event.target.name;
    setState_start({
      ...state_start,
      [name]: event.target.value,
    });
  };
  const handleChange_end = (event) => {
    const name = event.target.name;
    setState_end({
      ...state_end,
      [name]: event.target.value,
    });
  };
  var startingdata=state_start.start;
  var endingdata=state_end.end;
  var Total_Consumption=34;
  for(var i=parseInt(startingdata); i<= parseInt(endingdata); i++){
      Total_Consumption=Total_Consumption+datas[i].dc
  }
  const classes = useStyles();
    return (
     ( datas.length==0 ||  planuser.length ==0 ?<></>:
      <>
      <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
        <Card className={classes.root} style={{marginBottom:"5px"}} variant="outlined">
        <CardContent>
        <div style={{padding:"10px", backgroundColor:"#8cd2e8"}}>
        <Typography  style={{ fontWeight:"fontWeightBold"}} className={classes.title} color="textSecondary" gutterBottom>
        MY CURRENT MOBILE PLAN
        </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h5">Plan - Rs {plans[plans.length-1]?.plan} </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h5">Validity -{plans[plans.length-1]?.validity} Days</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Data - {plans[plans.length-1]?.data} GB</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">SMS- Rs {plans[plans.length-1]?.SMS}/Day</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Cost- Rs {plans[plans.length-1]?.cost}</Typography>
        </div>
        <div style={{padding:"10px", backgroundColor:"#203354", color:"white"}}>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL - {plans[plans.length-1]?.data}</Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL USED - {Total_Consumption}</Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">BALANCE - {plans[plans.length-1]?.data-Total_Consumption}</Typography>
        </div>
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
     
  
  export default MobileCurrent;