import React from "react";
import {Router, Route, Redirect, Switch} from "react-router-dom";
import LoginView from "../View/LoginView";
import HomeView from "../View/HomeView";
import BookDetailView from "../View/BookDetailView";
import RegisterView from "../View/RegisterView";
import ContactView from "../View/ContactView";
import ChartView from "../View/ChartView";
import OrderInfoView from "../View/OrderInfoView";
import OrderView from "../View/OrderView";
import AddBookView from "../View/AddBookView";
import ManageUserView from "../View/ManageUserView";
import ManageBookView from "../View/ManageBookView";
import EditBookView from "../View/EditBookView";
import StatisticView from "../View/StatisticView";
import {history} from "../utils/history";
import TopupView from "../View/TopupView";

class BookstoreRouter extends React.Component{
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render() {
        //console.log("bookstorerouter");
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={LoginView}/>
                    <Route exact path="/register" component={RegisterView}/>
                    <Route exact path="/home" component={HomeView}/>
                    <Route exact path="/chart" component={ChartView}/>
                    <Route exact path="/contact" component={ContactView}/>
                    <Route exact path="/bookdetail" component={BookDetailView}/>
                    <Route exact path="/orderinfo" component={OrderInfoView}/>
                    <Route exact path="/order" component={OrderView}/>
                    <Route exact path="/topup" component={TopupView}/>
                    <Route exact path="/manageuser" component={ManageUserView}/>
                    <Route exact path="/managebook" component={ManageBookView}/>
                    <Route exact path="/statistic" component={StatisticView}/>
                    <Route exact path="/addbook" component={AddBookView}/>
                    <Route exact path="/editbook" component={EditBookView}/>
                    <Redirect from="/*" to="/login"/>
                </Switch>
            </Router>
        );
    }
}

export default BookstoreRouter;
