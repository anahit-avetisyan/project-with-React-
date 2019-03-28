import React, { Component } from "react";
import SimpleStorage from "react-simple-storage";
import "./App.css";
 
class App extends Component {
  
    state = {
      newItem: "",
      list: [],
  
    };
  

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);
    console.log(list)
    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
   
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <SimpleStorage parent={this} />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React LocalStorage Tutorial</h1>
        </header> */}
        <div className="todoList">
          Add an item 
          <br />
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            &#43; Add
          </button>
          <br /> 
          </div>
          <div className="itemsContainer">
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}  
                  <button onClick={() => this.deleteItem(item.id)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          </div>
      </div>
    );
  }
}

export default App;