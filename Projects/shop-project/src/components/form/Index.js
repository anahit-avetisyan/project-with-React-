 
import React, { Component,Fragment } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import './Index.scss'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {fetchProducts,BooksInformation} from '../Reducer/action';
import {LogOut} from '../Reducer/action'
import { bindActionCreators } from "redux"; 
import ls from 'local-storage';

class PopUp extends Component {
   
    state={
      signIn:true,
      signUp:true,
      dataUser:ls.get("userData") ? ls.get("userData") : {}
    }
  
    signIn=()=>{
        this.setState({signIn:false});
        this.setState({signUp:true});
    }
    signUp=()=>{
        this.setState({signIn:true});
        this.setState({signUp:false});
    }
    logOut=()=>{  
        let url="http://books.test/api/logout"
        let header={
          "Authorization" : `Bearer ${this.state.dataUser.posts.user.payload.token}`
        };
        this.props.fetchProducts(url,header);
        ls.clear();
        this.setState({dataUser:{}});
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        
    }
       
    render(){
        return(
            <Fragment>
                {this.state.dataUser.posts===undefined||this.state.dataUser.posts.user.success===false?<div className="divForMainButtons">
                    <Link to="/registration/signIn"> <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span></Link>
                    <Link to='/registration/signUp'>   <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span></Link> 
                </div>:null}
                    {this.state.dataUser.posts===undefined?null:this.state.dataUser.posts.user.success===false?null:<button  className="mainButtonSignUP" onClick={this.logOut}>Log Out</button>}
                <div className="DivForForms">
                    {this.state.signIn? null: <SignIn/>}
                    {this.state.signUp? null: <SignUp/>}
                </div> 
            </Fragment> 
        )
    }
}
    function mapStateToProps(state) {
      return {
          state,
      };
    }
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
          {
            LogOut,
            fetchProducts,
            BooksInformation
          },
          dispatch
      );
    }
export default  connect(mapStateToProps,mapDispatchToProps)(PopUp);