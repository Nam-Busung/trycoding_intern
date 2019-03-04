import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import EditApp from './EditApp';

const Root = () => (
    <React.Fragment>
        <Route path="/Chapter" component={App}/>
        <Route exact path="/Stage/Edit" component={EditApp}/>
    </React.Fragment>
);

export default Root;