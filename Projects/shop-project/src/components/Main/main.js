import React,{Component} from 'react';
import {InputValue,fetchProducts,ChangePage} from '../reducer/action';
import './main.scss';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from './Pagination';
import ls from 'local-storage';
import StarRatings from 'react-star-ratings';
import ModalForComment from './modalForComments'
 


class Main extends Component{
    state={
        booksData:null,
        rating:{
            
        },
        dataUser: ls.get("userData") ? ls.get("userData") : {}
    } 
    
    changeRating=( newRating, name )=> {
        let ratingNew = Object.assign({}, this.state.rating); 
        ratingNew[name] = newRating
        this.setState({
            rating: ratingNew
        });
    }
    
        userData=()=>{
            if(this.props.state.userReduser.posts === undefined){
            return this.dataUser
            }
            else if(this.props.state.userReduser.posts !== undefined && this.props.state.userReduser.posts.user.success===true){
                ls.set("userData",this.props.state.userReduser);
                ls.get('userData') 
                this.setState({dataUser:this.props.state.userReduser})
    
            }    
        }
        addBasket=(id)=>{
            console.log(this.refs['name'+id].textContent)
            this.props.InputValue(this.refs['input' + id].value);
            let basketData = ls.get("basket") ? ls.get("basket") : {};
                if (basketData[id]!== undefined){
                    basketData[id].quantity = parseInt(this.refs['input' + id].value);  
                } else {
                    basketData[id]= {
                        'id':id,
                        'quantity': parseInt(this.refs['input' + id].value),
                        'name':this.refs['name'+id].textContent,
                        'price':this.refs['price'+id].textContent
                    }
                    this.refs['input' + id].value="";
                }
                this.refs['input' + id].value="";
            if(this.state.dataUser.posts===undefined){
                alert ("please Log In");
            }
                else{

                    ls.set("basket",basketData);
                }
            
        }

    sendData=(id)=>{
        let data={
            id: id,
            comment: this.refs['textInput' + id].value,
            rating: this.state.rating['rating' +id] 
        }
        if(this.state.dataUser.posts===undefined){
            alert ("please Log In ");
        }
        else{
          fetch("http://books.test/api/book-rating",{
            method:"POST",  
            headers: {"Content-Type": "application/json",
            "Authorization" : `Bearer ${this.state.dataUser.posts.user.payload.token}`        },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(response => {
              console.log(response);
            })
            .catch(error =>  ( error));    
        }
        this.refs['textInput' + id].value=""
    }
   
    componentDidMount=()=>{
        let url=`http://books.test/api/books?page=1`;
        fetch(url)
        .then(response => response.json())
        .then(dataBook=> 
            this.setState({ booksData:dataBook })
            )
        .catch(error =>  ( error));
        this.userData()
    }
    componentDidUpdate=(prevProps)=>{
        if (this.props.state.paginationPage !== prevProps.state.paginationPage ) {
            let url=`http://books.test/api/books?page=${this.props.state.paginationPage}`;
                fetch(url)
                    .then(response => response.json())
                    .then(dataBook=> 
                        this.setState({ booksData:dataBook })
                        )
                    .catch(error =>  ( error));     
            }
                
            }
        
        render(){
          
            return( 
                
                <div  className="wrapper" >
                {this.state.dataUser.posts === undefined ? null: <p className="userName">User Name:{this.state.dataUser.posts.user.success===false?null:this.state.dataUser.posts.user.payload.name}</p>}
                    <h1>ONLINE FRUITS SHOP </h1>
                    <div className="main">  
                        {this.state.booksData===null?null: this.state.booksData.payload.map((data,index) => {          
                        return( 
                            <div key={index} className="firstDiv">
                        < img src={`http://${data.image}`} alt="img"  />
                        <span>Name:</span>
                        <p ref={`name${data.id}`} >{data.name}</p>
                        <span>Price:</span>
                        <p ref={`price${data.id}`} >{data.price} </p>
                        <label ></label> <input placeholder="1" type="number" ref={`input${data.id}`}/>
                        <button onClick={()=>this.addBasket(data.id)}  >ADD TO BASKET</button>
                        <StarRatings
                            rating={this.state.rating['rating'+data.id]}
                            starRatedColor="yellow"
                            starHoverColor="yellow"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name={`rating${data.id}`}
                        />
                        <span>Average Rate "{data.average_rating}"</span>
                        <textarea ref={`textInput${data.id}`} rows="4" placeholder="Please leave comments" cols="50"></textarea>
                        <div className="divForButtons">
                        <button onClick={()=>this.sendData(data.id)} className="buttonForComment">Send Comment</button>
                        <ModalForComment    reviews={data.reviews} />
                        </div>
                        </div>
                                );
                            })
                            }
                        </div>
                        <Pagination  className="pagination" />
                </div> 
       
                )
            }
        }
function mapStateToProps(state) {
    return {
    state,
 
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            InputValue,
            fetchProducts,
            ChangePage
        },
        dispatch
    );
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);