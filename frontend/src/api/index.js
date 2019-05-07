const socket = new WebSocket('ws://localhost:8080/ws');

const connect = cb => {
  console.log('Connecting...');
  socket.onopen = () => console.log('Successfully Connected');
  socket.onmessage = msg => {
    console.log(msg);
    cb(msg);
  };
  socket.onclose = ev => console.log(`Socket Closed Connection: ${ev}`);
  socket.onerror = err => console.log(`Socket Error: ${err}`);
};

const sendMsg = msg => {
  console.log(`Sending message: ${msg}`);
  socket.send(msg);
};

export { connect, sendMsg };
