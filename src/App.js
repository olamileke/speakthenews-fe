import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './app/components/Container/container';

function App() {

    return (
        <div>
            <ToastContainer />

            <Switch>
                <Route path='/' component={Container} />
            </Switch>
        </div>
    )
}

export default App;

