import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducer";
import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyAA6ZzEaw6xYDXpM6fPQbBQmyvFQPjZwfw",
  authDomain: "apptodoz.firebaseapp.com",
  databaseURL: "https://apptodoz.firebaseio.com",
  projectId: "apptodoz",
  storageBucket: "apptodoz.appspot.com",
  messagingSenderId: "606873914981",
  appId: "1:606873914981:web:4815ed806a15f15f6fc08c",
  measurementId: "G-M8J1Y9G1DL",
};
firebase.initializeApp(config);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)),
);
// const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
