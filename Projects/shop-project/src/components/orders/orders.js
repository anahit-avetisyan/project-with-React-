import React,{Component,Fragment} from 'react';
import ls from 'local-storage';
import {Table} from 'reactstrap';

class Order extends Component{
    state={
        data:{},
        dataUser: ls.get("userData") ? ls.get("userData") : {},
        error:"",
        receivedData:{},
        
    }
    _isMounted = false
    componentDidUpdate=(prevProps,prevState)=>{
        if(this.state.data!==prevState.data){
            if(this.state.data.success===false){
              this.setState({error:this.state.data.payload})
            }else{
                this.setState({receivedData:this.state.data.payload})    
            }
        }
    }
    componentDidMount=()=>{
        this._isMounted = true;
        if(this.state.dataUser.posts===undefined){
            alert ("please Log In");
            return null;
        } else{
            const user=this.state.dataUser.posts.user.payload
            fetch("http://books.test/api/ordered-book",{
                method:"GET",  
                headers:{"Content-Type": "application/json",
                "Authorization" : `Bearer ${user.token}`}
            })
            .then(res => res.json())
            .then(response => { 
               return this._isMounted ? this.setState({data:response }):null;
            })
            .catch(error =>  ( error)); 
          
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
 
    render(){
        return(
            <div >
                <p style={{color:"#DC3545",textAlign:'center'}}>{this.state.error}</p>
                <p style={{color:"#DC3545",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                {this.state.receivedData[0]===undefined?null:Object.values(this.state.receivedData).map((data,index)=>{
                   this.totalSum=0;
                   return(                                       
                        <Fragment key={index} > 
                            <Table dark>
                                <thead>
                                    <tr>
                                        <td>Order's number  {data.order_id}</td>
                                        <td>Product name</td>
                                        <td>Product quantity</td>
                                        <td>Product price</td>
                                        <td>Total price</td>
                                        <td>&hearts;</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {Object.values(data.order_books).map((mainData,index)=>{
                                    this.totalSum+=mainData.price * mainData.count
                                    return(
                                        <tr key={index} >
                                            <td>#</td>
                                            <td>{mainData.book}</td>
                                            <td>{mainData.count}</td>
                                            <td>{mainData.price}</td>
                                            <td>{mainData.price * mainData.count}</td>
                                            <td>#</td>
                                        </tr>
                                         )
                                        })
                                        }
                                        <tr>
                                            <td>Total Sum</td>
                                            <td>#</td>
                                            <td>#</td>
                                            <td>#</td>
                                            <td>{this.totalSum}</td>
                                            <td>#</td>
                                        </tr>
                                </tbody>
                            </Table>
                                <p style={{color:"#DC3545",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                        </Fragment> 
                    )
                }) 
                }          
            </div>
        )
    }
}
export default Order;