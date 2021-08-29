
import { Button, InputAdornment, Typography, Paper, TextField } from '@material-ui/core';


import { addProduct,updateProduct } from '../../actions/products';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '../notifications/snackbar'


function ProductForm({ selected,handleClose,setselected }) {
    const defaultData = selected?{...selected}:{ name: '', stock: 0, description: '', price: 0, photo: '' };
    const [dataObj, setdataObj] = useState(defaultData)
    if(selected)
      console.log(selected)
    const dispatch = useDispatch();
    const [snackBarMsg, setSnackBarMsg] = useState(null)
    var handleSubmit = async (e) => {
        if (dataObj.name != '' && dataObj.price != 0) {
            if (!selected) {
                try {
                    console.log(dataObj.photo)
                    const formData = new FormData();
                    Object.keys(dataObj).forEach(key => formData.append(key, dataObj[key]));
                    var response = await dispatch(addProduct(formData))
                    console.log(response)
                } catch (error) {
                    console.log("From handleClICK", error)
                    setSnackBarMsg({ message: "error occured", severity: "error" })
                }
                console.log("product added")
                setSnackBarMsg({ message: "Product added Successfully..!", severity: "success" })
                setdataObj(defaultData)
            } else {
                try{
                    const formData = new FormData();
                    Object.keys(dataObj).forEach(key => formData.append(key, dataObj[key]));
                    var response = await dispatch(updateProduct(selected._id,formData))
                    console.log(response)
                }catch(error){
                    console.log("From handleClICK", error)
                    setSnackBarMsg({ message: "error occured", severity: "error" })
                }
                console.log("Product Updated")
                    setSnackBarMsg({ message: "Product Updated Successfully..!", severity: "success" })
                    handleClose()
                    setselected(null)
            }
        }
    }
    return (
        <div style={{ height: "530px", width: "420px" }}>
            <form style={{ width: "400px", height: "500px" }}>
                <Typography color="primary" variant="h6" align="center">{!selected ? "Add a Product" : "Update a Product"}</Typography>
                <TextField id="outlined-full-width" label="Product Name" style={{ margin: 8 }} placeholder="Enter product name here"
                    fullWidth margin="normal" required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined" value={dataObj.name}
                    onChange={(e) => setdataObj({ ...dataObj, name: e.target.value })}
                />
                <TextField id="outlined-full-width" label="Quantity" style={{ margin: 8 }} placeholder="Enter units of product"
                    fullWidth margin="normal" type="Number" required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined" value={dataObj.stock}
                    onChange={(e) => setdataObj({ ...dataObj, stock: e.target.value })}
                />
                <TextField id="outlined-full-width" label="Sold quantity" style={{ margin: 8 }} placeholder="0"
                    fullWidth margin="normal" type="Number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    disabled="true" value={dataObj.sold}
                />
                <TextField
                    label="Price" id="outlined-start-adornment" style={{ margin: 8 }} fullWidth={true}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                    variant="outlined" margin="normal" type="Number" required value={dataObj.price}
                    onChange={(e) => setdataObj({ ...dataObj, price: e.target.value })}
                />
                <TextField
                    id="outlined-multiline-static" label="Description" multiline fullWidth
                    rows={4} defaultValue="" variant="outlined" style={{ marginLeft: "7px" }}
                    onChange={(e) => setdataObj({ ...dataObj, description: e.target.value })}
                    value={dataObj.description}
                />
                <div style={{ marginLeft: "6px", marginTop: "10px", float: "left" }}><input type="file" onChange={(e) => {
                    console.log("inside: ", e.target)
                    setdataObj({ ...dataObj, photo: e.target.files[0] })
                }
                } /></div>
                <Button variant="contained" color="primary" disableElevation style={{ marginTop: "10px", width: "150px" }} onClick={handleSubmit}>
                    {!selected ? "Add" : "Update"}
                </Button>
            </form>
            {snackBarMsg ? <Snackbar snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> : null}
        </div>
    );
}

export default ProductForm;