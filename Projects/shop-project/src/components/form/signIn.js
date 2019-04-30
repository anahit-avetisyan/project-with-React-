import React,{Component} from 'react'
import { connect } from "react-redux";
import {fetchProducts} from '../Reducer/action';
import ls from 'local-storage'; 
import Button from '../Product/button'
class SignIn extends Component{
    state={ 
        email:"",
        repasswordIn:"",
        userInfo:this.props.state.userReduser,
    }
        dataUser = ls.get("userData") ? ls.get("userData") : {};

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
        if(regpass.test(this.passwordIn.value)===false){
            this.setState({passwordIn:"Please input correct format"})
        } else {
            this.setState({passwordIn:""})
        } 
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
    myFunctionSignIn=()=>{
        let mailformat =/^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;   
        let  dataSingIn={
                email:this.email.value,
                password:this.passwordIn.value,    
        }
        if(mailformat.test(this.email.value)===true && regpass.test(this.passwordIn.value)===true){     
            let method="POST"
            let url="http://books.test/api/login";
            this.props.fetchProducts(url,method,dataSingIn); 
        } else{
            alert("Please fill all fileds Right Format")
        }
                    this.passwordIn.value="";
        }
             
        render(){
            return(
                <React.Fragment>
                    <div className='popup'>
                        <div className='popup_inner'>
                            <div className="DivForForms">
                                <div  id ="DivForSignIn" >
                                    <form  >
                                        <h2>LOGIN</h2>
                                        <p ref="errorInput"></p>
                                        <input onBlur={this.functionForMail} type="mail" placeholder="Your Email"   ref={input=>this.email=input}/>
                                            <p >{this.state.email}</p>
                                        <input onBlur={this.functionForPassword}   type="password" placeholder="Password"  ref={input=>this.passwordIn=input}/>
                                            <p>{this.state.passwordIn}</p>
                                        <Button type="button" callback={this.myFunctionSignIn} name="LOG IN"/>
                                    </form>  
                                </div>
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
        };
    }
    export default connect(mapStateToProps,{fetchProducts})(SignIn) ;