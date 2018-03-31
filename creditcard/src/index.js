import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {combineReducers , createStore} from 'redux';
import cardReducers from './reducers'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

const allReducers=combineReducers({
	cardDetails:cardReducers
})

const store = createStore(allReducers);

ReactDOM.render(
	<Provider store={store}> 
	<MuiThemeProvider>
	<App />
	</MuiThemeProvider>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
