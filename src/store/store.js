import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import profileReducer from './profile/reducer';
import tchatReducer from './tchat/reducers/index';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ profileReducer, tchatReducer}),
  applyMiddleware(sagaMiddleware, thunk, logger)
)

// const socket = setupSocket(store.dispatch, username)

// sagaMiddleware.run(handleNewMessage, { socket, username })


export default store;
