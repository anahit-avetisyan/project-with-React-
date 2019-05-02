import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ls from 'local-storage';
import { BooksInformation} from '../Reducer/action';
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
            "Authorization" : `Bearer ${userInfo.posts.user.payload.token}`        },
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
            const booksInfo=this.props.state.booksInfoBasket;
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
                    };
                    return null;
                }
            })
        };
    }
    
    booksOrder=()=>{
        const booksInfo=this.props.state.booksInfoBasket;
        Object.values(booksInfo).forEach((data,index) =>{
            if(data.quantity===null){
                alert("Order books quantity field is required. Please fill quantity") 
            }
        })
        if(Object.entries(booksInfo).length === 0 && booksInfo.constructor === Object){
            alert("You dont select product")
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