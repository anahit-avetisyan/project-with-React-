import React,{Component,Fragment} from 'react'
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import {InputValue} from '../reducer/action'
import { bindActionCreators } from "redux";
import ls from 'local-storage'
 

 class NewRow extends Component {
   
  basketData = ls.get("basket") ? ls.get("basket") : {};
  remove = (rowId) => {
    const basketData =ls.get("basket")? Object.values(this.basketData).filter((row) => row.id !== rowId):{};
    ls.clear();
    console.log(basketData)
    ls.set("basket",basketData);
   
  };
  componentDidUpdate=(prevProps)=>{
    if (this.props.state.paginationPage !== prevProps.state.paginationPage) {
      
        }
    }
     render(){
    
         return(
            <Fragment>
                  <tbody>
                  {Object.values(this.basketData).map((data,index) => {          
                    return( 
                      <tr key={index}>  
                            <th  scope="row" onClick={this.onClick}
                            style={{
                            textDecoration: this.completed ? 'line-through' : 'none'
                            }}>{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.price}</td> 
                                <td> 
                                {data.quantity} 
                                </td>
                                <td>{data.price*data.quantity}</td>
                                <td><IoIosClose onClick={() => this.remove(data.id)}/> </td>
                        </tr>   
                    )
                })
            } 
                    
                    </tbody>
            </Fragment>
         )
     }
 }
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
  
    
        
            
  export default connect(mapStateToProps,mapDispatchToProps)(NewRow)
 