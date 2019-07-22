import React, { Component } from 'react';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            passwordFieldType: 'password',
            isSubmitted: false
        }
    }
    handleUserChange = (event) => {
        this.setState({
            username: event.target.value,
            isSubmitted: false
        });
    }
    handlePassChange = (event) => {
        this.setState({
            password: event.target.value,
            isSubmitted: false
        });
    }
    handleSubmit = () => {
        this.setState({
            isSubmitted: true,
            username: '',
            password: ''
        })
        this.props.onSubmit && this.props.onSubmit(this.state.username, this.state.password)
    }
    handleShowPassword = () => {

    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title"> ADMIN PANEL</div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">USERNAME</label>
                                        <input type="text" className="form-control" id="email" name="email" value={this.state.username} onChange={this.handleUserChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input type={this.state.passwordFieldType} className="form-control" id="pwd" name="pwd" value={this.state.password} onChange={this.handlePassChange} />
                                    </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"> Error </div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">Log In</button>
                                        </div>
                                    </div>
                                    <label id={this.state.passwordFieldType} className="small" onClick={this.handleShowPassword}>Show Password</label>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
