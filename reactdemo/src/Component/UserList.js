import React, {useState} from "react";
import {List, Checkbox, Button, Table, Divider, Radio} from "antd";
import * as UserService from "../services/userService"

export class UserList extends React.Component{
    constructor() {
        super();
        this.state = {
            users: [],
            chooseusers: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({users: data});
        }
        let admin = JSON.parse(localStorage.getItem("user"));
        UserService.getUsers(admin.id, callback);
    }

    handleProhibit = () => {
        const callback = (data) => {
            this.setState({users: data})

        }
        UserService.prohibit(this.state.chooseusers, callback);
    }

    handleLift = () => {
        const callback = (data) => {
            this.setState({users: data})
        }
        UserService.lift(this.state.chooseusers, callback);
    }

    render() {
        const columns = [
            {title: "Username", dataIndex: "username"},
            {title: "Nickname", dataIndex: "nickname"},
            {title: "Email", dataIndex: "email"},
            {title: "Account", dataIndex: "account", render: record => <text className="user-account">￥{record/100}</text> },
            {title: "Authority", dataIndex: "authority",
                render: record => {
                    if (record === 1) return (<text>Normal user</text>)
                    else if (record === 2) return (<text>Administrator</text>)
                }
            },
            {title: "Access", dataIndex: "prohibited",
                render: record => {
                    console.log("record",record)
                    return record ? (<text className="user-prohibited">×</text>) : (<text className="user-not-prohibited">√</text>)
                }}
        ]

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: selectedRowKeys => {
                this.setState({chooseusers: selectedRowKeys, selectedRowKeys: selectedRowKeys});
                console.log(this.state.selectedRowKeys)
            }
        };
        return (
            <div className="home-contents">
                <Button onClick={this.handleProhibit}>Prohibit</Button>
                <Button onClick={this.handleLift}>Lift</Button>
                <div className="user-list">
                    <Table locale={{emptyText: "There is no user."}} rowSelection={rowSelection} rowKey={record => record.id} dataSource={this.state.users} columns={columns}/>
                </div>
            </div>
        )
    }
}
