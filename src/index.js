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

let wakeLock = null;

const requestWakeLock = async () => {
    wakeLock =  await navigator.wakeLock.request('screen');
}

if('wakeLock' in navigator) {
    try {
        requestWakeLock();    
    }
    catch(error) {
        console.log(error);
    }
}

const handleVisibilityChange = async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      await requestWakeLock();
    }
};
  
document.addEventListener('visibilitychange', handleVisibilityChange);
