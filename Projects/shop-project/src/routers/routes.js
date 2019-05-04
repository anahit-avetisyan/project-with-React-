import React, { Component } from "react";
import { Router, Route} from "react-router-dom";
import Basket from '../containers/basket';
import Main from '../containers/main';
import Header from '../containers/header';
import SignIn from '../components/Form/signIn';
import SignUp from '../components/Form/signUp';
import PopUp from '../containers/form';
import Order from '../components/Orders/orders';
import history from '../components/Header/history';

 
class Routing extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Route path='/' component={Header}/>
                    <Route path='/myBasket'  component={Basket}/>
                    <Route path='/signIn' component={SignIn}/>
                    <Route path='/signUp' component={SignUp}/>
                    <Route path='/products' component={Main}/>
                    <Route path='/orders' component={Order}/>
                </Router>  
            </div>
        );
    }
}

export default Routing;