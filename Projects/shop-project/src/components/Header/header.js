import React,{Component,Fragment} from 'react'
import {IoIosBasket } from "react-icons/io";
import './header.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import {BooksInformation} from '../reducer/action'
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
            BooksInformation
        },
        dispatch
    );
}
class Header extends Component {
   
    state = { 
        collapse: false,
        basketData:ls.get('basket')  ? ls.get('basket') : {},
        dataUser: ls.get("userData") ? ls.get("userData") : {}
       
     }
  
        menuForProduct=()=>{
            this.setState(state => ({ collapse: !state.collapse }));
        }
        userData=()=>{
            if(this.props.state.userReduser.posts === undefined){
            return this.state.dataUser
            }
            else if(this.props.state.userReduser.posts !== undefined && this.props.state.userReduser.posts.user.success===true){
                ls.set("userData",this.props.state.userReduser);
                ls.get('userData') 
                this.setState({dataUser:this.props.state.userReduser})
    
            }    
        }
        componentDidUpdate=(prevProps,prevState)=>{
            if(this.props.state.userReduser.posts!==prevProps.state.userReduser.posts){
                if(this.props.state.userReduser.posts === undefined){
                    ls.set("userData",this.props.state.userReduser);
                    ls.get('userData') 
                    this.setState({dataUser:this.props.state.userReduser})
                }
                else if(this.props.state.userReduser.posts !== undefined && this.props.state.userReduser.posts.user.success===true){
                    ls.set("userData",this.props.state.userReduser);
                    ls.get('userData') 
                   this.setState({dataUser:this.props.state.userReduser})
                }  
            } 
        }
        componentDidMount=()=>{
            this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        }
    render(){
        
        return(
        <div className="wrapper">
            <div className="header">
           
                <div className="combineLinks">
                    <Link  to='/' onClick={this.homePage}> Home </Link>
                    <Link  to='/products' onClick={this.ProductPage}>Product </Link>
                    <Link to='/registration' onClick={this.Registration} >Registration</Link>
                    <Link  to='/tablepage' onClick={this.tablePage}>My Basket </Link>
                    <Link  to='/orders'  >My Orders </Link>
                
                </div>       
                      <span className="quantityOfitems">
                    {Object.keys(ls.get('basket') ? ls.get('basket') : {}).length}
                </span>
                    <UncontrolledDropdown>
                        <DropdownToggle caret size="sm">
                        <IoIosBasket id="toggler" onClick={this.menuForProduct} className="ioIosBasket"/>
                        </DropdownToggle>
                            <DropdownMenu >
                            {this.state.dataUser.posts===undefined ?<Fragment>
                                <DropdownItem  style={{color:'red'}} header> </DropdownItem>
                                <DropdownItem divider />
                                </Fragment> :Object.values(ls.get('basket') ? ls.get('basket') : {}).map((data,index) => {          
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

export default connect(mapStateToProps,mapDispatchToProps)(Header);
 