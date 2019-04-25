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
    increment=(id)=>{
        this.refs['valueInput' + id].value= parseInt(this.refs['valueInput' + id].value)+ 1;
        const basketDataNew=ls.get("basket");
        Object.values(basketDataNew).map((objectKey, index)=> {
            if(objectKey.id === id){
                objectKey.quantity= this.refs['valueInput' + id].value;
            }  
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
    }
    
    decrement=(id)=>{
        this.refs['valueInput' + id].value= parseInt(this.refs['valueInput' + id].value)- 1;
        const basketDataNew=ls.get("basket");
        Object.values(basketDataNew).map((objectKey, index)=> {
            if(objectKey.id === id){
                if(this.refs['valueInput' + id].value<=0){
                    this.refs['valueInput' + id].value=1
                objectKey.quantity= this.refs['valueInput' + id].value;
            }  
        }
        });
        if(this.refs['valueInput' + id].value<=0){
            this.refs['valueInput' + id].value=1
        }
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
         
    }
    ValuesForBasket=()=>{
        let basket=ls.get('basket')? ls.get("basket") : {}
        Object.values(basket).map((objectKey, index)=> {
            objectKey.quantity=parseInt(this.refs['valueInput' + objectKey.id].value)
    }); 
        ls.set("basket",basket)
        this.setState({basketData:basket})
        
     }
     
    componentDidMount=()=>{
        let basket=ls.get('basket')? ls.get("basket") : {};
        Object.values(basket).map((objectKey, index)=> {
        this.refs['valueInput' + objectKey.id].value=objectKey.quantity
        })
        this.setState({basketData: ls.get("basket")? ls.get("basket") : {}})  
    }
     render(){
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
                                    <button onClick={()=>this.decrement(data.id)} >  -   </button>
                                        <input ref={`valueInput${data.id}`}   onChange={this.ValuesForBasket } className="inputForQuantity"    type="text" /> 
                                    <button onClick={()=>this.increment(data.id)} >  +  </button>
                                </td>
                                <td>{data.price*data.quantity }</td>
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
 