import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

import profileReducer from './profile/reducer';

const store = createStore(
  combineReducers({ profileReducer}),
  applyMiddleware(thunk, logger));

export default store;
