import React from "react";
import * as BookService from "../services/bookService";
import {Input, List, Button, Table} from "antd";
import {Book} from "./Book";
import * as $ from 'jquery'
import {history} from "../utils/history";
import Text from "antd/es/typography/Text";

export class BookEditList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            result: [],
            selectedRowKeys: [],
            choosebooks: []
        };
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({books: data, result: data});
        };
        BookService.getBooks(callback);
    }

    handleSearch = e => {
        let searchValue = $('#search').val();
        if (!searchValue) {
            this.setState({result: this.state.books});
        }
        else {
            var resultbook = [];
            const booklist = this.state.books;
            booklist.map((item) => {
                if (item.bookname.toString().indexOf(searchValue) > -1) {
                    resultbook.push(item);
                }
            })
            this.setState({result: resultbook})
        }
    }

    handleAdd = () => {
        history.push("/addbook");
    }

    handleChange = (bookid) => {
        history.push("/editbook?id=" + bookid);
    }

    handleRemove = (bookid) => {
        let adminID = JSON.parse(localStorage.getItem("user")).id;
        let removedata = {"adminID": adminID, "bookIDs": bookid};
        console.log(removedata);
        const callback = (data) => {
            this.setState({books: data, result: data, choosebooks: []})
            console.log("success");
        }
        if (typeof (bookid) === "number") {
            BookService.RemoveOneBook(removedata, callback);
        }
        else BookService.RemoveBooks(removedata, callback);
    }

    render() {
        const columns = [
            {title: "Cover", dataIndex: "image", render: record => <img height={150} src={record}/>},
            {title: "Book name", dataIndex: "bookname"},
            {title: "Author", dataIndex: "author"},
            {title: "Price", dataIndex: "price", render: record => <Text>￥{record/100}</Text>},
            {title: "ISBN", dataIndex: "isbn"},
            {title: "Stock", dataIndex: "stock"},
            {title: "Change", dataIndex: "id", render: record => <Button onClick={() => this.handleChange(record)}>Change</Button>},
            {title: "Remove", dataIndex: "id", render: record => <Button onClick={() => this.handleRemove(record)}>Remove</Button>}
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: selectedRowKeys => {
                this.setState({choosebooks: selectedRowKeys, selectedRowKeys: selectedRowKeys});
                console.log(this.state.selectedRowKeys)
            }
        };
        return(
            <div className="home-contents">
                <form className="home-searchbar">
                    <div className="home-searchbar-input">
                        <Input className="home-searchbar-input" id="search" placeholder="Search by the name of book"/>
                    </div>

                    <Button className="home-searchbar-button" onClick={this.handleSearch}>Search</Button>
                    <Button className="home-searchbar-button" onClick={this.handleAdd}>Add Book</Button>
                    <Button className="home-searchbar-button" onClick={() => this.handleRemove(this.state.choosebooks)}>Remove Books</Button>
                </form>
                <div className="book-edit-table">
                    <Table locale={{emptyText: "No books now"}} rowSelection={rowSelection} columns={columns} rowKey={record => record.id} dataSource={this.state.result}/>
                </div>
            </div>
        )
    }
}
