import React,{Component,Fragment} from 'react';
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
            
        }
    }
    changeRating=( newRating, name )=> {
        let ratingNew = Object.assign({}, this.state.rating);    //creating copy of object
        ratingNew[name] = newRating
        this.setState({
            rating: ratingNew
        });
    }
    textInput1 = React.createRef()
    addBasket=(id)=>{
        this.props.InputValue(this.refs['input' + id].value)
        let basketData = ls.get("basket") ? ls.get("basket") : {};
        console.log(basketData)
            if (basketData[id]!== undefined){
                basketData[id].quantity = this.refs['input' + id].value;  
            } else {
                basketData[id]= {
                    'id':id,
                    'quantity': this.refs['input' + id].value,
                }
                this.refs['input' + id].value=""
            }
            this.refs['input' + id].value=""
        
        
        if(this.props.state.userReduser.posts===undefined){
            alert ("please Log In")
        }
        else{

            ls.set("basket",basketData)
        }
       
    }

    sendData=(id)=>{
        let data={
            book_id: id,
            comment: this.refs['textInput' + id].value,
            rating: this.state.rating['rating' +id] 
        }
        if(this.props.state.userReduser.posts===undefined){
            alert ("please Log In ")
        }
        else{
          fetch("http://books.test/api/book-rating",{
            method:"POST",  
            headers: {"Content-Type": "application/json",
            "Authorization" : `Bearer ${this.props.state.userReduser.posts.user.payload.token}`        },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(response => {
              console.log(response);
            })
            .catch(error =>  ( error));    
        }

    }

    componentDidMount=()=>{
        let url=`http://books.test/api/books?page=1`;
        fetch(url)
        .then(response => response.json())
        .then(dataBook=> 
            this.setState({ booksData:dataBook })
            )
        .catch(error =>  ( error));
    }
    componentDidUpdate=(prevProps)=>{
    if (this.props.state.paginationPage !== prevProps.state.paginationPage) {

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
            <Fragment> 
            <div  className="wrapper" >
            {this.props.state.userReduser.posts === undefined||this.props.state.userReduser.posts.user.success===false ? null: <p className="userName">User Name:{this.props.state.userReduser.posts.user.success===false?null:this.props.state.userReduser.posts.user.payload.name}</p>}
                <h1>ONLINE FRUITS SHOP </h1>
                <div className="main">  
                     {this.state.booksData===null?null: this.state.booksData.payload.map((data,index) => {          
                    return( 
                        <div key={index} className="firstDiv">
                    < img src={`http://${data.image}`} alt="img"  />
                    <p  >Name:{data.name}</p>
                    <p  >Price {data.price} </p>
                    <label ></label> <input placeholder="1" type="number" ref={`input${data.book_id}`}/>
                    <button onClick={()=>this.addBasket(data.book_id)}  >ADD TO BASKET</button>
                    <StarRatings
                        rating={this.state.rating['rating'+data.book_id]}
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name={`rating${data.book_id}`}
                     />
                    <span>Average Rate "{data.average_rating}"</span>
                    <textarea ref={`textInput${data.book_id}`} rows="4" placeholder="Please leave comments" cols="50"></textarea>
                    <div className="divForButtons">
                    <button onClick={()=>this.sendData(data.book_id)} className="buttonForComment">Send Comment</button>
                     <ModalForComment    reviews={data.reviews} />
                    </div>
                    </div>
                            );
                        })
                        }
                    </div>
                    <Pagination  className="pagination" />
            </div> 
                    </Fragment>
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