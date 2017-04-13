import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue400, blue700} from 'material-ui/styles/colors';
import {Login,LoginSuccess,FileProcess,RegisterAlgorithm} from '../components/index';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: blue700,
    primary1Color: blue400,
    primary2Color: blue700
  },
  appBar: {
    height: 50
  }
});
ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
  <Router history = {hashHistory}>
  <Route path = "/" component = {Login}/>
  <Route path = "/loginSuccess" component = {LoginSuccess}>  
  <IndexRoute component = {FileProcess}/>
  <Route path = "/loginSuccess/Dashboard" component = {FileProcess} />
  <Route path = "/loginSuccess/RegisterAlgorithm" component = {RegisterAlgorithm} />
  </Route>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('sample')
  );