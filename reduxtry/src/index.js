import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {combineReducers,createStore} from 'redux';
import {Provider} from 'react-redux';
import {userData,productData} from './data';
import userReducer from './reducers/users';
import productReducer from './reducers/products';

const allReducers=combineReducers({
	users:userReducer,
	products:productReducer
})

const store = createStore(
	allReducers,
	{
		users:userData,
		products:productData
	}
	);

console.log(store.getState())
ReactDOM.render(
	<Provider store = {store} >
	<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
