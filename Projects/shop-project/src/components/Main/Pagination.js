import React,{Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import Pagination from "react-js-pagination";
 

  class PaginationExample extends Component {
    state = {
      activePage: 1
    };
      handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
    }
    render() {
     
      return (
   
        <Pagination aria-label="Page navigation example">
          <PaginationItem >
            <PaginationLink previous href={this.state.activePage} />
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
          
        </Pagination>
      );
    }
  }
  export default PaginationExample;