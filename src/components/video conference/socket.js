import io from 'socket.io-client';
const socket = io('http://localhost:3001');
console.log("asdad")
console.log(socket)
// const socket = io('https://backend-socket-tabarani.herokuapp.com/');
export default socket;
