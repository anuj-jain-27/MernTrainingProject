import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
//import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../actions/posts';
import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import {getplans} from "../../actions/plancart";


    const Form = ({currentId, setCurrentId}) => {
      const [postData, setPostData] = useState({ plan: '', validity: '', data: '', SMS: '', cost: ''});
      const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
      const dispatch = useDispatch();
      const classes = useStyles();
      useEffect(() => {
        if (plans.length == 0)
          dispatch(getplans());
      }, [dispatch])
    
      const plans = useSelector((state) => state.plans);
      // var user=plans[plans.length-1].user
     
      useEffect(() => {
        if (post) setPostData(post);
      }, [post]);
      const details = localStorage.getItem("profile");
      //console.log(JSON.parse(localStorage.getItem('profile')).user._id)
      var user=JSON.parse(localStorage.getItem('profile')).user._id
      const clear = () => {
        setCurrentId(0);
        setPostData({ plan: '', validity: '', data: '', SMS: '', cost: '' });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost(user, postData));
          clear();
        } else {
          dispatch(updatePost(user, currentId, postData));
          clear();
        }
      };
      return (
        <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h8">{currentId ? 'Editing a Mobile Plan' : ``}</Typography>
            <TextField  size="small" name="plan" variant="outlined" label="Plan" fullWidth value={postData.plan} onChange={(e) => setPostData({ ...postData, plan: e.target.value })} />
            <TextField  size="small" name="validity" variant="outlined" label="Validity" fullWidth value={postData.validity} onChange={(e) => setPostData({ ...postData, validity: e.target.value })} />
            <TextField  size="small" name="data" variant="outlined" label="Data" fullWidth  value={postData.data} onChange={(e) => setPostData({ ...postData, data: e.target.value })} />
            <TextField  size="small" name="SMS" variant="outlined" label="SMS" fullWidth value={postData.SMS} onChange={(e) => setPostData({ ...postData, SMS: e.target.value })} />
            <TextField  size="small" name="cost" variant="outlined" label="Cost" fullWidth value={postData.cost} onChange={(e) => setPostData({ ...postData, cost: e.target.value })} />
            <Button  size="small" className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  size="small" data-testid="button" variant="contained" color="primary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
        </Container>
</Grow>
</Container>
      );
    };
    
    export default Form;


