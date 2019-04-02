import React,{Component} from 'react';
import {Table} from 'reactstrap';


class TablePage extends Component{
    render(){
        return(
            <Table striped>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Product Name</td>
                        <td>Product Price</td>
                        <td>Product quantity</td>
                    </tr>
                </thead>
            </Table>
        )
    }
}
export default TablePage;
