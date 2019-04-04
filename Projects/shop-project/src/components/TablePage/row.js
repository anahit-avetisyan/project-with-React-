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
    componentDidMount() {
       const basketData= ls.get('basket')
       console.log(basketData)
    }
     render(){
         return(
            <Fragment>
                <th scope="row" onClick={this.onClick}
                style={{
                textDecoration: this.completed ? 'line-through' : 'none'
                }}>1</th>
                <td>Apple</td>
                <td>5</td>
                <td>{ls.get('basket')}</td>
                <td>{5*this.props.state.changeQuantityApple} </td>
                <td><IoIosClose onClick={this.deleteProduct}/> </td>
            </Fragment>
         )
     }
 }
    
  
    
        
            
  export default connect(mapStateToProps,mapDispatchToProps)(NewRow)
 