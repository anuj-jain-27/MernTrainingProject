import { GET_USERS} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (users = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return users;
};}

