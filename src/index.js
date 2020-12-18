import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDom.render(
    <Router>
        <App />
    </Router>, document.getElementById('root')
);

// registering the service worker for pwas
serviceWorker.register();
