import {ADDPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, FETCHPRODUCTS} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getProducts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchProducts();
      console.log("getproduts")
      dispatch({ type: FETCHPRODUCTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const addProduct = (prod) => async (dispatch) => {
    try {
      const { data } = await api.createProduct(prod);
      //console.log("createproduct")
      dispatch({ type: ADDPRODUCT, payload: data });
    } catch (error) {
      console.log("from action: ",error);
    }
  };

  export const updateProduct = (id, prod) => async (dispatch) => {
    try {
      const { data } = await api.updateProduct(id, prod);
      console.log("updateprodut")
      dispatch({ type: UPDATEPRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteProduct = (id) => async (dispatch) => {
    try {
      await api.deleteProduct(id);
      console.log("deleteproduct")
      dispatch({ type: DELETEPRODUCT, payload: id });
    } catch (error) {
      console.log(error);
    }
  };