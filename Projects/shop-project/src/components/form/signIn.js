import React,{Component} from 'react'
import { connect } from "react-redux";
import {fetchProducts} from '../reducer/action';
class SignIn extends Component{
    state={ 
        closeSignIn:false,
        nameIn: "",
        repasswordIn:"",
      

        }
        closed=()=>{
            this.setState({closeSignIn:true})   
        }
        mailChange=()=>{
            let mailformat = /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
            if(mailformat.test(this.email.value)===false){
                this.setState({email:"Please Input Right Format"})
            } 
            else{
                this.setState({email:""})
            }
        } 
    passwordChangeIn = () => {
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;   
        if(regpass.test(this.passwordIn.value)===false){
            this.setState({passwordIn:"Please input correct format"})
        }
            else{
                this.setState({passwordIn:""})
            } 
    }
    myFunctionOne=()=>{
        let mailformat =/^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;   
        let  data1={
            email:this.email.value,
            password:this.passwordIn.value,    
                 }
         
    if(mailformat.test(this.email.value)===true && regpass.test(this.passwordIn.value)===true){     
        let method="POST"
        let url="http://books.test/api/login";
        this.props.fetchProducts(url,method,data1)
        }
        else{
            alert("Please fill all fileds Right Format")
        }
        this.email.value="";
        this.passwordIn.value="";
   
        // if(this.response===undefined){
        //     alert("aaa")
        // }
        // if(this.response.success===false){
        // this.setState({responceForLogIn:this.response.error})
        // }

        }

        render(){
            console.log(this.props.state)
         
            return(
                <React.Fragment>
                       {this.state.closeSignIn? null:<div className='popup'>
                  <div className='popup_inner'>
                  <div className="DivForForms">
                    <div  id ="DivForSignIn" ref={el=>this.SignIn=el}>
                    <form id="signIn">
                        <h2>LOGIN</h2>
                        {this.props.state.userReduser.posts===undefined? null:<p>{this.props.state.userReduser.posts.user.success===false?this.props.state.userReduser.posts.user.errors:this.props.history===undefined?null:this.props.history.push('/products')}</p>}
                             <input onChange={this.mailChange} type="mail" placeholder="Your Email" id="loginEmail" ref={input=>this.email=input}/>
                                <p  >{this.state.mail}</p>
                            <input onChange={this.passwordChangeIn}   type="password" placeholder="Password" id="loginPasswordOne" ref={input=>this.passwordIn=input}/>
                                <p>{this.state.passwordIn}</p>
                            <button ref={button=>this.button2=button}   id="buttonTwo" type="button" onClick={this.myFunctionOne}>LOG IN</button>
                    </form>  
                    </div>
                  </div>
                  </div>
              </div>} 
                  
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