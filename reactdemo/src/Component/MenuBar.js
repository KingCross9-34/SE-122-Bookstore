import React from "react";
import {Link} from "react-router-dom";
import "../css/Home.css"
import "../css/index.css"

export class MenuBar extends React.Component{
    render() {
        const {auth} = this.props;
        console.log("auth", auth)
        if (auth === 2) {
            return (
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link onClick={() => {localStorage.clear()}} to="/login">Logout</Link>
                    </li>
                    <li>
                        <Link to="/chart">My Cart</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact us</Link>
                    </li>
                    <li>
                        <Link to="/order">Orders</Link>
                    </li>
                    <li>
                        <Link to="/manageuser">Manage Users</Link>
                    </li>
                    <li>
                        <Link to="/managebook">Manage Books</Link>
                    </li>
                    <li>
                        <Link to="/statistic">Statistic</Link>
                    </li>
                    <li>
                        <Link to="/topup">Top up</Link>
                    </li>
                </ul>
            )
        }
        else if (auth === 1) {
            return (
                <ul>
                    <li>
                        <div className="menulink">
                            <Link to="/home">Home</Link>
                        </div>

                    </li>
                    <li>
                        <Link onClick={() => {localStorage.clear()}} to="/login">Logout</Link>
                    </li>
                    <li>
                        <Link to="/chart">My Cart</Link>
                    </li>
                    <li>
                        <Link to="/topup">Top up</Link>
                    </li>
                    <li>
                        <Link to="/order">My Orders</Link>
                    </li>
                    <li>
                        <Link to="/statistic">Statistic</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact us</Link>
                    </li>
                </ul>
            )
        }

    }
}
