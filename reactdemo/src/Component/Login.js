import React from "react";
import '../css/Login.css'
import {Input, Button, Checkbox, message} from "antd";
import * as $ from 'jquery'
import * as userService from "../services/userService"
import {Link} from "react-router-dom";

class Login extends React.Component{

    handleSubmit = e => {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        if (!(username && password)) {
            message.warning("Input must not be empty!");
            return;
        }
        let data = {"username":username, "password":password};
        console.log(data);
        userService.login(data);
    };

    forgotPassword = () => {
        message.error("Remind it by yourself!")
    }

    render() {
        return (
            <form name="login-form" className="login-form" onSubmit={this.handleSubmit}>
                {/*{this.renderUsername(user.username)}*/}
                <form>
                    <label className="text">Username:</label>
                    <br/>
                    <Input className="login-input" id="username" placeholder="Username"/>
                </form>
                <form>
                    <label className="text">Password:</label>
                    <Input.Password className="login-input" id="password"
                        //prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="Password"
                    />
                </form>
                <a className="login-form-forgot" onClick={this.forgotPassword}>
                    Forgot password?
                </a>
                <Link className="login-form-register" to="/register">Register now!</Link>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </form>
        );
    }
}

export default Login;
