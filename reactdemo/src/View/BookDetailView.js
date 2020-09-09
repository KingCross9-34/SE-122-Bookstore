import React from "react";
import {getBook} from "../services/bookService";
import {Header} from "../Component/Header";
import {BookDetail} from "../Component/BookDetail";
import "../css/BookDetail.css"

class BookDetailView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            book: []
        }
    }

    componentDidMount() {
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        this.setState({id: bookId});
        getBook(bookId, (data) => {
            this.setState({book: data});
            console.log("state: " +this.state.book.bookname);
        });
    }

    render() {
        const auth = JSON.parse(localStorage.getItem("user")).authority;
        if (auth === 1) {
            return(
                <div className="bookdetail-page">
                    <div className="bookdetail-header">
                        <Header/>
                    </div>
                    <BookDetail info={this.state.book}/>
                </div>
            )
        }
        else if (auth === 2) {
            return (
                <div className="bookdetail-page">
                    <div className="bookdetail-admin-header">
                        <Header/>
                    </div>
                    <BookDetail info={this.state.book}/>
                </div>
            )
        }

    }
}

export default BookDetailView;
