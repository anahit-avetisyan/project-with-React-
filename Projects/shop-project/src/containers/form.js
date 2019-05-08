 
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
  
    state = {
      signIn : true,
      signUp : true,
      userIsAuthenticatedInLocalStorage : ls.get('userData') && ls.get('userData').id ? true : false
    }
   
    signIn = () => {
        this.setState({signIn:false});
        this.setState({signUp:true});
    }
    signUp = () => {
        this.setState({signIn:true});
        this.setState({signUp:false});
    }

    logOut = () => {
        let authUserData = ls.get('userData');

        let header={
          "Authorization" : `Bearer ${authUserData.token}`
        };
        this.props.request("http://books.test/api/logout",header);

        ls.clear();

        this.setState({userIsAuthenticatedInLocalStorage : false});

        this.props.logOut();
        this.props.BooksInformation({}); 
    }
    
    render(){
        
        const { userIsAuthenticatedInReduxStorage } = this.props; 
        const { userIsAuthenticatedInLocalStorage } = this.state;
            
        return(
            <div className='formContainer'>
                {userIsAuthenticatedInReduxStorage === false && userIsAuthenticatedInLocalStorage === false ?
                <div className="divForMainButtons">
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
            userIsAuthenticatedInReduxStorage : state.userReduser.user ? true : false,
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