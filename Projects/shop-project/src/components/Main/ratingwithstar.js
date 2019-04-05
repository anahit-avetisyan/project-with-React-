import React,{Component} from 'react';
import StarRatings from 'react-star-ratings';

class Rating extends Component{
    state={
        rating:3.2
    }
    changeRating=( newRating)=> {
        this.setState({
          rating: newRating
        });
      }
    render(){
      console.log(this.state)
        return(
            <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          starHoverColor="yellow"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
          starDimension="1em"
          starSpacing = "0.01em"
        /> 
        )
    }
}
 export default Rating;