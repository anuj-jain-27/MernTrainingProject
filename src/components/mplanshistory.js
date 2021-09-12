import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './Posts/styles';
import {getplans} from "../actions/plancart";
import {getplanbyid} from "../actions/plancart";
import Plan from "../components/Posts/Post/Plan"

const MPlansHistory= () => {
  const dispatch = useDispatch();
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user= profile?.user?._id
  useEffect(() => {
    if (plans.length == 0)
      dispatch(getplans());
  }, [dispatch])

  useEffect(() => {
    if (planuser.length == 0)
      dispatch(getplanbyid(user));
  }, [dispatch])

  const plans = useSelector((state) => state.plans);
  console.log(plans)

  const planuser = useSelector((state) => state.planuser);
  console.log(planuser)
  const classes = useStyles();

  return  (
    planuser.length==0 ? <></> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {planuser.map((plan) => (
          <Grid key={plan._id} item xs={12} sm={6} md={3}>
            <Plan plan={plan}  />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default MPlansHistory
