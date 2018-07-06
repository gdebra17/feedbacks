import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import profileReducer from './profile/reducer';
import tchatReducer from './tchat/reducers/index';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const sagaMiddleware = createSagaMiddleware()
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
  middlewares.push(sagaMiddleware);
  middlewares.push(thunk);
}


const store = createStore(
  combineReducers({ profileReducer, tchatReducer}),
  applyMiddleware(...middlewares)
)

// const socket = setupSocket(store.dispatch, username)

// sagaMiddleware.run(handleNewMessage, { socket, username })


export default store;
