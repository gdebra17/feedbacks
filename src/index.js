import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
// import createSagaMiddleware from 'redux-saga'
// import handleNewMessage from './src/store/sagas'
import { addUser } from './store/tchat/actions/index'


window.googleConnectCallback = function(googleUser){
  // console.log("googleUser: ", googleUser);
  const profile = googleUser.getBasicProfile();
  const disconnect = () => googleUser.disconnect();

  // Useful data for your client-side scripts:
  // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  // console.log('Full Name: ' + profile.getName());
  // console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());
  const email = profile.getEmail();
  // The ID token you need to pass to your backend:
  const id_token = googleUser.getAuthResponse().id_token;
  // console.log("ID Token: " + id_token);
  // console.log("authResponse : ", googleUser.getAuthResponse());
  // console.log("complete profile : ", profile);

  fetch("/internalconnexion", {
    method: "POST",
    headers: {
      "Authorization": id_token
    }
  })
    .then((result) => result.json())
    .then((resp) => {
      // console.log("Fetch Index Resp :", resp)
        if (resp.status === "error") {
          let errorMessage = resp.errorMessage;
          // console.log("error ?");
          store.dispatch({type: "SET_PROFILE", message: errorMessage, disconnect: disconnect, profile: profile});
        } else {
          // console.log("Dispatch into Redux State ", resp);
          store.dispatch({type: "SET_PROFILE", profile: profile, disconnect: disconnect, id_token: id_token, email: email, IP: resp.IP, id: resp.id});
        }

        })
};

store.dispatch(addUser('Me'));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

// registerServiceWorker();
