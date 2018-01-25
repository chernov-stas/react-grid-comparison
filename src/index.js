import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
// polyfills for IE
import 'core-js/es6/array';
import 'core-js/es6/number';
import 'core-js/es6/string';
// this is for react-data-grid
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Azure AD B2C social accounts authentication test</h1>
        </header>
        <Provider store={store}>{routes}</Provider>
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
