import React,{Component,Fragment } from 'react'
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import { BooksInformation} from '../reducer/action'
import { bindActionCreators } from "redux";
import ls from 'local-storage'
 
 
 class NewRow extends Component {
   state={
       basketData: ls.get("basket")? ls.get("basket") : {},
       booksData:{},
        books: ls.get("basket")? ls.get("basket") : {}
   }
    
    remove = (rowId) => {
        const basketDataNew=ls.get("basket");
        this.props.BooksInformation( ls.get("basket"));
        Object.values(basketDataNew).map((objectKey, index)=> {
            if(objectKey.id === rowId){
             return   delete basketDataNew[rowId];
            }  
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});

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
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
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
            else{
                objectKey.quantity= this.refs['valueInput' + id].value;
            }
        }
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
         
    }
    valuesForBasket=()=>{
        let basket=ls.get('basket')? ls.get("basket") : {}
        Object.values(basket).map((objectKey, index)=> {
          objectKey.quantity=parseInt(this.refs['valueInput' + objectKey.id].value)
          if(objectKey.quantity<=0){
              alert("please fill positive number");
              objectKey.quantity=null
              this.refs['valueInput' + objectKey.id].value="";
             
          }
        }); 
        ls.set("basket",basket)
        this.setState({basketData:basket}) 
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
     }
     
    componentDidMount=()=>{
        let basket=ls.get('basket')? ls.get("basket") : {};
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        Object.values(basket).map((objectKey, index)=> {
        if(this.refs['valueInput' + objectKey.id]===undefined){
        }
        else if(this.refs['valueInput' + objectKey.id].value!==undefined){
        this.refs['valueInput' + objectKey.id].value=objectKey.quantity
        }
        })
        this.setState({basketData: ls.get("basket")? ls.get("basket") : {}})  
    }
     render(){
      console.log(this.props.state)
         return(
            <Fragment>
                  <tbody>
                  {Object.values(this.props.state.booksInfoBasket).map((data,index) => {          
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
                                        <input ref={`valueInput${data.id}`}   onChange={this.valuesForBasket } className="inputForQuantity"    type="number" /> 
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
            BooksInformation
        },
        dispatch
    );
}   
  
    
        
            
  export default connect(mapStateToProps,mapDispatchToProps)(NewRow)
 