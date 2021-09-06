
import { Button,Select, InputAdornment, Typography, Paper, TextField,FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { addProduct,updateProduct } from '../../actions/products';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '../notifications/snackbar'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
function ProductForm({ selected,handleClose,setselected }) {
    const defaultData = selected?{...selected}:{ name: '', stock: 0, description: '', price: 0, photo: '',category:"" };
    const [dataObj, setdataObj] = useState(defaultData)
    if(selected)
      console.log(selected)
    var user = JSON.parse(localStorage.getItem("profile"))?.user;
    const dispatch = useDispatch();
    const [snackBarMsg, setSnackBarMsg] = useState(null)

    const classes = useStyles();
  
    var handleSubmit = async (e) => {
        if (dataObj.name != '' && dataObj.price != 0) {
            if (!selected) {
                try {
                    console.log(dataObj.photo)
                    const formData = new FormData();
                    Object.keys(dataObj).forEach(key => formData.append(key, dataObj[key]));
                    var response = await dispatch(addProduct(formData,user._id))
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
               //     handleClose()
                    setselected(null)
            }
        }
    }
    return (
        <div style={{ height: "530px", width: "420px" }}>
<CancelPresentationRoundedIcon onClick={()=>handleClose()} 
style={{marginTop:"-3px",marginRight:"1px",float:"right",color:"red",height:"25px",}}/>            
            <form style={{ width: "400px", height: "500px" }}>
                <Typography style={{marginBottom:"10px"}} color="primary" variant="h6" align="center">{!selected ? "Add a Product" : "Update a Product"}</Typography>
                <TextField id="outlined-full-width" label="Product Name" style={{ margin: 8 }} placeholder="Enter product name here"
                    fullWidth margin="normal" required size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined" value={dataObj.name}
                    onChange={(e) => setdataObj({ ...dataObj, name: e.target.value })}
                />
                <TextField id="outlined-full-width" label="Quantity" style={{ margin: 8 }} placeholder="Enter units of product"
                    fullWidth margin="normal" type="Number" required size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined" value={dataObj.stock}
                    onChange={(e) => setdataObj({ ...dataObj, stock: e.target.value })}
                />
                <TextField id="outlined-full-width" label="Sold quantity" style={{ margin: 8 }} placeholder="0"
                    fullWidth margin="normal" type="Number" size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    disabled="true" value={dataObj.sold}
                />
                <FormControl variant="outlined" style={{width:"400px"}} size="small" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
        <Select
          native
          value={dataObj.category}
          onChange={(e)=>setdataObj({ ...dataObj, category: e.target.value })}
          label="Category"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"612bd8d4603f214c7d9fcbd8"}>Mobile</option>
          <option value={"612bd908603f214c7d9fcbde"}>Routers</option>
          <option value={"612bd8fe603f214c7d9fcbdb"}>Accessories</option>
        </Select>
      </FormControl>
                <TextField
                    label="Price" id="outlined-start-adornment" style={{ margin: 8 }} fullWidth={true} size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                    variant="outlined" margin="normal" type="Number" required value={dataObj.price}
                    onChange={(e) => setdataObj({ ...dataObj, price: e.target.value })}
                />
                <TextField
                    id="outlined-multiline-static" label="Description" multiline fullWidth size="small"
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