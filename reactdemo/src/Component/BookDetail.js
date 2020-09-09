import React from "react";
import {Descriptions, Input, message} from "antd";
import {Button} from "antd";
import moment from 'moment'
import '../css/BookDetail.css'
import * as $ from "jquery"
import * as OrderService from "../services/orderService"

export class BookDetail extends React.Component{
    constructor() {
        super();
        this.state = {
            num: 1
        }
    }

    handlenum = () => {
        this.setState({num: $('#num').val()})
    }

    addToChart = (bookid) => {
        if (!bookid) return;
        const user = JSON.parse(localStorage.getItem("user"));
        const userid = user.id;
        let chartdata = {"userid": userid, "bookid": bookid, "num": this.state.num};
        //message.success("You have add it to your chart.")
        const callback = (data) => {
            message.success("You have add it to your chart.")
        }
        OrderService.addToChart(chartdata, callback);
    }

    render() {
        const {info} = this.props;
        return(
            <div className="bookdetail-content">
                <img className="bookdetail-content-cover" src={info.image}/>
                <div className="bookdetail-content-wordsarea">
                    <h1 className="bookdetail-content-bookname">
                        Bookname: {info.bookname}
                    </h1>
                    <h2 className="bookdetail-content-others">Author: {info.author}</h2>
                    <h2 className="bookdetail-content-others">Language: {info.languages}</h2>
                    <h2 className="bookdetail-content-others">Year: {info.years}</h2>
                    <h2 className="bookdetail-content-others">Price: ￥{info.price/100}</h2>
                    <h2 className="bookdetail-content-others">ISBN: {info.isbn}</h2>
                    <h2 className="bookdetail-content-others">Publication: {info.publication}</h2>
                    <h2 className="bookdetail-content-others">Stock: {info.stock}</h2>
                </div>
                <div className="bookdetail-buttonarea">
                    <Input className="bookdetail-inputnum" id="num" onChange={this.handlenum} type="number" step={1} defaultValue={1}/>
                    <Button className="bookdetail-button" onClick={ () => this.addToChart(info.id)}>Add to cart</Button>
                    {/*<Button className="bookdetail-button">Buy now</Button>*/}
                </div>
                <div className="bookdetail-content-detail">
                    <h1 className="bookdetail-content-detail-label">Detail: </h1>
                    <text className="bookdetail-content-detail-text">{info.detail}</text>
                </div>
            </div>
        )
    }
}
