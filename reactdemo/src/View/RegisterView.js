import React from "react";
import Register from "../Component/Register";
import "../css/Register.css"

class RegisterView extends React.Component{
    render() {
        return(
            <div className="register-page">
                <div className="register-container">
                    <div className="register-box">
                        <h1 className="page-title">Register</h1>
                        <Register/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterView;