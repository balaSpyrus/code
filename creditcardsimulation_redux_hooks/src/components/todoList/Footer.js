import React from 'react'
import { VisibilityFilters } from '../../actions'
import FilterLink from '../../containers/FilterLink';

const Footer = () => (
    <div class='row m-0'>
        <span class='col-auto'>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
    </div>
)

export default Footer