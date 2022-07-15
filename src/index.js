
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import rootReducer from "./modules/index";
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();