import io from 'socket.io-client';
const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
let socket = io('//localhost:3000',connectionOptions);
console.log(socket);
export default socket;