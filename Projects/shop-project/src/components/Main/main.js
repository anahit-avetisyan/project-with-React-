import React,{Component,Fragment} from 'react'
import Apple from "../pictures/apple.jpg"
import Avocado from "../pictures/avocado.png"
import Cherry from "../pictures/Cherry.jpg"
import Lemon from "../pictures/limons.jpg"
import Oranges from "../pictures/Orange.jpg"
import Pineapple from "../pictures/pineapples.png"
import Raspberry from "../pictures/Raspberry.jpg"
import Strawberry from "../pictures/Strawberry.jpg"
import {InputValue,ChangeRate} from '../reducer/action'
import './main.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from './Pagination'
import Rating from './ratingWithstar'
import ls from 'local-storage';
import ModalForComment from './modalForComments'
 
class Main extends Component{
    
  product={
      "id":4554545,
        "name":"Apple",
        "price":5
    }
    
    addBasket=()=>{
        this.props.InputValue(this.input.value)
       
        let basketData = ls.get("basket") ? ls.get("basket") : {};
      
        if (this.input.value===""){
            alert("Please input value")
        }
        else{
            if (basketData[this.product.id]!== undefined){
                basketData[this.product.id].quantity = this.input.value;
                
            } else {
                basketData[this.product.id]= {
                    'id':this.product.id,
                    'quantity': this.input.value,
                }
                this.input.value=""
            }
            this.input.value=""
        
        }
  
        ls.set("basket",basketData)
}
    sendData=()=>{
        let data={
            comment:this.textInput.value,
            rating:this.props.state.ratingProduct
        }
        console.log(data)
        this.textInput.value=""
    }
    render(){
        console.log(this.props)
        return( 
            <Fragment> 
            <div className="wrapper">
                <h1>ONLINE FRUITS SHOP </h1>
                <div className="main">
                    <div className="firstDiv"><img src={Apple} alt="Apple img" />
                            <p>Name: APPLE</p>
                            <p>Price </p>
                            <label>Quantity:</label> <input placeholder="0" type="number" ref={input=>this.input=input}/>
                            <button onClick={this.addBasket}  >ADD TO BASKET</button>
                            <Rating id="rating"/><span>{this.midrate}</span>
                            <textarea ref={text=>this.textInput=text} rows="4" placeholder="Please leave comments" cols="50"></textarea>
                            <div className="divForButtons">
                            <button onClick={this.sendData} className="buttonForComment">Send Comment</button>
                            <ModalForComment/>
                            </div>
                    </div>
                    <div><img src={Avocado} alt="Avocado img"/>
                        <p>Name: APPLE</p>
                        <p>Price</p>
                        <input placeholder="0" type="number" ref={input=>this.input2=input} />
                        <button onClick={this.addBasket2}  >ADD TO BASKET</button>
                        <Rating id="rating"/>
                        <textarea ref={text=>this.textInput1=text} rows="4" placeholder="Please leave comments" cols="50"></textarea>
                            <div className="divForButtons">
                                <button onClick={this.sendData} className="buttonForComment">Send Comment</button>
                                <ModalForComment />
                            </div>
                    </div>
                        <div>
                            <img src={Cherry} alt="Cherry img" />
                            <p>Price </p>
                            <input type="number"/>
                        </div>
                            <div>
                                <img src={Lemon} alt="Lemon img" />
                                <p>Price </p>
                                <input type="number"/>
                            </div>
                    <div>
                        <img src={Oranges} alt="Oranges img" />
                        <p>Price </p>
                        <input type="number"/>
                    </div>
                    <div>
                        <img src={Raspberry} alt="Raspberry img" />
                        <p>Price </p>
                        <input type="number"/>
                    </div>
                    <div>
                        <img src={Pineapple} alt="Pineapple img"/>
                        <p>Price </p>
                        <input type="number"/>
                    </div>
                    <div>
                        <img src={Strawberry} alt="Strawberry img" />
                        <p>Price </p>
                        <input type="number"/></div>
                    </div>
                <Pagination  className="pagination"/>
            </div> 
            </Fragment>
        )
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
            InputValue,
            ChangeRate
        },
        dispatch
    );
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);