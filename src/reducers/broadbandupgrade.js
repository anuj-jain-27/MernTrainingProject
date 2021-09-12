import {UPGRADE_BROADBAND } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (details = [], action) => {
  switch (action.type) {
    case UPGRADE_BROADBAND:
      return [...details, action.payload];
    default:
      return details;
  }
};

