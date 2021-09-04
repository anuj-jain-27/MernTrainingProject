import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Line from "../../Line"
import useStyles from './styles';

const BPlan = ({ broadbandhis}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.overlay2}>
      </div>
      <div className={classes.details}>
      </div>
      <Typography className={classes.title} gutterBottom variant="h7" component="h5">Price -{broadbandhis.amount} /Month</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Plan Type: {broadbandhis.plantype}</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Validity: {broadbandhis.plantill.slice(0,10)} days</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Data:{broadbandhis.usage} GB</Typography>
    </Card>
  );
};

export default BPlan;
