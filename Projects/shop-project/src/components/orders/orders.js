import React,{Component,Fragment} from 'react';
import ls from 'local-storage';
import {Table} from 'reactstrap';
class Order extends Component{
    state={
        data:{},
        dataUser: ls.get("userData") ? ls.get("userData") : {},
        error:"",
        resevedData:{},
        isLoading: false,
    }
    componentDidUpdate=(prevProps,prevState)=>{
        if(this.state.data!==prevState.data){
            if(this.state.data.success===false){
              this.setState({error:this.state.data.payload})
            }else{
                this.setState({resevedData:this.state.data.payload})    
            }
        }
    }
    componentDidMount=()=>{
        this.setState({ isLoading: true });
        if(this.state.dataUser.posts===undefined){
            alert ("please Log In");
            return null;
        } else{
            fetch("http://books.test/api/ordered-book",{
                method:"GET",  
                headers:{"Content-Type": "application/json",
                "Authorization" : `Bearer ${this.state.dataUser.posts.user.payload.token}`}
            })
            .then(res => res.json())
            .then(response => { 
                this.setState({data:response,isLoading: false})
            })
            .catch(error =>  ( error)); 
            
        }
    }
    
    render(){
      console.log(this.state.data)
        return(
            <div >
                <p style={{color:"#DC3545",textAlign:'center'}}>{this.state.error}</p>
                <p style={{color:"#DC3545",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                {this.state.resevedData[0]===undefined?null:Object.values(this.state.resevedData).map((data,index)=>{
                    return(                                       
                        <Fragment key={index} > 
                            <Table dark>
                                <thead>
                                    <tr>
                                        <td>Oredr's number  {data.order_id}</td>
                                        <td>Product name</td>
                                        <td>Product quantity</td>
                                        <td>Product price</td>
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
                                            <td>{mainData.price}</td>
                                            <td>#</td>
                                        </tr>
                                    )
                                    })
                                    }
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