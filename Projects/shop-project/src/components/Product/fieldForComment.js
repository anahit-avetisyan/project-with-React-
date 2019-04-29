import React, {Component} from 'react';


class FieldForComment extends Component {
    functionForComment=(id,booksData,responseData )=>{
        id=this.props.mainId;
        booksData=this.props.booksData;
        responseData=this.props.responseData;
        if(booksData.payload!==undefined){ 
            if(responseData.success!==undefined&&responseData.success===false){
                if(responseData.success===false&&responseData.errors.rating===undefined&&responseData.errors.comment===undefined){
                    if(this.refs['comment'+ id]!==undefined){
                        this.refs['comment'+ id].textContent=responseData.errors
                    }
                }
                else if(responseData.errors.rating===undefined&&responseData.errors.comment!==undefined){
                    if(this.refs['comment'+ id]!==undefined){
                        this.refs['comment'+ id].textContent=responseData.errors.comment
                    }
                }
                else if(responseData.errors.rating!==undefined&&responseData.errors.comment===undefined){
                    if(this.refs['comment'+ id]!==undefined){
                        this.refs['comment'+ id].textContent=responseData.errors.rating
                    }
                }   
                else if(responseData.errors.rating!==undefined&&responseData.errors.comment!==undefined){
                    if(this.refs['comment'+ id]!==undefined){
                        this.refs['comment'+ id].textContent=`1. ${responseData.errors.rating} 2.${responseData.errors.comment} `
                    } 
                } 
            }
            else if(responseData.success!==undefined&&responseData.success===true){
                alert ("Your comment has sent")
            }
        }
                
    }
    render(){
        this.functionForComment();
        return (
            <p ref={`comment${this.props.refId}`}    className='fieldForResponse'></p>
        )
    };
}
export default FieldForComment;