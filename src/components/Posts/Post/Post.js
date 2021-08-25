import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Line from "../../Line"
// import { deletePost } from '../../../actions/posts';
import useStyles from './styles';


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  var cart=[]
  


  return (
    <Card className={classes.card}>
      <div className={classes.overlay2}>
      </div>
      <div className={classes.details}>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Plan - Rs {post.plan}</Typography>
      <Typography className={classes.title} gutterBottom variant="h6" component="h4">validity - {post.validity} days</Typography>
      <CardContent style={{top:"-20px"}}>
      <Line color="#3f51b5"/>
        <Typography variant="body2" color="textSecondary" component="p">Data - {post.data} GB</Typography>
        <Typography variant="body2" color="textSecondary" component="p">SMS - {post.SMS}/ Day</Typography>
        <Typography variant="body2" color="textSecondary" component="p">Rs - {post.cost}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      
      </CardActions>
    </Card>
  );
};

export default Post;
