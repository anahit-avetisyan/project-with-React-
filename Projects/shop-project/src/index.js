import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import reducer from './components/reducer/reducer'
import { createStore,applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';
import { BrowserRouter as Router, Route} from "react-router-dom";
import TablePage from './components/Route/tablePage'
import { createBrowserHistory } from 'history';
import Main from './components/Main/main';
import Header from './components/Header/header'
const store=createStore(reducer,applyMiddleware(thunk))
const history = createBrowserHistory()
  const routing= (<Provider store={store}> 
<Router history={history}>
  <Route path='/' component={Header}/>
  <Route path='/tablepage'  component={TablePage}/>
  <Route path='/products' component={Main}/>
</Router>  
 
</Provider>
  )
 ReactDOM.render(routing,document.getElementById('root'));
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
