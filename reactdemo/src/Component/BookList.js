import React from "react";
import * as BookService from "../services/bookService";
import {Input, List, Button, Card} from "antd";
import {Book} from "./Book";
import * as $ from 'jquery'
import "../css/Home.css"

export class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            result: []
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

    render() {
        return(
            <div className="home-contents">
                <form className="home-searchbar">
                    <div className="home-searchbar-input">
                        <Input className="home-searchbar-input" id="search" placeholder="Input the name of the book."/>
                    </div>

                    <Button className="home-searchbar-button" onClick={this.handleSearch}>Search</Button>
                </form>
                <div className="home-booklist">
                    <List
                        className="home-booklist-list"
                        grid={{gutter: 16, column: 5}}
                        dataSource={this.state.result}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 15,
                        }}
                        locale={{emptyText: "The book you searched doesn't exist."}}

                        renderItem={item => (
                            <List.Item>
                                <Book info={item} />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}
