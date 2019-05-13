 
import React, { Component} from 'react';
import '../style/form.scss';
import { connect } from "react-redux";
import {request,BooksInformation,logOut} from '../reducers/action';
import { bindActionCreators } from "redux"; 
import ls from 'local-storage';
import Button from '../components/Product/button'
import history from '../components/Header/history'


class Form extends Component {
  
    state = {
        userIsAuthenticatedInLocalStorage : ls.get('userData') && ls.get('userData').id ? true : false
    }
    signIn = () => {
        history.push('/signIn')
    }
    signUp = () => {  
        history.push('/signUp')
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
                    <Button 
                        name="SIGN IN" 
                        className="mainButtonSignIn"    
                        callback={this.signIn}
                    /> 
                     <Button 
                        name="SIGN UP" 
                        className="mainButtonSignUp"    
                        callback={this.signUp}
                    />   
                </div>:
                    <Button 
                        name="Log Out" 
                        className="buttonLogOut"    
                        callback={this.logOut}
                    /> 
                }
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