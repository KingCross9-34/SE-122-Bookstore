import React from "react";
import {BookAdd} from "../Component/BookAdd";
import {Header} from "../Component/Header";
import {MenuBar} from "../Component/MenuBar";

class AddBookView extends React.Component{
    render() {
        return (
            <div className="home-page">
                <div className="admin-header">
                    <Header/>
                </div>
                <div className="admin-main">
                    <div className="admin-menubar">
                        <MenuBar auth={2}/>
                    </div>
                    <BookAdd/>
                </div>
            </div>
        )
    }
}

export default AddBookView;
