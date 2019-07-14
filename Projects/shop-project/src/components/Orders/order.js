import React,{Component,Fragment} from 'react';
import ls from 'local-storage';
import {Table} from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {request} from '../../reducers/action'
class Order extends Component{
    state={
        data:{},
        userIsAuthenticatedInLocalStorage: ls.get('userData') && ls.get('userData').id ? ls.get('userData') : {},
        error:"",
        
    }
    _isMounted = false
  
    componentDidMount=()=>{
        this._isMounted = true;
        const {userIsAuthenticatedInLocalStorage}=this.state
        const {userIsAuthenticatedInRedux} = this.props
        if(userIsAuthenticatedInRedux){
            fetch("http://books.test/api/ordered-book",{
                method:"GET",  
                headers:{"Content-Type": "application/json",
                "Authorization" : `Bearer ${userIsAuthenticatedInLocalStorage.token}`}
            })
            .then(res => res.json())
            .then(response => { 
                return this._isMounted ? this.setState({data:response }):null;
             
            })
            .catch(error =>  (error)); 
        }else{
            return null;
        }
    }
    componentDidUpdate=(prevProps,prevState)=>{
        if(this.state.data!==prevState.data){
            if(this.state.data.success===false){
              this.setState({error:this.state.data.payload})
            }else{
                return this.state.data  
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
 
    render(){
        const {data} = this.state
        const {userIsAuthenticatedInRedux} = this.props
        return(
            <div >
                <p style={{color:"#A63F5F",textAlign:'center'}}>{this.state.error}</p>
                <p style={{color:"#A63F5F",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                {Object.keys(userIsAuthenticatedInRedux).length === 0 ? null : Object.keys(data).length === 0 || data.success === false? null : Object.values(data.payload).map((dataOfOrders,index)=>{
                   this.totalSum=0;
                   return(                                       
                        <Fragment key={index} > 
                            <Table dark>
                                <thead>
                                    <tr>
                                        <td>Order's number  {dataOfOrders.order_id}</td>
                                        <td>Product name</td>
                                        <td>Product quantity</td>
                                        <td>Product price</td>
                                        <td>Total price</td>
                                        <td>&hearts;</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {!dataOfOrders ? null : Object.values(dataOfOrders.order_books).map((mainData,index)=>{
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
                                <p style={{color:"#A63F5F",textAlign:'center'}}>  &hearts;  &hearts;  &hearts;  </p>
                        </Fragment> 
                    )
                }) 
                }          
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        state,  
        userIsAuthenticatedInRedux: state.user&& state.user.success === true ? state.user.payload : ls.get('userData') ? ls.get('userData') : {}        
    };
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            request,
        },
        dispatch
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(Order);