import React,{Component,Fragment} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {IoIosBasket } from "react-icons/io";

class DropDownList extends Component{
    render(){
        return(
            <UncontrolledDropdown >
                <DropdownToggle caret size="sm">
                    <IoIosBasket 
                        id="toggler" 
                        className="ioIosBasket"
                    />    
                </DropdownToggle>
                <DropdownMenu>
                    {Object.values(this.props.booksData).map((data,index) => {          
                        return( 
                            <Fragment key={index}>
                                <DropdownItem  style={{color:'#610C29'}} >{data.name}:  {data.quantity}</DropdownItem>
                                <DropdownItem divider />
                            </Fragment>
                        )
                    })
                    }
                </DropdownMenu>       
            </UncontrolledDropdown>        
        )
    }
}
export default DropDownList;