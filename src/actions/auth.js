import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = () => async (dispatch) => {
  try {
    const { data } = await api.signIn();
    console.log("login:",data)
    dispatch({ type: AUTH, data });

  } catch (error) {
    console.log(error);
  }
};