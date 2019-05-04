import React,{Component} from 'react';
import {BooksInformation,request,ChangePage} from '../reducers/action';
import '../style/main.scss';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from '../components/Product/Pagination';
import ls from 'local-storage';
import StarRatings from 'react-star-ratings';
import ModalForComment from '../components/Product/modalForComments'
import FieldForComment from '../components/Product/fieldForComment'
import Button from '../components/Product/button'

class Main extends Component{
    
    state={
        booksData:{},
        rating:{},
        dataUser: ls.get("userData") ? ls.get("userData") : {},
        responseForComment:{},
        id:{},
    };

    _isMounted = false

    changeRating=( newRating, name )=> {
        let ratingNew = Object.assign({}, this.state.rating); 
        ratingNew[name] = newRating
        this.setState({
            rating: ratingNew
        });
    };

    userData=()=>{
        if(this.props.user){
            ls.set("userData",this.props.user);
            ls.get('userData') 
            this.setState({dataUser:this.props.user})
        }    
    };

    addToBasket=(id)=>{
        let basketData = ls.get("basket") ? ls.get("basket") : {};
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        if (basketData[id]!== undefined){
            if(this.refs['input' + id].value<=0){
                alert("Please fill positive number")
                this.refs['input' + id].value=1
            }else{
                basketData[id].quantity = parseInt(this.refs['input' + id].value); 
            }
        } else {
            if(this.refs['input' + id].value<=0){
                alert("Please fill positive number");
                this.refs['input' + id].value=1
            }else{
                basketData[id]= {
                    'id':id,
                    'quantity': parseInt(this.refs['input' + id].value),
                    'name':this.refs['name'+id].textContent,
                    'price':this.refs['price'+id].textContent
                }
            }
        };
        if(this.state.dataUser.id===undefined){
            console.log(this.state.dataUser)
            alert ("please Log In");
        } else {
            ls.set("basket",basketData)  
        }    
    };

    sendData=(id)=>{
        this.setState({id:id})
        let data={
            book_id: id,
            comment: this.refs['textInput' + id].value,
            rating: this.state.rating['rating' +id] 
        }
        if(!this.props.user){
            alert ("please Log In ");
        } else {
           let user=this.props.user
            fetch("http://books.test/api/book-rating",{
                method:"POST",  
                headers: {"Content-Type": "application/json",
                "Authorization" : `Bearer ${user.token}`        },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(response => {
                this.setState({responseForComment:response })
                })
                .catch(error =>  ( error));     
        }
        this.refs['textInput' + id].value="";   
    };

    componentDidMount=()=>{
        this._isMounted = true;
        this.props.BooksInformation( ls.get('basket')  ? ls.get('basket') : {});
        let url=`http://books.test/api/books?page=1`;
        fetch(url)
            .then(response => response.json())
            .then(dataBook=> {
            return  this._isMounted ? this.setState({ booksData:dataBook  }):null
            })
            .catch(error =>  ( error));
            this.userData();
    };

    componentDidUpdate=(prevProps,prevState)=>{
        if (this.props.state.paginationPage !== prevProps.state.paginationPage ) {
            let url=`http://books.test/api/books?page=${this.props.state.paginationPage}`;
            fetch(url)
                .then(response => response.json())
                .then(dataBook=> 
                this.setState({booksData:dataBook})
                )
                .catch(error =>  ( error));     
        }
        else if(this.state.dataUser!==prevState.dataUser.user){
           
                this.name=this.state.dataUser.name  
        }
    };

    componentWillUnmount() {
        this._isMounted = false
    };
   
 
    render(){
        return( 
            <div  className="wrapper" >
                 <p className="userName">User Name:  {this.state.dataUser.id!==undefined?this.state.dataUser.name:this.name}</p>
                    <h1>ONLINE SHOPPING</h1>
                    <div className="main">  
                        {this.state.booksData.payload===undefined?null: this.state.booksData.payload.map((data,index) => {         
                            return( 
                                <div key={index} className="firstDiv">
                                    <img src={`http://${data.image}`} alt="img"  />
                                    <span>Name:</span>
                                    <p ref={`name${data.id}`} >{data.name}</p>
                                    <span>Price:</span>
                                    <p ref={`price${data.id}`} >{data.price}</p>
                                    <input defaultValue="1" type="number" ref={`input${data.id}`}/>
                                    <Button   callback={()=>this.addToBasket(data.id)}  name="ADD TO BASKET"/>
                                    <FieldForComment refId={data.id} mainId={this.state.id} booksData={this.state.booksData} responseData={this.state.responseForComment}/>
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
                                        <Button callback={()=>this.sendData(data.id)}  className="buttonForComment" name="Send Comment"/>
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
    };
    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                BooksInformation,
                request,
                ChangePage
            },
            dispatch
        );
    };

export default connect(mapStateToProps,mapDispatchToProps)(Main);