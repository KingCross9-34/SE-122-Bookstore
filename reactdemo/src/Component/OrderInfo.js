import React from "react";
import {Checkbox, List, Button} from "antd";
import {Book} from "./Book";
import {history} from "../utils/history";

class OrderInfo extends React.Component{
    componentWillUnmount() {
        localStorage.removeItem("orderinfo;")
    }

    render() {
        const info = JSON.parse(localStorage.getItem("orderinfo")).data;
        console.log(info);
        const renderSoldOutBooks = () => {
            if (info.soldoutbooks.length !== 0) {
                return (
                    <div>
                        <h2>The books below have been sold out.</h2>
                        <List
                            dataSource={info.soldoutbooks}
                            renderItem={item => (
                                <List.Item>
                                    <p>{item.bookname}</p>
                                </List.Item>
                            )}
                        />
                    </div>
                )
            }
            else return null;
        }

        return(
            <div className="home-contents">
                <h1 className="orderinfo-title">Hello, {info.nickname}! This is your order information.</h1>
                <div className="orderinfo-contents">
                    <div>
                        <p>Order ID: {info.orderid}</p>
                    </div>
                    <div>
                        <p>Totals: {info.totals/100} yuan</p>
                    </div>
                    <div>
                        <p>Time: {info.ordertime}</p>
                    </div>
                    <h2>The books you bought: </h2>
                    <List
                        dataSource={info.orderitem}
                        renderItem={item => (
                            <List.Item>
                                <p>{item.book.bookname} * {item.num} 本</p>
                            </List.Item>
                        )}
                    />
                    {renderSoldOutBooks()}
                    <Button className="orderinfo-button" shape="round" onClick={() => {
                        localStorage.removeItem("orderinfo");
                        history.goBack();
                    }}>Return</Button>
                </div>

            </div>
        )
    }
}

export default OrderInfo;
