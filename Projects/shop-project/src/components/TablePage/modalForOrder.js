import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ls from 'local-storage';


class ModalForOrder extends Component{
    state={
        modal: false
    }

    toggle=() =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      createOrder=()=>{
        let userInfo=ls.get('userData')
        let order= ls.get('basket')?ls.get('basket'):{}; 
        console.log(this.dataBook)
            var dataOrder={
                customer_phone:this.phoneNumber.value,
                customer_address:this.address.value,
                order_books:[    
                ]
            } 
            Object.values(order).map((data,index) =>{
              dataOrder.order_books.push({book_id:data.id,quantity:data.quantity})
            })
            fetch("http://books.test/api/create-order",{
                method:"POST",  
                headers: {"Content-Type": "application/json",
                "Authorization" : `Bearer ${userInfo.posts.user.payload.token}`        },
                body: JSON.stringify(dataOrder)
            })
                .then(res => res.json())
                .then(response => {
                console.log(response);
                })
                .catch(error =>  ( error));   
        this.setState(prevState => ({
            modal: !prevState.modal
          }));
       
      }
     closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
    render(){
        
        return(
            <div>
        <Button color="danger" onClick={this.toggle}>Create Order</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}   close={this.closeBtn}>Create Order</ModalHeader>
          <ModalBody>
              <form>
              <label>Phone Number: 
             <input ref={el=>this.phoneNumber=el} type="text"  ></input>
             </label>
             <label>Address: 
             <input type="text" ref={el=>this.address=el}></input>
             </label>
             </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"  onClick={this.createOrder}>Make Order</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ModalForOrder