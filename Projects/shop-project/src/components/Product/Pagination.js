import React,{Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {ChangePage} from '../Reducer/action'
import Pagination from "react-js-pagination";
 

  class PaginationExample extends Component {
    
      handlePageChange=(pageNumber)=> {
      // (`active page is ${pageNumber}`);
      console.log(this.props.ChangePage(pageNumber))
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
        // <Pagination aria-label="Page navigation example">
        //   <PaginationItem >
        //     <PaginationLink previous href={this.props.state.paginationPage}  />
        //   </PaginationItem>
        //   <PaginationItem active>
        //     <PaginationLink >
        //       1
        //     </PaginationLink>
        //   </PaginationItem>
        //   <PaginationItem>
        //     <PaginationLink href="#">
        //       2
        //     </PaginationLink>
        //   </PaginationItem>
        //   <PaginationItem>
        //     <PaginationLink href="#">
        //       3
        //     </PaginationLink>
        //   </PaginationItem>
        //   <PaginationItem>
        //     <PaginationLink href="#">
        //       4
        //     </PaginationLink>
        //   </PaginationItem>
        //   <PaginationItem>
        //     <PaginationLink href="#">
        //       5
        //     </PaginationLink>
        //   </PaginationItem>
        //   <PaginationItem>
        //     <PaginationLink next href="#" />
        //   </PaginationItem>
          
        // </Pagination>
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