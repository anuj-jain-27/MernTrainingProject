import {ADDPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, FETCHPRODUCTS} from '../constants/actionTypes';

export default (products = [], action) => {
  switch (action.type) {
    case FETCHPRODUCTS:
      return action.payload;
    case ADDPRODUCT:
      return [...products, action.payload];
    case UPDATEPRODUCT:
      return products.map((product) => (product._id === action.payload._id ? action.payload : product));
    case DELETEPRODUCT:
      return products.filter((product) => product._id !== action.payload);
   
    default:
      return products;
  }
};