import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { getPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId, currentId}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length == 0)
      dispatch(getPosts());
  }, [dispatch])

  const posts = useSelector((state) => state.posts);
  
  console.log(posts)
  const classes = useStyles();

  return  (
    posts.length==0 ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId}  currentId={currentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
