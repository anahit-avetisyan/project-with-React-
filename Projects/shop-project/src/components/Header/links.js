import React,{Component} from 'react';
import {Link } from 'react-router-dom';


class Links extends Component{
    render(){
        return(
            <div className="combineLinks">
                <Link  to='/products'> Home </Link>
                <Link  to='/myBasket'> My Basket </Link>
                <Link  to='/orders' > My Orders </Link>
            </div>  
        )
    }
};
export default Links;
