 
import React, { Component,Fragment } from 'react';
import SignIn from '../components/Form/signIn';
import SignUp from '../components/Form/signUp';
import '../style/form.scss'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {request,BooksInformation} from '../reducers/action';
import { bindActionCreators } from "redux"; 
import ls from 'local-storage';
import Button from '../components/Product/button'
class Form extends Component {
   
    state={
      signIn:true,
      signUp:true,
      
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
    logOut=()=>{  
        let header={
          "Authorization" : `Bearer ${this.props.user.token}`
        };
        this.props.request("http://books.test/api/logout",header);
        console.log(header)
        ls.clear();
        this.dataUser={};
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        
    }
       
    render(){
        console.log(this.dataUser)
    const user=this.dataUser
        return(
            <Fragment>
                {this.props.error||this.dataUser.id===undefined?<div className="divForMainButtons">
                    <Link to="/signIn"> 
                        <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span>
                    </Link>
                    <Link to='/signUp'> 
                        <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span>
                    </Link> 
                </div>:null}
                    {this.props.error||this.dataUser.id===undefined?null:
                    <Button 
                        name="Log Out" 
                        className="mainButtonSignUP" 
                        callback={this.logOut}
                    />
                }
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
            user : state.userReduser.user ? state.userReduser.user.payload : state.userReduser,
            error: state.userReduser.user ?  state.userReduser.user.errors : state.userReduser 
      };
    }
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
          {
            request,
            BooksInformation
          },
          dispatch
      );
    }
export default  connect(mapStateToProps,mapDispatchToProps)(Form);