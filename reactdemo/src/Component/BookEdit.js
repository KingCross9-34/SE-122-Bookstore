import React from "react";
import {Button, Descriptions, Input, message} from "antd";
import * as $ from "jquery";
import {editBook} from "../services/bookService";
import {history} from "../utils/history";
import "../css/Home.css"
import {Link} from "react-router-dom";

export class BookEdit extends React.Component{
    constructor() {
        super();
        this.state = {
            book: null,
            imgUrl: "",
            bookname: "",
            author: "",
            isbn: "",
            language: "",
            year: "",
            price: null,
            publication: "",
            stock: null,
            detail: ""
        }
    }

    change = (bookid) => {
        let bookdata = {
            "id": bookid,
            "bookname": $('#bookname').val(),
            "author": $('#author').val(),
            "isbn": $('#isbn').val(),
            "language": $('#language').val(),
            "year": $('#year').val(),
            "price": $('#price').val(),
            "publication": $('#publication').val(),
            "stock": $('#stock').val(),
            "detail": $('#detail').val(),
            "imgUrl": this.state.imgUrl
        }
        console.log(bookdata);
        const callback = (data) => {
            this.setState({book: data});
            message.success("Change successfully!")
        }
        editBook(bookdata, callback);
    }

    handleImg = () => {
        let preview = document.querySelector("#preview");
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();
        //this.setState({imgFile: file});
        var base64;
        reader.onloadend = () => {
            base64 = reader.result;
            //console.log(base64)
            preview.src = base64;
            this.state.imgUrl = base64;
        }
        //console.log(this.state.imgUrl);
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
        //console.log(base64)
    }

    cancellImg = (bookimage) => {
        let imgFile = document.getElementById("uploadImg");
        imgFile.outerHTML = imgFile.outerHTML;
        let image = document.querySelector("#preview");
        image.src = bookimage;
        this.state.imgUrl = bookimage;
    }

    returnpage = () => {
        history.goBack();
    }

    render() {
        const {book} = this.props;
        this.state.imgUrl = book.image;
        return(
            <div className="home-contents">

                <div className="edit-left">
                    <h1>{book.bookname}</h1>
                    <img id="preview" src={book.image} height={400} width={280}/>
                    <div className="edit-upload">
                        <Input id="uploadImg" type="file" onChange={this.handleImg}/>
                    </div>
                    <div className="edit-button-retrieve">
                        <Button onClick={() => this.cancellImg(book.image)}>Retrieve the cover</Button>
                    </div>

                    <div className="edit-button-submit">
                        <Button onClick={ () => this.change(book.id)}>Submit</Button>
                    </div>
                    <div className="edit-button-return">
                        <Link to="/managebook">
                            <Button>Return</Button>
                        </Link>

                    </div>
                </div>
                <div className="edit-area">
                    <form>
                        <label>Bookname</label>
                        <Input id="bookname" type="text" key={book.bookname} defaultValue={book.bookname}/>
                    </form>
                    <form>
                        <label>Author</label>
                        <Input id="author" type="text" key={book.author} defaultValue={book.author}/>
                    </form>
                    <form>
                        <label>ISBN</label>
                        <Input id="isbn" type="text" key={book.isbn} defaultValue={book.isbn}/>
                    </form>
                    <form>
                        <label>Language</label>
                        <Input id="language" type="text" key={book.languages} defaultValue={book.languages}/>
                    </form>
                    <form>
                        <label>Year</label>
                        <Input id="year" type="text" key={book.years} defaultValue={book.years}/>
                    </form>
                    <form>
                        <label>Price(分)</label>
                        <Input id="price" type="number" step={1} key={book.price} defaultValue={book.price}/>
                    </form>
                    <form>
                        <label>Stock</label>
                        <Input id="stock" type="number" step={1} key={book.stock} defaultValue={book.stock}/>
                    </form>
                    <form>
                        <label>Publication</label>
                        <Input id="publication" type="text" key={book.publication} defaultValue={book.publication}/>
                    </form>
                    <form>
                        <label>Detail</label>
                        <br/>
                        <textarea id="detail" className="text-detail" key={book.detail} defaultValue={book.detail}/>
                    </form>
                </div>

            </div>
        )
    }
}