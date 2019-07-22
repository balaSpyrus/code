
import { combineReducers } from 'redux'
import todos from './todo'
import visibilityFilter from './filter';

export default combineReducers({
  todos,
  visibilityFilter
});