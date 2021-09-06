import { GET_CURRENT_BROADBAND } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (currentbroadband = [], action) => {
  switch (action.type) {
    case GET_CURRENT_BROADBAND:
      return action.payload;
    default:
      return currentbroadband;
  }
};
