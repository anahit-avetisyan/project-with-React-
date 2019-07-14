import React,{Component, Fragment} from 'react'
import { connect } from "react-redux";
import { request } from '../../reducers/action';
import Button from '../Product/button';
import history from '../Header/history';

class SignIn extends Component{

    state = {
        deleteSignIn : false
    }
    componentDidUpdate = (prevProps) => {  
        const { error , userIsAuthenticatedInReduxStorage } = this.props;
        if(error !== prevProps.error){
           if(userIsAuthenticatedInReduxStorage){
                history.push('/products')
                if(history.push('/products')){
                    this.setState({deleteSignIn : true})
                }
             
         
           }else{   
               //Checked and showed errors
                let emailError = error.email ? error.email : null;
                let passwordError = error.password ? error.password : null;
                this.refs.errorInputMailError.textContent=emailError;
                this.refs.errorInputPasswordError.textContent=passwordError;
           }
        }
    }
    
    signIn = () => {
        let signInFormData = {
                email : this.email.value,
                password : this.password.value,    
        }
        // Make a request to login endpoint with login form data :) 
        this.props.request("http://books.test/api/login" , "POST" , signInFormData);
    }
             
        render(){
            return(
                <Fragment>
                    {this.deleteSignIn ? null : <div className='popup'>
                        <div className = 'popup_inner'>
                            <div id = "DivForSignIn" >
                                <form>
                                    <h2>LOGIN</h2>
                                    <p ref = "errorInputMailError"></p>
                                    <input type = "mail" placeholder = "Your Email" ref = {input => this.email = input} />
                                    <p ref = "errorInputPasswordError"></p>
                                    <input type = "password" placeholder = "Password" ref = {input => this.password = input} />
                                    <Button 
                                        type = "button" 
                                        callback = {this.signIn} 
                                        name = "LOG IN"
                                    />
                                </form>  
                            </div>
                        </div>
                    </div> 
                    }
                </Fragment>
            )  
        }
    }
    function mapStateToProps(state) {
        return {
            state,
            userIsAuthenticatedInReduxStorage : state.userReduser.user && state.userReduser.user.success === true ? true : false,
            error: state.userReduser.user && state.userReduser.user.success === false ? state.userReduser.user.errors : {} 
        };
    }

    export default connect(mapStateToProps, {request})(SignIn) ;