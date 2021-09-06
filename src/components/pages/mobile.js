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
import MPlansHistory from '../mplanshistory'


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

  console.log(datas)
    return (
      <Container maxWidth="lg">
      <Scroll showBelow={50} />
    <FormControl component="fieldset">
   <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
   <FormControlLabel value="view" control={<Radio color="primary" />} label="View Mobile Plan" />
   <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Current plans" />
   <FormControlLabel value="prev" control={<Radio color="primary" />} label="View Recharge History " />
   
   </RadioGroup>
   </FormControl>
   <Typography>MOBILE PLANS</Typography>
   {value==="view" ?
         <>
         <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
             <Grid item xs={12} sm={6}>
             <Table data={posts}/>
             </Grid>
             <Grid item xs={12} sm={6}>
             <MobileCurrent/>
             </Grid>
           </Grid>
           <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
             <Grid item xs={12} sm={5}>
             <Posts setCurrentId={setCurrentId}  currentId={currentId} />
             </Grid>
             <Grid style={{marginLeft:"5px"}}item xs={12} sm={6}>
             <DataUsageMPlans/>
             </Grid>
           </Grid>
           </>
          : 
          <>
          {value==="add" ?
          <>
             <Form currentId={currentId} setCurrentId={setCurrentId} />
            </>
             :    <> {value==="prev" ?
             <>
                <><MPlansHistory/></> 
               </>
                :    <></> 
             }</> 
          }
          </>
     }
       </Container>
    )}
    
  

  export default Mobile;
