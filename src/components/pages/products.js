import ProductCard from '../productcard/card'
import { getProducts } from '../../actions/products';
import ProductForm from '../forms/productform'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, CircularProgress,Paper, Fab, Typography, Modal, Fade, Backdrop } from '@material-ui/core';
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

function Product() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selected,setselected]=useState(null)

  const handleAdd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setselected(null)
  };

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getProducts());
      console.log("dispatching getProducts")
    }
  }, [dispatch])

  var prodjsx = products.map(prod => {
    return <ProductCard prod={prod} role={0} setselected={setselected} setOpen={setOpen} />
  });

  return (
    <div>
      <Grid container justify="center" alignItems="center" alignContent="center" spacing={3}
        style={{ marginTop: "5px" }}>
        {products.length != 0 ? prodjsx : <CircularProgress />}
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{marginTop:"50px"}}>
                <ProductForm selected={selected} handleClose={handleClose} setselected={setselected}/>
          </div>
        </Fade>
      </Modal>
      <Fab color="primary" aria-label="add" size="large" style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Add onClick={handleAdd} />
      </Fab>
    </div>
  );
}

export default Product;