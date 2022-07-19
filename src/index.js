import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore  } from "redux-persist";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise"

import "./index.css";
import App from "./App";
import rootReducer from "./modules/index";
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, compose(
        applyMiddleware(promiseMiddleware, thunk),
    )
)

const persistors = persistStore(store);
const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <Provider store={store}>
        <PersistGate persistor={persistors}>
            <App/>
        </PersistGate>
    </Provider>
);

reportWebVitals();