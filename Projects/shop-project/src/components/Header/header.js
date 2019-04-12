import React,{Component} from 'react'
import {IoIosBasket } from "react-icons/io";
import './header.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import {InputValue} from '../reducer/action'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link } from 'react-router-dom';
import ls from 'local-storage'
function mapStateToProps(state) {
    return {
         state
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            InputValue
        },
        dispatch
    );
}
class Header extends Component {
   
    state = { collapse: false,
       
     }
  
      basketData=ls.get('basket')  ? ls.get('basket') : {}
     
    menuForProduct=()=>{
        this.setState(state => ({ collapse: !state.collapse }));
    }
   
    render(){
      
        return(
        <div className="wrapper">
            <div className="header">
           
            <div className="combineLinks">
                <Link  to='/' onClick={this.homePage}> Home </Link>
                <Link  to='/tablepage' onClick={this.tablePage}>My Basket </Link>
                <Link  to='/products' onClick={this.ProductPage}>Product </Link>
                <Link to='/registration' onClick={this.Registration} >Registration</Link>
               
            </div>       
            <span className="quantityOfitems">
            {this.basketData.hasOwnProperty.length}
            </span>
        <UncontrolledDropdown>
            <DropdownToggle caret size="sm">
            <IoIosBasket id="toggler" onClick={this.menuForProduct} className="ioIosBasket"/>
            </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>APPLE <p>{this.basketData[4554545].quantity}</p></DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Avocado {this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Cherry {this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Lemon {this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Orange {this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Pineapples{this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Raspberry{this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Strowberry{this.props.state.changeQuantity}</DropdownItem>
                    <DropdownItem divider />
                </DropdownMenu>
        </UncontrolledDropdown>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
 