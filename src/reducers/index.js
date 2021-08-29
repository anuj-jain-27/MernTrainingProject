import {combineReducers} from 'redux';
import products from './products';
import orders from './orders';
import auth from './auth';;
export default combineReducers({
    //considering the key and the value is the same, we are able to keep the first one
    products,orders,auth,
});