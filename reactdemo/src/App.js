import React from 'react';
import logo from './logo.svg';
import BookstoreRouter from "./Router/Router";
import './App.css';

class App extends React.Component{
    render() {
        return(
            <BookstoreRouter/>
        );
    }
}

export default App;
