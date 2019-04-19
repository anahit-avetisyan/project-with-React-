 
import React, { Component,Fragment } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import './Index.scss'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {fetchProducts} from '../reducer/action';
import {LogOut} from '../reducer/action'
import { bindActionCreators } from "redux"; 
import ls from 'local-storage';
function mapStateToProps(state) {
  return {
       state,
  };
}
class PopUp extends Component {
   
  state={
    signIn:true,
    signUp:true,
    dataUser:ls.get("userData") ? ls.get("userData") : {}
  }
  
  signIn=()=>{
    this.setState({signIn:false})
    this.setState({signUp:true})
  }
  signUp=()=>{
    this.setState({signIn:true})
    this.setState({signUp:false})
  }
    logOut=()=>{  
        let url="http://books.test/api/logout"
        let header={
          "Authorization" : `Bearer ${this.state.dataUser.posts.user.payload.token}`
        }
        this.props.fetchProducts(url,header);
        ls.clear();
        this.setState({dataUser:{}})
        
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
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        LogOut,
        fetchProducts
      },
      dispatch
  );
}
export default  connect(mapStateToProps,mapDispatchToProps)(PopUp);