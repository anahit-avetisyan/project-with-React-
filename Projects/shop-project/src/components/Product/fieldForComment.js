import React, {Component,Fragment} from 'react';


class FieldForComment extends Component {
    
    componentDidUpdate = (prevProps) =>{
       
        let id = this.props.mainId;
        let responseData = this.props.responseData;
         console.log(this.refs['rating'+ id])
        if(this.props.responseData !== prevProps.responseData){ 
            if(responseData.success === false){
                const commentError = responseData.errors.comment ? responseData.errors.comment : null;
                const   ratingError =  responseData.errors.rating ? responseData.errors.rating : null;;
                if(this.refs['comment'+ id] !== undefined || this.refs['rating'+ id]!==undefined ){
                    this.refs['comment'+ id].textContent = commentError
                    this.refs['rating'+ id].textContent = ratingError
                }    
            }
            else if (responseData.success === true && Object.keys(responseData !== 0)){
                alert ("Your comment has sent")
            } 
        }              
    }
    render(){
        return (
            <Fragment>
                <p ref = {`comment${this.props.refId}`} className='fieldForResponse'></p>
                <p ref = {`rating${this.props.refId}`} className='fieldForResponse'></p>
            </Fragment>
        )
    };
}
export default FieldForComment;