import React, { Component } from "react";
import {
    Route,
    NavLink,
    Switch,
    BrowserRouter
} from "react-router-dom";
import { Timer } from "./others/counter";
import { Main } from "./creditcard";
import ToDoRender from "./todoList/toDoListRenderer";
class Nav extends Component {
    render() {
        return (
            <BrowserRouter>
                <header className="header">
                    <nav>
                        <ul>
                            <li><NavLink exact to="/todo">To do</NavLink></li>
                            <li><NavLink to="/creditCard">credit card</NavLink></li>
                            <li><NavLink to="/hook">hooks</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <div className="content">
                <Switch>
                    {/* <Route path='/' component={Login}/> */}
                    <Route exact path="/todo" component={ToDoRender} />
                    <Route path="/creditCard" component={Main} />
                    <Route path="/hook" component={Timer} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Nav;