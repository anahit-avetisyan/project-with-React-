 
import React, { Component,Fragment } from 'react';
import {FaTimes} from 'react-icons/fa';
import SignIn from './signIn';
import SignUp from './signUp';
import './Index.scss'

 
 
class PopUp extends Component {
  state={
    closePopup:true,
    signIn:true,
    signUp:true
  }
   
  signIn=()=>{
    this.setState({closePopup:false})
    this.setState({signIn:false})
    this.setState({signUp:true})
  }
  closed=()=>{
    this.setState({closePopup:true})  
}
  signUp=()=>{
    this.setState({closePopup:false})
    this.setState({signIn:true})
    this.setState({signUp:false})
  }
    render(){
      
        return(
            <Fragment>
                <div className="divForMainButtons">
                    <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span>
                    <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span>
                </div>
            {this.state.closePopup? null:<div className='popup'>
                  <div className='popup_inner'>
                  <FaTimes className="FaTimes" onClick={this.closed}/> 
                  <div className="DivForForms">
                  {this.state.signIn? null:<SignIn/>}
                  {this.state.signUp? null: <SignUp/>}
                  </div>
                  </div>
              </div>}
            </Fragment> 
        )
    }
}
export default PopUp;