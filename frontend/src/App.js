import React from 'react';
import './App.css';
import { connect, sendMsg, messages } from './api';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      msg: '',
      messages,
    };
    connect();
  }
  send = ev => {
    ev.preventDefault();
    sendMsg(this.state.msg);
    this.setState({ msg: '', messages }, () => console.log(this.state.messages));
  }
  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    return (
      <div className="App">
        <ul className="message-display">
          {this.state.messages.map(msg => <li key={msg}>{msg}</li>)} {/*Needs unique key*/}
        </ul>
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
