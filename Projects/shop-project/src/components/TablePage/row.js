import React,{Component,Fragment } from 'react'
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import {InputValue} from '../reducer/action'
import { bindActionCreators } from "redux";
import ls from 'local-storage'
 
 
 class NewRow extends Component {
   state={
       basketData: ls.get("basket")? ls.get("basket") : {},
       booksData:{},

   }
    
    remove = (rowId) => {
        const basketDataNew=ls.get("basket");
        Object.values(basketDataNew).map((objectKey, index)=> {
            if(objectKey.id === rowId){
             return   delete basketDataNew[rowId];
            }  
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
    };
    increment=()=>{
        console.log(this.inputValue)
        this.setState({value:this.state.value + 1})
    }
    quantityOf=(e)=>{
         {this.setState({inputVal: e.target.value})}
    }
    componentDidMount=()=>{

    }
     render(){
        console.log(this.inputValue)
         return(
            <Fragment>
                  <tbody>
                  {Object.values(this.state.basketData).map((data,index) => {          
                    return( 
                      <tr key={index}>  
                            <th  scope="row" onClick={this.onClick}
                            style={{
                            textDecoration: this.completed ? 'line-through' : 'none'
                            }}>{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.price}</td> 
                                <td> 
                                    <button onClick={this.increment}>  +  </button>
                                      <input ref={el=>this.inputValue=el} value={this.state.inputValue} onChange={(e) => {this.setState({inputVal: e.target.value})}} defaultValue={data.quantity}   type="number" ></input> 
                                     <button>  -   </button>
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
 