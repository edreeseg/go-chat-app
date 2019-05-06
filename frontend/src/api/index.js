const socket = new WebSocket('ws://localhost:8080/ws');

const messages = [];

const connect = () => {
    console.log('Attempting Connection...');
    socket.onopen = () => console.log('Successfully Connected');
    socket.onmessage = msg => console.log(msg);
    socket.onclose = ev => console.log(`Socket Closed Connection: ${ev}`);
    socket.onerror = err => console.log(`Socket Error: ${err}`);
};

const sendMsg = msg => {
    console.log(`Sending message: ${msg}`);
    socket.send(msg);
    console.log(messages.length);
    if (messages.length === 10){
        messages.shift();
    }
    messages.push(msg);
};

export { connect, sendMsg, messages };