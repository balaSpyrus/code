import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import displayPane from '../components/index';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
injectTapEventPlugin();
ReactDOM.render(
  <MuiThemeProvider >
  <Router history = {hashHistory}>
  <Route path = "/" component = {displayPane}/>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('chatUI')
  );