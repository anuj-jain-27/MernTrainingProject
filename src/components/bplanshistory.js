import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './Posts/styles';
import {getbroadbandhistory} from "../actions/broadbandhis";
import BPlan from "../components/BPosts/BPost/BPlan"

const BPlansHistory= () => {
  const dispatch = useDispatch();
  var user=JSON.parse(localStorage.getItem('profile')).user._id
  useEffect(() => {
    if (broadbandhistory.length == 0)
      dispatch(getbroadbandhistory(user));
  }, [dispatch])

  const broadbandhistory = useSelector((state) => state.broadbandhistory);
  console.log(broadbandhistory)

  const classes = useStyles();

  return  (
    broadbandhistory.length==0 ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {broadbandhistory.map((broadbandhis) => (
        <Grid key={broadbandhis._id} item xs={12} sm={6} md={3}>
          <BPlan broadbandhis={broadbandhis}  />
        </Grid>
      ))}
      </Grid>
    )
  );
};

export default BPlansHistory;




