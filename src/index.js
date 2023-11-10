//index.js
import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./Form&redux/store"; // Correct the import path

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
 <Provider store={store}>
    <App />
</Provider>,
rootElement
);
