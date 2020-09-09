import React from "react";
import {Header} from "../Component/Header";
import {MenuBar} from "../Component/MenuBar";
import {UserList} from "../Component/UserList"

class ManageUserView extends React.Component{
    render() {
        const auth = JSON.parse(localStorage.getItem("user")).authority;
        if (auth === 1) {
            return (
                <h1>You have no access to this page!</h1>
            );
        }
        else if (auth === 2) {
            return(
                <div className="home-page">
                    <div className="admin-header">
                        <Header/>
                    </div>
                    <div className="admin-main">
                        <div className="admin-menubar">
                            <MenuBar auth={2}/>
                        </div>
                        <UserList/>
                    </div>
                </div>
            );
        }
    }
}

export default ManageUserView;
