import React from "react";
import {Header} from "../Component/Header";
import {MenuBar} from "../Component/MenuBar";
import "../css/Home.css"
import {Topup} from "../Component/Topup";

class TopupView extends React.Component{
    render() {
        const auth = JSON.parse(localStorage.getItem("user")).authority;
        if (auth === 1) {
            return (
                <div className="home-page">
                    <div className="home-header">
                        <Header/>
                    </div>
                    <div className="home-menubar">
                        <MenuBar auth={1}/>
                    </div>
                    <div>
                        <Topup/>
                    </div>
                </div>
            );
        }
        else if (auth === 2) {
            return (
                <div className="home-page">
                    <div className="admin-header">
                        <Header/>
                    </div>
                    <div className="admin-menubar">
                        <MenuBar auth={2}/>
                    </div>
                    <div>
                        <Topup/>
                    </div>
                </div>
            );
        }
    }
}

export default TopupView;
