import React from "react";
import "../css/Home.css"
import {DatePicker, Button, Table} from "antd";
import {makeSta} from "../services/orderService";
import * as $ from "jquery"
import Text from "antd/es/typography/Text";

class Statistic extends React.Component{
    constructor() {
        super();
        this.state = {
            Sta: {
                bookStas: null,
                userStas: null,
                totals: null,
                totalNumber: null
            },
            type: null
        }
    }

    makeSta = (type) => {
        let startTime = $('#starttime').val()
        let endTime = $('#endtime').val()
        let userid = JSON.parse(localStorage.getItem("user")).id
        let data = {"userid": userid, "startTime": startTime, "endTime": endTime, "type": type}
        console.log(data)
        const callback = (data) => {
            this.setState({type: type, Sta: data})
        }
        makeSta(data, callback)
    }

    renderButton = (userauth) => {
        if (userauth === 1) {
            return (
                <div className="sta-button">
                    <Button onClick={() => this.makeSta("book")}>Make statistics</Button>
                </div>

            )
        }
        else if (userauth === 2) {
            return (
                <div>
                    <div className="sta-button">
                        <Button onClick={() => this.makeSta("user")}>Make user statistics</Button>
                    </div>
                    <div className="sta-button">
                        <Button onClick={() => this.makeSta("book")}>Make book statistics</Button>
                    </div>
                </div>

            )
        }
    }

    renderTable = (type) => {
        if (type === "book") {
            const columns = [
                {title: "Book", dataIndex: "book", render: record => <Text>{record.bookname}</Text>},
                {title: "Price", dataIndex: "book", render: record => <Text>{record.price/100}</Text>},
                {title: "Number", dataIndex: "num", defaultSortOrder: 'ascend', sorter: (a, b) => b.num - a.num},
                {title: "Total", render: record => <Text>{record.num*record.book.price/100}</Text>, sorter: (a, b) => b.num*b.book.price - a.num*a.book.price}
            ]
            return (
                <div className="sta-table">
                    <h1>Total Number: {this.state.Sta.totalNumber}</h1>
                    <h1>Total Amounts: ￥{this.state.Sta.totals/100}</h1>
                    <Table
                        locale={{emptyText: "You did not buy any book between the date you searched."}}
                        columns={columns}
                        dataSource={this.state.Sta.bookStas}
                        rowKey={record => record.book}
                    />
                </div>
            )
        }
        else if (type === "user") {
            const columns = [
                {title: "User", dataIndex: "user", render: record => <Text>{record.username}</Text>},
                {title: "Total number of books", dataIndex: "booksNum", defaultSortOrder: "ascend", sorter: (a, b) => b.booksNum - a.booksNum},
                {title: "Total amounts of books", dataIndex: "totals", render: record => <Text>{record/100}</Text>, sorter: (a, b) => b.totals - a.totals}
            ]
            return (
                <div className="sta-table">
                    <h1>Total Number: {this.state.Sta.totalNumber}</h1>
                    <h1>Total Amounts: ￥{this.state.Sta.totals/100}</h1>
                    <Table
                        columns={columns}
                        dataSource={this.state.Sta.userStas}
                        roeKey={record => record.user}
                    />
                </div>
            )
        }
    }

    render() {

        //console.log(this.state.bookSta)
        let userauth = JSON.parse(localStorage.getItem("user")).authority
        return (
            <div className="home-contents">
                <div className="sta-searchbar">
                    <div className="sta-time">
                        <DatePicker id="starttime" placeholder="Select start date"/>
                    </div>
                    <div className="sta-time">
                        <DatePicker id="endtime" placeholder="Select end date"/>
                    </div>
                    {this.renderButton(userauth)}
                </div>
                {this.renderTable(this.state.type)}
            </div>
        );
    }
}

export default Statistic;
