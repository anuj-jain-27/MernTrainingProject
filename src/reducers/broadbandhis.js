import { GET_BROADBAND_HIS } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (broadbandhistory = [], action) => {
  switch (action.type) {
    case GET_BROADBAND_HIS:
      return action.payload;
    default:
      return broadbandhistory
  }
};
