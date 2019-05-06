 
import React, { Component} from 'react';
import SignIn from '../components/Form/signIn';
import SignUp from '../components/Form/signUp';
import '../style/form.scss'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {request,BooksInformation,logOut} from '../reducers/action';
import { bindActionCreators } from "redux"; 
import ls from 'local-storage';
import Button from '../components/Product/button'
class Form extends Component {
   
    state={
      signIn:true,
      signUp:true,
      dataUser: ls.get("userData") ? ls.get("userData") : {},
      
    }
    dataUser=ls.get("userData") ? ls.get("userData") : {}
    signIn=()=>{
        this.setState({signIn:false});
        this.setState({signUp:true});
    }
    signUp=()=>{
        this.setState({signIn:true});
        this.setState({signUp:false});
    }
     initialState = {}
    logOut=()=>{  
        let header={
          "Authorization" : `Bearer ${this.props.user.token}`
        };
        this.props.request("http://books.test/api/logout",header);
        ls.clear();
        this.setState({dataUser:{}});
        this.props.logOut();
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        
    }
    
    render(){
        return(
            <div className='formContainer'>
                {this.props.error===false ||(this.state.dataUser.id===undefined && this.props.userId===undefined)?<div className="divForMainButtons">
                    <Link to="/signIn"> 
                        <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span>
                    </Link>
                    <Link to='/signUp'> 
                        <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span>
                    </Link> 
                </div>:
                    <Button 
                        name="Log Out" 
                        className="buttonLogOut"    
                        callback={this.logOut}
                    />
                }
                <div className="DivForForms">
                    {this.state.signIn? null: <SignIn/>}
                    {this.state.signUp? null: <SignUp/>}
                </div> 
            </div> 
        )
    }
}
    function mapStateToProps(state) {
        return {
            state,
            user : state.userReduser.user ? state.userReduser.user.payload : state.userReduser,
            error: state.userReduser.success ?   state.userReduser.success : {},
            userId: state.userReduser.user ? state.userReduser.user.payload?state.userReduser.user.payload.id:state.userReduser.user.payload : state.userReduser.user
      };
      
    }
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
          {
            request,
            BooksInformation,
            logOut
          },
          dispatch
      );
    }
export default  connect(mapStateToProps,mapDispatchToProps)(Form);