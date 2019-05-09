import React,{Component,Fragment} from 'react';
import { connect } from "react-redux";
import {request} from '../../reducers/action';
import Button from '../Product/button'
import history from '../Header/history';

class SignUp extends Component {

    signUp=()=>{
        let signUpFormData = {
            name : this.name.value,
            email : this.email.value,
            password : this.password.value,    
        }
        this.props.request("http://books.test/api/register","POST",signUpFormData)  
        
    }    
    componentDidUpdate = (prevProps) => {

        const {error , userIsAuthenticatedInReduxStorage} = this.props;
     
        if(error !== prevProps.error){
            if(userIsAuthenticatedInReduxStorage){
                return history.push('/products')  
            }else{   
                //Checked and showed errors
                const {error} = this.props
                let emailError =  error.email ? error.email : null;
                let passwordError =  error.password ? error.password: null;
                let nameError = error.name ? error.name : null;
                this.refs.passwordError.textContent = passwordError 
                this.refs.emailError.textContent = emailError 
                this.refs.nameError.textContent = nameError   
            }
        }
    }
 
    render(){
        return(
            <Fragment>
                <div className='popup'>
                    <div className='popup_inner'>
                        <div id ="DivForSignUp"  >
                            <h2>Creat Account</h2>
                            <form >
                                <input  type="text"   placeholder="Name"   ref={input=>this.name=input} />
                                <p ref = "nameError"></p>
                                <input  type="mail" placeholder="Your Email" ref={input=>this.email=input}  />
                                <p ref="emailError"></p>
                                <input  type="password"  placeholder="Password"  ref={input=>this.password=input} /> 
                                <p ref = "passwordError"></p>
                                <input   type="password"  placeholder="Repeat your password"  /> 
                                <Button 
                                    type="button" 
                                    callback={this.signUp} 
                                    name="CREATE ACCOUNT"
                                />   
                                <p  id = "footer" >Have already an account? <b><a href = "/registration/signIn" target = "_self"  > Login here </a> </b></p>
                            </form>
                        </div>
                    </div>
                </div> 
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
export default connect(mapStateToProps,{request})(SignUp) ;