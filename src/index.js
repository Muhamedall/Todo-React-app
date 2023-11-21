//index.js
import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./FormRedux/store"; 

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
 <Provider store={store}>
    <App />
</Provider>,
rootElement
);
