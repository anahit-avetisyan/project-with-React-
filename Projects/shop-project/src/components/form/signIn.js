import React,{Component} from 'react'
import { connect } from "react-redux";
import { request } from '../../reducers/action';
import Button from '../Product/button'

class SignIn extends Component{
    state={ 
        email:"",
        repassword:"",
    }
        

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
               console.log(this.props.error.password===undefined && this.props.error.email===undefined)
               //Checked and showed errors
                this.refs.errorInputMailError.textContent=this.props.error.password===undefined && this.props.error.email===undefined?"aaaa":null
                this.refs.errorInputPasswordError.textContent=this.props.error.password ? this.props.error.password : null
                this.refs.errorInputMailError.textContent=this.props.error.email ? this.props.error.email : null
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
                                    <input onBlur={this.functionForMail} type="mail" placeholder="Your Email"   ref={input=>this.email=input}/>
                                    <p >{this.state.email}</p>
                                    <p ref="errorInputPasswordError"></p>
                                    <input onBlur={this.functionForPassword}   type="password" placeholder="Password"  ref={input=>this.password=input}/>
                                    <p>{this.state.password}</p>
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