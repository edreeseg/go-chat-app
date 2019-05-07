import React from 'react';
import './ChatHistory.css';

class ChatHistory extends React.Component {
  render() {
    const messages = this.props.chatHistory.map(msg => (
      <p key={msg.timeStamp}>{msg.data}</p> // Tutorial made use of index as key - not recommended, index may change
    ));

    return (
      <div className="chat-history">
        <h2>Chat History</h2>
        {messages}
      </div>
    );
  }
}

export default ChatHistory;
