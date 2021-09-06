import { PAY_MOBILE, PAY_BROADBAND } from '../constants/actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (paydetails = [], action) => {
  switch (action.type) {
    case PAY_MOBILE:
        return [...paydetails, action.payload];
    case PAY_BROADBAND:
        return [...paydetails, action.payload];
    default:
      return paydetails;
  }
};

