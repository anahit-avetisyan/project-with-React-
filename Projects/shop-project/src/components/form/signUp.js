import React,{Component,Fragment} from 'react';
import { connect } from "react-redux";
import {fetchProducts} from '../reducer/action';
import history from '../Header/history'
 

function mapStateToProps(state) {
    return {
         state,
    };
}

class SignUp extends Component {
    state={
        apearName:true,
        closeSignUp:false,
        name:"",
        userName:"",
        email:"",
        password:"",
        repassword:"",
        allfields:"",
    }
    history=this.props
    // pushPage=history.push('/')
    closed=()=>{
        this.setState({closePopup:true})  
    }
    nameChange=()=>{
        let regexpName =/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,6}$/;
        if(regexpName.test(this.name.value)===false){
            this.setState({name:"Please Input Right Format"})
        } 
        else{
            this.setState({name:""})
        }
    }
    userNameChange=()=>{
        let regexpUserName= /[A-Z][a-zA-Z]{1,6}$/;
        if(regexpUserName.test(this.userName.value)===false){
            this.setState({userName:"Please Input Right Format"})
        }
        else{
            this.setState({userName:""})
        }
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
    passwordChange = () => {
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;   
        if(regpass.test(this.password.value)===false){
            this.setState({password:"Please input correct format"})
        }
            else{
                this.setState({password:""})
            }   
    }
    repasswordChange=()=>{
        if(this.password.value!==this.repassword.value){
          this.setState({repassword:"That password does not match.Try again"})  
        }
        else{
            this.setState({repassword:""})
        }
    }
    
    myFunction=()=>{
        console.log(this.props.history.location.pathname)
        let regexpName =/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,6}$/;
        // let regexpUserName= /[A-Z][a-zA-Z]{1,6}$/;
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
        let mailformat =/^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        if(regexpName.test(this.name.value)&& mailformat.test(this.email.value)&& regpass.test(this.password.value)===true){
            let  data={
                name:this.name.value,
                email:this.email.value,
                password:this.password.value,    
            }
        //   let url="http://books.test/api/register"
            this.props.fetchProducts(data)
        //  if( this.props.state.userReduser.posts.user.psuccess===true ){
           
        //  }
         
   
           
        }

    else{
        alert("Please fill all fileds Right Format")
     
    } 
    //  this.name.value=""
    //  this.userName.value=""
    //  this.email.value=""
    //  this.password.value=""
    //  this.repassword.value=""   
   

}    
 
 
    render(){
        
        console.log(this.props.state.userReduser.posts);
        console.log(history)
        // const { user } = this.props.userReduser.posts.user;
   
        return(
            <Fragment>
            {this.state.closePopup? null:<div className='popup'>
                <div className='popup_inner'>
                  <div className="DivForForms">
                    {this.state.signIn? null:<div id ="DivForSignUp"  ref={el=>this.SignUp=el}>
                    <h2>Creat Account</h2>
                    <form id="signUp" > 
                        <p>{this.state.allfields}</p>
                        <input  onChange={this.nameChange} type="text"   placeholder="Name" id="loginName" ref={input=>this.name=input} />
                        <p>{this.state.name}</p>
                        {/* <input  onChange={this.userNameChange} type="text" placeholder="User Name" id="loginuserName" ref={input=>this.userName=input}/>
                        <p>{this.state.userName}</p> */}
                        <input onChange={this.mailChange} type="mail" placeholder="Your Email" id="loginEmail" ref={input=>this.email=input}/>
                        {this.props.state.userReduser.posts===undefined? null:<p>{this.props.state.userReduser.posts.user.success===false?this.props.state.userReduser.posts.user.errors.email:this.props.history===undefined?null:this.props.history.push('/products')}</p>}
                        <input  onChange={this.passwordChange} type="password" placeholder="Password" id="loginPassword" ref={input=>this.password=input}/>
                        <p>{this.state.password}</p>
                        <input onChange={this.repasswordChange} type="password" placeholder="Repeat your password" id= "RepeatPassword" ref={input=>this.repassword=input}/>
                        <p>{this.state.repassword}</p>
                      
                        <button ref={button=>this.button1=button}   id="buttonOne" type="button" onClick={this.myFunction}>CREAT ACCOUNT</button>
                   
                    
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
export default connect(mapStateToProps,{fetchProducts})(SignUp) ;