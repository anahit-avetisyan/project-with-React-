import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ls from 'local-storage';
import { BooksInformation} from '../reducer/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ModalForOrder extends Component{
    state={
        modal: false,
        mainResponse:{}
    }

    toggle=() =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      createOrder=()=>{
        let userInfo=ls.get('userData')
        let order= ls.get('basket')?ls.get('basket'):{}; 
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
                this.setState({mainResponse:response});
                })
                .catch(error =>  ( error)); 
                console.log(this.state.mainResponse.success)
      }
      componentDidUpdate=(pevProps,prevState)=>{
          if(this.state.mainResponse!==prevState.mainResponse){
                if(this.state.mainResponse.success===true){
                    this.setState(prevState => ({
                        modal: !prevState.modal
                      }));
                    ls.remove('basket')
                    alert ("Your order has done")
                    this.setState({mainResponse:ls.get('basket')? ls.get('basket'):{}})
                    this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
                    
                }
                    return null;
          }

      }
      
     closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
    render(){
        return(
            <div>
        <Button color="danger" onClick={this.toggle}>Create Order</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}   close={this.closeBtn}>Create Order</ModalHeader>
              <ModalBody>
                  <form className="mainForForms">
                  {this.state.mainResponse.success===undefined?null:this.state.mainResponse.success===false?<p>{this.state.mainResponse.errors.customer_phone}</p>:null}
                  <label>Phone Number: 
                <input ref={el=>this.phoneNumber=el} type="text"  ></input>
                </label>
                {this.state.mainResponse.success===undefined?null:this.state.mainResponse.success===false?<p>{this.state.mainResponse.errors.customer_address}</p>:null}
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

export default connect(mapStateToProps,mapDispatchToProps)(ModalForOrder)