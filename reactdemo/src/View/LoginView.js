import React from "react";
import Login from "../Component/Login";

class LoginView extends React.Component{
    render() {
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Login</h1>
                        <Login/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;