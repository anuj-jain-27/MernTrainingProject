import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Searchbar({setSearchtext}) {
  const classes = useStyles();
  const [text,setText]=useState("")
  function handleSubmit(e){
    e.preventDefault();
    setSearchtext(text);
  }
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Products.."
        inputProps={{ 'aria-label': 'Search Products...' }}
        onChange={(e)=>{
            setText(e.target.value)
            if(text=='')
            setSearchtext(text)
        }}
        value={text}
      />
      <IconButton type="submit" onClick={handleSubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
