import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Main from './pages/Main';

function App() {
  return (
    <Router>
    <Fragment>
      <Switch>
         <Route exact path="/" component={Main} />
      </Switch>
    </Fragment>
  </Router>
  );
}

export default App;
