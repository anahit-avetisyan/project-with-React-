import React,{Component} from 'react'
import {IoIosBasket } from "react-icons/io";
import './header.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import {InputValue} from '../reducer/action'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function mapStateToProps(state) {
    console.log(state)
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
    state = { collapse: false }
    menuForProduct=()=>{
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render(){
        return(
        <div className="wrapper">
            <div className="header">
            <span>My Basket </span><br/>
            <span className="quantityOfitems">{this.props.state.changeQuantityApple}</span>
        <UncontrolledDropdown>
            <DropdownToggle caret size="sm">
            <IoIosBasket id="toggler" onClick={this.menuForProduct} className="ioIosBasket"/>
            </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>APPLE <p>{this.props.state.changeQuantityApple}</p></DropdownItem>
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
 