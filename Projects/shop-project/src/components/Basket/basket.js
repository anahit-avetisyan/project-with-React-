import React,{Component} from 'react';
import {Table} from 'reactstrap';
import ModalForOrder from './modalForOrder';
import NewRow from './row';
import './basket.scss';
 

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
                                <NewRow  />
                    </Table>
                        <ModalForOrder/>
            </div>
        )
    }
}
export default Basket;
