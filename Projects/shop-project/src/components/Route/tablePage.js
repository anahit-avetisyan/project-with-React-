import React,{Component} from 'react';
import {Table} from 'reactstrap';
import { IoIosClose } from "react-icons/io";

 
 
 


class TablePage extends Component{
    
    deleteProduct=()=>{
      

    }
    render(){   
       const data=["Apple",12,3,]
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
          <tr>
            <th scope="row">1</th>
            <td>{data[0]}</td>
            <td>{data[1]}</td>
            <td>{data[2]}</td>
            <td>{data[1]*data[2]} </td>
            <td><IoIosClose onClick={this.deleteProduct}/> </td>
          </tr>
          </tbody>
            </Table>
        )
    }
}
export default TablePage;
