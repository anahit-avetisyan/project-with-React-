 
import React, { Component,Fragment } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import './Index.scss'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {fetchProducts,logOut} from '../reducer/action';
import { bindActionCreators } from "redux"; 
function mapStateToProps(state) {
  return {
       state,
  };
}
class PopUp extends Component {
  state={
    signIn:true,
    signUp:true
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
      "Authorization":"Bearer " + this.props.state.userReduser.posts.user.payload.token
    }
    this.props.fetchProducts(url,header)
    console.log(this.props.state.userReduser.posts.user.payload.token)
  }
    render(){
     console.log(this.props.state)
        return(
            <Fragment>
               {this.props.state.userReduser.posts===undefined||this.props.state.userReduser.posts.user.success===false?<div className="divForMainButtons">
                <Link to="/registration/signIn"> <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span></Link>
                <Link to='/registration/signUp'>   <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span></Link> 
                </div>:null}
               {this.props.state.userReduser.posts===undefined?null:this.props.state.userReduser.posts.user.success===false?null:<button  className="mainButtonSignUP" onClick={this.logOut}>Log Out</button>}
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
        // logOut,
        fetchProducts
      },
      dispatch
  );
}
export default  connect(mapStateToProps,mapDispatchToProps)(PopUp);