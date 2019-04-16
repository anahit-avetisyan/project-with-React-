import React,{Component,Fragment} from 'react'
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import {InputValue} from '../reducer/action'
import { bindActionCreators } from "redux";
import ls from 'local-storage'
 

 class NewRow extends Component {
    state={
        booksData:null
    }
    componentDidMount=()=>{
        let url=`http://books.test/api/books`;
        fetch(url)
        .then(response => response.json())
        .then(dataBook=> 
            this.setState({ booksData:dataBook })
            )
        .catch(error =>  ( error));
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
        console.log(this.basketData)
         return(
            <Fragment>
              
                
                  <tbody>
                  {this.state.booksData===null?null: this.state.booksData.payload.map((data,index) => {          
                    return( 
                <tr key={index}>  
                    <th  scope="row" onClick={this.onClick}
                    style={{
                    textDecoration: this.completed ? 'line-through' : 'none'
                    }}>{data.book_id}</th>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                        {/* {ls.get('basket')[4554545].quantity} */}
                        </td>
                        <td> </td>
                        <td><IoIosClose onClick={this.deleteProduct}/> </td>
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
  
    
        
            
  export default connect(mapStateToProps,mapDispatchToProps)(NewRow)
 