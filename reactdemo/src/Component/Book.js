import React from "react";
import {Link} from "react-router-dom";
import {Card} from "antd";
import "../css/Home.css"

const {Meta} = Card;

export class Book extends React.Component{
    render() {
        const {info} = this.props;

        return (
                <Link to={{
                    pathname: '/bookdetail',
                    search: '?id=' + info.id}}
                      target="_blank"
                >
                    <Card
                        hoverable
                        style={{width: 181, float: "left"}}
                        cover={<img alt="image" src={info.image} className={"bookImg"} height={200}/>}
                        //onClick={this.showBookDetails.bind(this, info.id)}
                    >
                        <Meta title={info.bookname} description={'¥' + info.price/100}/>
                    </Card>
                </Link>
        );
    }
}