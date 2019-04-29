import React, { Component } from "react";
import { Router, Route} from "react-router-dom";
import Basket from './components/Basket/basket';
import { createBrowserHistory } from 'history';
import Main from './components/Product/main';
import Header from './components/Header/header';
import SignIn from './components/Form/signIn';
import SignUp from './components/Form/signUp';
import PopUp from './components/Form/Index';
import Order from './components/Orders/orders';
import history from './components/Header/history';

 
class App extends Component {
  
    history = createBrowserHistory()

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Route path='/' component={Header}/>
                    <Route path='/myBasket'  component={Basket}/>
                    <Route path='/registration' component={PopUp}/>
                    <Route path='/registration/signIn' component={SignIn}/>
                    <Route path='/registration/signUp' component={SignUp}/>
                    <Route path='/products' component={Main}/>
                    <Route path='/orders' component={Order}/>
                </Router>  
            </div>
        );
    }
}

export default App;
