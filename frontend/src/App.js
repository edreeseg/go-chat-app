import React from 'react';
import './App.css';
import { Header, ChatHistory } from './components';
import { connect, sendMsg } from './api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
    };
    connect();
  }
  componentDidMount() {
    connect(msg => {
      console.log('New message!');
      this.setState(prevState => {
        return {
          chatHistory: [...prevState.chatHistory, msg],
        }; // Must make use of prevState to have a definite reference to prior state, and avoid
      }); // potential pitfalls of setState's asynchronous nature.
    });
  }
  send = ev => {
    console.log('Hello');
    sendMsg('Hello');
  };
  render() {
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <button onClick={this.send}>Hit</button>
      </div>
    );
  }
}

export default App;
