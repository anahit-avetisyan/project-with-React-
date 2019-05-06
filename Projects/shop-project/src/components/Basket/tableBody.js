import React,{Component,Fragment } from 'react'
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import { BooksInformation} from '../../reducers/action';
import { bindActionCreators } from "redux";
import ls from 'local-storage'
import Button from "../Product/button"
 
 class TableBody extends Component {
    state={
        basketData: ls.get("basket")? ls.get("basket") : {},
        booksData:{},
    };
    
    remove = (rowId) => {
        const basketDataNew=ls.get("basket");
        this.props.BooksInformation( ls.get("basket"));
        Object.values(basketDataNew).forEach((objectKey, index)=> {
            if(objectKey.id === rowId){
                return   delete basketDataNew[rowId];
            }  
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew});
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {}); 
    };

    increment=(id)=>{
        this.refs['valueInput' + id].value= parseInt(this.refs['valueInput' + id].value)+ 1;
        const basketDataNew=ls.get("basket");
        Object.values(basketDataNew).forEach((objectKey, index)=> {
            if(objectKey.id === id){
                if( this.refs['valueInput' + id].value===""){
                    this.refs['valueInput' + id].value=1
                    objectKey.quantity=1
                }else{
                    objectKey.quantity= this.refs['valueInput' + id].value;
                }
            }  
           
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
        ls.get('basket')
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {}); 
    }
    
    decrement=(id)=>{
        this.refs['valueInput' + id].value= parseInt(this.refs['valueInput' + id].value)- 1;
        const basketDataNew=ls.get("basket");
        Object.values(basketDataNew).forEach((objectKey, index)=> {
            if(objectKey.id === id){
                if(this.refs['valueInput' + id].value<=0){
                    this.refs['valueInput' + id].value=1
                objectKey.quantity= this.refs['valueInput' + id].value;
                } else {
                    objectKey.quantity= this.refs['valueInput' + id].value;
                }
            };
        });
        ls.set("basket",basketDataNew);
        this.setState({basketData:basketDataNew})
        ls.get('basket')  
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});  
    };
    
    valuesForBasket=()=>{
        let basket=ls.get('basket')? ls.get("basket") : {}
        Object.values(basket).forEach((objectKey, index)=> {
            objectKey.quantity=parseInt(this.refs['valueInput' + objectKey.id].value)
                if(objectKey.quantity<=0){
                    alert("please fill positive number");
                    objectKey.quantity=1
                    this.refs['valueInput' + objectKey.id].value=1;
                }
            }); 
        ls.set("basket",basket)
        this.setState({basketData:basket}) 
        ls.get('basket');
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {}); 
         
     }
     
    componentDidMount=()=>{
        let basket=ls.get('basket')? ls.get("basket") : {};
        Object.values(basket).map((objectKey, index)=> 
        this.refs['valueInput' + objectKey.id].value=objectKey.quantity
        )
        this.setState({basketData: ls.get("basket")? ls.get("basket") : {}}) ;
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
    }
     render(){
         console.log(this.props,"table")
         return(
            <Fragment>
                <tbody>
                    {Object.values(ls.get('basket') ? ls.get('basket') : {}).map((data,index) => {          
                        return( 
                            <tr key={index}>  
                                <th  scope="row" onClick={this.onClick}
                                style={{
                                textDecoration: this.completed ? 'line-through' : 'none'
                                }}>{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.price}</td> 
                                <td> 
                                    <Button callback={()=>this.decrement(data.id)} name="-"/>
                                        <input ref={`valueInput${data.id}`}   onChange={this.valuesForBasket } className="inputForQuantity"    type="number" /> 
                                    <Button callback={()=>this.increment(data.id)} name="+"/>
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
            
  export default connect(mapStateToProps,mapDispatchToProps)(TableBody)
 