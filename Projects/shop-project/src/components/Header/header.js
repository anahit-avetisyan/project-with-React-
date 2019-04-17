import React,{Component,Fragment} from 'react'
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
    componentDidMount=()=>{
        Object.values(this.basketData).map((data,index) => { 
            console.log(data,"aaaaaaaaaa")
        })
       }
    render(){
      console.log(this.basketData)
        return(
        <div className="wrapper">
            <div className="header">
           
                <div className="combineLinks">
                    <Link  to='/' onClick={this.homePage}> Home </Link>
                    <Link  to='/products' onClick={this.ProductPage}>Product </Link>
                    <Link to='/registration' onClick={this.Registration} >Registration</Link>
                    {this.props.state.userReduser.posts===undefined ? null: <Link  to='/tablepage' onClick={this.tablePage}>My Basket </Link>}
                
                </div>       
                    {this.props.state.userReduser.posts===undefined ? null: <span className="quantityOfitems">
                    {/* {this.basketData.hasOwnProperty.length} */}
                    {Object.keys(this.basketData).length}
                </span>}
                    <UncontrolledDropdown>
                        <DropdownToggle caret size="sm">
                        <IoIosBasket id="toggler" onClick={this.menuForProduct} className="ioIosBasket"/>
                        </DropdownToggle>
                            <DropdownMenu >
                            {this.props.state.userReduser.posts===undefined ?<Fragment>
                                <DropdownItem  style={{color:'red'}} header> </DropdownItem>
                                <DropdownItem divider />
                                </Fragment> :Object.values(this.basketData).map((data,index) => {          
                                return( 
                                <Fragment key={index}>
                                <DropdownItem  style={{color:'red'}} header> </DropdownItem>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header);
 