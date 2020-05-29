import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
      }

    render() {

        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/'>App</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
             
            </ul>
            <span className="navbar-text">
             <Link to='/createUser'>Create User</Link>
            </span>
          </div>
        </nav>
        );
    }
}

export default NavBar;
