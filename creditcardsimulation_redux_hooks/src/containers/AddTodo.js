import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
    let input

    return (
        <div class='row m-0 pt-4'>
            <form class="form-group col-12 row m-0"
                onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(addTodo(input.value))
                    input.value = ''
                }}
            >
                <input  class="form-control col-5" ref={node => (input = node)} />
                <button type="submit" class='btn btn-secondary col-auto'>Add Todo</button>
            </form>
        </div>
    )
}

export default connect()(AddTodo)