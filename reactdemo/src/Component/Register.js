import React from "react";
import * as $ from 'jquery'
import * as userService from "../services/userService"
import '../css/Register.css'
import {Button, Input, message} from "antd";
import {history} from "../utils/history";

class Register extends React.Component{
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            password1: "",
            isEqual: null,
            isValid: null,
            nickname: "",
            email: ""
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.isValid) {
            //this.setState({isEqual: false})
            console.log("no")
            message.error("Please input your information in correct form.");
        }
        else if (!this.state.isEqual) {
            message.error("Please make sure that the passwords you input twice are consistent.")
        }

        else if (this.state.username && this.state.password && this.state.email && this.state.nickname) {
            let data = {"username": this.state.username, "password": this.state.password, "nickname": this.state.nickname, "email": this.state.email};
            console.log(data);
            userService.register(data);
        }
        else {
            message.warning("Please input all information!");
        }
    };

    handleUsername = e => {
        this.setState({username: e.target.value});
    }

    handlePassword = e => {
        this.setState({password: e.target.value});
        let isEqual = (e.target.value === this.state.password1)
        console.log(this.state.password)
        this.setState({isEqual: isEqual});
    }

    checkPassword = e => {
        this.setState({password1: e.target.value});
        let isEqual = (e.target.value === this.state.password);
        console.log("equal: ", isEqual);
        this.setState({isEqual: isEqual})
    }

    handleNickname = e => {
        this.setState({nickname: e.target.value})
    }

    handleEmail = e => {
        this.setState({email: e.target.value});
        let email = e.target.value;
        if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
            this.setState({isValid: false})
        }
        else this.setState({isValid: true});
    }

    renderIsEqual = () => {
        if (this.state.isEqual != null)
            return (this.state.isEqual) ?
                (<a className="correct">√</a>) :
                (<a className="wrong">×</a>)
    }

    renderIsValid = () => {
        if (this.state.isValid != null) {
            return (this.state.isValid) ?
                (<a className="correct">√</a> ) :
                (<a className="wrong">×</a> )
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <form>
                    <label>Username</label>
                    <br/>
                    <Input id="username"
                           //className="register-input"
                        //prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="Username"
                           onChange={this.handleUsername}
                    />
                </form>

                <form>
                    <label>Password</label>
                    <br/>
                    <Input.Password id="password"
                           //className="register-input"
                        //prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           //type="password"
                           placeholder="Password"
                           onChange={this.handlePassword}
                    />
                </form>
                <form>
                    <label>Check Password</label>
                    <br/>
                    <Input.Password id="password1"
                           //className="register-input"
                        //prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           //type="password"
                           placeholder="Password again"
                           onChange={this.checkPassword}
                    />
                    {this.renderIsEqual()}
                </form>

                <form>
                    <label>Nickname</label>
                    <br/>
                    <Input id="nickname"
                           //className="register-input"
                        //prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="Nickname"
                           onChange={this.handleNickname}
                    />
                </form>

                <form>
                    <label>Email</label>
                    <br/>
                    <Input id="email"
                           //className="register-input"
                        //prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="email"
                           placeholder="Email"
                           onChange={this.handleEmail}
                    />
                    {this.renderIsValid()}
                </form>
                <Button className="register-button" type="primary" htmlType="submit">
                    Register
                </Button>
                <Button className="register-return" onClick={() => history.goBack()}>Login</Button>
            </form>
        )
    }
}

export default Register;