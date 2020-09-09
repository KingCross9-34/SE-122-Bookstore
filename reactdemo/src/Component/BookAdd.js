import React from "react";
import {Button, Input, message} from "antd";
import * as $ from 'jquery'
import {addBook} from "../services/bookService";
import "../css/BookAdd.css"
import {Link} from "react-router-dom";

export class BookAdd extends React.Component{
    constructor() {
        super();
        this.state = {
            // bookname: "",
            // author: "",
            // isbn: "",
            // language: "",
            // year: null,
            // price: null,
            // publication: "",
            // stock: null,
            // detail: "",
            imgUrl: null
        }
    }

    handleSubmit = () => {
        let bookdata = {
            "bookname": $('#bookname').val(),
            "author": $('#author').val(),
            "isbn": $('#isbn').val(),
            "language": $('#language').val(),
            "year": $('#year').val(),
            "price": $('#price').val() * 100,
            "publication": $('#publication').val(),
            "stock": $('#stock').val(),
            "detail": $('#detail').val(),
            "imgUrl": this.state.imgUrl
        }
            console.log(this.state);
            addBook(bookdata);
    }

    handleImg = () => {
        let preview = document.querySelector("#preview");
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();
        console.log("preview",preview)
        //this.setState({imgFile: file});
        var base64;
        reader.onloadend = () => {
            base64 = reader.result;
            //console.log(base64)
            preview.src = base64;
            this.state.imgUrl = base64;
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    renderImg = () => {
        return (
            <div>
                <img id="preview" src="" height={400}/>
            </div>

        )
    }

    render() {
        return (
            <div className="home-contents">
                <form onSubmit={this.handleSubmit}>
                    <div className="left">
                        <div className="coverpreview">
                            <div>
                                <label>Cover</label>
                                <Input id="cover"
                                       type="file"
                                       onChange={this.handleImg}
                                />
                            </div>
                            {this.renderImg()}
                        </div>
                        <Button className="bookadd" type="primary" htmlType="submit">Add</Button>
                        <Link to="/managebook">
                            <Button className="bookadd-return">Return</Button>
                        </Link>
                    </div>
                    <div className="infoinput">
                        <form>
                            <label>Bookname</label>
                            <Input id="bookname"
                                   placeholder="bookname"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Author</label>
                            <Input id="author"
                                   placeholder="Author"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>ISBN</label>
                            <Input id="isbn"
                                   placeholder="ISBN"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Language</label>
                            <Input id="language"
                                   placeholder="Language"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Year</label>
                            <Input id="year"
                                   placeholder="Year"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Price(yuan)</label>
                            <Input id="price"
                                   type="number" step={0.01} min={0}
                                   placeholder="Price"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Publication</label>
                            <Input id="publication"
                                   placeholder="Publication"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Stock</label>
                            <Input id="stock"
                                   placeholder="Stock"
                                //onChange={this.handleUsername}
                            />
                        </form>
                        <form>
                            <label>Detail</label>
                            <textarea id="detail"
                                   placeholder="Detail"
                                   className="input-detail"
                                //onChange={this.handleUsername}
                            />
                        </form>
                    </div>


                </form>
            </div>
        )
    }
}
