import React,{Component} from 'react'


class SignIn extends Component{
    state={ 
        nameIn: "",
        repasswordIn:"",
        }
    nameChangeIn=()=>{
        let regexpName =/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,6}$/;
        if(regexpName.test(this.nameIn.value)===false){
            this.setState({nameIn:"Please Input Right Format"})
        } 
        else{
            this.setState({nameIn:""})
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
        let regexpName =/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,6}$/;
        let regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;   
        let  data1={
            name:this.nameIn.value,
            password:this.passwordIn.value,    
                 }
         
    if(regexpName.test(this.nameIn.value)===true && regpass.test(this.passwordIn.value)===true){     
        fetch("http://rest.learncode.academy/api/learncode/friends", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data1)
        })
        .then(response => response.json())
        .then((response) => 
        console.table(response)    
        )
        .catch(error => console.error('Error:', error));
        }
        else{
            alert("Please fill all fileds Right Format")
        }
        this.nameIn.value="";
        this.passwordIn.value="";
        this.setState({responseData: this.response})
        }
        render(){
            return(
                <React.Fragment>
                    {this.state.clicked1? null: <div  id ="DivForSignIn" ref={el=>this.SignIn=el}>
                    <form id="signIn">
                        <h2>LOGIN</h2>
                            <input  onChange={this.nameChangeIn}  type="text" placeholder="User Name" id="loginuserNameOne" ref={input=>this.nameIn=input}/>
                                <p  >{this.state.nameIn}</p>
                            <input onChange={this.passwordChangeIn}   type="password" placeholder="Password" id="loginPasswordOne" ref={input=>this.passwordIn=input}/>
                                <p>{this.state.passwordIn}</p>
                            <button ref={button=>this.button2=button}   id="buttonTwo" type="button" onClick={this.myFunctionOne}>LOG IN</button>
                    </form>  
                    </div>}
                </React.Fragment>
            )  
        }
    }
export default SignIn;