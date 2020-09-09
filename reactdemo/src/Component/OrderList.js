import React from "react";
import * as UserService from "../services/userService"
import {Button, Input, List, Table, DatePicker} from "antd";
import {Book} from "./Book";
import * as $ from "jquery";
import Text from "antd/es/typography/Text";

export class OrderList extends React.Component{
    constructor() {
        super();
        this.state = {
            orders: [],
            results: [],
            userAuth: null,
            expandedRow: null
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.setState({userAuth: user.authority});
        const callback = (data) => {
            //console.log("orders", data);
            this.setState({orders: data, results: data})
        }
        UserService.getOrders(user.id, callback);
    }

    handleSearch = e => {
        let searchNameValue = $('#namesearch').val();
        let searchTimeValue = $('#timesearch').val().toString();
        console.log("time", searchTimeValue, "type", !searchTimeValue);
        if (!searchNameValue && !searchTimeValue) {
            this.setState({results: this.state.orders});
        }
        else if (!searchTimeValue){
            let resultorder = [];
            const orderlist = this.state.orders;
            orderlist.map((item) => {
                for (var i = 0; i < item.orderitem.length; i++) {
                    if (item.orderitem[i].book.bookname.toString().indexOf(searchNameValue) > -1) {
                        resultorder.push(item);
                        break;
                    }
                }
            })
            this.setState({results: resultorder})
        }
        else if (!searchNameValue) {
            let resultorder = [];
            const orderlist = this.state.orders;
            orderlist.map((item) => {
                if (item.ordertime.toString().indexOf(searchTimeValue) > -1) {
                    resultorder.push(item);
                }
            })
            this.setState({results: resultorder})
        }
        else {
            let resultorder = [];
            const orderlist = this.state.orders;
            orderlist.map((item) => {
                if (item.ordertime.toString().indexOf(searchTimeValue) > -1) {
                    for (var i = 0; i < item.orderitem.length; i++) {
                        if (item.orderitem[i].book.bookname.toString().indexOf(searchNameValue) > -1) {
                            resultorder.push(item);
                            break;
                        }
                    }
                }
            })
            this.setState({results: resultorder})
        }
    }

    renderTable = () => {
        //const expandedRowKeys = this.state.expandedRow;
        const expandedRowRender = (record) => {
            const columns = [
                {title: "Cover", dataIndex: "book", render: record => <img height={100} src={record.image}/>},
                {title: "Book name", dataIndex: "book", render: record => <Text>{record.bookname}</Text>},
                {title: "Author", dataIndex: "book", render: record => <Text>{record.author}</Text>},
                {title: "Price", dataIndex: "book", render: record => <Text>￥{record.price/100}</Text>},
                {title: "Number", dataIndex: "num"}
            ];
            return <Table columns={columns} dataSource={record.orderitem} pagination={false}/>
        }
        const expandable = {
            //expandedRowKeys,
            onExpand: (expanded, record) => {
                this.setState({expandedRow: record});
                console.log("rowkeys",record);
            },
            expandedRowRender
        }

        if (this.state.userAuth === 1) {
            const columns = [
                {title: "OrderID", dataIndex: "orderid"},
                {title: "Order Time", dataIndex: "ordertime"},
                {title: "The number of orderitems", dataIndex: "orderitem", render: record => <Text>{record.length}</Text>},
                {title: "Totals", dataIndex: "totals", render: record => <Text>￥{record/100}</Text>},
                {title: "Status", render: record => <Text>Successfully payed</Text>}
            ];
            return <Table locale={{emptyText: "No orders now."}} expandable={expandable} rowKey={record => record.orderid} columns={columns} dataSource={this.state.results}/>
        }
        else if (this.state.userAuth === 2) {
            const columns = [
                {title: "OrderID", dataIndex: "orderid"},
                {title: "Username", dataIndex: "username"},
                {title: "Order Time", dataIndex: "ordertime"},
                {title: "The number of orderitems", dataIndex: "orderitem", render: record => <Text>{record.length}</Text>},
                {title: "Totals", dataIndex: "totals", render: record => <Text>￥{record/100}</Text>},
                {title: "Status", render: record => <Text>Successfully payed</Text>}
            ];
            return <Table locale={{emptyText: "No orders now"}} expandable={expandable} rowKey={record => record.orderid} columns={columns} dataSource={this.state.results}/>
        }
    }

    render() {

        return(
            <div className="home-contents">
                <form className="orderlist-search">
                    <div className="orderlist-search-name">
                        <Input id="namesearch" placeholder="Search by book name"/>
                    </div>
                    <div className="orderlist-search-time">
                        <DatePicker className="orderlist-search-time" id="timesearch"/>

                    </div>

                    <Button className="orderlist-search-button" onClick={this.handleSearch}>Search</Button>
                </form>
                <div className="orderlist-table">
                    {this.renderTable()}
                </div>
            </div>
        )
    }
}
