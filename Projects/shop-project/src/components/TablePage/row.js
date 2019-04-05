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
         close:false
     }
     deleteProduct=()=>{
         this.setState({close:true})
     }
    componentDidMount() {
       const basketData= ls.get('basket')
       console.log("aaa",basketData.length)
    }
     render(){
         return(
            <Fragment>
               {this.state.close? null: <tr>
               <th scope="row" onClick={this.onClick}
                style={{
                textDecoration: this.completed ? 'line-through' : 'none'
                }}>1</th>
                <td>Apple</td>
                <td>5</td>
                <td>{ls.get('basket')}</td>
                <td>{5* ls.get('basket')} </td>
                <td><IoIosClose onClick={this.deleteProduct}/> </td>
                </tr>}
            </Fragment>
         )
     }
 }
    
  
    
        
            
  export default connect(mapStateToProps,mapDispatchToProps)(NewRow)
 