import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
//import createSagaMiddleware from 'redux-saga'
// import handleNewMessage from './src/store/sagas'
import { addUser } from './store/tchat/actions/index'




window.googleConnectCallback = function(googleUser){
  const profile = googleUser.getBasicProfile();
  const disconnect = () => googleUser.disconnect();

  // Useful data for your client-side scripts:
  // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  // console.log('Full Name: ' + profile.getName());
  // console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  //const id_token = googleUser.getAuthResponse().id_token;
  //console.log("ID Token: " + id_token);
  //console.log("authResponse : ", googleUser.getAuthResponse());
  // console.log("complete user ", disconnect);
  store.dispatch({type: "SET_PROFILE", profile: profile, disconnect: disconnect});
  store.dispatch({type: "SET_CONNECTION_FLAG"});
};
store.dispatch(addUser('Me'));

//
// const sagaMiddleware = createSagaMiddleware();
//
// const socket = setupSocket(store.dispatch);
//
// sagaMiddleware.run(handleNewMessage, { socket });


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();
