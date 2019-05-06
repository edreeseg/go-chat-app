import React from 'react';
import './App.css';
import { connect, sendMsg } from './api';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      msg: '',
    };
    connect();
  }
  send = ev => {
    ev.preventDefault();
    console.log(this.state.msg);
    sendMsg(this.state.msg);
    this.setState({ msg: '' });
  }
  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    return (
      <div className="App">
        <form onSubmit={this.send}>
          <input 
            type="text"
            placeholder="Message"
            name="msg"
            onChange={this.handleChange}
            value={this.state.msg}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
