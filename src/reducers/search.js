import { SEARCH} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (searchResults = [], action) => {
    switch (action.type) {
      case SEARCH:
           return action.payload
      default:
        return searchResults;
    }
  };