import { combineReducers } from 'redux';
import account from './accountReducer';
import chat from './chatReducer';

export default combineReducers({
  account,
  chat,
});
