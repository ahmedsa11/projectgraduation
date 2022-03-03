// import React from "react";
// // import './room.css';
// import sio from 'socket.io-client'
// const Caption = () => {
//   const SpeechRecognition =
//   window.speechRecognition || window.webkitSpeechRecognition;
// const SpeechGrammarList =
//   window.speechGrammarList || window.webkitSpeechGrammarList;

// const grammar = '#JSGF V1.0';
// const speechRecognition = new SpeechRecognition();
// const speechGrammarList = new SpeechGrammarList();

// speechGrammarList.addFromString(grammar);
// speechRecognition.grammars = speechGrammarList;
// speechRecognition.continuous = true;
// speechRecognition.lang = 'en-US';

// let text=React.createRef()
// let content = '';
// let newContent = '';
// let isFinished = true;

// speechRecognition.onresult = (event) => {
//   if (event.results.length) {
//     let current = event.resultIndex;
//     let transcript = event.results[current][0].transcript;
//     content = transcript;
//   if(text.current){
//     text.current.textContent += content;
//   }
//     newContent += content;
//     if (isFinished) {
//       sio.emit('stream_txt', { data: 'language', id: 'sio.id' });
//       isFinished = false;
//       newContent = '';
//     }
//   }
// };

//   return (
//     <React.Fragment>
//   <div className='cp'>
//               <div className='caption lead text-center'id="textarea"ref={text}></div></div>
//     </React.Fragment>
//   );
// };
// export default Caption;
