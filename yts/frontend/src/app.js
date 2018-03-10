import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/app.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// main app
import MenuAppBar from './assets/js/comp1';

ReactDOM.render(
	<MuiThemeProvider>
	<MenuAppBar />
	</MuiThemeProvider>, document.getElementById('App'));
