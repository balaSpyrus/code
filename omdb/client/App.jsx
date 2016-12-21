import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/OmdbAssign.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal400 ,teal700} from 'material-ui/styles/colors';
import About from './components/AppbarComponents/About.jsx';
import Contact from './components/AppbarComponents/Contact.jsx';
import Search from './components/AppbarComponents/Search.jsx';
import MovieDetails from './components/common/MovieDetails.jsx';
import {Router,Route,IndexRoute ,hashHistory} from 'react-router';
injectTapEventPlugin();
const muiTheme = getMuiTheme({
    palette: {
        textColor: teal700,
        primary1Color: teal400,
        primary2Color: teal700,
    },
    appBar: {
        height: 50,
    },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history = {hashHistory}>
      <Route path = "/" component = {App}>
      <IndexRoute component = {Search} />
            <Route path = "/search" component = {Search} />
            <Route path = "/movieDetails/:query" component = {MovieDetails}/>
            <Route path = "/about" component = {About} />
            <Route path = "/contact" component = {Contact} />
      </Route>
   </Router>
  </MuiThemeProvider>,
  document.getElementById('test')
);
