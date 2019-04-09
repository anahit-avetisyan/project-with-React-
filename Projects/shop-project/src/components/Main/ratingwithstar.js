import React,{Component} from 'react';
import StarRatings from 'react-star-ratings';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {ChangeRate} from '../reducer/action'
class Rating extends Component{
    
    changeRating=( newRating)=> {
      this.props.ChangeRate(newRating)
      }
    render(){
        return(
            <StarRatings
          rating={this.props.ratingProduct}
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
function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      ChangeRate
    },
    dispatch
  )
}
 export default connect(mapStateToProps,mapDispatchToProps)(Rating);