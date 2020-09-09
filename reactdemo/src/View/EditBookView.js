import React from "react";
import {BookEdit} from "../Component/BookEdit";
import {getBook} from "../services/bookService";
import {Header} from "../Component/Header";
import {MenuBar} from "../Component/MenuBar";

class EditBookView extends React.Component{
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
        return (
            <div className="home-page">
                <div className="admin-header">
                    <Header/>
                </div>
                <div className="admin-main">
                    <div className="admin-menubar">
                        <MenuBar auth={2}/>
                    </div>
                    <BookEdit book={this.state.book}/>
                </div>
            </div>
        )
    }
}

export default EditBookView;
