import React, { Component } from 'react';
import './dropdown.css';

class TestComp extends Component {
    state = {
        divClass: '',
        isclicked: false
    }
    render() {
        return (
            <div class='row'>
                <a class='col-12 align-center'
                    onClick={() => { this.setState({ isclicked: true }) }}
                    href='http://www.google.com'>link</a>
                <div class='col-12 row box'>
                    <div class='col-12'
                        onMouseOut={() => { this.setState({ divClass: '' }) }}
                        onMouseOver={() => { this.setState({ divClass: 'show-items' }) }}
                    >
                        <h4 class=' btn btn-primary'>test button</h4>
                        <div class={this.state.divClass}>
                            <a href='#' class='row m-auto align-center'>test1</a>
                            <a href='#' class='row m-auto align-center'>test2</a>
                            <a href='#' class='row m-auto align-center'>test3</a>
                            <a href='#' class='row m-auto align-center'>test4</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestComp;
