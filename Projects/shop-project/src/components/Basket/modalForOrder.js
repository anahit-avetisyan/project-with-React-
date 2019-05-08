import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ls from 'local-storage';
import { BooksInformation} from '../../reducers/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import history from '../Header/history'

class ModalForOrder extends Component{
    state={
        modal: false,
        responseForMakingOrder:{}
    }
    componentDidUpdate = (pevProps,prevState) => {
        if( this.state.responseForMakingOrder !== prevState.responseForMakingOrder ){
            const { chosenBooksForOrder } = this.props;
            const { responseForMakingOrder} = this.state
            Object.values(chosenBooksForOrder).forEach((data) =>{
                if(data.quantity===null){
                    this.error="Order books quantity field is required. Please fill quantity"; 
                }else{
                    if(responseForMakingOrder.success===true){
                        this.toggle()
                        ls.remove('basket')
                        this.setState({responseForMakingOrder:ls.get('basket')? ls.get('basket'):{}});
                        history.push('/orders')
                    }else{
                        let error = responseForMakingOrder.errors
                        this.customerPhoneError.textContent = error.customer_phone ? error.customer_phone : null;
                        this.customerAddressError.textContent = error.customer_address ? error.customer_address : null;
                    }
                
                }
            })
            this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        };
    }
    toggle=() =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    
    createOrder=()=>{
        let userInformationFromLocalStorage=ls.get('userData');
        let chosenBooksFromLocalStorage= ls.get('basket')?ls.get('basket'):{}; 
        let dataForMakingOrder={
            customer_phone:this.phoneNumber.value,
            customer_address:this.address.value,
            order_books:[    
            ]
        } 
        Object.values(chosenBooksFromLocalStorage).forEach((data,index) =>{
            dataForMakingOrder.order_books.push({book_id:data.id,quantity:data.quantity})
        }
        );
        fetch("http://books.test/api/create-order",{
            method:"POST",  
            headers: {"Content-Type": "application/json",
            "Authorization" : `Bearer ${userInformationFromLocalStorage.token}`        },
            body: JSON.stringify(dataForMakingOrder)
        })
            .then(res => res.json())
            .then(response => {
            this.setState({responseForMakingOrder:response});
            })
            .catch(error =>  ( error)); 
    }
   //checked if user chose product
    booksOrder=()=>{
        const { chosenBooksForOrder } = this.props 
        Object.values(chosenBooksForOrder).forEach((data,index) =>{
            if(data.quantity===null){
                alert("Order books quantity field is required. Please fill quantity")
                return ; 
            } 
            })
            if(Object.entries(chosenBooksForOrder).length === 0 && chosenBooksForOrder.constructor === Object){
                alert("Please choose product")
            }else {
                return this.toggle()
            }
    }
    
    closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

    render(){
        return(
            <div>
                <Button color="danger" onClick={this.booksOrder} >Create Order</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}   close={this.closeBtn}>Create Order</ModalHeader>
                    <ModalBody>
                        <form className="mainForForms">
                            <p>{this.error}</p>
                            <p ref={el=>this.customerPhoneError=el}></p> 
                            <label>Phone Number: 
                                <input ref={el=>this.phoneNumber=el} type="text"  ></input>
                            </label>
                                <p ref={el=>this.customerAddressError=el}></p>
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
        state,
        chosenBooksForOrder: state.booksInformation ? state.booksInformation:{}
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