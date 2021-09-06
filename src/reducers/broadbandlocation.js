import { GET_BLOCATION } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (blocations = [], action) => {
  switch (action.type) {
    case GET_BLOCATION:
      return action.payload;
    default:
      return blocations;
  }
};
