import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { getPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import BPost from './BPost/BPost';
import useStyles from './styles';
import broadband from '../../reducers/broadband';
import { getbroadbands } from '../../actions/broadband';
import Snackbar from '../notifications/snackbar'

const BPosts = ({ currentId_broadband, setCurrentId_broadband}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (broadbands.length == 0)
      dispatch(getbroadbands());
  }, [dispatch])
  const broadbands = useSelector((state) => state.broadbands);
  console.log(broadbands)
  const classes = useStyles();
  const [snackBarMsg, setSnackBarMsg] = useState(null)

  

  return  (
    broadbands.length==0 ? <CircularProgress /> : (
      <>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {broadbands.map((broadband) => (
          <Grid key={broadband._id} item xs={12} sm={6} md={6}>
            <BPost setSnackBarMsg={setSnackBarMsg} broadband={broadband} currentId_broadband={currentId_broadband} setCurrentId_broadband={setCurrentId_broadband}/>
          </Grid>
        ))}
      </Grid>
      {snackBarMsg ? <Snackbar snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> : null}
      </>
    
    )
  );
};

export default BPosts;


