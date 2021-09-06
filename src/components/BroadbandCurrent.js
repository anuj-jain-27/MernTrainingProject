import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
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
import {getplans} from "../actions/plancart";
import { getCurrentBroadbandPlan } from '../actions/currentbroadband';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Plan from './Posts/Post/Plan';
import { getbroadbands } from '../actions/broadband';
import currentbroadband from '../reducers/currentbroadband';

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
function BroadbandCurrent() {
  const classes_1=useStyles_1
  const [currentValue, setCurrentValue] = useState(0);
  const [bid, setBid] = useState(0);
  const [currentBplan, setCurrentBplan] = useState(0);
  const [state_start, setState_start] = React.useState({
    age: '',
    name: 'hai',
  });
  const [state_end, setState_end] = React.useState({
    age: '',
    name: 'hai',
  });
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (broadbands.length == 0)
      dispatch(getbroadbands());
  }, [dispatch])

  const broadbands = useSelector((state) => state.broadbands);
  const plans = useSelector((state) => state.plans);
  console.log(broadbands)
  var user=JSON.parse(localStorage.getItem('profile')).user._id

  useEffect(() => {
    if (currentbroadband.length == 0)
      dispatch(getCurrentBroadbandPlan(user));
  }, [dispatch])

  const currentbroadband = useSelector((state) => state.currentbroadband);
  
  // console.log(currentbroadband)
  // console.log(currentbroadband[currentbroadband.length-1].usage)
  if(currentbroadband.length!=0){
    var broadbandid=currentbroadband[currentbroadband.length-1].productId}
   console.log(broadbandid)

//   for (var k=0; k<broadbands.length; k++){
//       if(broadbands[k]._id===broadbandid){
//       setCurrentBplan(broadbands[k])
//   }
//  }
//  console.log(currentBplan)

  // const plans = useSelector((state) => state.plans);
  // console.log(plans)

  const posts = useSelector((state) => state.posts);
  var dataconsumed= 12;
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
  var Total_Consumption=0;
  for(var i=parseInt(startingdata); i<= parseInt(endingdata); i++){
      Total_Consumption=Total_Consumption+datas[i].dc
  }
  const classes = useStyles();


    return (
     ( datas.length ==0 || broadbands.length ==0 || currentbroadband.length==0?<CircularProgress />:
      <>
      <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
        <Card className={classes.root} style={{marginBottom:"5px"}} variant="outlined">
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        MY CURRENT BROADBAND PLAN
        </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h5">Price -{currentbroadband[currentbroadband.length-1].amount} /Month</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Plan Type: {currentbroadband[currentbroadband.length-1].plantype}</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Validity: {currentbroadband[currentbroadband.length-1].plantill.slice(0,10)} days</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Data:{currentbroadband[currentbroadband.length-1].usage} GB</Typography>

        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL: {currentbroadband[currentbroadband.length-1].usage} GB </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL USED:{dataconsumed} </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">BALANCE: </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
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