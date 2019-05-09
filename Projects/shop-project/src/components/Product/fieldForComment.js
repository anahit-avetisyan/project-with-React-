import React, {Component,Fragment} from 'react';


class FieldForComment extends Component {
    
    componentDidUpdate = (prevProps) =>{
        let id = this.props.mainId;
        let responseData = this.props.responseData; 
        if(this.props.responseData !== prevProps.responseData){
            if(responseData.success === false){
                const commentError = responseData.errors.comment ? responseData.errors.comment : null;
                const   ratingError =  responseData.errors.rating ? responseData.errors.rating : null;
                if(this.props.mainId === this.props.refId ){
                    this.refs['comment'+ id].textContent = commentError
                    this.refs['rating'+ id].textContent = ratingError 
                } 
            }
            else if (responseData.success === true && Object.keys(responseData).length !== 0){
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