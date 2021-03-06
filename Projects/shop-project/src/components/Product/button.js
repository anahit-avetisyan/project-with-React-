import React,{Component} from 'react';


class Button extends Component {
    
    render(){
        return(
            <button   onClick={()=>this.props.callback()} className={this.props.className} type={this.props.type}>{this.props.name}</button>
        )
    }
}
export default Button;