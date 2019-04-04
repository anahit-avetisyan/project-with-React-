import React,{Component,Fragment} from 'react';


class SignUp extends Component {
    state={
        name:"",
        userName:"",
        email:"",
        password:"",
        repassword:"",
        allfields:"",
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
        let mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        let regexpName =/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,6}$/;
        let regexpUserName= /[A-Z][a-zA-Z]{1,6}$/;
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
        let mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexpName.test(this.name.value)&&regexpUserName.test(this.userName.value)&& mailformat.test(this.email.value)&& regpass.test(this.password.value)===true){
            let  data={
                name:this.name.value,
                userName:this.userName.value,
                email:this.email.value,
                password:this.password.value,    
            }
    console.log(data)
        fetch("http://rest.learncode.academy/api/learncode/friends", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

    }

    else{
        alert("Please fill all fileds Right Format")
        // this.setState({allfields:"Please fill all fileds"})
    } 
     this.name.value=""
     this.userName.value=""
     this.email.value=""
     this.password.value=""
     this.repassword.value=""   
}    
    render(){
        return(
<Fragment>
    <div id ="DivForSignUp"  ref={el=>this.SignUp=el}>
    <h2>Creat Account</h2>
    <form id="signUp" > 
                    <p>{this.state.allfields}</p>
                    <input  onChange={this.nameChange} type="text"   placeholder="Name" id="loginName" ref={input=>this.name=input} />
                    <p>{this.state.name}</p>
                    <input  onChange={this.userNameChange} type="text" placeholder="User Name" id="loginuserName" ref={input=>this.userName=input}/>
                    <p>{this.state.userName}</p>
                    <input onChange={this.mailChange} type="mail" placeholder="Your Email" id="loginEmail" ref={input=>this.email=input}/>
                    <p>{this.state.email}</p>
                    <input  onChange={this.passwordChange} type="password" placeholder="Password" id="loginPassword" ref={input=>this.password=input}/>
                    <p>{this.state.password}</p>
                    <input onChange={this.repasswordChange} type="password" placeholder="Repeat your password" id= "RepeatPassword" ref={input=>this.repassword=input}/>
                    <p>{this.state.repassword}</p>
              
                    <div id="divForCheckbox" ref={checkbox=>this.checkbox=checkbox} >
                        <input id="typeCheckbox" type="checkbox"/>
                        <label   className="labelForCheckbox" >
                            I agree all statements in <a href="#top" >Terms of service</a>
                        </label>
                    </div>
            <button ref={button=>this.button1=button}  id="buttonOne" type="button" onClick={this.myFunction}>CREAT ACCOUNT</button>
           
            <p ref={checkbox=>this.checkbox1=checkbox} id="footer">Have already an account? <b><a href="#top" target = "_blank"  > Login here </a> </b></p>
</form>
</div>
</Fragment>
        )
    }
}
export default SignUp ;