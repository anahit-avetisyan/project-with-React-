import React,{Component} from 'react';
import {Table} from 'reactstrap';

import NewRow from './row'

 
 
 


class TablePage extends Component{
    
    deleteProduct=()=>{
      

    }
    render(){   
       
        return(
            <Table striped>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Product Name</td>
                        <td>Product Price</td>
                        <td>Product quantity</td>
                        <td>Total Sum</td>
                        <td>#</td>
                    </tr>
                </thead>
                <tbody>
          
      <NewRow />
        
          </tbody>
            </Table>
        )
    }
}
export default TablePage;