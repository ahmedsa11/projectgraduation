import React, { useEffect, useRef, useState } from 'react';
import react from 'react';
// import {useSpeechRecognition} from 'react-speech-recognition';
import signpic from '../../../img/si.jpeg'
import io from "socket.io-client";
// import None from 'No';
// import io from 'socket.io-client';
import Peer from 'simple-peer';
import socket from './socket';
import './room.css';
import chat from '../../../img/download.png';
import Navbar from '../navbar/navbar';
import Chat from '../chat/chat';
import logo from '../../../img/loo.png'
import BottomBar from './BottomBar';
import VideoCard from './vid';
import { Redirect } from 'react-router';
const Copy = () => {
  var Url = document.getElementById('paste-box');
  Url.value = window.location.href;
  Url.focus();
  Url.select();
  document.execCommand('Copy');
};
const grid = () => {
  const grid6 = document.getElementById('grid6');
  const grid4 = document.getElementById('grid4');
  const grid1 = document.getElementById('grid1');
  const vids = document.querySelector('.vids');
  const viditem = document.getElementsByClassName('vid-item');
  for (let i = 0; i < viditem.length; i++) {
    grid6.onclick = () => {
      viditem[i].style.width = 'calc(100%/4)';
      vids.style.padding = '0% 19%';
      viditem[i].style.margin = '0% 0%';
    };

    grid4.onclick = () => {
      viditem[i].style.width = 'calc(100%/3.1)';
      vids.style.padding = '0% 0%';
      viditem[i].style.margin = '0% 0%';
    };
    grid1.onclick = () => {
      viditem[i].style.width = 'calc(100%/1.7)';
      vids.style.padding = '0% 0%';
      viditem[i].style.margin = '0% 3%';
    };
  }
};
const openchat = () => {
  const icon = document.querySelector('.fa-comment-dots');
  const iconphone = document.querySelector('.fa-sign-out-alt');
  icon.onclick = () => {
    document.querySelector('.chat-side').classList.toggle('open');
    document.querySelector('#main').classList.toggle('openmain');
    document.querySelector('.fa-comment-dots').classList.toggle('active');
  };
  iconphone.onclick = () => {
    document.querySelector('.chat-side').classList.toggle('open');
    document.querySelector('#main').classList.toggle('openmain');
  };
};
const openpopup = () => {
  let popup = document.querySelector('.popup-wrapper');
  let popupBtn = document.querySelector('.popup-open');
  let popupClose = document.querySelector('.close-btn');
  popupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPopup();
  });

  popupClose.addEventListener('click', (e) => {
    e.preventDefault();
    removePopup();
  });

  popup.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('popup-wrapper')) {
      removePopup();
    } else return;
  });

  function showPopup() {
    popup.classList.add('active');
  }

  function removePopup() {
    popup.classList.remove('active');
  }
  var Url = document.getElementById('paste-box');
  Url.value = window.location.href;
  Url.focus();
  Url.select();
  document.execCommand('Copy');
};
const Room = (props) => {
  const sio = io("https://asl-api.herokuapp.com/")
  
  console.log('socket.io connected');
  
  const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.speechGrammarList || window.webkitSpeechGrammarList;
  
  const grammar = '#JSGF V1.0';
  const speechRecognition = new SpeechRecognition();
  const speechGrammarList = new SpeechGrammarList();
  
  speechGrammarList.addFromString(grammar);
  speechRecognition.grammars = speechGrammarList;
  speechRecognition.continuous = true;
  speechRecognition.lang = 'en-US';
  // speechRecognition.start();
  let text=React.createRef()
  let content = '';
  let newContent = '';
  let isFinished = true;
  // if(newContent){
  //   scrollIntoView();
  // }
  speechRecognition.onresult = (event) => {
    if (event.results.length) {
      let current = event.resultIndex;
      let transcript = event.results[current][0].transcript;
      content = transcript;
    
      newContent += content;
      if (isFinished) {
        socket.emit("send-text", {data: newContent, roomId});
        isFinished = false;
        newContent = '';
      }
    }
  };

  socket.on("receive-text", ({ data }) => { 
    if(text.current){
      text.current.textContent += data;
    }
    sio.emit('stream_text', { data, id: sio.id });
  })
  sio.on('send', () => {
    isFinished = true;
    if (newContent.length > 0) { 
      isFinished = false;
      socket.emit("send-text", {data: newContent, roomId});
      newContent = '';
    }
  });
  //else{
  //   speechRecognition.stop()
  // }
  // recive data from the server
  sio.on('connect', () => {
    console.log('connected');
  });
  
  sio.on('disconnect', () => {
    console.log('disconnected');
  });
  
  sio.on('connect_error', (e) => {
    console.log(e.message);
  });
  // send data to the server
  // recive data from the server
  sio.on('stream_text', (pyload) => {
    console.log("test")
    document.getElementById('stream_asl').src =
      'data:image/jpeg;base64,' + arrayBufferToBase64(pyload['data']);
  });
  
  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  // const [videoDevices, setVideoDevices] = useState([]);
  // const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  // const [showVideoDevices, setShowVideoDevices] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const roomId = props.match.params.roomId;
  const tempuser = localStorage.getItem('user');
  const user = JSON.parse(tempuser);
  useEffect(() => {
    // Get Video Devices
    // navigator.mediaDevices.enumerateDevices().then((devices) => {
    //   const filtered = devices.filter((device) => device.kind === 'videoinput');
    //   // setVideoDevices(filtered);
    // });

    // Set Back Button Event
    if (tempuser === null) {
      return <Redirect to='/' />;
    }
  
    window.addEventListener('popstate', goToBack);

    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;
        // SpeechRecognition.startListening({ continuous: true,lang : 'en-US' })
        speechRecognition.start()
        socket.emit('BE-join-room', { roomId, user });

        socket.on('FE-user-join', ({ userId, info }) => {
          // all users
          const peers = [];
          let { user: newUser, video, audio } = info;

          const peer = createPeer(userId, socket.id, stream);
          peer.userName = newUser.name;
          peer.peerID = userId;

          peersRef.current.push({
            peerID: userId,
            peer,
            userName: newUser.name,
            audio,
          });

          peers.push(peer);

          setUserVideoAudio((preList) => {
            return {
              ...preList,
              [peer.userName]: { video, audio },
            };
          });
          setPeers(peers);
        });

        // socket.on('FE-duplicate-user', () => {
        //   window.location.href = '/home';
        //   alert("You are already in this room but in other tab")
        // });

        socket.on('FE-receive-call', ({ signal, from, info }) => {
          let { user: newUser, video, audio } = info;
          const peerIdx = findPeer(from);

          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);

            peer.userName = newUser.name;
            peer.peerID = from;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: newUser.name,
              audio,
            });

            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on('FE-call-accepted', ({ signal, answerId }) => {
          const peerIdx = findPeer(answerId);
          peerIdx.peer.signal(signal);
        });

        socket.on('FE-user-leave', ({ userId }) => {
          const peerIdx = findPeer(userId);
          peerIdx.peer.destroy();
          setPeers((users) => {
            users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
            return [...users];
          });
          peersRef.current = peersRef.current.filter(
            ({ peerID }) => peerID !== userId
          );
        });
      });

    socket.on('FE-toggle-camera', ({ userId, switchTarget }) => {
      const peerIdx = findPeer(userId);

      setUserVideoAudio((preList) => {
        let video = preList[peerIdx.userName].video;
        let audio = preList[peerIdx.userName].audio;

        if (switchTarget === 'video') {
          video = !video;
          
        } else {
          audio = !audio;
          peerIdx.audio = audio;
        }

        return {
          ...preList,
          [peerIdx.userName]: { video, audio },
        };
      });
    });
    return () => {
      // socket.disconnect();
      alert('peer destroy');
    };
    
    // eslint-disable-next-line
  }, []);


  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-call-user', {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on('disconnect', () => {
      // peer.destroy();
      alert('peer destroy');
    });

    return peer;
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-accept-call', { signal, to: callerId });
    });

    peer.on('disconnect', () => {
      // peer.destroy();
      alert('peer destroy');
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  function createUserVideo(peer, index, arr) {
    return (
      <div
        className={`width-peer${peers.length > 8 ? '' : peers.length} vid-item`}
        onClick={expandScreen}
        key={index}
      >
        <i className='fas fa-expand'></i>
        <VideoCard key={index} peer={peer} number={arr.length} />
        <div className='icon'>
          {findPeer(peer.peerID).audio ? (
            <i className='fas fa-microphone'></i>
          ) : (
            <i className='fas fa-microphone-slash'></i>
          )}
        </div>
        {/* {findPeer(peer.peerID).video ? null : (
                    <span className='name'>{writeUserName(peer.userName)}</span>
                  )} */}
        <span className='name'>{writeUserName(peer.userName)}</span>
      </div>
    );
  }

  function writeUserName(userName, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return <div key={userName}>{userName}</div>;
      }
    }
  }

  // // Open Chat
  // const clickChat = (e) => {
  //   e.stopPropagation();
  //   setDisplayChat(!displayChat);
  // };

  // BackButton
  const goToBack = (e) => {
    e.preventDefault();
    socket.emit('BE-leave-room', { roomId });
    sessionStorage.removeItem('user');
    window.location.href = '/home';
  };

  const toggleCameraAudio = (e) => {
    const target = e.target.getAttribute('data-switch');
  
    setUserVideoAudio((preList) => {
      let videoSwitch = preList['localUser'].video;
      let audioSwitch = preList['localUser'].audio;

      if (target === 'video') {
        const userVideoTrack =
          userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
      } else {
       
        const userAudioTrack =
          userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;
        
        
        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
          
        }
        if(audioSwitch){
          speechRecognition.start()
        }
        else if(!audioSwitch){
          speechRecognition.stop()
         
         }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit('BE-toggle-camera-audio', {
      roomId,
      switchTarget: target,
    });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === 'video'),
              screenTrack,
              userStream.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === 'video'),
                userStream.current
              );
            });
            userVideoRef.current.srcObject = userStream.current;
            setScreenShare(false);
          };

          userVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };
  // const clickCameraDevice = (event) => {
  //   if (
  //     event &&
  //     event.target &&
  //     event.target.dataset &&
  //     event.target.dataset.value
  //   ) {
  //     const deviceId = event.target.dataset.value;
  //     const enabledAudio =
  //       userVideoRef.current.srcObject.getAudioTracks()[0].enabled;

  //     navigator.mediaDevices
  //       .getUserMedia({ video: { deviceId }, audio: enabledAudio })
  //       .then((stream) => {
  //         const newStreamTrack = stream
  //           .getTracks()
  //           .find((track) => track.kind === 'video');
  //         const oldStreamTrack = userStream.current
  //           .getTracks()
  //           .find((track) => track.kind === 'video');

  //         userStream.current.removeTrack(oldStreamTrack);
  //         userStream.current.addTrack(newStreamTrack);

  //         peersRef.current.forEach(({ peer }) => {
  //           // replaceTrack (oldTrack, newTrack, oldStream);
  //           peer.replaceTrack(
  //             oldStreamTrack,
  //             newStreamTrack,
  //             userStream.current
  //           );
  //         });
  //       });
  //   }
  // };

  return (
    <react.Fragment>
      <div className='video-conference'>
        <div className='main-side' id='main'>
          <div className='navbar'>
            <div className='container'>
              <div className='logo'>
                <img src={logo} alt='logo'/>
              </div>
              <div className='title'>
                <h4>Video Conference</h4>
              </div>
              <div className='grid-show'>
                <ul>
                  <li id='grid6' onClick={grid}>
                    <i className='fas fa-th g'></i>
                  </li>
                  <li id='grid1' onClick={grid}>
                    <i className='far fa-window-maximize g'></i>
                  </li>
                  <li id='grid4' onClick={grid}>
                    <i className='fas fa-th-large g'></i>
                  </li>
                  <li>
                    <i className='fas fa-comment-dots' onClick={openchat}></i>
                  </li>
                  <li>
                    <img src={chat} alt='a' />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='vi'>
            <Navbar />
            <div className='vid-stream'>
              <div className='opts'>
                <i className='fas fa-user-friends'></i>
                <select className='nump'>
                  <option>{peers.length + 1}</option>
                </select>
                <div className='invite'>
                  <i
                    className='fas fa-users popup-open'
                    onClick={openpopup}
                  ></i>
                  Invite a participant
                  <div className='popup-wrapper'>
                    <div className='popup'>
                      <button className='close-btn'>
                        <i className='fas fa-times'></i>
                      </button>
                      <div className='copy'>
                        <button onClick={Copy}>Copy Link</button>
                        <input type='text' id='paste-box' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='rec-time'>{/*<span></span>*/}00:00 </div>
              </div>
              <div className='vids'>
                <div className='stream vid-item signlang'>
                <img id="stream_asl" alt="ss" src={signpic} />
                </div>
                <div className='vid-item'>
                  <div
                    className={`width-peer${
                      peers.length > 8 ? '' : peers.length
                    }`}
                  >
                    <i className='fas fa-expand' />
                    <video
                      onClick={expandScreen}
                      ref={userVideoRef}
                      muted
                      autoPlay
                      playsInline
                    ></video>
                  </div>
                  <div className='icon'>
                    {userVideoAudio['localUser'].audio ? (
                      <i className='fas fa-microphone'></i>
                    ) : (
                      <i className='fas fa-microphone-slash'></i>
                    )}
                
                  </div>
                  
                    <span className='name'>{user.name}</span>
                  
                </div>
                {peers &&
                  peers.map((peer, index, arr) => {
                    return createUserVideo(peer, index, arr);
                  })}
              </div>
            </div>
          </div>
          <BottomBar
            clickScreenSharing={clickScreenSharing}
            // clickChat={clickChat}
            // clickCameraDevice={clickCameraDevice}
            goToBack={goToBack}
            toggleCameraAudio={toggleCameraAudio}
            userVideoAudio={userVideoAudio['localUser']}
            screenShare={screenShare}
            text={text}
            // speechRecognition={speechRecognition.start()}
    
            // videoDevices={videoDevices}
            // showVideoDevices={showVideoDevices}
            // setShowVideoDevices={setShowVideoDevices}
          />
        </div>
        <Chat roomId={roomId} />
      </div>
    </react.Fragment>
  );
};


export default Room;
