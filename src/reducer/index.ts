import { combineReducers } from 'redux';
import 'firebase/storage';
import 'firebase/firestore';

const user = (state = null, action) => {
  switch (action.type) {
    case `SET_USER`:
      return action.user;
    default:
      return state;
  }
};

const restaurant = (state: Restaurant | null = null, action) => {
  switch (action.type) {
    case `SET_RESTAURANT`:
      return action.restaurant;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  restaurant,
});
