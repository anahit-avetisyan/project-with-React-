import React,{Component,Fragment} from 'react'
import '../style/header.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import {BooksInformation} from '../reducers/action'
import DropDownList from '../components/Header/dropDownList'
import Links from '../components/Header/links'
import ls from 'local-storage';
import Form from './form'

class Header extends Component {
    componentDidUpdate=(prevProps)=>{
        if(this.props.user!==prevProps.user){
            if(this.props.user){
                ls.set("userData",this.props.user);
                ls.get('userData');   
            }
        } 
        
    }
    render(){
        return(
            <div className="wrapper">
                <div className="header">
                    <Links/> 
                    <Form/> 
                    {Object.keys(this.props.orderBooks).length === 0 ? null:
                    <Fragment>
                    <span className="quantityOfitems">
                        {Object.keys(this.props.orderBooks).length}
                    </span>
                    <DropDownList booksData={this.props.orderBooks}/>
                    </Fragment>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state,
        user : state.userReduser.user ? state.userReduser.user.payload : state.userReduser,
        orderBooks: state.booksInformation 
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            BooksInformation
        },
        dispatch
    );
}    
export default connect(mapStateToProps,mapDispatchToProps)(Header);
 