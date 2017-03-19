import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BillManager from '../components/frontPage';
import {Router, Route,hashHistory} from 'react-router';
injectTapEventPlugin();

const muiTheme = getMuiTheme({

  appBar: {
    height: 40,
    width:"100%"
  }
});

//<IndexRoute component = {ShowPage}/>
ReactDOM.render(  
  <MuiThemeProvider muiTheme={muiTheme}>
  <Router history = {hashHistory}>
  <Route path = "/" component = {BillManager}/>
  </Router>
  </MuiThemeProvider>,
  document.getElementById('cont')
  );