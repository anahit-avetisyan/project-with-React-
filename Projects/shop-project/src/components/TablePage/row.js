import React,{Component,Fragment} from 'react'
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import {InputValue} from '../reducer/action'
import { bindActionCreators } from "redux";
import ls from 'local-storage'
 
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
 class NewRow extends Component {
     state={
         close:false,
     }
     basketData = ls.get('basket') ? ls.get('basket'):{}    
    
     deleteProduct=()=>{
         this.setState({close:true})
     }
     product={
        "id":4554545,
          "name":"Apple",
          "price":5
      }
    
     render(){
        
         return(
            <Fragment>
               {this.state.close? null: <tr>
               <th scope="row" onClick={this.onClick}
                style={{
                textDecoration: this.completed ? 'line-through' : 'none'
                }}>1</th>
                <td>{this.product.name}</td>
                <td>{this.product.price}</td>
                <td>
                {ls.get('basket')[4554545].quantity}
                </td>
                <td>{} </td>
                <td><IoIosClose onClick={this.deleteProduct.quantity}/> </td>
                </tr>}
            </Fragment>
         )
     }
 }
    
  
    
        
            
  export default connect(mapStateToProps,mapDispatchToProps)(NewRow)
 