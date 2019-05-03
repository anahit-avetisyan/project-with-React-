import React,{Component} from 'react'
import { connect } from "react-redux";
import { request } from '../../reducers/action';
import ls from 'local-storage'; 
import Button from '../Product/button'

class SignIn extends Component{
    state={ 
        email:"",
        repassword:"",
    }
        

    closed=()=>{
        this.setState({closeSignIn:true})   
    }
    
    functionForMail=()=>{
        let mailformat = /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        if(mailformat.test(this.email.value)===false){
            this.setState({email:"Please Input Right Format"})
        } else {
            this.setState({email:""})
        }
    } 
    functionForPassword = () => {
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;   
        if(regpass.test(this.password.value)===false){
            this.setState({password:"Please input correct format"})
        } else {
            this.setState({password:""})
        } 
    }

    componentDidUpdate=(prevProps)=>{  
        if(this.props.user!==prevProps.user){
           
            // if(this.props.user.===undefined){
            //     this.refs.errorInput.textContent=null
            // }else if(this.props.user!==undefined){
            //     if(this.props.user.success===false){
            //         this.refs.errorInput.textContent=this.props.user.errors
            //     }else if(this.props.user.success===true){
            //         if(this.props.history!==undefined){
                        // return this.props.history.push('/products')
            //         }
            //     }
            // }
        }

    }

    signIn=()=>{
        let mailFormatRegExp =/^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        let passwordFormatRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        let signInFormData={
                email:this.email.value,
                password:this.password.value,    
        }

        if (mailFormatRegExp.test(signInFormData.email) === false){
            alert("The email format is incorrect!");
        }

        if (passwordFormatRegExp.test(signInFormData.password) === false){
            alert("The password format is incorrect!");
        }

        // Make a request to login endpoint with login form data :) 
        this.props.request("http://books.test/api/login" , "POST" , signInFormData);

    }
             
        render(){
            console.log(this.props.user,"user",this.props.error )
            return(
                <React.Fragment>
                    <div className='popup'>
                        <div className='popup_inner'>
                            <div id ="DivForSignIn" >
                                <form>
                                    <h2>LOGIN</h2>
                                    <p ref="errorInput"></p>
                                    <input onBlur={this.functionForMail} type="mail" placeholder="Your Email"   ref={input=>this.email=input}/>
                                    <p >{this.state.email}</p>
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