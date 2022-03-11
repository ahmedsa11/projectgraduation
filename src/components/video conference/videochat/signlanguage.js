// import React, { useState } from "react";
// // import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition';
// // import io from "socket.io-client";
// // import signpic from '../../../img/si.jpeg'
// // // import Caption from "./caption";
// // // import './room.css';
// const Signlang = () => {
// const sio = io("https://asl-api.herokuapp.com/")
  
//   console.log('socket.io connected');
  
//   const SpeechRecognition =
//     window.speechRecognition || window.webkitSpeechRecognition;
//   const SpeechGrammarList =
//     window.speechGrammarList || window.webkitSpeechGrammarList;
  
//   const grammar = '#JSGF V1.0';
//   const speechRecognition = new SpeechRecognition();
//   const speechGrammarList = new SpeechGrammarList();
  
//   speechGrammarList.addFromString(grammar);
//   speechRecognition.grammars = speechGrammarList;
//   speechRecognition.continuous = true;
//   speechRecognition.lang = 'en-US';
//   // speechRecognition.start();
//   let content = '';
//   let newContent = '';
//   let isFinished = true;
//   speechRecognition.onresult = (event) => {
//     if (event.results.length) {
//       let current = event.resultIndex;
//       let transcript = event.results[current][0].transcript;
//       content = transcript;
//       newContent += content;
//       if (isFinished) {
//         sio.emit('stream_text', { data: newContent, id: 'sio.id' });
//         isFinished = false;
//         newContent = '';
//       }
//     }
//   };
//   sio.on('send', () => {
//     isFinished = true;
//     if(newContent.length > 0) {
//       sio.emit('stream_text', { data: newContent, id: 'sio.id' });
//       newContent = '';
//     }
//   });
//   //else{
//   //   speechRecognition.stop()
//   // }
//   // recive data from the server
//   sio.on('connect', () => {
//     console.log('connected');
//   });
  
//   sio.on('disconnect', () => {
//     console.log('disconnected');
//   });
  
//   sio.on('connect_error', (e) => {
//     console.log(e.message);
//   });
//   // send data to the server
//   // recive data from the server
//   sio.on('stream_text', (pyload) => {
//     console.log("test")
//     document.getElementById('stream_asl').src =
//       'data:image/jpeg;base64,' + arrayBufferToBase64(pyload['data']);
//   });
  
//   const arrayBufferToBase64 = (buffer) => {
//     var binary = '';
//     var bytes = new Uint8Array(buffer);
//     var len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };
//   return (
//     <React.Fragment>
//                 <img id="stream_asl" alt="ss" src={signpic} />
//           {/* <button id="start"onClick={()=>speechRecognition.start()}>Start</button>
//       <button id="stop"onClick={()=> speechRecognition.stop()}>Stop</button> */}
//     </React.Fragment>
//   );
// };
// export default Signlang;