import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Line from "../../Line"
import useStyles from './styles';

const Plan = ({ plan}) => {
  console.log(plan.id)
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.overlay2}>
      </div>
      <div className={classes.details}>
      </div>
      <Typography className={classes.title} gutterBottom variant="h6" component="h5">Plan - Rs {plan.plan}</Typography>
      <Typography variant="body2" style={{marginLeft:"10px"}} color="textSecondary" component="p">Payment Status- {plan.status}</Typography>
      <Typography variant="body2" style={{marginLeft:"10px"}} color="textSecondary" component="p">validity - {plan.validity} days</Typography>
      <CardContent style={{top:"-20px"}}>
      <Line color="#3f51b5"/>
        <Typography ariant="body2" color="textSecondary" component="p">Paid on - {plan.createdAt.slice(0,10)}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">Data - {plan.data} GB</Typography>
        <Typography variant="body2" color="textSecondary" component="p">SMS - {plan.SMS}/ Day</Typography>
      </CardContent>
    </Card>
  );
};

export default Plan;
