import React from 'react';
import ReactDOM from 'react-dom';
//import Jobs from './components/jobComponentedit';
import Test from './components/apiComponents';
import {cyan400} from 'material-ui/styles/colors';
import {teal400} from 'material-ui/styles/colors';
import {teal700} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import injectTapEvenPlugin from "react-tap-event-plugin"
injectTapEvenPlugin();
// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors


//import FormComponent from './components/Components';

	//<FormComponent />
	

// MuiThemeProvider takes the theme as a property and passed it down the hierarchy.
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



const Main = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
	<div>
	<AppBar title="OXYGEN"/>
	<Test /></div>
	</MuiThemeProvider>
	);
ReactDOM.render(<div>
	<Main/>		
	</div>,document.getElementById('content'));






export default Main;