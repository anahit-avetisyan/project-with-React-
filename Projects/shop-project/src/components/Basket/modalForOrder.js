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
        mainResponse:{}
    }

    toggle=() =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
      
    createOrder=()=>{
        let userInfo=ls.get('userData');
        let order= ls.get('basket')?ls.get('basket'):{}; 
        var dataOrder={
            customer_phone:this.phoneNumber.value,
            customer_address:this.address.value,
            order_books:[    
            ]
        } 
        Object.values(order).forEach((data,index) =>{
            dataOrder.order_books.push({book_id:data.id,quantity:data.quantity})
        }
        );
        fetch("http://books.test/api/create-order",{
            method:"POST",  
            headers: {"Content-Type": "application/json",
            "Authorization" : `Bearer ${userInfo.token}`        },
            body: JSON.stringify(dataOrder)
        })
            .then(res => res.json())
            .then(response => {
            this.setState({mainResponse:response});
            })
            .catch(error =>  ( error)); 
    }
    componentDidUpdate=(pevProps,prevState)=>{
        if(this.state.mainResponse!==prevState.mainResponse){
            const booksInfo=this.props.books;
            this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
            Object.values(booksInfo).forEach((data,index) =>{
                if(data.quantity===null){
                    this.error="Order books quantity field is required. Please fill quantity"; 
                }else{
                    if(this.state.mainResponse.success===true){
                        this.toggle()
                        ls.remove('basket')
                        this.setState({mainResponse:ls.get('basket')? ls.get('basket'):{}});
                        history.push('/orders')
                    }else{
                        let error =this.state.mainResponse.errors
                        this.customerPhoneError.textContent = error.customer_phone ? error.customer_phone : null;
                        this.customerAddressError.textContent = error.customer_address ? error.customer_address : null;
                    }
                
                }
            })
        };
    }
    
    booksOrder=()=>{
        const booksInfo=this.props.books
        Object.values(booksInfo).forEach((data,index) =>{
            if(data.quantity===null){
                alert("Order books quantity field is required. Please fill quantity") 
            }
        })
        if(Object.entries(booksInfo).length === 0 && booksInfo.constructor === Object){
            alert("Please choose product")
        }else{
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
          books: state.booksInformation ? state.booksInformation:{}
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