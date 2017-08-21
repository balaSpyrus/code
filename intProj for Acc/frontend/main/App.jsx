import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Show} from '../components/index';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
injectTapEventPlugin();
//<IndexRoute component = {ShowPage}/>
ReactDOM.render(
  <Router history = {hashHistory}>
  <Route path = "/" component = {Show}/>
</Router>,
  document.getElementById('render')
  );
