import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Main from './pages/Main';
import Error from './pages/Error';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
      <Switch>
         <Route exact path="/" component={Main} />
         <Route exact path="*" component={Error} />
      </Switch>
    </Fragment>
  </Router>
  </Provider>
  );
}

export default App;
