import React,{Component,Fragment} from 'react';
import { connect } from "react-redux";
import {request} from '../../reducers/action';
import Button from '../Product/button'
 

class SignUp extends Component {

    myFunctionSignUp=()=>{
        let  signUpFormData = {
            name : this.name.value,
            email : this.email.value,
            password : this.password.value,    
        }
        this.props.request("http://books.test/api/register","POST",signUpFormData)  
        
    }    
    componentDidUpdate = (prevProps) => {
        if(this.props.error !== prevProps.error){
            if(this.props.user){
                 if(this.props.history !== undefined){
                     return this.props.history.push('/products')
                 }  
            }else{   
                //Checked and showed errors
                 let emailError = this.props.error.email;
                 let passwordError = this.props.error.password;
                 let nameError = this.props.error.name
                 this.refs.passwordError.textContent = passwordError ? passwordError : null;
                 this.refs.emailError.textContent = emailError ? emailError : null;
                 this.refs.nameError.textContent = nameError ? nameError : null;
                  
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
                                <input   
                                    type="text"   
                                    placeholder="Name"   
                                    ref={input=>this.name=input} 
                                />
                                <p ref = "nameError"></p>
                                <input   
                                    type="mail" 
                                    placeholder="Your Email"  
                                    ref={input=>this.email=input}
                                />
                                <p ref="emailError"></p>
                                <input   
                                    type="password" 
                                    placeholder="Password"  
                                    ref={input=>this.password=input}
                                />
                                <p ref = "passwordError"></p>
                                <input   
                                    type="password" 
                                    placeholder="Repeat your password" 
                                    ref={input=>this.repassword=input}
                                /> 
                                <Button 
                                    type="button" 
                                    callback={this.myFunctionSignUp} 
                                    name="CREAT ACCOUNT"
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
            user : state.userReduser.user ? state.userReduser.user.payload : state.userReduser,
            error: state.userReduser.user ?  state.userReduser.user.errors : state.userReduser 
        };
    }
export default connect(mapStateToProps,{request})(SignUp) ;