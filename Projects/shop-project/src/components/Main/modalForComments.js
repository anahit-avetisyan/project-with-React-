import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
class ModalForComment extends React.Component {
   state = {
      modal: false
    }
  toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>View the last Comments</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>The last three comments</ModalHeader>
          <ModalBody>
            1.comment {this.props.firstComment} <br/>
            2.comment {this.props.seconComment} <br/>
            3.comment {this.props.thirdComment}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalForComment;