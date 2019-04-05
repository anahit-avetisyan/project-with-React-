import React,{Component} from 'react'
import {IoIosBasket } from "react-icons/io";
import './header.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import {InputValue} from '../reducer/action'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link, BrowserRouter} from 'react-router-dom';
import ls from 'local-storage';
 
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
    tablePage() {
        this.props.history.push('/');
    }
    homePage(){
        this.props.history.push('/')
    }
    ProductPage(){
        this.props.history.push('/')
    }
    Registration(){
        this.props.history.push('/')
    }
    // componentDidUpdate(prevProps, prevState){
    //     const basketData= ls.get('basket')
    //      this.basketLength=basketData.length
    //      console.log(this.basketLength)
    //  }
    render(){

        return(
        <div className="wrapper">
            <div className="header">
            <BrowserRouter>
            <div className="combineLinks">
                <Link  to='/' onClick={this.homePage}> Home </Link>
                <Link  to='/tablepage' onClick={this.tablePage}>My Basket </Link>
                <Link  to='/products' onClick={this.ProductPage}>Product </Link>
                <Link to='/registration'onClick={this.Registration} >Registration</Link>
               
            </div>
            </BrowserRouter>
            <span className="quantityOfitems">
            {ls.get('basket').length}</span>
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
 