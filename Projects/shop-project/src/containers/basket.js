import React,{Component} from 'react';
import {Table} from 'reactstrap';
import ModalForOrder from '../components/Basket/modalForOrder';
import TableBody from '../components/Basket/tableBody'
import '../style/basket.scss';
 

class Basket extends Component{
  
    render(){  
        return(
            <div >
                <p style={{color:"#DC3545",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
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
                    <TableBody/>
                </Table>
                <ModalForOrder/>
            </div>
        )
    }
}
export default Basket;
