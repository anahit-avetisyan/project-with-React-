 
import React, { Component,Fragment } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import './Index.scss'
import {Link} from 'react-router-dom';
 
 
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
    render(){
      console.log(this.state)
        return(
            <Fragment>
                <div className="divForMainButtons">
                <Link to="/registration/signIn"> <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span></Link>
                <Link to='/registration/signUp'>   <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span></Link> 
                </div>
                <div className="DivForForms">
                {this.state.signIn? null: <SignIn/>}
                {this.state.signUp? null: <SignUp/>}
                </div> 
            </Fragment> 
        )
    }
}
export default PopUp;