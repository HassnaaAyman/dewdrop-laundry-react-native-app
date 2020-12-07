/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import allReducers from './src/reducers/index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

const store = createStore(allReducers);

const ReduxApp = () => (
    <Provider store = { store }>
        <App />
    </Provider>
    )
console.disableYellowBox = true;   
AppRegistry.registerComponent(appName, () => ReduxApp);
