import React from "react";
import * as OrderService from "../services/orderService"
import {List, Checkbox, Button, Table, message} from "antd";
import {Book} from "./Book";
import moment from "moment"
import {history} from "../utils/history";
import Text from "antd/es/typography/Text";

export class ChartList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            chart: [],
            chooseChart: [],
            selectedRowKeys: []
        };
    }

    componentDidMount() {
        const callback = (data) => {
            console.log(data)
            this.setState({chart: data});
        };
        let user = JSON.parse(localStorage.getItem("user"));
        OrderService.getChart(user.id, callback);
    }

    handleBuy = () => {
        const callback = (data) => {
            if (data.status === 0) {
                localStorage.setItem("orderinfo", JSON.stringify(data));
                history.push("/orderinfo");
            }
            else {
                message.warning(data.msg);
            }
        }
        let user = JSON.parse(localStorage.getItem("user"));
        let date = moment().format("YYYY-MM-DD HH:mm:ss");
        let data = {"userid": user.id, "orders": this.state.chooseChart, "time": date};
        console.log("orderdata", data);
        OrderService.orderBooks(data, callback);
    }

    handleRemove = () => {
        const callback = (data) => {
            this.setState({chart: data})
        }
        let user = JSON.parse(localStorage.getItem("user"));
        let data = {"userid": user.id, "removeCartItem": this.state.chooseChart};
        console.log(data);
        OrderService.removeFromChart(data, callback);
    }

    render() {
        const columns = [
            {title: "Cover", dataIndex: "book", render: record => <img height={100} src={record.image}/>},
            {title: "Name", dataIndex: "book", render: record => <Text>{record.bookname}</Text>},
            {title: "Author", dataIndex: "book", render: record => <Text>{record.author}</Text>},
            {title: "ISBN", dataIndex: "book", render: record => <Text>{record.isbn}</Text>},
            {title: "Price", dataIndex: "book", render: record => <Text>￥{record.price/100}</Text>},
            {title: "Number", dataIndex: "num"},
            {title: "Totals", render: record => <Text>￥{record.num * record.book.price/100}</Text>}
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: selectedRowKeys => {
                this.setState({chooseChart: selectedRowKeys, selectedRowKeys: selectedRowKeys});
                console.log(this.state.selectedRowKeys)
            }
        };
        return(
            <div className="chart-content">
                <div className="chart-button">
                    <Button className="chart-buy-button" onClick={this.handleBuy}>Buy</Button>
                    <Button className="chart-remove-button" onClick={this.handleRemove}>Remove</Button>
                </div>

                <div className="chart-list">
                    <Table locale={{emptyText: "Your chart is empty. Try to add some books!"}}
                           rowSelection={rowSelection}
                           rowKey={record => record.id}
                           columns={columns}
                           dataSource={this.state.chart}
                    />
                </div>

            </div>

        )
    }
}
