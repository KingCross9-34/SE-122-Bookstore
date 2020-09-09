import React from 'react';
import {Header} from "../Component/Header";
import {MenuBar} from "../Component/MenuBar";
import {ChartList} from "../Component/ChartList";
import "../css/Home.css"

class ChartView extends React.Component{

    render(){
        const auth = JSON.parse(localStorage.getItem("user")).authority;
        if (auth === 1) {
            return(
                <div className="home-page">
                    <div className="home-header">
                        <Header/>
                    </div>
                    <div className="home-main">
                        <div className="home-menubar">
                            <MenuBar auth={1}/>
                        </div>
                        <ChartList/>
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
                    <div className="admin-main">
                        <div className="admin-menubar">
                            <MenuBar auth={2}/>
                        </div>
                        <ChartList/>
                    </div>
                </div>
            )
        }

    }
}

export default ChartView;
