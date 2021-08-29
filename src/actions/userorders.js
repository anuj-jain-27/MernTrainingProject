import {CREATEORDER,GETUSERORDERS} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const placeOrder = (userid,order) => async (dispatch) => {
    try {
      const { data } = await api.createOrder(userid,order);
      console.log("createorder")
      dispatch({ type: CREATEORDER, payload: data });
    } catch (error) {
      console.log(error);
    }
};

export const getUserOrders = () => async (dispatch) => {
    try {
      const { data } = await api.fetchUserOrders();
      console.log("getproduts")
      dispatch({ type: GETUSERORDERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };