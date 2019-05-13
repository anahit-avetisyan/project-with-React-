import React, { Component } from "react";
import { Router, Route,Switch} from "react-router-dom";
import Basket from '../containers/basket';
import Main from '../containers/main';
import Header from '../containers/header';
import SignIn from '../components/Form/signIn';
import SignUp from '../components/Form/signUp';
import Order from '../components/Orders/order';
import history from '../components/Header/history';

 
class Routing extends Component {
    render() {
        return (
            <div className = "App">
                <Router history = {history}>
                    <div>
                        <Header/> 
                        <Switch>
                            <Route path = '/products' component = {Main}/>
                            <Route path = '/signIn' component = {SignIn}/>
                            <Route path = '/signUp' component = {SignUp}/>
                            <Route path = '/myBasket'  component = {Basket}/>
                            <Route path = '/orders' component = {Order}/>
                        </Switch>
                    </div>
                </Router>  
            </div>
        );
    }
}

export default Routing;