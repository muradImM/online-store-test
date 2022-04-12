import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";

export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
})

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)