import React,{Component} from 'react'
import { connect } from "react-redux";
import { request } from '../../reducers/action';
import Button from '../Product/button'

class SignIn extends Component{

    closed=()=>{
        this.setState({closeSignIn:true})   
    }

    componentDidUpdate=(prevProps)=>{  
        if(this.props.error!==prevProps.error){
           if(this.props.user){
                if(this.props.history!==undefined){
                    return this.props.history.push('/products')
                }  
           }else{   
               //Checked and showed errors
                let emailError = this.props.error.email;
                let passwordError = this.props.error.password;
                this.refs.errorInputPasswordError.textContent=passwordError ? passwordError : emailError === undefined ? this.props.error : null;
                this.refs.errorInputMailError.textContent=emailError ? emailError :null
           }
        }
    }

    signIn=()=>{
         
        let signInFormData={
                email:this.email.value,
                password:this.password.value,    
        }
        // Make a request to login endpoint with login form data :) 
        this.props.request("http://books.test/api/login" , "POST" , signInFormData);
    }
             
        render(){
            return(
                <React.Fragment>
                    <div className='popup'>
                        <div className='popup_inner'>
                            <div id ="DivForSignIn" >
                                <form>
                                    <h2>LOGIN</h2>
                                    <p ref="errorInputMailError"></p>
                                    <input 
                                        type="mail"
                                        placeholder="Your Email"   
                                        ref={input=>this.email=input}
                                    />
                                    <p ref="errorInputPasswordError"></p>
                                    <input    
                                        type="password" 
                                        placeholder="Password"  
                                        ref={input=>this.password=input}
                                    />
                                    <Button type="button" callback={this.signIn} name="LOG IN"/>
                                </form>  
                            </div>
                        </div>
                    </div> 
                </React.Fragment>
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
    export default connect(mapStateToProps,{request})(SignIn) ;