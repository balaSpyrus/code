import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import dataReducer from './reducers/datareducer';

const allreducers=combineReducers({
data:dataReducer
})

const store= createStore(allreducers);


ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
