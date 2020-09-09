import React from "react";
import "../css/Home.css"
import "../css/index.css"
import icon from "../assets/icon.png"

export class Header extends React.Component{
    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.authority === 1) {
            return (
                <div>
                    <img className="home-header-img" src={icon} height={65}/>
                    <h1 className="home-header-welcome">Hi, {user.nickname}! Welcome to the E-Bookstore!</h1>
                </div>

            );
        }
        else if (user.authority === 2) {
            return (
                <div>
                    <img className="admin-header-img" src={icon} height={65}/>
                    <h1 className="admin-header-welcome">Hi, administrator {user.nickname}! Welcome to manage the E-Bookstore!</h1>
                </div>
            )
        }
    }

}
