import React from "react";
import {Input, Button, message} from "antd";
import * as $ from 'jquery'
import {topup} from "../services/userService";
import "../css/Home.css"

export class Topup extends React.Component{
    handleSubmit = () => {
        let userid = JSON.parse(localStorage.getItem("user")).id;
        let amount = $('#amount').val()*100;
        let topupdata = {"userid": userid, "amount": amount};
        const callback = (data) => {
            message.success("Success top up!")
        }
        topup(topupdata, callback);
    }

    render() {
        return (
            <div className="topup">
                <h1>Top up</h1>
                <form>
                    <label>Amount(yuan)</label>
                    <Input id="amount" min={0} step={0.01} type="number"/>
                    <Button className="topup-button" onClick={this.handleSubmit}>OK</Button>
                </form>
            </div>
        )
    }
}
