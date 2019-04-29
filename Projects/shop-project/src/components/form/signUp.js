import React,{Component,Fragment} from 'react';
import { connect } from "react-redux";
import {fetchProducts} from '../Reducer/action';
import ls from 'local-storage';  
 

class SignUp extends Component {
    state={
        apearName:true,
        closeSignUp:false,
        name:"",
        email:"",
        password:"",
        repassword:"",
    }

    functionForEmail=()=>{
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
        }else{
            this.setState({password:""})
        }   
    }
    functionForRepeatPassword=()=>{
        if(this.password.value!==this.repassword.value){
          this.setState({repassword:"That password does not match.Try again"})  
        } else {
            this.setState({repassword:""})
        }
    }
    
    myFunctionSignUp=()=>{
        let regexpName =/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,6}$/;
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
        let mailformat =/^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        if(regexpName.test(this.name.value)&& mailformat.test(this.email.value)&& regpass.test(this.password.value)===true){
            let  data={
                name:this.name.value,
                email:this.email.value,
                password:this.password.value,    
            }
            let method="POST"
            let url="http://books.test/api/register"
            this.props.fetchProducts(url,method,data)  
        } else {
            alert("Please fill all fileds Right Format")
        } 
        this.name.value=""
        this.email.value=""
        this.password.value=""
        this.repassword.value=""   
    }    
    componentDidUpdate=(prevProps)=>{
        if(this.props.state.userReduser.posts!==prevProps.state.userReduser.posts){
            if(this.props.state.userReduser.posts===undefined){
                this.refs.errorInput.textContent=null
            }
            else if(this.props.state.userReduser.posts!==undefined){
                if(this.props.state.userReduser.posts.user.success===false){
                    this.refs.errorInput.textContent=this.props.state.userReduser.posts.user.errors
                }
                else if(this.props.state.userReduser.posts.user.success===true){
                    if(this.props.history!==undefined){
                    return this.props.history.push('/products')
                    }
                }
            }
        }

    }
    dataUser = ls.get("userData") ? ls.get("userData") : {}
 
    render(){
        return(
            <Fragment>
                {this.state.closePopup? null:<div className='popup'>
                    <div className='popup_inner'>
                        <div className="DivForForms">
                                {this.state.signIn? null:<div id ="DivForSignUp"  ref={el=>this.SignUp=el}>
                                <h2>Creat Account</h2>
                                    <form > 
                                        <input   type="text"   placeholder="Name"   ref={input=>this.name=input} />
                                            <p>{this.state.password}</p>
                                        <input onBlur={this.functionForEmail} type="mail" placeholder="Your Email"  ref={input=>this.email=input}/>
                                            <p ref="errorInput"> </p>
                                        <input  onBlur={this.functionForPassword} type="password" placeholder="Password"  ref={input=>this.password=input}/>
                                            <p>{this.state.password}</p>
                                        <input onBlur={this.functionForRepeatPassword} type="password" placeholder="Repeat your password" className= "RepeatPassword" ref={input=>this.repassword=input}/>
                                            <p>{this.state.repassword}</p>
                                        <button ref={button=>this.buttonSignUp=button}   type="button" onClick={this.myFunctionSignUp}>CREAT ACCOUNT</button>    
                                        <p ref={checkbox=>this.checkbox1=checkbox} id="footer">Have already an account? <b><a href="/registration/signIn" target = "_self"  > Login here </a> </b></p>
                                </form>
                            </div>}
                        </div>
                    </div>
                </div>}  
            </Fragment>
        )
    }
}
    function mapStateToProps(state) {
        return {
            state,
        };
    }
export default connect(mapStateToProps,{fetchProducts})(SignUp) ;