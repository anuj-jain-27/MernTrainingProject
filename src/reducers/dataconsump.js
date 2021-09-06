import {GET_DATAC} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (datas = [], action) => {
    switch (action.type) {
        case GET_DATAC:
            return action.payload;
        default:
            return datas
    }
}