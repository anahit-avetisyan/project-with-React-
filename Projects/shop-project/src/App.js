import React, { Component } from "react";
import "./App.scss";
import { Router, Route} from "react-router-dom";
import TablePage from './components/TablePage/tablePage'
import { createBrowserHistory } from 'history';
import Main from './components/Main/main';
import Header from './components/Header/header';
import SignIn from './components/form/signIn';
import SignUp from './components/form/signUp';
import PopUp from './components/form/Index';
import Order from './components/orders/orders'

 
class App extends Component {
  
  history = createBrowserHistory()
  render() {
    return (
      <div className="App">
          <Router history={this.history}>
              <Route path='/' component={Header}/>
              <Route path='/tablepage'  component={TablePage}/>
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
