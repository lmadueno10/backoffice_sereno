import { BASE_MEDIA } from 'constants/global';
import io from 'socket.io-client';

const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
let socket = io(BASE_MEDIA,connectionOptions);
console.log(socket);
export default socket;