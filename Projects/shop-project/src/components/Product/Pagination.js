import React,{Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {ChangePage} from '../Reducer/action'
import Pagination from "react-js-pagination";
 

  class PaginationExample extends Component {
    
    handlePageChange=(pageNumber)=> {
        return this.props.ChangePage(pageNumber);  
    }
    render() {
  
      return (
          <div>
              <Pagination
                activePage={this.props.state.paginationPage}
                itemsCountPerPage={2}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
          </div>
      );
    }
  }
    function mapStateToProps(state) {
      return {
      state
      };
    }
    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                ChangePage
            },
            dispatch
        );
    }
export default connect(mapStateToProps,mapDispatchToProps)(PaginationExample);