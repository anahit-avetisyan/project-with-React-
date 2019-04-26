import React,{Component,Fragment} from 'react';
import ls from 'local-storage';
import {Table} from 'reactstrap';
class Order extends Component{
    state={
        data:{},
        dataUser: ls.get("userData") ? ls.get("userData") : {},
        error:"",
        resevedData:{}
    }
     componentDidUpdate=(prevProps,prevState)=>{
         if(this.state.data!==prevState.data){
            if(this.state.data.success===false){
            console.log(this.errors) 
              this.setState({error:this.state.data.payload})
            }
            else{
                this.setState({resevedData:this.state.data.payload})    
            }
         }
     }
    componentDidMount=()=>{
        if(this.state.dataUser.posts===undefined){
            alert ("please Log In");
            return null;
        }
        else{
                fetch("http://books.test/api/ordered-book",{
                    method:"GET",  
                    headers:{"Content-Type": "application/json",
                    "Authorization" : `Bearer ${this.state.dataUser.posts.user.payload.token}`}
                 })
                .then(res => res.json())
                .then(response => { 
                    this.setState({data:response})
                })
                .catch(error =>  ( error)); 
            
        }
    }
   
    render(){
        return(
            <div >
                <p style={{color:"red",textAlign:'center'}}>{this.state.error}</p>
                <p style={{color:"red",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                {this.state.resevedData[0]===undefined?null:Object.values(this.state.resevedData).map((data,index)=>{
                    return(                                       
                        <Fragment key={index} > 
                            <Table striped>
                                <thead>
                                    <tr>
                                        <td>Oredr's number  {data.order_id}</td>
                                        <td>Product Name</td>
                                        <td>Product quantity</td>
                                        <td>#</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {Object.values(data.order_books).map((mainData,index)=>{
                                    return(
                                    <tr key={index} >
                                                <td>#</td>
                                                <td>{mainData.book}</td>
                                                <td>{mainData.count}</td>
                                                <td>#</td>
                                            </tr>
                                    )
                                    })
                                    }
                                </tbody>
                            </Table>
                                <p style={{color:"red",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                        </Fragment> 
                )
            }) 
            }
           
            </div>
        )
    }
}
export default Order;