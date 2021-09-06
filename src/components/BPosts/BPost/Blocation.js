import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Line from "../../Line"
import useStyles from './styles';

const Blocation = ({ blocation, currentId_blocation, setCurrentId_blocation,}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography className={classes.title} gutterBottom variant="h7" component="h5">Arrays{blocation.availableplans}</Typography>
    </Card>
  );
};

export default Blocation;
