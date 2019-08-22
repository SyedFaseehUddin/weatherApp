import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Main from './pages/Main';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
      <Switch>
         <Route exact path="/" component={Main} />
      </Switch>
    </Fragment>
  </Router>
  </Provider>
  );
}

export default App;
