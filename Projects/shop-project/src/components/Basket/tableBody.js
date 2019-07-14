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
    componentDidMount=()=>{
        let basket = ls.get('basket')? ls.get("basket") : {};
        this.setState({basketData:basket}) ;
        this.props.BooksInformation(basket);
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(this.state.basketData !== prevState.basketData){
            let basket = ls.get('basket')? ls.get("basket") : {};
            Object.values(basket).map((objectKey, index)=> 
                this.refs['valueInput' + objectKey.id].value = objectKey.quantity
            )
            ls.get('basket');
            this.props.BooksInformation(basket);
        }
      
    }
    
    removeDataFromBasket = (rowId) => {
        const newDataAfterRemoving=ls.get("basket");
        Object.values(newDataAfterRemoving).forEach((objectKey, index) => {
            if(objectKey.id === rowId){
                delete newDataAfterRemoving[rowId];
            }
        });
        ls.set("basket", newDataAfterRemoving);
        this.setState({basketData : newDataAfterRemoving});
        ls.get('basket');
        this.props.BooksInformation(newDataAfterRemoving)
    };

    increment = (id) => {
        this.refs['valueInput' + id].value = Math.floor(this.refs['valueInput' + id].value) + 1;
        const dataAfterIncrement = ls.get("basket");
        Object.values(dataAfterIncrement).forEach((objectKey, index) => {
            if(objectKey.id === id){
                if( this.refs['valueInput' + id].value === ""){
                    this.refs['valueInput' + id].value = 1
                    objectKey.quantity = 1
                }else{
                    objectKey.quantity = this.refs['valueInput' + id].value;
                }
            }   
        });
        ls.set("basket",dataAfterIncrement);
        this.setState({basketData : ls.get('basket')})
        this.props.BooksInformation( dataAfterIncrement); 
    }
    
    decrement = (id) => {
        this.refs['valueInput' + id].value = this.refs['valueInput' + id].value - 1;
        const dataAfterDecrement = ls.get("basket");
        Object.values(dataAfterDecrement).forEach((objectKey, index)=> {
            if(objectKey.id === id){
                if(this.refs['valueInput' + id].value <= 0){
                    this.refs['valueInput' + id].value = 1
                objectKey.quantity = this.refs['valueInput' + id].value;
                } else {
                    objectKey.quantity = this.refs['valueInput' + id].value;
                }
            }
        });
        ls.set("basket",dataAfterDecrement);
        this.setState({basketData : dataAfterDecrement})
        ls.get('basket')  
        this.props.BooksInformation(dataAfterDecrement);  
    };
    
    handleChangeQuantity = () => {
        let {chosenBooks} =  this.props
        Object.values(chosenBooks).forEach((objectKey, index)=> {
            objectKey.quantity = parseInt(this.refs['valueInput' + objectKey.id].value)
                if(objectKey.quantity <= 0 ){
                    alert("please fill positive number");
                    objectKey.quantity = 1
                    this.refs['valueInput' + objectKey.id].value = 1;
                }
               
            }); 
        ls.set("basket",chosenBooks)
        this.setState({basketData:chosenBooks}) 
        ls.get('basket');
        this.props.BooksInformation( chosenBooks); 
         
    }
    

     
    render(){
       
        const {chosenBooks} = this.props;
        return(
            <Fragment>
                <tbody>
                   
                    {Object.values(chosenBooks).map((data,index) => {          
                        return( 
                            <tr key = {index}>  
                                <th  scope = "row" onClick={this.onClick}
                                style = {{
                                textDecoration: this.completed ? 'line-through' : 'none'
                                }}>{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.price}</td> 
                                <td> 
                                    <Button callback = {() => this.decrement(data.id)} name = "-"/>
                                        <input ref = {`valueInput${data.id}`}  step  = "1" onChange = {this.handleChangeQuantity } className = "inputForQuantity"    type = "number"/>  
                                    <Button callback = {()=>this.increment(data.id)} name = "+"/>
                                </td>
                                <td>{isNaN(data.quantity) ? 0 : data.price * data.quantity }</td>
                                <td><IoIosClose onClick = {() => this.removeDataFromBasket(data.id)}/> </td>
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
        state,
        chosenBooks: Object.keys(state.booksInformation) !==0 ? state.booksInformation : ls.get('basket') ? ls.get('basket') : {} 
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
 