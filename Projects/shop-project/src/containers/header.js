import React,{Component,Fragment} from 'react'
import {IoIosBasket } from "react-icons/io";
import '../style/header.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import {BooksInformation} from '../reducers/action'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Links from '../components/Header/links'
import ls from 'local-storage';
import Form from './form'

class Header extends Component {
   
    state = { 
        collapse: false,
        basketData:ls.get('basket')  ? ls.get('basket') : {},
        dataUser: ls.get("userData") ? ls.get("userData") : {}  
    }
    menuForProduct=()=>{
        this.setState(state => ({ collapse: !state.collapse }));
    }
    componentDidUpdate=(prevProps,prevState)=>{
        if(this.props.user!==prevProps.user){
            if(this.props.user){
                ls.set("userData",this.props.user);
                ls.get('userData');   
            }
        } 
        else if(this.state.basketData!==prevState.basketData){
            console.log("poxvum a ")
        }
    }
    render(){
        return(
            <div className="wrapper">
                <div className="header">
                    <Links/> 
                    <Form/> 
                    <span className="quantityOfitems">
                        {Object.keys(this.props.orderBooks).length}
                    </span>
                    <UncontrolledDropdown>
                        <DropdownToggle caret size="sm">
                            <IoIosBasket 
                                id="toggler" 
                                onClick={this.menuForProduct} 
                                className="ioIosBasket"
                            />
                        </DropdownToggle>
                        <DropdownMenu >
                         {Object.values(this.props.orderBooks).map((data,index) => {          
                            return( 
                                <Fragment key={index}>
                                    <DropdownItem  style={{color:'red'}} header>{data.name}:  {data.quantity}</DropdownItem>
                                    <DropdownItem divider />
                                </Fragment>
                                )
                            })
                        }
                        </DropdownMenu>
                    </UncontrolledDropdown>
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
 