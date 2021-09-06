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
import { addtocart, fetchplanscart } from '../api';
import {getplans} from "../actions/plancart";
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Plan from './Posts/Post/Plan';
import { getbroadbands } from '../actions/broadband';

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
function BroadbandMUsagePlans() {
  const classes_1=useStyles_1
  const [currentValue, setCurrentValue] = useState(0);
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
  
  console.log(broadbands)


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
  var Total_Consumption=0;
  for(var i=parseInt(startingdata); i<= parseInt(endingdata); i++){
      Total_Consumption=Total_Consumption+datas[i].dc
  }
  const classes = useStyles();


    return (
     ( datas.length ==0 || broadbands.length ==0?<CircularProgress />:
      <>
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid container style={{marginTop:"20px"}} justify="space-between" alignItems="stretch" spacing={3}>
            <Card style={{marginBottom:"10px", width:"320px"}} className={classes.root}  variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                 BROADBAND DATA USAGE TODAY : {datas[datas.length-1].dc}/ 2 GB
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                </Typography>
                <div>
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Start date
        </InputLabel>
        <NativeSelect
          value={state_start.startingdate}
          onChange={handleChange_start}
          inputProps={{
            name: 'start',
            id: 'age-native-label-placeholder',
          }}
        >
          <option value="">None</option>
          <option value={1}>1/8/21</option>
          <option value={2}>2/8/21</option>
          <option value={3}>3/8/21</option>
          <option value={4}>4/8/21</option>
          <option value={5}>5/8/21</option>
          <option value={6}>6/8/21</option>
          <option value={7}>7/8/21</option>
          <option value={8}>8/8/21</option>
          <option value={9}>9/8/21</option>
          <option value={10}>10/8/21</option>
          <option value={12}>11/8/21</option>
          <option value={13}>12/8/21</option>
          <option value={14}>13/8/21</option>
          )
        </NativeSelect>
      </FormControl> 
      <div>
      </div>
      <div>
      </div>
      <FormControl className={classes.formControl_1}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          End Date
        </InputLabel>
        <NativeSelect
          value={state_end.endingdate}
          onChange={handleChange_end}
          inputProps={{
            name: 'end',
            id: 'age-native-label-placeholder',
          }}
        >
          <option value="">None</option>
          <option value={15}>15/8/21</option>
          <option value={16}>16/8/21</option>
          <option value={17}>17/8/21</option>
          <option value={18}>18/8/21</option>
          <option value={19}>19/8/21</option>
          <option value={20}>20/8/21</option>
          <option value={21}>21/8/21</option>
          <option value={22}>22/8/21</option>
          <option value={23}>23/8/21</option>
          <option value={24}>24/8/21</option>
          <option value={25}>25/8/21</option>
          <option value={26}>26/8/21</option>
          <option value={27}>27/8/21</option>
        </NativeSelect>
      </FormControl>
      </div>
      BROADBAND CONSUMPTION : {Total_Consumption}
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
  }
     
  
  export default BroadbandMUsagePlans;