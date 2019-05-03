 
import React, { Component,Fragment } from 'react';
import SignIn from '../components/Form/signIn';
import SignUp from '../components/Form/signUp';
import '../style/form.scss'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {request,BooksInformation} from '../reducers/action';
import { bindActionCreators } from "redux"; 
import ls from 'local-storage';
import Button from '../components/Product/button'
class PopUp extends Component {
   
    state={
      signIn:true,
      signUp:true,
      dataUser:ls.get("userData") ? ls.get("userData") : {}
    }
  
    signIn=()=>{
        this.setState({signIn:false});
        this.setState({signUp:true});
    }
    signUp=()=>{
        this.setState({signIn:true});
        this.setState({signUp:false});
    }
    logOut=()=>{  
        let url="http://books.test/api/logout"
        let header={
          "Authorization" : `Bearer ${this.state.dataUser.posts.user.payload.token}`
        };
        this.props.fetchProducts(url,header);
        ls.clear();
        this.setState({dataUser:{}});
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        
    }
       
    render(){
        return(
            <Fragment>
                {this.state.dataUser.posts===undefined||this.state.dataUser.posts.user.success===false?<div className="divForMainButtons">
                    <Link to="/registration/signIn"> <span onClick={this.signIn} className="mainButtonSignIn"> SIGN IN </span></Link>
                    <Link to='/registration/signUp'>   <span onClick={this.signUp} className="mainButtonSignUP"> SIGN UP </span></Link> 
                </div>:null}
                    {this.state.dataUser.posts===undefined?null:this.state.dataUser.posts.user.success===false?null:
                    <Button name="Log Out" className="mainButtonSignUP" callback={this.logOut}/>}
                <div className="DivForForms">
                    {this.state.signIn? null: <SignIn/>}
                    {this.state.signUp? null: <SignUp/>}
                </div> 
            </Fragment> 
        )
    }
}
    function mapStateToProps(state) {
      return {
          state,
      };
    }
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
          {
            request,
            BooksInformation
          },
          dispatch
      );
    }
export default  connect(mapStateToProps,mapDispatchToProps)(PopUp);